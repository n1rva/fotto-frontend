"use client";

import CertificateContext from "@/context/CertificateContext";

import { useContext, useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import CertificateItem from "./certificateItem";

function CertificateManagement({ userID, access_token }) {
  const { getCertificatesByUserID, usersCertificates } =
    useContext(CertificateContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCertificates = async () => {
      getCertificatesByUserID(access_token.value, userID);

      setLoading(false);
    };
    getCertificates();
  }, [userID, access_token]);

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-iconBlue"></div>
        </div>
      ) : usersCertificates?.length ? (
        <Swiper
          slidesPerView={window.innerWidth < 768 ? 1 : 4}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {usersCertificates.map((certificate, index) => {
            const { id, unique_id, webinar, video } = certificate;

            return (
              <SwiperSlide key={id}>
                <CertificateItem
                  id={id}
                  unique_id={unique_id}
                  title={webinar?.title || video.title}
                  date={webinar?.date || video.date}
                  instructor={webinar?.instructor || video.instructor}
                  access_token={access_token}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <span>Kullanıcı herhangi bir sertifikaya sahip değil.</span>
      )}
    </div>
  );
}

export default CertificateManagement;
