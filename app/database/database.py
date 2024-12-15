# app/database/database.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config.config import Config

# Créer l'engine SQLAlchemy
engine = create_engine(Config.DATABASE_URL)

# Créer une session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
