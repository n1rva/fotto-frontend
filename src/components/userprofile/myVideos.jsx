"use client";

import { useContext, useEffect, useState } from "react";

import ShortVideoItem from "../video/shortVideoItem";
import VideoContext from "@/context/VideoContext";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

function MyVideos({ access_token }) {
  const { getCurrentUserVideos } = useContext(VideoContext);

  const [userVideos, setUserVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrentUserVideos(access_token);

      if (data.success) {
        setUserVideos(data.videos);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-3xl">
      <div className="min-h-[20rem]">
        <h3 className="pb-12 font-bold text-lg lg:text-2xl">
          Sahibi olduğum webinar kayıtları
        </h3>
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-iconBlue"></div>
          </div>
        ) : userVideos.length ? (
          <Swiper
            slidesPerView={window.innerWidth < 768 ? 1 : 3}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {userVideos.map((video, index) => {
              const { title, instructor, thumbnail, id } = video;

              return (
                <SwiperSlide key={index}>
                  <Link href={`/videos/stream/${id}`}>
                    <ShortVideoItem
                      key={index}
                      title={title}
                      instructor={instructor}
                      backgroundImage={thumbnail}
                    />
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="">
            <span className="font-medium text-fottoText">
              Herhangi bir webinar kaydına sahip değilsiniz.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyVideos;