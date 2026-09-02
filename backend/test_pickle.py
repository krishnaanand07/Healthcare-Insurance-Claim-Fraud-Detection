import pickle
import os
import glob
import traceback
import joblib

artifacts_dir = os.path.join(os.path.dirname(__file__), "6.Artifacts")

for pkl_file in glob.glob(os.path.join(artifacts_dir, "*.pkl")):
    print(f"--- Loading {os.path.basename(pkl_file)} ---")
    try:
        with open(pkl_file, "rb") as f:
            obj = pickle.load(f)
        print("Success with pickle! Type:", type(obj))
    except Exception as pickle_err:
        try:
            obj = joblib.load(pkl_file)
            print("Success with joblib! Type:", type(obj))
        except Exception as joblib_err:
            print("Error loading artifact:", pickle_err)
