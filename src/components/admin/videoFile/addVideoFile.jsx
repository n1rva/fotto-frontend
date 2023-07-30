"use client";

import VideoContext from "@/context/VideoContext";
import { useContext, useEffect, useState } from "react";

function AddVideoFile({ access_token }) {
  const { getAllVideos, createVideoFile, uploadProgress } =
    useContext(VideoContext);

  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(undefined);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];

    const data = await createVideoFile(file, selectedVideo, access_token);
  };

  //fix

  const handleFileUpload = async (file) => {
    const data = await createVideoFile(file, selectedVideo, access_token);

    console.log(data);
    // Yükleme tamamlandığında veya hata olduğunda yapılacak işlemler...
  };

  const handleSelect = (e) => {
    setSelectedVideo(e.target.value);
  };

  useEffect(() => {
    const getVideos = async () => {
      const data = await getAllVideos();

      setVideos(data.videos);
    };
    getVideos();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <label
          htmlFor="fileInput"
          className="px-4 py-2 border border-gray-300 bg-white text-gray-600 rounded-md cursor-pointer hover:bg-gray-100"
        >
          Dosya Seçin
        </label>
        <input
          id="fileInput"
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileSelect}
        />
        {uploadProgress > 0 && (
          <progress
            value={uploadProgress}
            max="100"
            className="w-full mt-2 rounded-md"
          />
        )}
      </div>
      <select
        value={selectedVideo}
        onChange={handleSelect}
        className="px-4 py-2 border border-gray-300 bg-white text-gray-600 rounded-md cursor-pointer hover:bg-gray-100"
      >
        <option value="">Video Seçin</option>
        {videos.map((video) => (
          <option key={video.id} value={video.id}>
            {video.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AddVideoFile;
