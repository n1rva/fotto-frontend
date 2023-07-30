"use client";

import { useContext, useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import VideoContext from "@/context/VideoContext";
import VideoItem from "./videoItem";

function VideoManagement({ userID, access_token }) {
  const { getUserVideos } = useContext(VideoContext);

  const [userVideos, setUserVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const data = await getUserVideos(userID, access_token.value);
        setUserVideos(data.videos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user videos:", error);
        setLoading(false);
      }
    };
    getVideos();
  }, [userID, access_token]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-iconBlue"></div>
        </div>
      ) : userVideos.length ? (
        <Swiper
          slidesPerView={window.innerWidth < 768 ? 1 : 4}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {userVideos.map((video, index) => {
            const { id, title, instructor, thumbnail } = video;
            return (
              <SwiperSlide key={id}>
                <VideoItem
                  id={id}
                  userID={userID}
                  title={title}
                  instructor={instructor}
                  thumbnail={thumbnail}
                  access_token={access_token.value}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <span>Herhangi bir webinar kaydına sahip değil.</span>
      )}
    </div>
  );
}

export default VideoManagement;
