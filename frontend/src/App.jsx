import React, { useState } from 'react';
import './index.css';
import styles from './App.module.css';
import ClaimForm from './components/ClaimForm';
import PredictionResult from './components/PredictionResult';
import ModelMetrics from './components/ModelMetrics';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePrediction = (result) => {
    setPrediction(result);
  };

  return (
    <div className={styles.appContainer}>
      <header className={styles.mainHeader}>
        <h1>ClaimShield Fraud Defense</h1>
        <div className={styles.statusIndicator}>
          <span className={styles.pulse}></span>
          System Operational
        </div>
      </header>
      
      <main className={styles.dashboardContent}>
        <section className={styles.analysisSection}>
          <div className="glass-card" style={{ padding: '3rem' }}>
            <header className={styles.cardHeader}>
              <h2>New Claim Analysis</h2>
              <p>Enter claim details to run predictive fraud modeling.</p>
            </header>
            <ClaimForm onResult={handlePrediction} setLoading={setLoading} />
          </div>
        </section>

        {loading && (
          <div className={`${styles.loadingOverlay} glass-card`}>
            <div className={styles.spinner}></div>
            <p>Analyzing features against ML model...</p>
          </div>
        )}

        {prediction && !loading && (
          <section className={styles.resultsSection}>
            <PredictionResult data={prediction} />
          </section>
        )}
      </main>

      <ModelMetrics />
      
      <footer className={styles.mainFooter}>
        <p>&copy; 2024 ClaimShield Healthcare Systems. All systems operational.</p>
      </footer>
    </div>
  );
}

export default App;
