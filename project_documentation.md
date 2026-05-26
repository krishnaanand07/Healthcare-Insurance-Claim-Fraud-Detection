# 1. Project Overview
- **Project Title:** Healthcare Insurance Claim Fraud Detection
- **Domain:** Healthcare & Finance (Insurance)
- **ML Type:** Supervised Learning (Classification)
- **Algorithm(s) Used:** Random Forest Classifier (Primary Deployed Model), XGBoost, Support Vector Machines (SVM), Gradient Boosting, Logistic Regression, and Decision Trees.

# 2. Problem Statement
- **What problem is being solved?** Identifying and flagging fraudulent healthcare insurance claims before they are processed and paid out.
- **Why this problem is important?** Healthcare fraud costs the industry billions of dollars annually. This leads to increased insurance premiums for patients, massive financial losses for providers and insurers, and delays in processing legitimate medical claims.
- **How ML helps solve it?** Traditional rule-based systems are often too rigid and miss sophisticated fraud schemes. Machine Learning can analyze complex, multi-dimensional patterns across thousands of claims (e.g., unusual billing amounts, suspicious provider-patient distances, mismatched diagnosis/procedure codes) to accurately flag high-risk activity in real-time.

# 3. Objectives
- **Analyze the given data:** Perform Exploratory Data Analysis (EDA) to understand the distribution of claims, identify outliers, and handle missing values.
- **Apply ML technique:** Train and validate various supervised classification models on historical claim data to learn the difference between legitimate and fraudulent behavior.
- **Extract insights / predictions:** Deploy the best-performing model to a REST API to provide real-time binary predictions (Fraud/Not Fraud) and a confidence probability score for new claims.

# 4. Dataset Description
- **Data source:** Standardized Healthcare Claims Dataset (comprising historical provider, patient, and claim transaction records).
- **No. of records & features:** The final model utilizes approximately 36 key features extracted from the raw data.
- **Brief feature description:**
  - *Demographics:* Patient Age, Gender, Patient State.
  - *Provider Details:* Provider State, Specialty (General Practice, Radiology, etc.), Facility Type (Hospital, Pharmacy).
  - *Claim Financials:* Claim Amount, Deductible Amount, CoPay Amount.
  - *Medical Details:* Number of Procedures, Length of Stay, Discharge Type.
  - *Temporal/Behavioral:* Claim Delay Days, Claim Month/Year, Provider-Patient Distance.

# 5. Data Analysis & Preprocessing
- **Key observations from data:** Fraudulent claims constitute a small minority of the overall dataset, resulting in a highly imbalanced class distribution.
- **Missing value handling:** Missing data points and extreme outliers (e.g., impossible claim amounts or ages) were cleaned and imputed during the preprocessing phase (`data_cleaning.ipynb`).
- **Feature scaling / encoding:** 
  - Numerical features (like `Claim_Amount`, `Patient_Age`, `Deductible_Amount`) were standardized using `StandardScaler` (`scaler.pkl`) to ensure equal weighting.
  - Categorical variables (Provider types, Specialties) were mathematically encoded (`Encoder.ipynb`).

# 6. ML Methodology
- **ML type selection reason:** Supervised classification was chosen because the historical dataset contains explicit labels indicating whether past claims were fraudulent or legitimate.
- **Algorithm selection reason:** Random Forest was selected as the primary model because it is highly robust against overfitting, handles non-linear relationships well, and performs strongly on tabular financial data without requiring extensive hyperparameter tuning.
- **Model training approach:** The dataset was split into training and testing sets. Due to class imbalance, techniques from `imbalanced-learn` were utilized. Multiple models were trained, evaluated, and serialized as `.pkl` artifacts.

# 7. Results & Evaluation
- **Output:** The system outputs a binary classification (High Risk Detected / Claim Appears Legitimate) along with a percentage-based Fraud Probability Score (e.g., 85.2%).
- **Evaluation method used:** Models were evaluated using metrics suited for imbalanced datasets, including Precision, Recall, F1-Score, and ROC-AUC (Receiver Operating Characteristic - Area Under Curve).
- **Key insights:** The model relies heavily on the financial ratios (Claim Amount vs. Deductible) and behavioral anomalies (Claim Delay Days, Provider Distance) to accurately isolate fraudulent patterns.

# 8. Use Case
- **Real-world / business use:** Insurance companies and third-party administrators (TPAs) can integrate this API directly into their automated claims processing pipeline. 
- **How results help decision-making:** Instead of manually reviewing every claim, the system automatically approves low-risk claims and flags high-probability fraud cases. This routes suspicious claims directly to human investigators, saving vast amounts of time and significantly reducing financial loss.

# 9. Tools Used
- **Programming Language:** Python, JavaScript (React)
- **ML & Data Libraries:** `scikit-learn`, `pandas`, `numpy`, `imbalanced-learn`, `joblib`
- **Backend/Deployment:** `FastAPI`, `uvicorn`, `pydantic`
- **Frontend:** React, Vite, CSS Modules (Custom Glassmorphism UI)

# 10. Conclusion & Future Scope
- **Summary of results:** Successfully developed and deployed an end-to-end Machine Learning pipeline. The resulting web application provides an intuitive dashboard for risk analysts to input claim data and receive instant fraud probability scores.
- **Limitations:** The model's accuracy is bounded by the quality and representativeness of the training data. It may struggle to identify entirely new, unseen methods of fraud (zero-day fraud schemes).
- **Future improvements:** 
  - Implement a continuous learning pipeline to retrain the model periodically on newly flagged fraud cases.
  - Integrate Graph Neural Networks (GNNs) to map relationships between organized provider fraud rings.
  - Add SHAP (SHapley Additive exPlanations) values to the frontend to explain *why* a specific claim was flagged (e.g., "Flagged due to unusually high Claim Amount and Provider Distance").
