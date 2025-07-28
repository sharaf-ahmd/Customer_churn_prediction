from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Correct CORS import for FastAPI
from pydantic import BaseModel
import numpy as np
from tensorflow.keras.models import load_model
import os

model_path = os.path.join(os.path.dirname(__file__), "../model/model.keras")
model = load_model(model_path)

app = FastAPI()

# Add CORS middleware with appropriate settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change "*" to your frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    gender: float
    SeniorCitizen: float
    Partner: float
    Dependents: float
    tenure: float
    PhoneService: float
    MultipleLines: float
    OnlineSecurity: float
    OnlineBackup: float
    DeviceProtection: float
    TechSupport: float
    StreamingTV: float
    StreamingMovies: float
    PaperlessBilling: float
    MonthlyCharges: float
    TotalCharges: float
    InternetService_DSL: float
    InternetService_Fiber_optic: float
    InternetService_No: float
    Contract_Month_to_month: float
    Contract_One_year: float
    Contract_Two_year: float
    PaymentMethod_Bank_transfer_automatic: float
    PaymentMethod_Credit_card_automatic: float
    PaymentMethod_Electronic_check: float
    PaymentMethod_Mailed_check: float

@app.post("/predict")
async def predict(data: InputData):
    try:
        features = list(data.dict().values())
        features_array = np.array([features])
        prediction = model.predict(features_array)
        predicted_label = int(prediction[0][0] > 0.5)
        return {"prediction": predicted_label}
    except Exception as e:
        return {"error": str(e)}
