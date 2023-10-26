"use client";
import VideoContext from "@/context/VideoContext";
import { useContext, useEffect, useState } from "react";
import VideoItem from "./videoItem";
import Placeholder from "../placeholder";

function VideoList() {
  const { getAllVideos, allVideos, videoLoading } = useContext(VideoContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      getAllVideos();

      setIsLoading(false);
    };

    fetchVideos();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-12 mt-12 items-center justify-center max-w-sm md:max-w-none lg:justify-start">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <Placeholder key={i} />
          ))}
      </div>
    );
  }

  if (allVideos?.length === 0 && !videoLoading) {
    return <p>Henüz webinar kaydı bulunmamaktadır</p>;
  }

  return (
    <section className="flex flex-wrap gap-12 mt-12 items-center justify-center max-w-sm md:max-w-none lg:justify-start">
      {allVideos?.map((video) => {
        const { id, date, instructor, thumbnail, title, slug } = video;
        return (
          <VideoItem
            key={id}
            date={date}
            instructor={instructor}
            thumbnail={thumbnail}
            title={title}
            slug={slug}
          />
        );
      })}
    </section>
  );
}

export default VideoList;
