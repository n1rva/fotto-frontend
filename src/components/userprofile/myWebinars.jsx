"use client";

import ShortWebinarItem from "../webinar/shortWebinarItem";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import WebinarContext from "@/context/WebinarContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import moment from "moment";
import Link from "next/link";
import ProfileWebinarPlaceholder from "../profileWebinarPlaceholder";

function MyWebinars({ access_token }) {
  const { getCurrentUserActiveWebinars, getCurrentUserExpiredWebinars } =
    useContext(WebinarContext);

  const [showAllWebinars, setShowAllWebinars] = useState(false);

  const [userActiveWebinars, setUserActiveWebinars] = useState([]);
  const [userExpiredWebinars, setUserExpiredWebinars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCurrentUserActiveWebinars(access_token);

      if (data.success) {
        setUserActiveWebinars(data.webinars);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (showAllWebinars && !userExpiredWebinars.length) {
      setIsLoading(true);
      const fetchData = async () => {
        const data = await getCurrentUserExpiredWebinars(access_token);

        if (data.success) {
          setUserExpiredWebinars(data.webinars);
        }
        setIsLoading(false);
      };

      fetchData();
    }
  }, [showAllWebinars]);

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
    <section className="max-w-4xl flex flex-col">
      <div className="flex justify-around font-bold relative">
        <div className="tab"></div>
        <button
          onClick={() => setShowAllWebinars(false)}
          className={`  w-full hover:opacity-80 `}
        >
          <span className=" p-4 pt-0 item">Tarihi yaklaşan webinarlarım</span>
        </button>
        <button
          onClick={() => setShowAllWebinars(true)}
          className={` w-full hover:opacity-80 `}
        >
          <span className=" p-4 pt-0 item">Katıldığım webinarlar</span>
        </button>
      </div>

      <div className="min-h-[20rem] my-8 pr-1 max-h-[36rem] overflow-y-auto sm-scrollbar">
        {!showAllWebinars ? (
          userActiveWebinars.length ? (
            userActiveWebinars.map((webinar, index) => {
              const { date, title, instructor, wp_group_url } = webinar;

              return (
                <div
                  key={index}
                  className=" flex items-center border rounded-lg text-xs justify-between h-16 my-1 product"
                >
                  <div className="flex px-3 basis-6/12 h-full items-center space-x-2">
                    <span className="text-fottoOrange font-bold">
                      Son{" "}
                      {moment(date).diff(new Date(), "days")
                        ? `${moment(date).diff(new Date(), "days")} gün!`
                        : moment(date).diff(new Date(), "hours")
                        ? `${moment(date).diff(new Date(), "hours")} saat!`
                        : `${moment(date).diff(new Date(), "minutes")} dakika!`}
                    </span>
                    <div className="border-l flex h-5/6 border-black"></div>
                    <h1 className="font-bold ">{title}</h1>
                  </div>

                  <h2 className="font-medium basis-3/12">{instructor}</h2>
                  <h2 className="basis-2/12">
                    {moment(date).format("DD/MM/YYYY HH:mm")}
                  </h2>
                  <Link
                    href={wp_group_url}
                    className="basis-1/12 h-full rounded-tr-lg rounded-br-lg flex items-center justify-end text-white bg-fottoOrange px-1 font-medium hover:opacity-80"
                  >
                    Gruba katıl
                  </Link>
                </div>
              );
            })
          ) : isLoading ? (
            <div className="my-1">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <ProfileWebinarPlaceholder key={i} />
                ))}
            </div>
          ) : (
            <div className="my-16">
              <span className="font-medium text-fottoText">
                Tarihi yaklaşan herhangi bir webinara katılmadınız.
              </span>
            </div>
          )
        ) : userExpiredWebinars.length ? (
          userExpiredWebinars.map((webinar, index) => {
            const { date, title, instructor } = webinar;

            return (
              <div
                key={index}
                className=" flex items-center border rounded-lg text-xs justify-between h-16 my-1 bg-white hover:bg-fottoWhite"
              >
                <div className="flex px-8 basis-6/12 h-full items-center">
                  <h1 className="font-bold ">{title}</h1>
                </div>

                <h2 className="font-medium basis-3/12">{instructor}</h2>
                <h2 className="basis-2/12">
                  {moment(date).format("DD/MM/YYYY HH:mm")}
                </h2>
                <button className="basis-1/12 h-full rounded-tr-lg rounded-br-lg flex items-center justify-end text-white bg-fottoText cursor-not-allowed px-1 font-medium">
                  Gruba katıl
                </button>
              </div>
            );
          })
        ) : isLoading ? (
          <div className="my-1">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <ProfileWebinarPlaceholder key={i} />
              ))}
          </div>
        ) : (
          <div className="my-16 flex flex-col space-y-2">
            <span className="font-medium text-fottoText">
              Herhangi bir webinara katılmadınız.
            </span>
            <Link
              href={"/webinars"}
              className="border bg-fottoOrange px-2 py-1 text-white font-medium w-fit rounded-md hover:opacity-80"
            >
              Hemen Katıl
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default MyWebinars;
