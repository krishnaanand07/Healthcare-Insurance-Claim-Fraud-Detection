import React from 'react';
import styles from './PredictionResult.module.css';

const PredictionResult = ({ data }) => {
  const { is_fraudulent, fraud_probability } = data;
  const percentage = (fraud_probability * 100).toFixed(1);

  return (
    <div className={styles.predictionContainer}>
      <div className={`${styles.resultCard} ${is_fraudulent ? styles.fraudAlert : styles.legitSuccess}`}>
        <div className={styles.icon}>
          {is_fraudulent ? '⚠️' : '✅'}
        </div>
        <div className={styles.content}>
          <h3>{is_fraudulent ? 'High Risk Detected' : 'Claim Appears Legitimate'}</h3>
          <p>
            {is_fraudulent 
              ? 'This claim has been flagged by the ML model for immediate review.' 
              : 'Our analysis indicates a low probability of fraudulent activity.'}
          </p>
        </div>
      </div>

      <div className={`${styles.probabilityCard} glass-card`}>
        <div className={styles.cardHeader}>
          <h4>Fraud Probability Score</h4>
        </div>
        
        <div className={styles.gaugeWrapper}>
          <svg viewBox="0 0 100 55" className={styles.halfCircleGauge}>
            <defs>
              <linearGradient id="successGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="errorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>
            </defs>
            {/* Background arc */}
            <path 
              d="M 10 50 A 40 40 0 0 1 90 50" 
              fill="none" 
              stroke="rgba(0,0,0,0.06)" 
              strokeWidth="10" 
              strokeLinecap="round" 
            />
            {/* Foreground arc */}
            <path 
              d="M 10 50 A 40 40 0 0 1 90 50" 
              fill="none" 
              stroke={is_fraudulent ? "url(#errorGrad)" : "url(#successGrad)"} 
              strokeWidth="10" 
              strokeLinecap="round" 
              strokeDasharray="125.66"
              strokeDashoffset={125.66 * (1 - fraud_probability)}
              className={styles.gaugeArc}
            />
          </svg>
          <div className={styles.gaugeContent}>
            <span className={styles.scoreValue}>{percentage}%</span>
          </div>
        </div>

        <p className={styles.helperText}>
          Confidence score based on feature vector analysis.
        </p>
      </div>
    </div>
  );
};

export default PredictionResult;
