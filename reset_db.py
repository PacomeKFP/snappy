from app.models.message_model import Base
from app.database.database import engine

# Supprimer toutes les tables
Base.metadata.drop_all(bind=engine)

# Recréer toutes les tables
Base.metadata.create_all(bind=engine)

print("Base de données réinitialisée avec succès!")
