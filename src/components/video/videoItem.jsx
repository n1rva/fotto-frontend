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
      className="min-h-[20rem] w-48 bg-darkerMain border border-secBlue select-none cursor-pointer hover:border-[#fd8f00] rounded-b-lg"
    >
      <Image
        src={`${process.env.API_URL}${thumbnail}`}
        width={100}
        height={100}
        sizes="100vw"
        className="w-full max-h-40"
        alt="bg"
      />
      <h4 className="font-bold text-sm text-center p-1 wrapword">{title}</h4>
      <div className="p-3 space-y-3">
        <div className="flex items-center ">
          <FaChalkboardTeacher className="text-secBlue" />
          <span className="ml-2 text-xs font-medium">{instructor}</span>
        </div>
        <div className="flex items-center ">
          <BsCalendar2Date className="text-secBlue" />
          <span className="ml-2 text-xs font-medium">
            {moment(date).format("DD/MM/YYYY HH:mm")}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default VideoItem;
