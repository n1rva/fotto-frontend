"use client";
import { useEffect, useRef } from "react";

function VideoFileView({ id }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/video/file/${id}`
      );
      const data = await response.blob();

      const videoURL = URL.createObjectURL(data);

      videoRef.current.src = videoURL;
    };
    fetchVideo();
  }, []);

  return (
    <div className="space-y-10 p-3 mx-auto container max-w-lg flex flex-col justify-center items-center mt-12 bg-[#F9FEFF]/75 rounded-lg md:max-w-2xl lg:max-w-5xl xl:max-w-7xl">
      <div className="flex justify-center items-center w-fit h-fit">
        <video ref={videoRef} controls muted={true} />
      </div>
    </div>
  );
}

export default VideoFileView;
