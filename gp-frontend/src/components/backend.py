import os
import json
import subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # ✅ Allow frontend requests

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        file = request.files["file"]
        algorithm = request.form["algorithm"]

        # ✅ Save uploaded file
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)

        # ✅ Run the selected algorithm
        if algorithm == "knn":
            result = subprocess.run(["python", "knn_model.py", file_path], capture_output=True, text=True)
        elif algorithm == "ann":
            result = subprocess.run(["python", "ann_model.py", file_path], capture_output=True, text=True)
        elif algorithm == "naive_bayes":
            result = subprocess.run(["python", "naive_bayes_model.py", file_path], capture_output=True, text=True)
        elif algorithm == "rf":
            result = subprocess.run(["python", "rf_model.py", file_path], capture_output=True, text=True)
        elif algorithm == "svm":
            result = subprocess.run(["python", "svm_model.py", file_path], capture_output=True, text=True)
        elif algorithm == "dt":
            result = subprocess.run(["python", "dt_model.py", file_path], capture_output=True, text=True)

        # ✅ Print outputs for debugging
        print("✅ Model Output (Raw):", result.stdout)
        print("⚠️ Model Error (If any):", result.stderr)

        # ✅ Check if output is empty
        if not result.stdout.strip():
            return jsonify({"error": "Empty response from model script"}), 500

        # ✅ Ensure valid JSON response
        try:
            response_data = json.loads(result.stdout.strip())  # ✅ Ensure valid JSON
            return jsonify(response_data)  # ✅ Send JSON response to React
        except json.JSONDecodeError as e:
            print("❌ JSON Decode Error:", str(e))
            return jsonify({"error": "Invalid JSON response from script. Check backend logs."}), 500

    except Exception as e:
        print("❌ Backend Error:", str(e))
        return jsonify({"error": "Unexpected error occurred."}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
