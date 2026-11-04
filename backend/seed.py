from database import Base, SessionLocal, engine
import models  # noqa: F401  (registra las tablas en Base.metadata)
from models import Product

PRODUCTS = [
    {"name": "Coca-Cola 500ml", "category": "bebidas", "price": 1200, "stock": 25, "description": "Gaseosa clásica", "image": "/productos/coca-cola.webp"},
    {"name": "Agua mineral 500ml", "category": "bebidas", "price": 800, "stock": 40, "description": "Agua sin gas", "image": "/productos/agua-mineral.webp"},
    {"name": "Papas Lays Clásicas", "category": "golosinas_snacks", "price": 1500, "stock": 30, "description": "Papas fritas clásicas", "image": "/productos/papas-lays.webp"},
    {"name": "Alfajor Jorgito", "category": "golosinas_snacks", "price": 1100, "stock": 50, "description": "Alfajor de chocolate", "image": "/productos/alfajor-jorgito.webp"},
    {"name": "Leche entera 1L", "category": "lacteos", "price": 1300, "stock": 20, "description": "Leche entera larga vida", "image": "/productos/leche-entera.webp"},
    {"name": "Yogur firme frutilla", "category": "lacteos", "price": 900, "stock": 18, "description": "Yogur firme sabor frutilla", "image": "/productos/yogur-frutilla.webp"},
    {"name": "Fideos tirabuzón 500g", "category": "almacen", "price": 1400, "stock": 30, "description": "Fideos secos", "image": "/productos/fideos-tirabuzon.webp"},
    {"name": "Galletitas de agua", "category": "almacen", "price": 1000, "stock": 35, "description": "Paquete de galletitas de agua", "image": "/productos/galletitas-de-agua.webp"},
    {"name": "Lavandina 1L", "category": "limpieza", "price": 1600, "stock": 15, "description": "Lavandina para el hogar", "image": "/productos/lavandina.webp"},
    {"name": "Cigarrillos", "category": "cigarrillos", "price": 2500, "stock": 20, "description": "Atado de cigarrillos", "image": "/productos/cigarrillos.webp"},
]


def seed() -> None:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        if db.query(Product).count() > 0:
            print("La tabla products ya tiene datos: no se carga nada.")
            return
        db.add_all([Product(**p) for p in PRODUCTS])
        db.commit()
        print(f"Se cargaron {len(PRODUCTS)} productos.")


if __name__ == "__main__":
    seed()