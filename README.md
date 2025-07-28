# 📉 Customer Churn Prediction using Deep Learning

An end-to-end project that predicts if a customer will churn using an Artificial Neural Network (ANN) model built with TensorFlow/Keras, deployed via FastAPI, and served to users through a clean and responsive HTML frontend.

---

## 📌 Features

- Predict customer churn based on:
  - ✅ Demographics (Gender, Senior Citizen)
  - ✅ Subscription details (Contract, Payment Method)
  - ✅ Service usage (Streaming, Tech Support)
  - ✅ Billing and Tenure data
- Trained Deep Learning model (ANN) using TensorFlow/Keras
- FastAPI backend with JSON-based POST endpoint
- Responsive, dark-themed frontend (HTML + CSS + JS)
- Real-time predictions via frontend using Fetch API
- CORS enabled for seamless local API integration
- Model training and evaluation included via Jupyter Notebook (`ccp.ipynb`)

---

## 🔍 Dataset Features

| Feature                        | Description                                  |
|-------------------------------|----------------------------------------------|
| Gender, SeniorCitizen         | Demographic indicators                       |
| Partner, Dependents           | Marital/Family information                   |
| Tenure                        | Number of months as customer                 |
| MonthlyCharges, TotalCharges  | Financial data                               |
| Multiple streaming/tech flags | Service usage (e.g., Tech Support, Movies)   |
| InternetService, Contract     | One-hot encoded categorical data             |
| PaymentMethod                 | One-hot encoded categorical data             |
| Churn                         | Target variable (1 = churn, 0 = not churn)   |

---

## 🤖 DL Model Details

- **Model Type**: Artificial Neural Network (ANN)
- **Framework**: TensorFlow / Keras
- **Architecture**:
  - Input Layer (26 features)
  - Hidden Layers (Dense + ReLU)
  - Output Layer (Sigmoid)
- **Loss Function**: Binary Crossentropy
- **Optimizer**: Adam
- **Metrics**: Accuracy
- **Model File**: `model/model.keras`

---

## 📁 Project Structure

customer_churn_prediction/
│
├── model/
│ └── model.keras # Trained ANN model
│
├── server/
│ ├── main.py # FastAPI backend
│ └── requirements.txt # Backend dependencies
│
├── frontend/
│ └── index.html # UI with input fields and Fetch logic
│
├── notebook/
│ └── ccp.ipynb # Full training & evaluation notebook
│
└── README.md # Project documentation
