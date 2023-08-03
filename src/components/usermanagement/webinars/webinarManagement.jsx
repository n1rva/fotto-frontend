"use client";

import WebinarContext from "@/context/WebinarContext";
import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import WebinarItem from "./webinarItem";

function WebinarManagement({ userID, access_token }) {
  const { getUserWebinars, userWebinars } = useContext(WebinarContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWebinars = async () => {
      const response = await getUserWebinars(userID, access_token.value);

      if (response) setLoading(false);
    };
    getWebinars();
  }, [userID, access_token]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-iconBlue"></div>
        </div>
      ) : userWebinars.length ? (
        <Swiper
          slidesPerView={window.innerWidth < 768 ? 1 : 4}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {userWebinars.map((webinar, index) => {
            const { id, date, title, instructor, image } = webinar;
            return (
              <SwiperSlide key={id}>
                <WebinarItem
                  id={id}
                  userID={userID}
                  date={date}
                  title={title}
                  instructor={instructor}
                  image={image}
                  access_token={access_token.value}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <span>Herhangi bir webinara katılmamış.</span>
      )}
    </div>
  );
}
export default WebinarManagement;
