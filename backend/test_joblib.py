import joblib
import os
import traceback

artifacts_dir = os.path.join(os.path.dirname(__file__), "6.Artifacts")
pkl_file = os.path.join(artifacts_dir, "random_forest.pkl")

print(f"--- Loading {os.path.basename(pkl_file)} with joblib ---")
try:
    obj = joblib.load(pkl_file)
    print("Success! Type:", type(obj))
except Exception as e:
    print("Error:", e)
    # traceback.print_exc()
