import ShortVideoItem from "@/components/video/shortVideoItem";
import VideoContext from "@/context/VideoContext";
import { toastProps } from "@/utils/toastProps";

import React, { useContext, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

function VideoItem({ userID, id, title, instructor, thumbnail, access_token }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { deleteVideoFromUser, userVideos, setUserVideos } =
    useContext(VideoContext);

  const handleDelete = async () => {
    const response = await deleteVideoFromUser(id, userID, access_token);

    const filteredUserVideos = userVideos.filter((video) => {
      return video.id !== id;
    });

    setUserVideos(filteredUserVideos);

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
      <ShortVideoItem
        title={title}
        instructor={instructor}
        backgroundImage={thumbnail}
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
              Webinar kaydı silinsin mi?
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
    </div>
  );
}

export default VideoItem;
