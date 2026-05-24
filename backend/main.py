from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd
import uvicorn
import os

app = FastAPI(
    title="Healthcare Insurance Claim Fraud Detection API",
    description="API to predict if a healthcare claim is fraudulent.",
    version="1.0.0"
)

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Load artifacts
ARTIFACTS_DIR = os.path.join(os.path.dirname(__file__), "6.Artifacts")

import joblib

try:
    model = joblib.load(os.path.join(ARTIFACTS_DIR, "random_forest.pkl"))
    with open(os.path.join(ARTIFACTS_DIR, "scaler.pkl"), "rb") as f:
        scaler = pickle.load(f)
    print("Artifacts loaded successfully!")
except Exception as e:
    print(f"Error loading artifacts: {e}")
    model = None
    scaler = None

class ClaimFeatures(BaseModel):
    Claim_Amount: float
    Patient_Age: int
    Patient_Gender: int
    Patient_City: int
    Patient_State: int
    Provider_City: int
    Provider_State: int
    Diagnosis_Code: int
    Procedure_Code: int
    Number_of_Procedures: int
    Admission_Type: int
    Length_of_Stay_Days: int
    Service_Type: int
    Deductible_Amount: float
    CoPay_Amount: float
    Number_of_Previous_Claims_Patient: int
    Number_of_Previous_Claims_Provider: int
    Provider_Patient_Distance_Miles: float
    Claim_Submitted_Late: int
    Provider_Type_Hospital: int
    Provider_Type_Laboratory: int
    Provider_Type_Pharmacy: int
    Provider_Type_Specialist_Office: int
    Provider_Type_Urgent_Care: int
    Provider_Specialty_Dermatology: int
    Provider_Specialty_General_Practice: int
    Provider_Specialty_Neurology: int
    Provider_Specialty_Oncology: int
    Provider_Specialty_Orthopedics: int
    Provider_Specialty_Pediatrics: int
    Provider_Specialty_Physical_Therapy: int
    Provider_Specialty_Psychiatry: int
    Provider_Specialty_Radiology: int
    Discharge_Type_Deceased: int
    Discharge_Type_Home: int
    Discharge_Type_Rehab_Skilled_Nursing: int
    Discharge_Type_Transfer_to_another_facility: int
    Claim_Year: int
    Claim_Month: int
    Claim_Delay_Days: int

@app.get("/")
def read_root():
    return {"message": "Welcome to the Healthcare Insurance Claim Fraud Detection API"}

@app.post("/predict")
def predict_fraud(claim: ClaimFeatures):
    if model is None or scaler is None:
        raise HTTPException(status_code=500, detail="Model or Scaler not loaded")

    # Convert request to DataFrame
    data_dict = claim.dict()
    
    # Map the pydantic model field names back to the exact feature names expected by the scaler and model
    rename_mapping = {
        "Provider_Type_Specialist_Office": "Provider_Type_Specialist Office",
        "Provider_Type_Urgent_Care": "Provider_Type_Urgent Care",
        "Provider_Specialty_General_Practice": "Provider_Specialty_General Practice",
        "Provider_Specialty_Physical_Therapy": "Provider_Specialty_Physical Therapy",
        "Discharge_Type_Rehab_Skilled_Nursing": "Discharge_Type_Rehab/Skilled Nursing",
        "Discharge_Type_Transfer_to_another_facility": "Discharge_Type_Transfer to another facility"
    }
    
    # Create the dataframe for prediction
    df = pd.DataFrame([data_dict])
    df.rename(columns=rename_mapping, inplace=True)
    
    # Define features to scale based on notebook
    scale_columns = [
        'Claim_Amount', 'Patient_Age', 'Patient_City', 'Provider_City',
        'Diagnosis_Code', 'Procedure_Code', 'Number_of_Procedures',
        'Length_of_Stay_Days', 'Deductible_Amount', 'CoPay_Amount',
        'Number_of_Previous_Claims_Patient', 'Number_of_Previous_Claims_Provider',
        'Provider_Patient_Distance_Miles', 'Claim_Year', 'Claim_Month', 'Claim_Delay_Days'
    ]
    
    # Scale features
    df[scale_columns] = scaler.transform(df[scale_columns])

    # Predict
    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]

    return {
        "is_fraudulent": bool(prediction),
        "fraud_probability": float(probability)
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
