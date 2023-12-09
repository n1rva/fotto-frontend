"use client";
import CertificateContext from "@/context/CertificateContext";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import ShortCertificateItem from "../certificate/shortCertificateItem";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import moment from "moment";

import { LiaCertificateSolid } from "react-icons/lia";
import ProfileCertificatePlaceholder from "../ProfileCertificatePlaceholder";

function MyCertificates({ access_token }) {
  const {
    getCurrentUsersWebinarCertificates,
    getCurrentUsersVideoCertificates,
  } = useContext(CertificateContext);

  const [showVideoCertificates, setShowVideoCertificates] = useState(false);

  const [webinarCertificates, setWebinarCertificates] = useState([]);
  const [videoCertificates, setVideoCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrentUsersWebinarCertificates(access_token);

      if (data.success) {
        setWebinarCertificates(data.certificates);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (showVideoCertificates && !videoCertificates.length) {
      setIsLoading(true);
      const fetchData = async () => {
        const data = await getCurrentUsersVideoCertificates(access_token);

        if (data.success) {
          setVideoCertificates(data.certificates);
        }
        setIsLoading(false);
      };

      fetchData();
    }
  }, [showVideoCertificates]);

  useLayoutEffect(() => {
    let marker = document.querySelector(".tab");
    let items = document.querySelectorAll(".item");

    const indicator = (e) => {
      marker.style.left = e.offsetLeft + e.offsetWidth * 0.15 + "px";
      marker.style.width = e.offsetWidth * 0.7 + "px";
    };

    indicator(items[0]);

    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        indicator(e.target);
      });
    });
  }, []);

  return (
    <section className="max-w-4xl">
      <div className="flex justify-around font-bold relative">
        <div className="tab"></div>
        <button
          onClick={() => setShowVideoCertificates(false)}
          className={`  w-full hover:opacity-80 `}
        >
          <span className=" p-4 pt-0 item">Webinar sertifikalarım</span>
        </button>
        <button
          onClick={() => setShowVideoCertificates(true)}
          className={` w-full hover:opacity-80 `}
        >
          <span className=" p-4 pt-0 item">Webinar arşivi sertifikalarım</span>
        </button>
      </div>
      <div className="min-h-[20rem] pr-1 flex flex-wrap my-8 px-20 gap-x-12 gap-y-4 max-h-[36rem] overflow-y-auto sm-scrollbar">
        {showVideoCertificates ? (
          videoCertificates.length ? (
            videoCertificates.map((e) => {
              const { unique_id, video } = e;

              return (
                <Link
                  key={unique_id}
                  href={`/certificates/${unique_id}`}
                  className="rounded-md flex min-h-[9rem] flex-col h-fit items-center text-center w-72 border px-4 py-6 text-xs font-bold space-y-2 select-none product"
                >
                  <LiaCertificateSolid className="h-8 w-8 fill-fottoOrange" />
                  <h1 className="px-4">{video.title}</h1>
                </Link>
              );
            })
          ) : isLoading ? (
            <div className="flex flex-wrap gap-x-12 gap-y-4 ">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <ProfileCertificatePlaceholder key={i} />
                ))}
            </div>
          ) : (
            <div className="text-center">
              <span className="font-medium text-fottoText">
                Herhangi bir sertifikaya sahip değilsiniz.
              </span>
            </div>
          )
        ) : webinarCertificates.length ? (
          webinarCertificates.map((e) => {
            const { webinar, unique_id } = e;
            return (
              <Link
                key={unique_id}
                href={`/certificates/${unique_id}`}
                className="rounded-md flex flex-col min-h-[9rem] h-fit items-center text-center w-72 border px-4 py-6 text-xs font-bold space-y-2 select-none product"
              >
                <LiaCertificateSolid className="h-8 w-8 fill-fottoOrange" />
                <h1 className="px-4">{webinar.title}</h1>
              </Link>
            );
          })
        ) : isLoading ? (
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <ProfileCertificatePlaceholder key={i} />
              ))}
          </div>
        ) : (
          <div className="text-center">
            <span className="font-medium text-fottoText">
              Herhangi bir sertifikaya sahip değilsiniz.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

export default MyCertificates;

{
  /* <div className="min-h-[20rem]">
        <h3 className="pb-12 font-bold text-lg lg:text-2xl">
          Webinar sertifikalarım
        </h3>
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-iconBlue"></div>
            </div>
          ) : webinarCertificates.length ? (
            <Swiper
              slidesPerView={window.innerWidth < 768 ? 1 : 3}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {webinarCertificates.map((cert) => {
                const { id, webinar, unique_id } = cert;

                if (!webinar) return;

                const { title, date, instructor } = webinar;

                return (
                  <SwiperSlide key={id}>
                    <Link href={`/certificates/${unique_id}`}>
                      <ShortCertificateItem
                        date={moment(date).format("DD/MM/YYYY")}
                        instructor={instructor}
                        title={title}
                        props={"mx-auto"}
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
      </div>
      <h3 className="pb-12 font-bold text-lg lg:text-2xl">
        Webinar arşivi sertifikalarım
      </h3>
      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-iconBlue"></div>
          </div>
        ) : videoCertificates.length ? (
          <Swiper
            slidesPerView={window.innerWidth < 768 ? 1 : 3}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {videoCertificates.map((cert) => {
              const { id, video, unique_id } = cert;

              if (!video) return;

              const { title, date, instructor } = video;

              return (
                <SwiperSlide key={id}>
                  <Link href={`/certificates/${unique_id}`}>
                    <ShortCertificateItem
                      date={moment(date).format("DD/MM/YYYY")}
                      instructor={instructor}
                      title={title}
                      props={"mx-auto"}
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
      </div> */
}
