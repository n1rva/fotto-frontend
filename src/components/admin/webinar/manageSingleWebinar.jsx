"use client";

import ShortWebinarItem from "@/components/webinar/shortWebinarItem";
import AuthContext from "@/context/AuthContext";
import WebinarContext from "@/context/WebinarContext";
import { toastProps } from "@/utils/toastProps";
import Link from "next/link";

import { useContext, useEffect, useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

function ManageSingleWebinar({
  id,
  image,
  title,
  instructor,
  date,
  access_token,
}) {
  const [isWebinarMenuOpen, setIsWebinarMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { deleteWebinar, webinarError, clearWebinarErrors } =
    useContext(WebinarContext);

  const handleDelete = async () => {
    const response = await deleteWebinar(id, access_token);

    if (response.success) {
      toast(response.message, {
        isLoading: false,
        type: "success",
        ...toastProps,
      });
    }
  };

  useEffect(() => {
    if (webinarError) {
      toast.error(webinarError);
      clearWebinarErrors();
    }
  }, [webinarError]);

  return (
    <div className="relative w-fit mx-20">
      <ShortWebinarItem
        backgroundImage={image}
        title={title}
        instructor={instructor}
        date={date}
      />
      <div className="absolute flex justify-end px-2 right-0 top-1 w-full h-8 bg-transparent">
        <button
          className="px-1 text-darkerOrange hover:text-fottoOrange"
          onClick={() => setIsWebinarMenuOpen(!isWebinarMenuOpen)}
        >
          <BsThreeDotsVertical className="h-6 w-6 " />
        </button>
      </div>

      {isWebinarMenuOpen && (
        <div className="absolute right-10 top-1 bg-fottoWhite/30 backdrop-blur-lg h-20 w-36 font-medium flex flex-col border border-fottoOrange rounded-lg">
          <Link
            href={`/fotto/webinar/update/${id}`}
            className="flex space-x-2 w-full h-full px-5 rounded-lg items-center hover:bg-fottoWhite/30 hover:text-fottoOrange duration-100 ease-in-out"
          >
            <AiTwotoneEdit className="h-6 w-6 " />
            <span>Düzenle</span>
          </Link>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex space-x-2 w-full h-full px-5 rounded-lg items-center hover:bg-fottoWhite/30 hover:text-fottoOrange duration-100 ease-in-out"
          >
            <RiDeleteBin2Fill className="h-6 w-6 " />
            <span>Sil</span>
          </button>
        </div>
      )}
      {isDeleteModalOpen && (
        <>
          <div
            className={`fixed flex justify-center items-center w-full h-full left-0 top-0 bg-fottoText backdrop-blur-sm bg-opacity-70 z-40 ${
              isDeleteModalOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute top-0 left-0 w-full h-full"
            />
            <div
              className={`fixed z-50 bg-fottoWhite w-[28rem] border rounded-lg font-medium p-2`}
            >
              <div className="flex items-center">
                <h4 className="flex-grow font-bold text-lg text-fottoOrange">
                  Silme Onayı
                </h4>
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="p-2"
                >
                  <IoMdClose className="h-6 w-6 hover:opacity-80" />
                </button>
              </div>
              <hr className="my-2" />
              <div className="py-1 px-1 my-6 flex justify-center bg-red-100 border border-fottoOrange rounded-lg">
                <h5 className="py-4 text-darkerOrange">
                  Webinarı gerçekten silmek istiyor musunuz?
                </h5>
              </div>
              <div className="flex justify-end px-8 space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-2 py-1 text-slate-800 hover:opacity-80"
                >
                  İptal Et
                </button>
                <button
                  onClick={handleDelete}
                  className="px-2 py-1 rounded-lg font-medium text-darkerOrange hover:opacity-80"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ManageSingleWebinar;
