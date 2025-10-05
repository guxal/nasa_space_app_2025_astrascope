import xgboost as xgb
import pandas as pd

# Cargar el modelo entrenado
model = xgb.Booster()
model.load_model("artifacts/exoplanet_model.json")

LABEL_MAPPING = {
    0: "CANDIDATE",
    1: "CONFIRMED",
    2: "FALSE POSITIVE"
}

# Orden exacto con el que se entrenó el modelo
FEATURE_ORDER = [
    'koi_fpflag_nt', 'koi_fpflag_ss', 'koi_fpflag_co', 'koi_fpflag_ec',
    'koi_period', 'koi_duration', 'koi_depth', 'koi_impact',
    'koi_model_snr', 'koi_num_transits', 'koi_steff', 'koi_slogg',
    'koi_smet', 'koi_srad', 'koi_ror', 'koi_prad'
]

def predict_from_csv(file_path: str):
    # Leer el CSV original
    df = pd.read_csv(file_path, comment='#')

    # Guardar copia de columnas originales para devolver luego
    original_columns = df.columns.tolist()

    # 🧹 Eliminar columnas no numéricas o irrelevantes para el modelo
    cols_to_exclude = ["kepid", "kepoi_name"]
    clean_df = df.drop(columns=[c for c in cols_to_exclude if c in df.columns])

    # Reordenar columnas exactamente como en el entrenamiento
    clean_df = clean_df[FEATURE_ORDER]
    # ⚠️ Convertir todo lo restante a numérico (por seguridad)
    clean_df = clean_df.apply(pd.to_numeric, errors="coerce").fillna(0)

    # Crear matriz de predicción
    dmatrix = xgb.DMatrix(clean_df)

    # Predicciones
    preds = model.predict(dmatrix).astype(int)

    # Mapear etiquetas a texto
    df["prediction"] = [LABEL_MAPPING.get(int(p), "UNKNOWN") for p in preds]

    # Reordenar columnas para retornar: originales + predicción
    return df[original_columns + ["prediction"]]
