// src/components/UploadForm.js
import React, { useState } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

//📦 Estados del componente
const UploadForm = ({ onUpload }) => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [category, setCategory] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  //📨 handleSubmit – Función para enviar el video
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video) return;

    const formData = new FormData();
    formData.append("video", video);

    setLoading(true);
    setProgress(0);
    setCategory(null);
    setShowConfetti(false);

    try {
      //📤 Petición POST a Flask
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/classify`,
        formData,
        {
          onUploadProgress: (event) => {
            const percent = Math.round((event.loaded * 100) / event.total);
            setProgress(percent);
          },
        }
      );
      //✅ Éxito en la petición
      setCategory(response.data.categoria);
      onUpload();
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
    } catch (err) {
      alert("Error analizando el video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded shadow mb-6 space-y-4 border border-gray-600 w-full max-w-2xl mx-auto">
      {showConfetti && <Confetti width={width} height={height} />}

      <h2 className="text-xl font-semibold mb-2 text-white text-center">Sube tu video</h2>

      {/* Botón de selección */}
      <div className="flex items-center space-x-4">
        <label className="cursor-pointer bg-gray-700 px-4 py-2 rounded border border-gray-500 text-white hover:bg-gray-600">
          Seleccionar archivo
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="hidden"
          />
        </label>
        <span className="text-sm text-gray-300">
          {video ? video.name : "Ningún archivo seleccionado"}
        </span>
      </div>

      <button
        onClick={handleSubmit}
        className={`bg-indigo-600 text-white px-6 py-2 rounded font-medium hover:bg-indigo-700 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        Analizar video
      </button>

      {/* Barra de progreso */}
      {loading && (
        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
          <div
            className="bg-indigo-500 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Resultado */}
      {category && (
        <div className="mt-4 p-4 border border-indigo-400 rounded bg-indigo-900 text-center">
          <p className="text-lg font-semibold text-white tracking-wide">
            🎯 Categoría detectada:{" "}
            <span className="uppercase text-indigo-300">{category}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
