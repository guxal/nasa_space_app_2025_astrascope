# 🌌 AstraScope

**AI-powered Exoplanet Classifier — NASA Space Apps Challenge 2025**

AstraScope is an open-source project that uses **machine learning** to automatically classify potential **exoplanets** using NASA’s public datasets from the **Kepler**, **K2**, and **TESS** missions.
It enables scientists, students, and enthusiasts to explore celestial data and identify new worlds through an intuitive web interface.

---

## 🚀 Overview

Our platform provides:

* 🧠 **AI Model** — Trained with real NASA exoplanetary data using **XGBoost**
* 📂 **File Upload Interface** — Upload custom CSV datasets for instant predictions
* 📊 **Dynamic Dashboards** — Visualize results, metrics, and feature importance
* 🛰️ **Model Insights** — Understand how each feature influences classifications
* 💡 **Scalability Ready** — Separate backend and frontend for modular deployment

---

## 🧱 Project Structure

```
AstraScope/
│
├── backend/              # FastAPI backend with ML inference and metrics
│   ├── model/            # XGBoost model and prediction logic
│   └── data/             # NASA datasets and test data
│
├── fe-astra-scope/       # React + TypeScript frontend for visualization
│   ├── components/       # UI components and charts
│   └── pages/            # App views (Classifier, Metrics, etc.)
│
└── README.md             # Project overview
```

---

## ⚙️ Tech Stack

**Backend**

* FastAPI + Uvicorn
* XGBoost / Pandas / Scikit-learn
* Python 3.10+

**Frontend**

* React + TypeScript
* TailwindCSS + Shadcn UI
* Recharts for visualizations

---

## 💻 Local Development

### Run Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Run Frontend

```bash
cd fe-astra-scope
pnpm install
pnpm dev
```

Frontend: [http://localhost:8081](http://localhost:8081)
Backend: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 🌍 Data Sources

* [NASA Exoplanet Archive — Kepler Objects of Interest (KOI)](https://exoplanetarchive.ipac.caltech.edu)
* [K2 Planets and Candidates](https://exoplanetarchive.ipac.caltech.edu)
* [TESS Objects of Interest (TOI)](https://exoplanetarchive.ipac.caltech.edu)

---

## ✨ Vision

AstraScope aims to make **AI-driven space exploration accessible**, bridging the gap between complex NASA data and curious minds worldwide.
By combining open data and modern machine learning, we empower discovery — one planet at a time.
