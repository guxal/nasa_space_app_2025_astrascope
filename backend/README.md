## AstraScope Backend

This is the backend service for the AstraScope project — an AI-powered platform for exoplanet classification using NASA’s Kepler, K2, and TESS datasets.
It provides API endpoints for model predictions, feature importance, and performance metrics.

## 🧠 Tech Stack

- Python 3.10+
- FastAPI
- XGBoost
- Pandas
- Scikit-learn
- Uvicorn

## ⚙️ Setup & Run
### 1️⃣ Create and activate a virtual environment

```bash
python3 -m venv venv
```

```bash
source venv/bin/activate
```

### 2️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 3️⃣ Run the FastAPI server

```bash
uvicorn main:app --reload --port 8000
```



## Server will start at:

```bash
http://127.0.0.1:8000
```

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| /predict | POST | Upload a CSV file to classify exoplanet candidates |
| /feature-importance | GET | Get ranked feature importance from the trained model |
| /confusion-matrix | GET | View confusion matrix and performance metrics |


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
