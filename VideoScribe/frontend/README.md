# 🎥 VideoScribe – Organizador de Videos Inteligente con IA

VideoScribe es una aplicación web que permite **subir videos** y clasificarlos automáticamente en categorías como **Naturaleza**, **Educación** o **Deportes**, utilizando inteligencia artificial (YOLOv8). Todo esto en una plataforma moderna, rápida y de tema oscuro. 🌙✨

---

## 🚀 Características principales

✅ Subida de videos en formato `.mp4`  
✅ Clasificación automática por IA  
✅ Interfaz limpia, moderna y de tema oscuro  
✅ Cards visuales con videos reproducibles  
✅ Filtros por categoría y orden (más recientes / más antiguos)  
✅ Opción de compartir videos con enlaces públicos 🔗  
✅ Despliegue completo con Docker + Flask + React + Nginx  

---

## 🧠 ¿Cómo funciona?

📹 Se sube un video  
🤖 Un modelo YOLOv8 detecta los objetos  
🧠 Basado en esos objetos, se clasifica como:

| Categoría    | Objetos relacionados                           |
|--------------|-------------------------------------------------|
| 🏀 Deportes   | pelotas, raquetas, bicicletas, etc.             |
| 🌿 Naturaleza | animales, árboles, paisajes                    |
| 📘 Educación  | libros, pizarras, laptops, personas en aula    |

---

## 🖥️ Tecnologías utilizadas

- ⚙️ **Flask** – Backend Python
- 🧠 **YOLOv8** – Detección de objetos con IA
- 🌐 **React + TailwindCSS** – Frontend moderno
- 🐳 **Docker & Docker Compose** – Contenedores
- 🌍 **Nginx** – Servidor de producción como reverse proxy
- 🌐 **Microsoft Azure** – Máquina Virtual para despliegue

---

## 📦 Estructura del proyecto

VideoScribe/
├── backend/
│   ├── app/
│   ├── uploads/
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── tailwind.config.js
│   └── Dockerfile
├── nginx/
│   └── default.conf
└── docker-compose.yml


---

## 🛠️ Cómo ejecutar el proyecto

### 1. Clona el repositorio

git clone https://github.com/jonathanrji/videoscribe.git
cd videoscribe

### 2. Ejecuta con Docker
docker-compose up --build

### 3. Abre en el navegador
http://localhost

## 📤 Compartir videos 📹
Cada video procesado genera un enlace compartible, por ejemplo:

http://localhost/ver?video=mi_video.mp4

uedes copiarlo desde el botón 🔗 Compartir video en cada tarjeta.

## 🧪 Demo



## 👥 Equipo de desarrollo

👨‍💻 Desarrollador Fullstack  - Encargado del backend Flask, frontend React y despliegue (2)
🤖 Ingeniero IA - Implementación del modelo YOLOv8 para clasificación (1)


📜 Licencia

MIT © 2025 – Proyecto para la asignatura Desarrollo de proyectos con IA 🎓
Universidad Autónoma de Occidente – Cali, Colombia