# app/classifier.py

import cv2
from collections import Counter
from ultralytics import YOLO

#  carga el modelo YOLOv8 nano, que es una versión ligera.
model = YOLO("yolov8n.pt")
categoria_objetos = {
    "deportes": ["sports ball", "tennis racket", "skateboard", "bicycle", "baseball bat", "skis", "snowboard"],
    "naturaleza": ["dog", "cat", "bird", "horse", "sheep", "cow", "elephant", "zebra", "giraffe"],
    "educacion": ["laptop", "book", "tv", "cell phone"]
}

#Esta función recibe una ruta de video y devuelve una categoría dominante basada en objetos detectados en los frames.
def clasificar_video(path_video):
    #📹 Lectura del video
    cap = cv2.VideoCapture(path_video)
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_interval = int(fps)
    frame_count = 0
    categoria_votos = Counter()
    #🔁 Procesamiento del video frame a frame
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        #⏱️ Procesar solo un frame por segundo
        if frame_count % frame_interval == 0:
            #🔍 Detección con YOLO
            results = model.predict(frame, verbose=False)
            names = model.names
            objetos_detectados = [] #lista para guardar los objetos detectados en este frame.
            #📦 Extraer objetos del resultado
            for r in results:
                for cls_id in r.boxes.cls:
                    obj = names[int(cls_id)]
                    objetos_detectados.append(obj)
            #🗳️ Contar votos por categoría en ese frame
            votos_frame = Counter()
            for categoria, keywords in categoria_objetos.items():
                for obj in objetos_detectados:
                    if obj in keywords:
                        votos_frame[categoria] += 1
            #✅ Guardar el voto de la categoría dominante del frame
            if votos_frame:
                categoria_dominante = votos_frame.most_common(1)[0][0]
                categoria_votos[categoria_dominante] += 1

        frame_count += 1
    #🔚 Fin del video
    cap.release()
    #📈 Resultado final
    if categoria_votos:
        categoria_final = categoria_votos.most_common(1)[0][0]
        return {
            "categoria": categoria_final,
            "votos": dict(categoria_votos)
        }
    else:
        return {
            "categoria": "desconocido",
            "votos": {}
        }
