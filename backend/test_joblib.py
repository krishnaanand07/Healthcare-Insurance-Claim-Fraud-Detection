import joblib
import os
import traceback

pkl_file = r"D:\1.Tekworks\Project\Healthcare Insurance Claim\Backend\6.Artifacts\random_forest.pkl"

print(f"--- Loading {os.path.basename(pkl_file)} with joblib ---")
try:
    obj = joblib.load(pkl_file)
    print("Success! Type:", type(obj))
except Exception as e:
    print("Error:", e)
    # traceback.print_exc()
