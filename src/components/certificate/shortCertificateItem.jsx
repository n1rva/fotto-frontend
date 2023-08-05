"use client";

import Image from "next/image";
import { BsCalendar2Date } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";

function ShortCertificateItem({ title, instructor, date, props }) {
  return (
    <div
      className={`relative h-36 w-48 flex flex-col items-center py-1 px-3 rounded-sm border border-darkerOrange ${props}`}
    >
      <Image
        src={"/cer.webp"}
        width={100}
        height={100}
        sizes="10vw"
        className="absolute left-0 top-0 w-full h-full object-cover opacity-20"
        alt="certificate"
      />
      <div className="p-1 space-y-3 text-sm w-full">
        <h3 className="font-medium w-full text-center wrapword">{title}</h3>
        <div className="flex items-center ">
          <FaChalkboardTeacher className="text-fottoOrange" />
          <span className="ml-2 text-xs font-medium">{instructor}</span>
        </div>
        <div className="flex items-center ">
          <BsCalendar2Date className="text-fottoOrange" />
          <span className="ml-2 text-xs font-medium">{date}</span>
        </div>
      </div>
    </div>
  );
}

export default ShortCertificateItem;
