from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import tempfile
from model.predict import predict_from_csv
import xgboost as xgb
import pandas as pd
from sklearn.metrics import confusion_matrix, classification_report
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI(title="AstraScope Exoplanet Classifier")

model = xgb.Booster()
model.load_model("artifacts/exoplanet_model.json")

# Habilitar CORS para conectar desde la UI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "AstraScope API is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".csv") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    results = predict_from_csv(tmp_path)
    return results.to_dict(orient="records")


@app.get("/feature-importance")
def feature_importance():
    importance = model.get_score(importance_type="weight")
    sorted_importance = sorted(importance.items(), key=lambda x: x[1], reverse=True)
    return [{"feature": k, "score": v} for k, v in sorted_importance]

# ✅ Clases del modelo (asegúrate de mantener el orden exacto del entrenamiento)
LABELS = ["CANDIDATE", "CONFIRMED", "FALSE POSITIVE"]

class ConfusionMatrixResponse(BaseModel):
    matrix: List[Dict[str, Any]]
    labels: List[str]
    report: Dict[str, Any]


@app.get("/confusion-matrix", response_model=ConfusionMatrixResponse)
def get_confusion_matrix():
    """
    Devuelve la matriz de confusión y métricas del modelo actual
    usando un conjunto de datos de validación local.
    """

    # 🔹 Carga modelo
    model = xgb.Booster()
    model.load_model("artifacts/exoplanet_model.json")

    # 🔹 Carga dataset de prueba (ajústalo según tu entorno)
    df = pd.read_csv("data/test_dataset.csv", comment='#')

    if "koi_disposition" not in df.columns:
        raise ValueError("El dataset de prueba debe contener una columna 'koi_disposition'.")

    X_test = df.drop(columns=["koi_disposition", "kepid", "kepoi_name"], errors="ignore")
    y_true = df["koi_disposition"]

    # 🔹 Predicciones
    dtest = xgb.DMatrix(X_test)
    y_pred_proba = model.predict(dtest)

    # El modelo devuelve directamente las clases (0, 1, 2)
    y_pred = [LABELS[int(i)] for i in y_pred_proba]

    # 🔹 Matriz de confusión y reporte
    cm = confusion_matrix(y_true, y_pred, labels=LABELS)
    report = classification_report(y_true, y_pred, target_names=LABELS, output_dict=True)

    matrix_data = []
    for i, actual_label in enumerate(LABELS):
        row = {"actual": actual_label, "predicted": {}}
        for j, predicted_label in enumerate(LABELS):
            row["predicted"][predicted_label] = int(cm[i][j])
        matrix_data.append(row)

    return {
        "matrix": matrix_data,
        "labels": LABELS,
        "report": report,
    }
