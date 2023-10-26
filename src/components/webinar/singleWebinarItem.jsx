"use client";
import Image from "next/image";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import PaymentContext from "@/context/PaymentContext";

import { redirect, useRouter } from "next/navigation";
import WebinarContext from "@/context/WebinarContext";
import AuthContext from "@/context/AuthContext";
import Link from "next/link";

function SingleWebinarItem({
  image,
  title,
  instructor,
  instructorImage,
  date,
  price,
  description,
  webinarID,
  wp_group_url,
  previewWebinarImage,
  previewInstructorImage,
  access_token,
}) {
  if (typeof description === "string") description = JSON.parse(description);

  const [userHasWebinar, setUserHasWebinar] = useState(false);

  const { addItemToBasket } = useContext(PaymentContext);
  const { checkIfUserHasWebinar } = useContext(WebinarContext);
  const { user } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      const checkUserWebinar = async () => {
        const check = await checkIfUserHasWebinar(webinarID, access_token);
        console.log(check);

        setUserHasWebinar(check);
      };
      checkUserWebinar();
    }
  }, []);

  const createBasket = () => {
    addItemToBasket(
      title,
      price,
      "webinar",
      title,
      instructor,
      date,
      price,
      image,
      webinarID
    );

    router.push("/checkout");
  };

  return (
    <>
      <div className="container max-w-lg flex flex-col items-center bg-[#F9FEFF]/40 border border-fottoOrange rounded-lg justify-center mt-12 p-3 md:items-start md:max-w-2xl md:flex-row lg:max-w-7xl lg:justify-evenly">
        <Image
          src={previewWebinarImage || `${process.env.API_URL}${image}`}
          width={100}
          height={100}
          sizes="100vw"
          alt="webinar image"
          className="w-fit h-72 md:h-[22rem] lg:h-[30rem]"
        />
        <div className="w-full max-w-lg text-sm lg:text-base">
          <h2 className="text-lg text-center font-medium my-4 md:mt-0 md:text-start md:px-4 lg:text-2xl">
            {title}
          </h2>
          <div className="flex flex-col w-full px-4 ">
            <h3 className="font-medium">Eğitmen</h3>
            <div className="w-fit h-16 mt-3 flex items-center p-3 space-x-3 bg-secBlue/50 border border-iconBlue rounded-lg lg:h-20">
              <Image
                src={
                  previewInstructorImage ||
                  `${process.env.API_URL}${instructorImage}`
                }
                height={100}
                width={100}
                sizes="100vw"
                alt="instructor"
                className="rounded-full w-12 h-12 lg:w-16 lg:h-16"
              />
              <span>{instructor}</span>
            </div>
          </div>
          <div className="flex flex-col w-full px-4 my-4">
            <h3 className="font-medium ">Planlanan Webinar Tarihi</h3>
            <span className="mt-3">
              {moment(date).format("DD/MM/YYYY HH:mm")}
            </span>
          </div>
          <div className=" flex flex-col w-full px-4">
            <h3 className="font-medium">Katılım Ücreti</h3>
            <span className="mt-3">{price} TL</span>
            {userHasWebinar ? (
              <Link
                href={wp_group_url}
                target="_blank"
                className="py-1 px-6 bg-fottoOrange rounded-lg w-fit mt-4 text-white hover:opacity-90 "
              >
                Gruba katıl
              </Link>
            ) : moment().diff(date) > 0 ? (
              <button className="py-1 px-6 bg-fottoText rounded-lg w-fit mt-4 cursor-not-allowed text-white hover:opacity-90 ">
                Tarihi geçmiş
              </button>
            ) : (
              <button
                onClick={createBasket}
                className="py-1 px-6 bg-fottoOrange rounded-lg w-fit mt-4 text-white hover:opacity-70 "
              >
                Hemen katıl
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="container flex flex-col justify-center p-3 my-10 space-y-12 md:items-start lg:max-w-7xl">
        {Object.keys(description).map((sec, index) => {
          return (
            <div key={index} className="">
              <h2 className="font-medium lg:text-xl ">
                {description[sec].title}
              </h2>
              <p className="text-sm lg:text-base">{description[sec].desc}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SingleWebinarItem;
