"use client";
import VideoContext from "@/context/VideoContext";
import React, { useContext, useEffect, useState } from "react";
import SingleVideoItem from "./singleVideoItem";

function SingleVideo({ videoID }) {
  const { getVideo } = useContext(VideoContext);

  const [video, setVideo] = useState(null);

  useEffect(() => {
    const getSingleVideo = async () => {
      const data = await getVideo(videoID);

      setVideo(data.video);
    };
    getSingleVideo();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center">
      {video && (
        <SingleVideoItem
          instructor={video.instructor}
          instructorImage={video.instructor_image}
          price={video.price}
          description={video.description}
          title={video.title}
          thumbnail={video.thumbnail}
          videoID={videoID}
        />
      )}
    </div>
  );
}

export default SingleVideo;
