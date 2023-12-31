"use client";

import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { BsCalendar2Date } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";

function ShortWebinarItem({
  backgroundImage,
  countdown = "",
  title,
  instructor,
  date,
  props = "",
  wpGroupUrl = "",
}) {
  return (
    <div
      className={`relative h-48 w-48 flex flex-col items-center py-1 px-3 rounded-lg bg-secBlue/20 border border-secBlue ${props} hover:opacity-80`}
    >
      <Image
        src={`${process.env.API_URL}${backgroundImage}`}
        width={100}
        height={100}
        sizes="10vw"
        className="absolute left-0 top-0 w-full h-full object-cover opacity-20 rounded-lg"
        alt="bg"
      />
      <h4 className="text-xs font-medium text-fottoOrange">{countdown}</h4>
      <div className="p-1 space-y-3 text-sm w-full">
        <h3 className="font-medium w-full text-center min-h-[5rem] wrapword">
          {title}
        </h3>
        <div className="flex items-center ">
          <FaChalkboardTeacher className="text-fottoOrange" />
          <span className="ml-2 text-xs font-medium">{instructor}</span>
        </div>
        <div className="flex items-center ">
          <BsCalendar2Date className="text-fottoOrange" />
          <span className="ml-2 text-xs font-medium">
            {moment(date).format("DD/MM/YYYY HH:mm")}
          </span>
        </div>
        <div>
          {wpGroupUrl && (
            <div className="w-full flex justify-center">
              <Link
                href={wpGroupUrl}
                target="_blank"
                className="border border-transparent bg-fottoOrange font-medium rounded-lg px-2 py-1 z-50 text-white hover:border-fottoText"
              >
                Gruba Katıl
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShortWebinarItem;
