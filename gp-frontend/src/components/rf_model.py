import os
import sys
import json
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

# ✅ Suppress TensorFlow logs (optional for RF, but consistent with NB style)
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

def run_random_forest_model(file_path):
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

        # ✅ Standardize Features
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        # ✅ Add Noise
        np.random.seed(42)
        noise = np.random.normal(loc=0, scale=1.05, size=X_scaled.shape)
        X_noisy = X_scaled + noise

        # ✅ Train-Test Split
        X_train, X_test, y_train, y_test = train_test_split(
            X_noisy, y, test_size=0.3, random_state=42, stratify=y, shuffle=True
        )

        # ✅ Train Random Forest Model
        rf_model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
        rf_model.fit(X_train, y_train)

        # ✅ Make Predictions
        y_pred = rf_model.predict(X_test)

        # ✅ Calculate Metrics
        accuracy = accuracy_score(y_test, y_pred)
        precision = precision_score(y_test, y_pred, zero_division=0)
        recall = recall_score(y_test, y_pred, zero_division=0)
        f1 = f1_score(y_test, y_pred, zero_division=0)

        # ✅ Confusion Matrix → False Positive Rate
        conf_matrix = confusion_matrix(y_test, y_pred)
        FP = conf_matrix[0][1]
        TN = conf_matrix[0][0]
        false_positive_rate = FP / (FP + TN) if (FP + TN) > 0 else 0

        # ✅ Return as JSON
        return json.dumps({
            "accuracy": round(accuracy, 3),
            "precision": round(precision, 3),
            "recall": round(recall, 3),
            "f1_score": round(f1, 3),
            "false_positive_rate": round(false_positive_rate, 3)
        })

    except Exception as e:
        return json.dumps({"error": str(e)})

# ✅ Allow execution from backend (via subprocess)
if __name__ == "__main__":
    file_path = sys.argv[1]  # Get the uploaded file path from the backend
    print(run_random_forest_model(file_path))
