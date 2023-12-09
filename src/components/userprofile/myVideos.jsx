"use client";

import { useContext, useEffect, useState } from "react";

import ShortVideoItem from "../video/shortVideoItem";
import VideoContext from "@/context/VideoContext";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import ProfileVideoPlaceholder from "../profileVideoPlaceholder";

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
    <section className="max-w-4xl">
      <div className="flex justify-around font-bold relative ">
        <h1 className="">Webinar arşivim</h1>
        <div className="tab w-24 "></div>
      </div>
      <div className="flex flex-col ">
        {isLoading && (
          <div className="my-1">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <ProfileVideoPlaceholder key={i} />
              ))}
          </div>
        )}
        {userVideos.map((video, index) => {
          const { title, thumbnail, file, slug } = video;

          if (!file) {
            return (
              <div
                key={index}
                className="flex justify-between items-center my-8 px-3 border rounded-lg h-40 product relative"
              >
                <div className="absolute left-1/2 -translate-x-1/2 top-0 flex justify-center bg-white/30 backdrop-blur-md p-2 shadow-lg rounded-lg cursor-default">
                  <span className="text-sm text-fottoOrange text-center font-bold">
                    {"Video henüz yüklenmedi."}
                  </span>
                </div>
                <Image
                  src={`${process.env.API_URL}/${thumbnail}`}
                  width={100}
                  height={100}
                  sizes="10vw"
                  className="p-3 rounded-md w-52 h-full"
                ></Image>
                <h1 className="text-xs w-80 font-bold">{title}</h1>

                <div
                  href={"#"}
                  className="h-full w-20 flex justify-center items-center"
                >
                  <svg
                    width="40"
                    height="44"
                    viewBox="0 0 40 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M35.8614 14.6639L12.4391 1.12044C11.1717 0.382534 9.73313 -0.00402146 8.2696 3.15464e-05C6.80606 0.00408455 5.36965 0.398601 4.10628 1.14351C2.84291 1.88842 1.79757 2.95719 1.07646 4.24125C0.355337 5.52531 -0.0158767 6.97893 0.000520604 8.45445V35.6392C0.000520604 37.8566 0.874178 39.9832 2.4293 41.5512C3.98442 43.1191 6.09362 44 8.29289 44C9.74876 43.9975 11.1785 43.6097 12.4391 42.8755L35.8614 29.332C37.1199 28.5976 38.1648 27.5424 38.8912 26.2723C39.6176 25.0022 40 23.5619 40 22.0957C40 20.6296 39.6176 19.1893 38.8912 17.9192C38.1648 16.6491 37.1199 15.5939 35.8614 14.8595V14.6639ZM33.4367 24.9071L10.0144 38.6462C9.48943 38.9461 8.89631 39.1038 8.29289 39.1038C7.68947 39.1038 7.09635 38.9461 6.57138 38.6462C6.04788 38.3414 5.61319 37.9031 5.31099 37.3753C5.0088 36.8474 4.84976 36.2487 4.84986 35.6392V8.35667C4.84976 7.7472 5.0088 7.14845 5.31099 6.62061C5.61319 6.09277 6.04788 5.65445 6.57138 5.34972C7.09851 5.0543 7.68987 4.89474 8.29289 4.88523C8.8955 4.8977 9.48616 5.05707 10.0144 5.34972L33.4367 18.991C33.9604 19.2956 34.3953 19.7339 34.6977 20.2617C35.0001 20.7896 35.1593 21.3884 35.1593 21.9979C35.1593 22.6075 35.0001 23.2063 34.6977 23.7342C34.3953 24.262 33.9604 24.7003 33.4367 25.0049V24.9071Z"
                      fill="#FF5F00"
                    />
                  </svg>
                </div>
              </div>
            );
          } else {
            return (
              <Link
                key={index}
                href={`/videos/stream/${slug}`}
                className="flex justify-between items-center my-8 px-3 border rounded-lg h-40 product"
              >
                <Image
                  src={`${process.env.API_URL}/${thumbnail}`}
                  width={100}
                  height={100}
                  sizes="10vw"
                  className="p-3 rounded-md w-52 h-full"
                ></Image>
                <h1 className="text-xs w-80 font-bold">{title}</h1>

                <div
                  href={"#"}
                  className="h-full w-20 flex justify-center items-center"
                >
                  <svg
                    width="40"
                    height="44"
                    viewBox="0 0 40 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M35.8614 14.6639L12.4391 1.12044C11.1717 0.382534 9.73313 -0.00402146 8.2696 3.15464e-05C6.80606 0.00408455 5.36965 0.398601 4.10628 1.14351C2.84291 1.88842 1.79757 2.95719 1.07646 4.24125C0.355337 5.52531 -0.0158767 6.97893 0.000520604 8.45445V35.6392C0.000520604 37.8566 0.874178 39.9832 2.4293 41.5512C3.98442 43.1191 6.09362 44 8.29289 44C9.74876 43.9975 11.1785 43.6097 12.4391 42.8755L35.8614 29.332C37.1199 28.5976 38.1648 27.5424 38.8912 26.2723C39.6176 25.0022 40 23.5619 40 22.0957C40 20.6296 39.6176 19.1893 38.8912 17.9192C38.1648 16.6491 37.1199 15.5939 35.8614 14.8595V14.6639ZM33.4367 24.9071L10.0144 38.6462C9.48943 38.9461 8.89631 39.1038 8.29289 39.1038C7.68947 39.1038 7.09635 38.9461 6.57138 38.6462C6.04788 38.3414 5.61319 37.9031 5.31099 37.3753C5.0088 36.8474 4.84976 36.2487 4.84986 35.6392V8.35667C4.84976 7.7472 5.0088 7.14845 5.31099 6.62061C5.61319 6.09277 6.04788 5.65445 6.57138 5.34972C7.09851 5.0543 7.68987 4.89474 8.29289 4.88523C8.8955 4.8977 9.48616 5.05707 10.0144 5.34972L33.4367 18.991C33.9604 19.2956 34.3953 19.7339 34.6977 20.2617C35.0001 20.7896 35.1593 21.3884 35.1593 21.9979C35.1593 22.6075 35.0001 23.2063 34.6977 23.7342C34.3953 24.262 33.9604 24.7003 33.4367 25.0049V24.9071Z"
                      fill="#FF5F00"
                    />
                  </svg>
                </div>
              </Link>
            );
          }
        })}
      </div>
    </section>
  );
}

export default MyVideos;

// {
/* <div className="min-h-[20rem]">
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
            {userVideos.map((video) => {
              const { title, instructor, thumbnail, id, file, slug } = video;

              if (file) {
                return (
                  <SwiperSlide key={id}>
                    <Link href={`/videos/stream/${slug}`}>
                      <ShortVideoItem
                        title={title}
                        instructor={instructor}
                        backgroundImage={thumbnail}
                        props={"mx-auto"}
                      />
                    </Link>
                  </SwiperSlide>
                );
              } else {
                return (
                  <SwiperSlide key={id}>
                    <div className="relative">
                      <ShortVideoItem
                        title={title}
                        instructor={instructor}
                        backgroundImage={thumbnail}
                        props={"mx-auto"}
                      />
                      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex justify-center bg-white/30 backdrop-blur-md p-2 shadow-lg rounded-lg cursor-default">
                        <span className="text-sm text-fottoOrange text-center">
                          {"Video henüz yüklenmedi."}
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
        ) : (
          <div className="">
            <span className="font-medium text-fottoText">
              Herhangi bir webinar kaydına sahip değilsiniz.
            </span>
          </div>
        )}
      </div> */
// }
