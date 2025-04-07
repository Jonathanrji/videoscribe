# app/models.py

from sqlalchemy import Column, Integer, String, DateTime, Float, JSON
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

#🧱 Clase Base de SQLAlchemy
Base = declarative_base()
#🎞️ Modelo Video – Representación de la tabla videos
class Video(Base):
    __tablename__ = 'videos'
    #🔑 Columnas de la tabla
    id = Column(Integer, primary_key=True)
    filename = Column(String)
    categoria = Column(String)
    votos = Column(JSON)
    fecha_subida = Column(DateTime, default=datetime.utcnow)
