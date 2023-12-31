import ShortWebinarItem from "@/components/webinar/shortWebinarItem";
import WebinarContext from "@/context/WebinarContext";
import { toastProps } from "@/utils/toastProps";
import React, { useContext, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

function WebinarItem({
  userID,
  id,
  date,
  title,
  instructor,
  image,
  access_token,
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { deleteWebinarFromUser, userWebinars, setUserWebinars } =
    useContext(WebinarContext);

  const handleDelete = async () => {
    const response = await deleteWebinarFromUser(id, userID, access_token);

    const filteredUserWebinars = userWebinars.filter((webinar) => {
      return webinar.id !== id;
    });

    setUserWebinars(filteredUserWebinars);

    if (response.success) {
      toast(response.message, {
        isLoading: false,
        type: "success",
        ...toastProps,
      });
    }
  };

  return (
    <div className="relative w-fit mx-auto">
      <ShortWebinarItem
        title={title}
        instructor={instructor}
        backgroundImage={image}
        date={date}
      />
      <div className="absolute flex justify-end px-2 right-0 top-1 w-full h-8 bg-transparent">
        <button
          className="px-1 text-darkerOrange hover:text-fottoOrange"
          onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
        >
          <IoMdCloseCircleOutline className="h-6 w-6 " />
        </button>
      </div>
      {isDeleteModalOpen && (
        <div className="absolute flex justify-center items-center bg-fottoText/50 backdrop-blur-sm top-0 left-0 w-full h-full">
          <div className="w-full h-20 bg-fottoWhite/90 flex flex-col items-center justify-center">
            <h3 className="font-medium text-red-600 text-sm text-center ">
              Webinar silinsin mi?
            </h3>
            <div className="flex items-center mt-3 space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
                className="bg-transparent text-fottoText px-2 py-1 border border-fottoText rounded-md text-sm hover:bg-slate-300"
              >
                İptal
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-700 text-white px-4 py-1 rounded-md text-sm hover:bg-red-500"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {isDeleteModalOpen && (
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
      )} */}
    </div>
  );
}

export default WebinarItem;
