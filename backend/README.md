# Backend – Kiosco El Rápido

API hecha con FastAPI y SQLite.

## Requisitos
- Python 3.13 o superior (probado con 3.13.7 y 3.14.4)
- pip

## Instalación (Windows, PowerShell)
```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Variables de entorno
El backend lee dos variables del entorno. Las dos son opcionales: si no las definís, usa estos valores por defecto (los mismos de `.env.example`).

| Variable | Valor por defecto | Qué hace |
|---|---|---|
| `DATABASE_URL` | `sqlite:///./kiosco.db` | Base de datos que usa la API. Por defecto crea `kiosco.db` en `backend/`. |
| `FRONTEND_ORIGIN` | `http://localhost:5173` | Origen del frontend al que CORS le permite llamar a la API. También se permite `http://127.0.0.1:5173`. |

**Importante:** el backend todavía **no lee el archivo `.env`**; `.env.example` solo documenta las variables. Para cambiar un valor, definilo en la terminal antes de arrancar:

```powershell
$env:FRONTEND_ORIGIN = "http://localhost:5174"
uvicorn main:app --reload
```

## Cómo correrlo
Desde `backend/`, con el entorno virtual activado:
```powershell
uvicorn main:app --reload
```
- API: http://localhost:8000
- Documentación interactiva: http://localhost:8000/docs
- Prueba rápida: http://localhost:8000/health → `{"status":"ok"}`
- Por ahora la API solo expone `GET /health`; `/docs` muestra solamente ese endpoint.

## Tests
Desde `backend/`, con el entorno virtual activado:
```powershell
pytest -v
```
Los tests usan una base SQLite en memoria, así que no tocan `kiosco.db`.

## Estructura
- `main.py`: app FastAPI, CORS y `GET /health`.
- `database.py`: conexión a SQLite (`engine`, `SessionLocal`, `Base`) y `get_db`.
- `models.py`: modelos de la base (marcador; las tablas `products` y `orders` se definen en el Paso 4).
- `schemas.py`: esquemas Pydantic (marcador; se completa en el Paso 4).
- `routers/products.py` y `routers/orders.py`: routers con sus prefijos (`/api/products` y `/api/orders`), todavía sin endpoints; se agregan después del contrato (Paso 4).
- `tests/`: `conftest.py` (cliente de prueba y base en memoria) y `test_health.py`.
- `pytest.ini`: configuración de Pytest.
- `requirements.txt`: dependencias.
- `.env.example`: variables de entorno de ejemplo.

## Problemas comunes
- PowerShell no deja activar el entorno: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- `No module named 'main'`: estás parada fuera de `backend/`; hacé `cd backend`.
- El puerto 8000 está ocupado: `uvicorn main:app --reload --port 8001`.
- Error de CORS desde el frontend: Vite tiene que estar en `http://localhost:5173`; si usa otro puerto, definí `FRONTEND_ORIGIN` como se explica arriba.