import pickle
import os
import glob
import traceback

artifacts_dir = r"D:\1.Tekworks\Project\Healthcare Insurance Claim\Backend\6.Artifacts"

for pkl_file in glob.glob(os.path.join(artifacts_dir, "*.pkl")):
    print(f"--- Loading {os.path.basename(pkl_file)} ---")
    try:
        with open(pkl_file, "rb") as f:
            obj = pickle.load(f)
        print("Success! Type:", type(obj))
    except Exception as e:
        print("Error:", e)
        # traceback.print_exc()
