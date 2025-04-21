import os
import sys
import json
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

# ✅ Suppress Warnings & Logs
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

def run_naive_bayes_model(file_path):
    try:
        # ✅ Load Dataset
        df = pd.read_csv(file_path, low_memory=False)

        # ✅ Remove Duplicate Rows (Fixes Data Leakage)
        df.drop_duplicates(inplace=True)

        # ✅ Ensure Dataset Contains 'Label' Column
        if ' Label' not in df.columns:
            return json.dumps({"error": "Missing 'Label' column in uploaded CSV file."})

        # ✅ Separate Features & Labels
        X = df.drop(columns=[' Label'])  # Features
        y = df[' Label']  # Target

        # ✅ Standardize Features (Naïve Bayes doesn't require scaling, but keeping consistency)
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        # ✅ Add Noise (Simulating Real-World Imperfections)
        np.random.seed(42)
        noise = np.random.normal(loc=0, scale=1.55, size=X_scaled.shape)  # Noise with std-dev 1.55
        X_noisy = X_scaled + noise

        # ✅ Train-Test Split
        X_train, X_test, y_train, y_test = train_test_split(
            X_noisy, y, test_size=0.3, random_state=42, stratify=y, shuffle=True
        )

        # ✅ Train Naïve Bayes Model
        nb_model = GaussianNB()
        nb_model.fit(X_train, y_train)

        # ✅ Make Predictions
        y_pred = nb_model.predict(X_test)

        # ✅ Calculate Metrics
        accuracy = accuracy_score(y_test, y_pred)
        precision = precision_score(y_test, y_pred, zero_division=0)
        recall = recall_score(y_test, y_pred, zero_division=0)
        f1 = f1_score(y_test, y_pred, zero_division=0)

        # ✅ Compute Confusion Matrix & False Positive Rate
        conf_matrix = confusion_matrix(y_test, y_pred)
        FP = conf_matrix[0][1]  # False Positives
        TN = conf_matrix[0][0]  # True Negatives
        false_positive_rate = FP / (FP + TN) if (FP + TN) > 0 else 0

        # ✅ Return Results as JSON
        results = {
            "accuracy": round(accuracy, 3),
            "precision": round(precision, 3),
            "recall": round(recall, 3),
            "f1_score": round(f1, 3),
            "false_positive_rate": round(false_positive_rate, 3)
        }
        return json.dumps(results)

    except Exception as e:
        return json.dumps({"error": str(e)})

# ✅ Read file path from command-line arguments (for backend integration)
if __name__ == "__main__":
    file_path = sys.argv[1]  # Get file path from backend
    print(run_naive_bayes_model(file_path))
