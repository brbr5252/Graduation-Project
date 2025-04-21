import os
import sys
import json
import pandas as pd
import numpy as np
import re
from collections import Counter
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
import torch
import time

class OptimizedDecisionTreeGPU:
    def __init__(self, max_depth=6, min_samples_split=100, device='cuda'):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.tree = None
        self.device = device if torch.cuda.is_available() else 'cpu'

    def _entropy(self, y):
        counts = torch.bincount(y)
        probs = counts / len(y)
        return -(probs * torch.log2(probs + 1e-10)).sum()

    def _best_split(self, X, y, feature_indices):
        best_gain = -1.0
        best_feature, best_thresh = None, None
        for feat_idx in feature_indices:
            values = torch.unique(X[:, feat_idx])
            for val in values:
                left_mask = X[:, feat_idx] <= val
                n_left = left_mask.sum().item()
                if self.min_samples_split <= n_left <= (len(y) - self.min_samples_split):
                    gain = self._information_gain(y, left_mask, n_left)
                    if gain > best_gain:
                        best_gain = gain
                        best_feature = feat_idx
                        best_thresh = val
        return best_feature, best_thresh

    def _information_gain(self, y, left_mask, n_left):
        n = len(y)
        n_right = n - n_left
        parent_entropy = self._entropy(y)
        e_left = self._entropy(y[left_mask])
        e_right = self._entropy(y[~left_mask])
        return parent_entropy - (n_left / n) * e_left - (n_right / n) * e_right

    def _build_tree(self, X, y, depth=0):
        n_samples, n_features = X.shape
        unique_classes = torch.unique(y)
        if (depth >= self.max_depth or len(unique_classes) == 1 or n_samples < self.min_samples_split):
            return {'leaf': True, 'value': Counter(y.cpu().numpy()).most_common(1)[0][0]}
        feat_indices = torch.randperm(n_features, device=self.device)
        best_feat, best_thresh = self._best_split(X, y, feat_indices)
        if best_feat is None:
            return {'leaf': True, 'value': Counter(y.cpu().numpy()).most_common(1)[0][0]}
        left_mask = X[:, best_feat] <= best_thresh
        return {
            'leaf': False,
            'feature': best_feat,
            'threshold': best_thresh.item(),
            'left': self._build_tree(X[left_mask], y[left_mask], depth + 1),
            'right': self._build_tree(X[~left_mask], y[~left_mask], depth + 1)
        }

    def fit(self, X, y):
        X_tensor = torch.tensor(X, dtype=torch.float32, device=self.device)
        y_tensor = torch.tensor(y, dtype=torch.long, device=self.device)
        self.tree = self._build_tree(X_tensor, y_tensor)

    def predict(self, X, batch_size=10000):
        X_tensor = torch.tensor(X, dtype=torch.float32, device=self.device)
        predictions = []
        for i in range(0, len(X_tensor), batch_size):
            batch = X_tensor[i:i + batch_size]
            predictions.extend([self._predict(x, self.tree) for x in batch])
        return np.array(predictions)

    def _predict(self, x, node):
        if node['leaf']:
            return node['value']
        if x[node['feature']] <= node['threshold']:
            return self._predict(x, node['left'])
        return self._predict(x, node['right'])

def run_decision_tree_model(file_path):
    try:
        df = pd.read_csv(file_path, low_memory=False)
        df.drop_duplicates(inplace=True)

        if ' Label' not in df.columns:
            return json.dumps({"error": "Missing 'Label' column in CSV."})

        X = df.drop(columns=[' Label']).apply(pd.to_numeric, errors='coerce').fillna(0)
        y = LabelEncoder().fit_transform(df[' Label'].astype(str))

        scaler = MinMaxScaler()
        X_scaled = scaler.fit_transform(X)

        X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.3, random_state=42, stratify=y)

        # ✅ Reduce training size to speed up
        X_train = X_train[:5000]
        y_train = y_train[:5000]

        model = OptimizedDecisionTreeGPU(max_depth=6, min_samples_split=100)
        model.fit(X_train, y_train)

        y_pred = model.predict(X_test)

        accuracy = accuracy_score(y_test, y_pred)
        precision = precision_score(y_test, y_pred, zero_division=0)
        recall = recall_score(y_test, y_pred, zero_division=0)
        f1 = f1_score(y_test, y_pred, zero_division=0)
        conf_matrix = confusion_matrix(y_test, y_pred)
        FP = conf_matrix[0][1]
        TN = conf_matrix[0][0]
        fpr = FP / (FP + TN) if (FP + TN) > 0 else 0

        return json.dumps({
            "accuracy": round(accuracy, 3),
            "precision": round(precision, 3),
            "recall": round(recall, 3),
            "f1_score": round(f1, 3),
            "false_positive_rate": round(fpr, 3)
        })

    except Exception as e:
        return json.dumps({"error": str(e)})

if __name__ == "__main__":
    path = sys.argv[1]
    print(run_decision_tree_model(path))
