"use client";

import VideoContext from "@/context/VideoContext";
import { toastProps } from "@/utils/toastProps";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

function AddVideoFile({ access_token }) {
  const { getAllVideos, createVideoFile, uploadProgress } =
    useContext(VideoContext);

  const [file, setFile] = useState(undefined);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(undefined);

  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const data = await createVideoFile(file, selectedVideo, access_token);

    if (data.success) {
      toast("Video başarıyla yüklendi", {
        isLoading: false,
        type: "success",
        ...toastProps,
      });
    } else {
      toast.error(data.message);
    }
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
      <div>
        <button
          type="button"
          onClick={handleUpload}
          className="rounded-lg px-4 py-2 bg-fottoOrange text-white hover:bg-opacity-70"
        >
          Yükle
        </button>
      </div>
    </div>
  );
}

export default AddVideoFile;
