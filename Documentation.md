# Recent Project Changes Summary

This document outlines the recent modifications made to the `Tekwork-Project` repository, primarily focused on project restructuring, dependency updates, and new analytical scripts.

## 1. Project Restructuring (Backend Segregation)

A major organizational change was made to separate the backend logic from the root of the project into its own dedicated folder. 

**Files and Folders Moved into `backend/`:**
*   **Core Application:** `main.py`, `requirements.txt`, `test_joblib.py`, `test_pickle.py`.
*   **Datasets & Processing:** 
    *   `1.Dataset/` (Clean data, Encoded data, Raw data, Scaling data)
    *   `2.Data Cleaning and outlier and missing/`
    *   `3.Data Encoder/`
    *   `4.Data Feature Scaling/`
    *   `5.model training and Evaluation/`
*   **Machine Learning Artifacts:** `6.Artifacts/` (Contains `.pkl` models like `random_forest.pkl`, `decision_tree.pkl`, and scalers).

> [!NOTE] 
> Because of this move, running `git status` will show these files as "deleted" from the root directory and will show `backend/` as a new untracked directory. When you stage these changes (`git add .`), Git will recognize this as a move/rename operation.

## 2. Frontend Dependency Updates

**Modified File:** `frontend/package-lock.json`

When installing the Node.js packages for the React frontend (`npm install`), `npm` automatically updated the lockfile. Because the installation occurred on a Windows machine, NPM removed some unused Linux/macOS specific architectural fields (like `libc: ["glibc"]` and `libc: ["musl"]`) from the lockfile structure. This is normal and ensures the lockfile reflects your current environment.

## 3. New Fraud Analysis Scripts

During the investigation into how to trigger high fraud probability scores, several new analytical Python scripts were generated. These are currently untracked inside the `backend/` folder:

*   **`check_importances.py`**: Extracts and ranks the feature importances from your Random Forest model (`random_forest.pkl`). It revealed that `Number_of_Procedures`, `Claim_Amount`, and `Provider_Type_Specialist Office` are the primary indicators of fraud.
*   **`find_high_fraud.py`**: A random-search script that attempted to find high-fraud input combinations strictly within the limitations of what is exposed in the frontend UI.
*   **`find_high_fraud_all.py` / `find_high_fraud_batch.py`**: A vectorized script that bypasses the frontend's hardcoded limitations to search for the absolute highest possible fraud probability (yielding ~50.5% max probability with extreme outlier values).

> [!IMPORTANT]
> **UI Limitation Discovered:** The analysis scripts revealed that the React frontend (`ClaimForm.jsx`) currently hardcodes the most important fraud indicators to low-risk values (e.g., `Number_of_Procedures: 1` and `Provider_Type_Specialist_Office: 0`). Consequently, it is mathematically impossible to achieve a fraud score higher than ~35% using the current UI.

## Next Steps

1.  **Commit the Restructuring:** Run `git add .` and `git commit -m "Restructure: Move backend files to dedicated folder"` to save your reorganized workspace.
2.  **Update the UI (Optional):** If you wish to allow users to trigger higher fraud probability scores, the `ClaimForm.jsx` component will need to be updated to expose `Number of Procedures`, `Provider Type`, and `Provider-Patient Distance` to the user instead of hardcoding them.
