import React from "react";
import { useSearchParams } from "react-router-dom";

const VideoViewer = () => {
  const [params] = useSearchParams();
  const filename = params.get("video");

  if (!filename) {
    return <p className="text-center text-red-400">⚠️ Video no especificado</p>;
  }

  return (
    <div className="flex flex-col items-center space-y-6 mt-8">
      <h2 className="text-xl font-bold text-white">🎬 Reproducción de video</h2>
      <video
        controls
        src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${filename}`}
        className="w-full max-w-3xl rounded shadow"
      ></video>
      <p className="text-gray-400 text-sm">Nombre: {filename}</p>
    </div>
  );
};

export default VideoViewer;
