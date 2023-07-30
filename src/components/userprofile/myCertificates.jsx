"use client";
import CertificateContext from "@/context/CertificateContext";
import { useContext, useEffect, useState } from "react";
import ShortCertificateItem from "../certificate/shortCertificateItem";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import moment from "moment";

function MyCertificates({ access_token }) {
  const { getCurrentUsersCertificates, certificateLoading, certificateError } =
    useContext(CertificateContext);

  const [userCertificates, setUserCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const certificatesData = await getCurrentUsersCertificates(access_token);

      if (certificatesData.success) {
        setUserCertificates(certificatesData.certificates);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-3xl min-h-[20rem]">
      <h3 className="pb-12 font-bold text-lg lg:text-2xl">Sertifikalarım</h3>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-iconBlue"></div>
        </div>
      ) : userCertificates.length ? (
        <Swiper
          slidesPerView={window.innerWidth < 768 ? 1 : 3}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {userCertificates.map((cert) => {
            const { id, webinar, unique_id } = cert;

            const { title, date, instructor } = webinar;

            return (
              <SwiperSlide key={id}>
                <Link href={`/certificates/${unique_id}`}>
                  <ShortCertificateItem
                    date={moment(date).format("DD/MM/YYYY")}
                    instructor={instructor}
                    title={title}
                  />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className="text-center">
          <span className="font-medium text-fottoText">
            Herhangi bir sertifikaya sahip değilsiniz.
          </span>
        </div>
      )}
    </div>
  );
}

export default MyCertificates;
