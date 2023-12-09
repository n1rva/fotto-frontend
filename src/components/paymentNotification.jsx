"use client";

import PaymentContext from "@/context/PaymentContext";
import { useContext, useEffect, useLayoutEffect, useState } from "react";

import { useInView } from "react-intersection-observer";

import delay from "@/utils/delay";
import Notification from "./notification";

function PaymentNotification({ access_token }) {
  const {
    getUnreadNotifications,
    getReadNotifications,
    deletedItem,
    unreadNotifications,
    readNotifications,
    setUnreadNotifications,
    setReadNotifications,
  } = useContext(PaymentContext);

  const [showVideos, setShowVideos] = useState(false);

  const [readPage, setReadPage] = useState(0);
  const [unreadPage, setUnreadPage] = useState(0);

  const [hideReadNotifications, setHideReadNotifications] = useState(true);

  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const { ref, inView } = useInView();

  const fetchMoreUnreadNotifications = async () => {
    if (unreadPage !== 0) {
      await delay(1000);
    }

    if (unreadPage < 0) return setShowPlaceholder(false);

    const nextPage = unreadPage + 1;

    const newNotifications =
      (await getUnreadNotifications(
        access_token,
        nextPage,
        showVideos ? "video" : "webinar"
      )) ?? [];

    setUnreadNotifications((prevUnreadNotifications) => [
      ...prevUnreadNotifications,
      ...(newNotifications.results || ""),
    ]);

    if (!newNotifications.next) {
      setUnreadPage(-1);
      return setShowPlaceholder(false);
    }

    setReadPage(nextPage);
  };

  const fetchMoreReadNotifications = async () => {
    if (readPage !== 0) {
      await delay(1000);
    }

    if (readPage < 0) return setShowPlaceholder(false);

    const nextPage = readPage + 1;

    const newNotifications =
      (await getReadNotifications(
        access_token,
        nextPage,
        showVideos ? "video" : "webinar"
      )) ?? [];

    setReadNotifications((prevReadNotifications) => [
      ...prevReadNotifications,
      ...(newNotifications.results || ""),
    ]);

    if (!newNotifications.next) {
      setReadPage(-1);
      return setShowPlaceholder(false);
    }

    setReadPage(nextPage);
  };

  useEffect(() => {
    if (inView) {
      if (hideReadNotifications) {
        fetchMoreUnreadNotifications();
      } else {
        fetchMoreReadNotifications();
      }
    }
  }, [inView]);

  useEffect(() => {
    setReadPage(0);
    setUnreadPage(0);
    setUnreadNotifications([]);
    setReadNotifications([]);
    setShowPlaceholder(true);
  }, [showVideos, hideReadNotifications, deletedItem]);

  useLayoutEffect(() => {
    let marker = document.querySelector(".tab");
    let items = document.querySelectorAll(".item");

    const indicator = (e) => {
      marker.style.left = e.offsetLeft - e.offsetWidth * 0.25 + "px";
      marker.style.width = e.offsetWidth * 1.5 + "px";
    };

    indicator(items[0]);

    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        indicator(e.target);
      });
    });
  }, []);

  return (
    <section className="min-h-screen">
      <header className="bg-[#F3FDFF] my-12 min-h-[14rem] py-6 flex flex-col justify-between">
        <div className="flex justify-between container mx-auto px-28">
          <h1 className="text-xl font-bold  md:text-2xl lg:text-3xl">
            Ödemeler
          </h1>
          <div className="flex items-center select-none space-x-2 relative">
            <input
              type="checkbox"
              name="hideread"
              id="hideread"
              checked={hideReadNotifications}
              onChange={() => setHideReadNotifications((prev) => !prev)}
              className="relative peer shrink-0 appearance-none w-4 h-4 rounded-sm bg-slate-200"
            />
            <label htmlFor="hideread" className="font-bold">
              Okunmuş olanları gizle
            </label>
            <svg
              className="absolute w-4 h-4 -left-2 hidden stroke-fottoOrange peer-checked:block"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
        <div className="flex font-bold justify-center py-2 relative">
          <div className="tab"></div>
          <button
            onClick={() => setShowVideos(false)}
            className={`w-96 hover:opacity-80 `}
          >
            <span className=" p-4 pt-0 item">Webinar</span>
          </button>
          <button
            onClick={() => setShowVideos(true)}
            className={`w-96 hover:opacity-80 `}
          >
            <span className=" p-4 pt-0 item">Webinar arşivi</span>
          </button>
        </div>
      </header>
      <div className="flex flex-col my-8 container px-12 py-8 bg-[#F9FEFF] rounded-xl h-96 space-y-4 mx-auto xl:max-w-7xl">
        {/*  */}
        {hideReadNotifications ? (
          unreadNotifications.length ? (
            unreadNotifications.map((notification) => {
              const { price, title, user, id } = notification;

              return (
                <Notification
                  key={id}
                  access_token={access_token}
                  is_read={true}
                  notification_id={id}
                  price={price}
                  title={title}
                  user_mail={user.email}
                  user_name={user.first_name + " " + user.last_name}
                />
              );
            })
          ) : (
            <div className="flex self-center font-bold">
              Bütün bildirimleri gördünüz.
            </div>
          )
        ) : readNotifications.length ? (
          readNotifications.map((notification) => {
            const { price, title, user, id } = notification;

            return (
              <Notification
                key={id}
                access_token={access_token}
                is_read={false}
                notification_id={id}
                price={price}
                title={title}
                user_mail={user.email}
                user_name={user.first_name + " " + user.last_name}
              />
            );
          })
        ) : (
          <div className="flex self-center font-bold">
            Bütün bildirimleri gördünüz.
          </div>
        )}
        {/*  */}

        {showPlaceholder && (
          <div ref={ref} className="flex justify-center items-center">
            <div className="animate-spin mx-2 rounded-full h-8 w-8 border-2 border-white border-t-fottoText" />
          </div>
        )}
      </div>
    </section>
  );
}

export default PaymentNotification;
