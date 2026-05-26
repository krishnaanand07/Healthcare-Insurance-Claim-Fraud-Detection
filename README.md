# Healthcare Insurance Claim Fraud Detection

This project consists of a Python FastAPI backend for serving the Machine Learning model and a React (Vite) frontend dashboard.

## How to Run the Project

To run this application locally, you will need to open **two separate terminal windows**—one for the backend and one for the frontend.

### 1. Starting the Backend (FastAPI)

The backend handles the machine learning predictions. It runs on Python and uses a virtual environment.

1. Open your terminal and navigate to the root of the project.
2. Change into the `backend` directory:
   ```powershell
   cd backend
   ```
3. Activate the Python virtual environment:
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```
   *(You should see `(venv)` appear at the beginning of your terminal prompt).*
4. Run the backend server:
   ```powershell
   python main.py
   ```
5. The backend API is now running at **http://localhost:8000**.

---

### 2. Starting the Frontend (React / Vite)

The frontend is the graphical dashboard where you can input claim data and see the fraud probability.

1. Open a **new, separate terminal window** and navigate to the root of the project.
2. Change into the `frontend` directory:
   ```powershell
   cd frontend
   ```
3. Install the Node dependencies (you only need to do this once):
   ```powershell
   npm install
   ```
4. Start the frontend development server:
   ```powershell
   npm run dev
   ```
5. The terminal will output a local link (usually **http://localhost:5173**). `CTRL + Click` that link to open the dashboard in your browser!

## Stopping the Servers
When you are done, simply go to both terminal windows and press `CTRL + C` to shut down the servers.
