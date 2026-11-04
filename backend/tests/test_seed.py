from pathlib import Path

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

import seed
from models import Product

# frontend/public: las rutas de `image` las sirve el frontend desde acá.
FRONTEND_PUBLIC = Path(__file__).resolve().parents[2] / "frontend" / "public"


@pytest.fixture()
def seed_en_memoria(monkeypatch):
    # seed() usa el engine y la sesión de database.py (kiosco.db): se reemplazan
    # por una base en memoria para no tocar la base real.
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    Session = sessionmaker(bind=engine, autoflush=False, autocommit=False)
    monkeypatch.setattr(seed, "engine", engine)
    monkeypatch.setattr(seed, "SessionLocal", Session)
    yield Session
    engine.dispose()


def test_seed_deja_con_imagen_a_los_10_productos(seed_en_memoria):
    seed.seed()

    with seed_en_memoria() as db:
        productos = db.query(Product).order_by(Product.id).all()

    assert len(productos) == 10
    for producto in productos:
        assert producto.image, f"{producto.name} no tiene imagen"
        assert producto.image.startswith("/productos/")
        assert producto.image.endswith(".webp")
        archivo = FRONTEND_PUBLIC / producto.image.lstrip("/")
        assert archivo.is_file(), f"No existe {archivo}"
