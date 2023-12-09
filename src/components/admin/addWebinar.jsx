"use client";

import { useContext, useEffect, useRef, useState } from "react";
import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { BsPlusCircle, BsPlusLg } from "react-icons/bs";
import SingleWebinarItem from "../webinar/singleWebinarItem";
import WebinarContext from "@/context/WebinarContext";
import { toast } from "react-toastify";
import { toastProps } from "@/utils/toastProps";
import { useRouter } from "next/navigation";
import { MdOutlineClose } from "react-icons/md";
import useDebounce from "@/utils/useDebounce";

function AddWebinar({ access_token }) {
  const [name, setName] = useState("");
  const [data, setData] = useState({
    sec1: { title: "", desc: "" },
  });
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(moment());
  const [instructor, setInstructor] = useState("");
  const [instructorImage, setInstructorImage] = useState("");
  const [sourceCertificate, setSourceCertificate] = useState("");
  const [webinarImage, setWebinarImage] = useState("");
  const [wpGroupUrl, setWpGroupUrl] = useState("");

  const [previewWebinarImage, setPreviewWebinarImage] = useState("");
  const [previewInstructorImage, setPreviewInstructorImage] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const [newFilters, setNewFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [filterResults, setFilterResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [loading, setLoading] = useState(false);

  const {
    createWebinar,
    webinarError,
    clearWebinarErrors,
    getFilters,
    searchFilters,
  } = useContext(WebinarContext);

  const router = useRouter();

  const searchFilterRef = useRef(null);

  useEffect(() => {
    getFilters();
  }, []);

  useEffect(() => {
    if (webinarError) {
      toast.error(webinarError);
      clearWebinarErrors();
    }
  }, [webinarError]);

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

  const webinarImageHandler = (e) => {
    setWebinarImage(e.target.files[0]);

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Data = reader.result;
      setPreviewWebinarImage(base64Data);
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

  const sourceCertificateHandle = (e) => {
    setSourceCertificate(e.target.files[0]);
  };

  const searchFilterByQuery = async (query) => {
    const filters = await searchFilters(query);
    if (filters.length) {
      setFilterResults(filters);
    }
  };

  const addNewFilter = (filter) => {
    if (
      !newFilters.some(
        (existingFilter) =>
          existingFilter.toLowerCase() === filter.toLowerCase()
      )
    ) {
      setNewFilters((prevFilters) => [...prevFilters, filter]);
    }

    setFilterQuery("");
    searchFilterRef.current?.focus();
  };

  const deleteNewFilter = (filter) => {
    const newArray = newFilters.filter((item) => item !== filter);
    setNewFilters(newArray);
  };

  const debouncedSearchTerm = useDebounce(filterQuery, 200);

  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      searchFilterByQuery(debouncedSearchTerm);
      // setSearchIsLoading(false);
    } else {
      // setSearchIsLoading(false);
      setFilterResults([]);
    }
  }, [debouncedSearchTerm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await createWebinar(
      {
        title: name,
        data,
        price,
        date: date.format(),
        instructor,
        instructorImage,
        sourceCertificate,
        tags: newFilters.concat(selectedFilters),
        webinarImage,
        wpGroupUrl,
      },
      access_token
    );

    if (response?.success) {
      router.push("/fotto/webinar");

      toast(response.message, {
        isLoading: false,
        type: "success",
        ...toastProps,
      });
    }
    setLoading(false);
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
            <label htmlFor="webinarname" className="text-sm">
              Webinar adı
            </label>
            <input
              type="text"
              name="webinarname"
              id="webinarname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 p-3 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
              placeholder="webinarname"
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
            <label htmlFor="wpGroupUrl" className="text-sm">
              WhatsApp Grup Davet Linki
            </label>
            <input
              type="text"
              name="wpGroupUrl"
              id="wpGroupUrl"
              value={wpGroupUrl}
              onChange={(e) => setWpGroupUrl(e.target.value)}
              className="w-full h-12 p-3 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
              placeholder="wpGroupUrl"
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
            <label htmlFor="sourceCertificate" className="text-sm">
              Kaynak Sertifika
            </label>
            <input
              type="file"
              name="sourceCertificate"
              id="sourceCertificate"
              onChange={sourceCertificateHandle}
              className="relative m-0 block w-full min-w-0 flex-auto border border-secBlue rounded-md bg-clip-padding px-3 py-[0.32rem] text-sm text-fottoText transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-fottoOrange file:px-3 file:py-[0.32rem] file:text-black file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-fottoOrange/70 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none lg:w-80"
            />
          </div>
          <div className="flex flex-col space-y-3">
            <label htmlFor="webinarPhoto" className="text-sm">
              Webinar Fotosu
            </label>
            <input
              type="file"
              name="webinarPhoto"
              id="webinarPhoto"
              onChange={webinarImageHandler}
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
              className={`rounded-lg px-4 py-2 hover:bg-opacity-70 ${
                loading
                  ? "cursor-not-allowed bg-gray-500"
                  : "cursor-pointer bg-secBlue"
              }`}
            >
              <span className={`text-white font-medium text-sm`}>
                {loading ? "Yükleniyor..." : "Webinar Ekle"}
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-5">
          <div className="relative">
            <div className="flex flex-col relative space-y-3">
              <label htmlFor="tags" className="text-sm">
                Tagler
              </label>
              <input
                ref={searchFilterRef}
                type="text"
                name="tags"
                id="tags"
                onFocus={() => setShowResults(true)}
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full h-12 p-3 pr-12 text-black border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
                placeholder="Fizyoterapi"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => addNewFilter(filterQuery)}
                className="absolute right-3 top-8 text-fottoOrange hover:opacity-80"
              >
                Ekle
              </button>
              <div className="space-y-2">
                {newFilters?.map((filter, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between px-2 py-1 bg-slate-100 shadow rounded-sm capitalize"
                    >
                      <h3>{filter}</h3>
                      <button
                        type="button"
                        onClick={() => deleteNewFilter(filter)}
                      >
                        <MdOutlineClose />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            {showResults && (
              <div className=" absolute flex-col top-24 left-0 w-full shadow bg-white">
                {filterResults &&
                  filterResults.map((filter, index) => {
                    return (
                      <button
                        type="button"
                        onClick={() => addNewFilter(filter.name)}
                        key={index}
                        className="w-full px-2 space-x-3 bg-[#DCFAFF] flex items-center hover:opacity-80"
                      >
                        <BsPlusLg />
                        <span className="w-full flex items-center py-1">
                          {filter.name}
                        </span>
                      </button>
                    );
                  })}
              </div>
            )}
          </div>
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
        <SingleWebinarItem
          date={date}
          description={data}
          instructor={instructor}
          previewInstructorImage={previewInstructorImage}
          previewWebinarImage={previewWebinarImage}
          price={price}
          title={name}
        />
      )}
    </div>
  );
}

export default AddWebinar;
