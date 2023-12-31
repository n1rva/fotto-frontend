"use client";

import Image from "next/image";
import { FaChalkboardTeacher } from "react-icons/fa";

function ShortVideoItem({ backgroundImage, title, instructor, props }) {
  return (
    <div
      className={`relative h-48 w-48 flex flex-col items-center py-1 px-3 rounded-lg bg-secBlue/20 border border-secBlue ${props} hover:opacity-80`}
    >
      <Image
        src={`${process.env.API_URL}/${backgroundImage}`}
        width={100}
        height={100}
        sizes="10vw"
        className="absolute left-0 top-0 w-full h-full object-cover opacity-20 rounded-lg"
        alt="bg"
      />
      <div className="p-1 space-y-3 text-sm w-full">
        <h3 className="font-medium w-full text-center min-h-[5rem] wrapword">
          {title}
        </h3>
        <div className="flex items-center ">
          <FaChalkboardTeacher className="text-fottoOrange" />
          <span className="ml-2 text-xs font-medium">{instructor}</span>
        </div>
      </div>
    </div>
  );
}

export default ShortVideoItem;
