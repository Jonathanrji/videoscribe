# main.py

from flask import Flask
from flask_cors import CORS
from app.routes import bp
from app.database import init_db
import os

app = Flask(__name__)
CORS(app)

# Crear carpeta de uploads si no existe
if not os.path.exists("uploads"):
    os.makedirs("uploads")

# Registrar las rutas del backend
app.register_blueprint(bp)

#🚀 Inicia la base de datos
if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000)