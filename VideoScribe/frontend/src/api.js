import axios from "axios";

//🔧 Configuración del cliente de API
const API = axios.create({
  baseURL: "/api",  // 🔁 ya que Nginx lo redirige
});
//📤 Función para subir un video
export const uploadVideo = (file) => {
  const formData = new FormData();
  formData.append("video", file);
  return API.post("/classify", formData);
};
//📥 Función para obtener el historial de videos
export const getVideos = () => {
  return API.get("/videos");
};
