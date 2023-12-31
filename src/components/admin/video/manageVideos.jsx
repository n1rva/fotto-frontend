"use client";

import { useContext, useEffect, useState } from "react";
import ManageSingleVideo from "./manageSingleVideo";
import VideoContext from "@/context/VideoContext";

function ManageVideos({ access_token }) {
  const { getAllVideos, allVideos } = useContext(VideoContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVideos = async () => {
      getAllVideos();

      setLoading(false);
    };

    getVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-iconBlue"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex">
      {allVideos.length > 0 ? (
        <div className="flex flex-wrap gap-12 mt-12 items-center justify-center max-w-sm md:max-w-none lg:justify-start">
          {allVideos.map((video) => {
            const { id, thumbnail, title, instructor } = video;

            return (
              <ManageSingleVideo
                key={id}
                id={id}
                thumbnail={thumbnail}
                title={title}
                instructor={instructor}
                access_token={access_token}
              />
            );
          })}
        </div>
      ) : (
        <div>
          <p>Henüz hiçbir video yok.</p>
        </div>
      )}
    </div>
  );
}

export default ManageVideos;
