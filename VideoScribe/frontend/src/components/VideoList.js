import React, { useEffect, useState } from "react";
import { getVideos } from "../api";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState("todos");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    getVideos().then((res) => setVideos(res.data));
  }, []);

  const filteredVideos = videos
    .filter((v) => (filter === "todos" ? true : v.categoria === filter))
    .sort((a, b) => {
      const dateA = new Date(a.fecha_subida);
      const dateB = new Date(b.fecha_subida);
      return order === "desc" ? dateB - dateA : dateA - dateB;
    });


  const getColorClasses = (categoria) => {
    switch (categoria) {
      case "naturaleza":
        return {
          bg: "bg-green-800",
          border: "border-green-600",
          text: "text-green-300",
        };
      case "educacion":
        return {
          bg: "bg-blue-800",
          border: "border-blue-600",
          text: "text-blue-300",
        };
      case "deportes":
        return {
          bg: "bg-red-800",
          border: "border-red-600",
          text: "text-red-300",
        };
      default:
        return {
          bg: "bg-gray-800",
          border: "border-gray-600",
          text: "text-white",
        };
    }
  };

  return (
    <div className="mt-10 w-full max-w-5xl mx-auto">
      {/* Filtro */}
      <div className="mb-6 text-center">
        <label className="mr-2 font-semibold text-white">Filtrar por categoría:</label>
        <select
          className="p-2 rounded bg-gray-800 border border-gray-600 text-white"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="todos">Todas</option>
          <option value="deportes">Deportes</option>
          <option value="naturaleza">Naturaleza</option>
          <option value="educacion">Educación</option>
        </select>
        <label className="ml-6 mr-2 font-semibold text-white">Ordenar por:</label>
        <select
          className="p-2 rounded bg-gray-800 border border-gray-600 text-white"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="desc">Más recientes</option>
          <option value="asc">Más antiguos</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => {
          const color = getColorClasses(video.categoria);
          return (
            <div
              key={video.id}
              className={`rounded overflow-hidden shadow-md border flex flex-col h-full ${color.bg} ${color.border}`}
            >
              <video
                controls
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${video.filename}`}
                className="w-full h-auto"
              ></video>

              <div className="p-4 space-y-2">
                <p className="text-sm text-gray-300">Nombre: {video.filename}</p>
                <p className="font-semibold text-white">
                  Categoría: <span className={`uppercase font-bold ${color.text}`}>{video.categoria}</span>
                </p>
                <p className="text-sm text-gray-400">
                  Fecha: {new Date(video.fecha_subida).toLocaleString()}
                </p>
                <button
                  onClick={() => {
                    const url = `${window.location.origin}/ver?video=${encodeURIComponent(video.filename)}`;

                    if (navigator.clipboard && navigator.clipboard.writeText) {
                      navigator.clipboard
                        .writeText(url)
                        .then(() => alert("📋 Enlace copiado al portapapeles"))
                        .catch((err) => {
                          console.error("Error al copiar el enlace:", err);
                          alert("No se pudo copiar el enlace automáticamente.");
                        });
                    } else {
                      // Fallback si clipboard no está disponible
                      prompt("Copia este enlace manualmente:", url);
                    }
                  }}
                  className="mt-3 px-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition text-sm"
                >
                  🔗 Compartir video
                </button>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoList;
