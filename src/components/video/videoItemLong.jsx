"use client";

import Image from "next/image";
import Link from "next/link";

function VideoItemLong({ thumbnail, title, instructor, date, slug }) {
  return (
    <Link
      href={`videos/${slug}`}
      className="min-w-[18rem] w-[40rem] flex border border-transparent rounded-xl bg-gradient-to-r from-gray-200 to-white shadow-md hover:from-[#E0EAFC] hover:to-[#CFDEF3]"
    >
      <div className="relative w-[30rem] border p-3 flex items-center justify-center">
        <Image
          src={`${process.env.API_URL}${thumbnail}`}
          width={100}
          height={100}
          sizes="100vw"
          className="w-48 h-48 rounded-lg flex self-end"
          alt="bg"
        />
        <h4 className="absolute bottom-3 right-3 text-xs bg-black rounded-lg p-1 text-fottoWhite">
          00:53
        </h4>
      </div>
      <div className="px-8 py-2 space-y-6">
        <h1 className="h-16 font-bold wrapword">
          Omurga İlişikili Temporomandibular Eklem (TME) Disfonksiyonlarında
          Rehabilitasyon Prensibleri
        </h1>
        <h3 className="font-medium">{instructor}</h3>
        {/* <h4>19/07/2022 tarihinde yapıldı</h4> */}
        <h4>Fizyoterapi | Cart Curt | Şu bu ile ilgili</h4>
        <h2 className="text-end font-bold text-lg  text-fottoOrange">200 TL</h2>
      </div>
    </Link>
  );
}

export default VideoItemLong;
