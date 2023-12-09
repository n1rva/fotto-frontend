"use client";

import moment from "moment";
import Image from "next/image";
import Link from "next/link";

function WebinarItem({ image, title, instructor, date, slug }) {
  return (
    <Link
      href={`webinars/${slug}`}
      className="min-w-[18rem] w-72 border border-transparent rounded-xl shadow-md product"
    >
      <div className="p-3">
        <Image
          src={`${process.env.API_URL}${image}`}
          width={100}
          height={100}
          sizes="100vw"
          className="w-full max-h-52 rounded-lg"
          alt="webinar bg"
        />
      </div>
      <div className="px-8 py-2 space-y-6 text-sm">
        <h1 className="h-20 font-bold wrapword">{title}</h1>
        <h2 className="font-medium">{instructor}</h2>
        <h3 className="font-bold text-base text-center  text-fottoOrange">
          {moment(date).format("DD/MM/YYYY HH:mm")}
        </h3>
      </div>
    </Link>
  );
}

export default WebinarItem;
