import pandas as pd
import numpy as np
import sys
import json
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.feature_selection import VarianceThreshold

def run_knn_model(file_path):
    try:
        # ✅ Load Dataset
        df = pd.read_csv(file_path, low_memory=False)

        # ✅ Remove Duplicates
        df.drop_duplicates(inplace=True)

        # ✅ Ensure Dataset Contains 'Label' Column
        if ' Label' not in df.columns:
            return json.dumps({"error": "Missing 'Label' column in uploaded CSV file."})

        # ✅ Balance Data (Ensure 1:1 ratio)
        class_0 = df[df[' Label'] == 0]
        class_1 = df[df[' Label'] == 1].sample(n=len(class_0), random_state=42)

        df_balanced = pd.concat([class_0, class_1]).sample(frac=1, random_state=42).reset_index(drop=True)

        # ✅ Separate Features & Labels
        X = df_balanced.drop(columns=[' Label'])  # Features
        y = df_balanced[' Label']  # Target

        # ✅ Standardize Features
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        # ✅ Remove Zero Variance Features
        selector = VarianceThreshold(threshold=0)
        X_scaled = selector.fit_transform(X_scaled)

        # ✅ Add Small Noise to Avoid Perfect Separation
        noise = np.random.normal(0, 2.0, X_scaled.shape)
        X_scaled_noisy = X_scaled + noise

        # ✅ Train-Test Split (Stratified)
        X_train, X_test, y_train, y_test = train_test_split(
            X_scaled_noisy, y, test_size=0.3, random_state=42, stratify=y, shuffle=True
        )

        # ✅ Train KNN Model
        knn_model = KNeighborsClassifier(n_neighbors=25, n_jobs=-1)
        knn_model.fit(X_train, y_train)

        # ✅ Make Predictions
        y_pred = knn_model.predict(X_test)

        # ✅ Calculate Metrics
        accuracy = accuracy_score(y_test, y_pred)
        precision = precision_score(y_test, y_pred, zero_division=0)
        recall = recall_score(y_test, y_pred, zero_division=0)
        f1 = f1_score(y_test, y_pred, zero_division=0)

        # ✅ Compute Confusion Matrix
        tn, fp, fn, tp = confusion_matrix(y_test, y_pred).ravel()

        # ✅ Calculate False Positive Rate (FPR)
        fpr = fp / (fp + tn)

        # ✅ Return Results as JSON
        results = {
            "accuracy": round(accuracy, 3),
            "precision": round(precision, 3),
            "recall": round(recall, 3),
            "f1_score": round(f1, 3),
            "false_positive_rate": round(fpr, 3)
        }
        return json.dumps(results)

    except Exception as e:
        return json.dumps({"error": str(e)})

# ✅ Read file path from command-line arguments (for backend integration)
if __name__ == "__main__":
    file_path = sys.argv[1]  # Get file path from backend
    print(run_knn_model(file_path))
