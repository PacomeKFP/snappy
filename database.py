from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config.config import Config

# Création de l'engine SQLAlchemy
engine = create_engine(Config.DATABASE_URL)

# Création d'une session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
