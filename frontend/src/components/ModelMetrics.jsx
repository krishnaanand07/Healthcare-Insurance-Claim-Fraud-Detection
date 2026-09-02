
import styles from './ModelMetrics.module.css';

const ModelMetrics = () => {
  const metricsData = [
    { model: 'Decision Tree', accuracy: 0.791542, precision: 0.584302, recall: 0.595850, f1: 0.590020 },
    { model: 'Random Forest', accuracy: 0.850995, precision: 0.931106, recall: 0.440711, f1: 0.598256, isPrimary: true },
    { model: 'Gradient Boosting', accuracy: 0.848507, precision: 0.856637, recall: 0.478261, f1: 0.613824 },
    { model: 'XGBoost', accuracy: 0.842537, precision: 0.744516, recall: 0.570158, f1: 0.645775 },
    { model: 'SVM', accuracy: 0.796517, precision: 0.933036, recall: 0.206522, f1: 0.338188 },
  ];

  return (
    <section className={styles.metricsContainer}>
      <div className="glass-card">
        <header className={styles.cardHeader}>
          <h2> Model Evaluation Metrics</h2>
          <p>Performance comparison of trained machine learning models on the validation dataset.</p>
        </header>

        <div className={styles.tableWrapper}>
          <table className={styles.metricsTable}>
            <thead>
              <tr>
                <th>Model</th>
                <th>Accuracy</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>F1 Score</th>
              </tr>
            </thead>
            <tbody>
              {metricsData.map((row, index) => (
                <tr key={index} className={row.isPrimary ? styles.highlightRow : ''}>
                  <td>{row.model} {row.isPrimary && '⭐ (Deployed)'}</td>
                  <td>{(row.accuracy * 100).toFixed(2)}%</td>
                  <td>{(row.precision * 100).toFixed(2)}%</td>
                  <td>{(row.recall * 100).toFixed(2)}%</td>
                  <td>{(row.f1 * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ModelMetrics;
