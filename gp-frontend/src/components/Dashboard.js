import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col, Card, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/Logo.png";

const Dashboard = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAlgorithmChange = (event) => {
    setSelectedAlgorithm(event.target.value);
  };

  const handleStartAnalysis = async () => {
    if (!selectedAlgorithm || !selectedFile) {
      setError("Please select an algorithm and upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("algorithm", selectedAlgorithm);

    try {
      setLoading(true);
      setError(null);
      setAnalysisResult(null);

      const response = await axios.post("http://127.0.0.1:5000/analyze", formData);
      setAnalysisResult(response.data);
    } catch (err) {
      setError("Error running analysis. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page bg-black text-white min-vh-100">
      {/* ✅ Matching Header like Homepage.js */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-black py-3">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="/">
            <img src={logo} alt="ML Detect" width="50" height="50" className="me-2" />
            ML Detect
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="/solutions">Solutions</a></li>
              <li className="nav-item"><a className="nav-link" href="/about">About Us</a></li>
              <li className="nav-item"><a className="nav-link" href="/contact">Contact Us</a></li>
              <li className="nav-item"><input type="text" className="form-control me-2 bg-dark text-white" placeholder="Search" /></li>
              <li className="nav-item">
                <button className="btn btn-primary" onClick={() => navigate("/login")}>Login</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Container className="dashboard-container">
        <h2 className="dashboard-title">Dashboard</h2>

        {/* Upload Form */}
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="dashboard-card">
              <Card.Body>
                <Form>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label className="form-label">Upload CSV File</Form.Label>
                    <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
                  </Form.Group>

                  <Form.Group controlId="formAlgorithm" className="mb-3">
                    <Form.Label className="form-label">Choose Algorithm</Form.Label>
                    <Form.Select value={selectedAlgorithm} onChange={handleAlgorithmChange}>
                      <option value="">Select Algorithm</option>
                      <option value="knn">K-Nearest Neighbors (KNN)</option>
                      <option value="ann">Artificial Neural Network (ANN)</option>
                      <option value="naive_bayes">Naive Bayes (NB)</option>
                      <option value="rf">Random Forest (RF)</option>
                      <option value="svm">Support Vector Machine (SVM)</option>
                      <option value="dt">Decision Tree (DT) (Recommended)</option>
                    </Form.Select>
                  </Form.Group>

                  <Button
                    variant="primary"
                    className="analyze-button"
                    onClick={handleStartAnalysis}
                    disabled={loading}
                  >
                    {loading ? <Spinner as="span" animation="border" size="sm" /> : "Start Analyzing"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Results or Errors */}
        <Row className="justify-content-center mt-4">
          <Col md={8}>
            {error && <Alert variant="danger">{error}</Alert>}
            {analysisResult && (
              <Card className="result-card">
                <Card.Body>
                  <h4>Analysis Results</h4>
                  <p><strong>Accuracy:</strong> {analysisResult.accuracy}</p>
                  <p><strong>Precision:</strong> {analysisResult.precision}</p>
                  <p><strong>Recall:</strong> {analysisResult.recall}</p>
                  <p><strong>F1 Score:</strong> {analysisResult.f1_score}</p>
                  <p><strong>False Positive Rate:</strong> {analysisResult.false_positive_rate}</p>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>

      {/* Dark Theme CSS Styles */}
      <style>{`
        .dashboard-title {
          font-size: 32px;
          font-weight: bold;
          margin-top: 30px;
          margin-bottom: 20px;
          text-align: center;
        }

        .dashboard-card {
          background: #1e1e1e;
          border: 1px solid #333;
          border-radius: 10px;
          padding: 20px;
        }

        .form-label {
          font-weight: bold;
          color: #bbb;
        }

        .form-control, .form-select {
          background: #2a2a2a;
          color: #fff;
          border: 1px solid #444;
        }

        .form-control:focus, .form-select:focus {
          background: #2a2a2a;
          color: #fff;
          border: 1px solid #4a90e2;
        }

        .analyze-button {
          background-color: #4a90e2;
          border: none;
          width: 100%;
          padding: 10px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 5px;
        }

        .analyze-button:hover {
          background-color: #357abd;
        }

        .result-card {
          background: #1e1e1e;
          border: 1px solid #333;
          border-radius: 10px;
          padding: 20px;
          text-align: left;
          margin-top: 20px;
        }

        .result-card h4 {
          color: #4a90e2;
        }
        .result-card p {
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
