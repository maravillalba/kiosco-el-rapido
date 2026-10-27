import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import orders, products

FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

app = FastAPI(title="Kiosco El Rápido API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN, "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(orders.router)


@app.get("/health")
def health():
    return {"status": "ok"}