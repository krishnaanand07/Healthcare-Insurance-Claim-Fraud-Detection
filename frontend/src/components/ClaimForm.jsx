import { useState } from 'react';
import { predictFraud } from '../api';
import styles from './ClaimForm.module.css';

const ClaimForm = ({ onResult, setLoading, onError }) => {
  const [formData, setFormData] = useState({
    patient_age: '45',
    gender: '0',
    claim_amount: '1500.00',
    deductible: '250.00',
    copay: '50.00',
    claim_month: '10',
    claim_year: '2024'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (onError) onError(null);
    try {
      const payload = {
        Claim_Amount: parseFloat(formData.claim_amount) || 0,
        Patient_Age: parseInt(formData.patient_age) || 0,
        Patient_Gender: parseInt(formData.gender) || 0,
        Patient_State: 0,
        Provider_State: 0,
        Number_of_Procedures: 1,
        Admission_Type: 0,
        Length_of_Stay_Days: 1,
        Service_Type: 0,
        Deductible_Amount: parseFloat(formData.deductible) || 0,
        CoPay_Amount: parseFloat(formData.copay) || 0,
        Number_of_Previous_Claims_Patient: 0,
        Number_of_Previous_Claims_Provider: 0,
        Provider_Patient_Distance_Miles: 10.0,
        Claim_Submitted_Late: 0,
        Provider_Type_Hospital: 1,
        Provider_Type_Laboratory: 0,
        Provider_Type_Pharmacy: 0,
        Provider_Type_Specialist_Office: 0,
        Provider_Type_Urgent_Care: 0,
        Provider_Specialty_Dermatology: 0,
        Provider_Specialty_General_Practice: 1,
        Provider_Specialty_Neurology: 0,
        Provider_Specialty_Oncology: 0,
        Provider_Specialty_Orthopedics: 0,
        Provider_Specialty_Pediatrics: 0,
        Provider_Specialty_Physical_Therapy: 0,
        Provider_Specialty_Psychiatry: 0,
        Provider_Specialty_Radiology: 0,
        Discharge_Type_Deceased: 0,
        Discharge_Type_Home: 1,
        Discharge_Type_Rehab_Skilled_Nursing: 0,
        Discharge_Type_Transfer_to_another_facility: 0,
        Claim_Year: parseInt(formData.claim_year) || 2024,
        Claim_Month: parseInt(formData.claim_month) || 1,
        Claim_Delay_Days: 0
      };

      const result = await predictFraud(payload);
      onResult(result);
    } catch (error) {
      console.error("Analysis failed", error);
      if (onError) onError(error.message || "Failed to analyze claim. Ensure backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.analysisForm} onSubmit={handleSubmit}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Patient Age</label>
          <input type="number" name="patient_age" value={formData.patient_age} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Claim Amount ($)</label>
          <input type="number" name="claim_amount" step="0.01" value={formData.claim_amount} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Deductible ($)</label>
          <input type="number" name="deductible" step="0.01" value={formData.deductible} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>CoPay ($)</label>
          <input type="number" name="copay" step="0.01" value={formData.copay} onChange={handleChange} required />
        </div>

        <div className={styles.formGroup}>
          <label>Claim Month (1-12)</label>
          <input type="number" name="claim_month" min="1" max="12" value={formData.claim_month} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label>Claim Year</label>
          <input type="number" name="claim_year" value={formData.claim_year} onChange={handleChange} required />
        </div>
      </div>

      <button type="submit" className={styles.btnPrimary}>
        Run Predictive Analysis
      </button>
    </form>
  );
};

export default ClaimForm;
