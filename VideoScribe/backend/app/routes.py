# app/routes.py

import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename

from app.classifier import clasificar_video
from app.database import SessionLocal
from app.models import Video
from flask import send_from_directory

#Crea un Blueprint llamado "api" para organizar las rutas.
bp = Blueprint("api", __name__)

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov'}

# Verifica si el archivo tiene una extensión válida
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Endpoint para subir y clasificar un video
@bp.route("/api/classify", methods=["POST"])
def classify():
    if 'video' not in request.files:
        return jsonify({"error": "No se envió archivo"}), 400

    file = request.files['video']
    if file.filename == '':
        return jsonify({"error": "Nombre de archivo vacío"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Formato no permitido"}), 400
    #Guardar archivo de forma segura
    filename = secure_filename(file.filename)
    save_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(save_path)

    try:
        # Ejecuta la clasificación con YOLOv8
        resultado = clasificar_video(save_path)

        # Guarda en la base de datos
        session = SessionLocal()
        video = Video(
            filename=filename,
            categoria=resultado["categoria"],
            votos=resultado["votos"]
        )
        session.add(video)
        session.commit()
        session.close()

    except Exception as e:
        return jsonify({"error": f"Error procesando el video: {str(e)}"}), 500

    return jsonify(resultado)

# Endpoint para consultar el historial de videos procesados
@bp.route("/api/videos", methods=["GET"])
def get_videos():
    session = SessionLocal()
    videos = session.query(Video).order_by(Video.fecha_subida.desc()).all()
    session.close()

    data = []
    for v in videos:
        data.append({
            "id": v.id,
            "filename": v.filename,
            "categoria": v.categoria,
            "votos": v.votos,
            "fecha_subida": v.fecha_subida.isoformat()
        })

    return jsonify(data)

# Servir archivos de video (MP4, AVI, etc.) para el frontend
@bp.route("/uploads/<path:filename>")
def get_upload(filename):
    return send_from_directory("uploads", filename)
