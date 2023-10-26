"use client";
import { useEffect, useRef } from "react";

import VideoJS from "../videoJS";

function VideoFileView({ slug }) {
  const videoRef = useRef(null);

  const playerRef = useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: false,
    fluid: true,
    download: false,

    sources: [
      {
        src: `${process.env.API_URL}/api/v1/video/file/${slug}`,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  // useEffect(() => {
  //   const fetchVideo = async () => {
  //     const response = await fetch(
  //       `${process.env.API_URL}/api/v1/video/file/${id}`
  //     );
  //     console.log(response);
  //     const data = await response.blob();

  //     const videoURL = URL.createObjectURL(data);

  //     videoRef.current.src = videoURL;
  //   };
  //   fetchVideo();
  // }, []);

  return (
    <div className="p-3 mx-auto h-full max-w-lg mt-12 bg-[#F9FEFF]/75 rounded-lg md:max-w-2xl lg:max-w-5xl xl:max-w-7xl">
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </div>
  );
}

export default VideoFileView;
