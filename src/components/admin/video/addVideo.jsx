"use client";

import { useContext, useEffect, useState } from "react";
import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { BsPlusCircle } from "react-icons/bs";
import VideoContext from "@/context/VideoContext";
import SingleProduct from "@/components/webinar/singleProduct";
import { toastProps } from "@/utils/toastProps";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function AddVideo({ access_token }) {
  const [name, setName] = useState("");
  const [data, setData] = useState({
    sec1: { title: "", desc: "" },
  });
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(moment());
  const [instructor, setInstructor] = useState("");
  const [instructorImage, setInstructorImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [previewInstructorImage, setPreviewInstructorImage] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const { createVideo } = useContext(VideoContext);

  const router = useRouter();

  const addSection = () => {
    let sectionCount;

    if (Object.keys(data).length > 0) {
      const lastKey = Object.keys(data).pop();
      const lastCharOfLastKey = lastKey.charAt(lastKey.length - 1);
      sectionCount = +lastCharOfLastKey + 1;
    } else {
      sectionCount = Object.keys(data).length + 1;
    }

    setData((prevState) => ({
      ...prevState,
      [`sec${sectionCount}`]: { title: "", desc: "" },
    }));
  };

  const removeSection = (sectionKey) => {
    setData((prevState) => {
      const newState = { ...prevState };
      delete newState[sectionKey];
      return newState;
    });
  };

  const handleTitleChange = (sectionKey, value) => {
    setData((prevData) => ({
      ...prevData,
      [sectionKey]: {
        ...prevData[sectionKey],
        title: value,
      },
    }));
  };

  const handleDescChange = (sectionKey, value) => {
    setData((prevData) => ({
      ...prevData,
      [sectionKey]: {
        ...prevData[sectionKey],
        desc: value,
      },
    }));
  };

  const thumbnailHandler = (e) => {
    setThumbnail(e.target.files[0]);

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Data = reader.result;
      setPreviewThumbnail(base64Data);
    };

    reader.readAsDataURL(file);
  };

  const instructorImageHandler = (e) => {
    setInstructorImage(e.target.files[0]);

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Data = reader.result;
      setPreviewInstructorImage(base64Data);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await createVideo(
      {
        title: name,
        data,
        price,
        date: date.format(),
        instructor,
        instructorImage,
        thumbnail,
      },
      access_token
    );

    if (response.success) {
      router.push("/fotto/video");

      toast(response.message, {
        isLoading: false,
        type: "success",
        ...toastProps,
      });
    }
  };

  return (
    <div className="container flex flex-col items-center py-8">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="p-5 w-full flex flex-col select-none bg-[#F9FEFF] rounded-lg max-w-sm lg:flex-row lg:max-w-fit lg:space-x-24 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] shadow-black/10"
      >
        <div className="flex flex-col space-y-5">
          <div className="relative space-y-3 flex flex-col">
            <label htmlFor="videoname" className="text-sm">
              Webinar kaydı adı
            </label>
            <input
              type="text"
              name="videoname"
              id="videoname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 p-3 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
              placeholder="videoname"
              autoComplete="off"
            />
          </div>
          <div className="relative space-y-3 flex flex-col">
            <label htmlFor="price" className="text-sm">
              Fiyat
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-12 p-3 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
              placeholder="price"
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <label htmlFor="date" className="text-sm">
              Tarih
            </label>
            <Datetime
              id="date"
              name="name"
              dateFormat={"DD/MM/YYYY"}
              timeFormat={"HH:mm"}
              value={date}
              onChange={(e) => setDate(e)}
              className="border border-secBlue w-fit text-fottoText"
            />
          </div>
          <div className="relative space-y-3 flex flex-col">
            <label htmlFor="instructor" className="text-sm">
              Eğitmen
            </label>
            <input
              type="text"
              name="instructor"
              id="instructor"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="w-full h-12 p-3 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
              placeholder="instructor"
              autoComplete="off"
            />
          </div>
          <div className="relative space-y-3 flex flex-col">
            <label htmlFor="instructorImage" className="text-sm">
              Eğitmen Fotosu
            </label>
            <input
              type="file"
              name="instructorImage"
              id="instructorImage"
              onChange={instructorImageHandler}
              className="relative m-0 block w-full min-w-0 flex-auto border border-secBlue rounded-md bg-clip-padding px-3 py-[0.32rem] text-sm text-fottoText transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-fottoOrange file:px-3 file:py-[0.32rem] file:text-black file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-fottoOrange/70 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none lg:w-80"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <label htmlFor="thumbnail" className="text-sm">
              Thumbnail
            </label>
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              onChange={thumbnailHandler}
              className="relative m-0 block w-full min-w-0 flex-auto border border-secBlue rounded-md bg-clip-padding px-3 py-[0.32rem] text-sm text-fottoText transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-fottoOrange file:px-3 file:py-[0.32rem] file:text-black file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-fottoOrange/70 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none lg:w-80"
            />
          </div>
          <div className="flex flex-col items-center space-y-6">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="rounded-lg px-4 py-2 bg-fottoText hover:bg-opacity-70"
            >
              <span className="text-white font-medium text-sm ">Önizle</span>
            </button>{" "}
            <button
              type="submit"
              className="rounded-lg px-4 py-2 bg-secBlue hover:bg-opacity-70"
            >
              <span className="text-white font-medium text-sm ">
                Webinar Kaydı Ekle
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-5">
          {Object.keys(data).map((sectionKey) => (
            <div
              key={sectionKey}
              className="flex flex-col w-full items-center space-y-5"
            >
              <div className="flex flex-col w-full space-y-3">
                <label htmlFor={`${sectionKey}title`} className="text-sm">
                  Açıklama Başlığı
                </label>
                <input
                  id={`${sectionKey}title`}
                  type="text"
                  value={data[sectionKey].title}
                  onChange={(e) =>
                    handleTitleChange(sectionKey, e.target.value)
                  }
                  className="w-full h-12 p-3 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
                />
              </div>
              <div className="flex flex-col w-full space-y-3">
                <label htmlFor={`${sectionKey}desc`} className="text-sm">
                  Açıklama
                </label>
                <textarea
                  rows={6}
                  id={`${sectionKey}desc`}
                  value={data[sectionKey].desc}
                  onChange={(e) => handleDescChange(sectionKey, e.target.value)}
                  className="w-full p-3 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
                />
              </div>
              <button
                type="button"
                onClick={() => removeSection(sectionKey)}
                className="w-fit py-1 px-8 rounded-lg text-sm bg-fottoOrange/70 text-white hover:opacity-80 lg:text-base lg:px-10"
              >
                Alanı sil
              </button>
            </div>
          ))}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={addSection}
              className="w-fit p-2 rounded-lg text-sec hover:opacity-80"
            >
              <BsPlusCircle className="h-8 w-8 fill-secBlue" />
            </button>
          </div>
        </div>
      </form>
      {showPreview && (
        <SingleProduct
          date={date}
          description={data}
          instructor={instructor}
          previewInstructorImage={previewInstructorImage}
          previewWebinarImage={previewThumbnail}
          price={price}
          title={name}
        />
      )}
    </div>
  );
}

export default AddVideo;
