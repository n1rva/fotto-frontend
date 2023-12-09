"use client";

import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { BsCalendar2Date } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";

function VideoItem({ thumbnail, title, instructor, date, slug }) {
  return (
    <Link
      href={`videos/${slug}`}
      className="min-w-[18rem] w-72 border border-transparent rounded-xl shadow-md product "
    >
      <div className="relative p-3">
        <Image
          src={`${process.env.API_URL}${thumbnail}`}
          width={100}
          height={100}
          sizes="100vw"
          className="w-full max-h-52 rounded-lg"
          alt="bg"
        />
        <h4 className="absolute bottom-3 right-3 text-xs bg-black rounded-lg p-1 text-fottoWhite">
          00:53
        </h4>
      </div>
      <div className="px-8 py-2 space-y-6 text-sm">
        <h1 className="h-20 font-bold wrapword">{title}</h1>
        <h3 className="font-medium">{instructor}</h3>

        <h2 className="text-end font-bold text-lg  text-fottoOrange">200 TL</h2>
      </div>
    </Link>
  );
}

export default VideoItem;
