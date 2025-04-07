// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadForm from "./components/UploadForm";
import VideoList from "./components/VideoList";
import VideoViewer from "./components/VideoViewer";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleUpload = () => setRefresh(!refresh);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white p-6 md:p-12 font-sans">
        <h1 className="text-3xl font-bold mb-4 text-center text-indigo-300">🎥 VideoScribe</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <UploadForm onUpload={handleUpload} />
                <VideoList key={refresh} />
              </>
            }
          />
          <Route path="/ver" element={<VideoViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

