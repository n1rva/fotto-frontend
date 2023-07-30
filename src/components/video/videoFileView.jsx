"use client";
import { useEffect, useRef } from "react";

function VideoFileView({ url }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = url;

      videoRef.current.play();
    }
  }, [url]);

  return (
    <div className="flex justify-center items-center w-full">
      <video ref={videoRef} controls autoPlay={true} muted={true} />
    </div>
  );
}

export default VideoFileView;
