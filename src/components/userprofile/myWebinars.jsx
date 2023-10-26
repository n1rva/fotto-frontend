"use client";

import ShortWebinarItem from "../webinar/shortWebinarItem";
import { useContext, useEffect, useState } from "react";
import WebinarContext from "@/context/WebinarContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

function MyWebinars({ access_token }) {
  const { getCurrentUserWebinars } = useContext(WebinarContext);

  const [userWebinars, setUserWebinars] = useState([]);
  const [userExpiredWebinars, setUserExpiredWebinars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrentUserWebinars(access_token);

      const { webinars } = data;
      if (data.success) {
        setUserWebinars(webinars.active);
        setUserExpiredWebinars(webinars.expired);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-3xl ">
      <div className="min-h-[20rem]">
        <h3 className="pb-12 font-bold text-lg lg:text-2xl">
          Tarihi yaklaşan webinarlarım
        </h3>
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-iconBlue"></div>
          </div>
        ) : userWebinars.length ? (
          <Swiper
            slidesPerView={window.innerWidth < 768 ? 1 : 3}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {userWebinars.map((webinar, index) => {
              console.log(webinar);
              const { date, title, instructor, image, wp_group_url } = webinar;

              return (
                <SwiperSlide key={index}>
                  <ShortWebinarItem
                    key={index}
                    title={title}
                    instructor={instructor}
                    backgroundImage={image}
                    date={date}
                    wpGroupUrl={wp_group_url}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="">
            <span className="font-medium text-fottoText">
              Tarihi yaklaşan herhangi bir webinara katılmadınız.
            </span>
          </div>
        )}
      </div>
      <div className="">
        <h3 className="pb-12 font-bold text-lg lg:text-2xl">
          Katıldığım webinarlar
        </h3>
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-iconBlue"></div>
          </div>
        ) : userExpiredWebinars.length ? (
          <Swiper
            slidesPerView={window.innerWidth < 768 ? 1 : 3}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {userExpiredWebinars.map((webinar, index) => {
              const { date, title, instructor, image } = webinar;

              return (
                <SwiperSlide key={index}>
                  <ShortWebinarItem
                    key={index}
                    title={title}
                    instructor={instructor}
                    backgroundImage={image}
                    date={date}
                    props="mx-auto"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <span>Herhangi bir webinara katılmadınız.</span>
        )}
      </div>
    </div>
  );
}

export default MyWebinars;
