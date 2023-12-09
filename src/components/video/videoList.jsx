"use client";
import VideoContext from "@/context/VideoContext";
import { useContext, useEffect, useRef, useState } from "react";
import VideoItem from "./videoItem";
import Placeholder from "../placeholder";

import { AiOutlineCloseCircle, AiOutlineDown } from "react-icons/ai";
import { CgViewList, CgViewDay } from "react-icons/cg";

import { useInView } from "react-intersection-observer";
import delay from "@/utils/delay";

function VideoList() {
  const {
    getVideosByPagination,
    videoLoading,
    videoFilters,
    getVideosByTags,
    getFilters,
  } = useContext(VideoContext);

  const [pagesLoadedAllVideos, setPagesLoadedAllVideos] = useState(0);
  const [pagesLoadedFilteredVideos, setPagesLoadedFilteredVideos] = useState(0);

  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);

  const [isFilterModeOn, setIsFilterModeOn] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const { ref, inView } = useInView();

  const fetchMoreVideos = async () => {
    if (pagesLoadedAllVideos !== 0) {
      await delay(1000);
    }

    if (pagesLoadedAllVideos < 0) return setShowPlaceholder(false);

    const nextPage = pagesLoadedAllVideos + 1;
    const newVideos = (await getVideosByPagination(nextPage)) ?? [];

    setVideos((prevVideos) => [...prevVideos, ...(newVideos.results || "")]);

    if (!newVideos.next) {
      setPagesLoadedAllVideos(-1);
      return setShowPlaceholder(false);
    }

    setPagesLoadedAllVideos(nextPage);
  };

  const fetchMoreFilteredVideos = async () => {
    if (pagesLoadedFilteredVideos !== 0) {
      await delay(1000);
    }

    const nextPage = pagesLoadedFilteredVideos + 1;

    const newVideos = (await getVideosByTags(selectedTags, nextPage)) ?? [];

    setFilteredVideos((prevVideos) => [...prevVideos, ...newVideos.results]);

    if (!newVideos.next) return setShowPlaceholder(false);

    setPagesLoadedAllVideos(nextPage);
  };

  const handleTags = (tagName) => {
    if (selectedTags.includes(tagName)) {
      let newTags = selectedTags.filter((e) => e !== tagName);

      if (newTags.length === 0) {
        setIsFilterModeOn(false);
        setShowPlaceholder(true);
      }

      setSelectedTags(newTags);
    } else {
      if (!isFilterModeOn) setIsFilterModeOn(true);

      setSelectedTags([...selectedTags, tagName]);
    }
  };

  const clearFilters = () => {
    setIsFilterModeOn(false);
    setSelectedTags([]);
  };

  useEffect(() => {
    getFilters();
  }, []);

  useEffect(() => {
    setFilteredVideos([]);
    setShowPlaceholder(true);
  }, [selectedTags]);

  useEffect(() => {
    if (inView) {
      if (isFilterModeOn) {
        fetchMoreFilteredVideos();
      } else {
        fetchMoreVideos();
      }
    }
  }, [inView]);

  const filterMenuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target)
      ) {
        setIsFilterMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // if (videos?.length === 0 && !videoLoading) {
  //   return <p>Henüz webinar kaydı bulunmamaktadır</p>;
  // }

  return (
    <>
      <header className="bg-[#F3FDFF] min-h-[18rem] flex flex-col md:flex-row">
        <div className="max-w-sm mx-auto space-y-1 my-3 md:space-y-4 md:max-w-md md:py-4 lg:max-w-4xl lg:py-8 lg:px-3 lg:space-y-5">
          <h1 className="text-xl font-bold md:text-2xl lg:text-3xl">
            Webinar Arşivi
          </h1>
          <p className="italic text-lg">
            Şimdiye kadar gerçekleştirdiğimiz tüm webinarlar (online seminer) bu
            webinar arşivi içerisinde yer almaktadır. Güncel literatürden
            haberdar olabileceğiniz ve çeşitli konuları derinlemesine
            öğrenebileceğiniz 60-300 dakika arasındaki eğitim ve modülleri
            içerir. Sizler için özenle hazırlanmış webinar kayıtlarından
            dilediğinize kayıt olarak ömür boyu izleyebilirsiniz.
          </p>
        </div>
        <div
          ref={filterMenuRef}
          className="max-w-sm mx-auto space-x-8 flex items-center lg:space-x-14"
        >
          <div className="relative inline-block">
            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="flex items-center space-x-3 p-1 border-b-2 border-fottoOrange hover:border-b-4 hover:-mb-[1px] hover:opacity-90 hover:rounded-sm"
            >
              <span className="">Filtre</span>
              <AiOutlineDown />
            </button>

            {isFilterMenuOpen && (
              <div className="absolute rounded-md bg-[#DCFAFF] flex flex-col  select-none max-h-52 overflow-y-auto sm-scrollbar">
                {videoFilters.map((filter, index) => {
                  return (
                    <div
                      key={index}
                      className="relative rounded-md flex items-center space-x-1 px-3 hover:bg-[#d2f4fa] cursor-pointer"
                    >
                      <input
                        onChange={() => handleTags(filter.name)}
                        checked={selectedTags.includes(filter.name)}
                        value={filter.name}
                        type="checkbox"
                        name={`${filter.name}`}
                        id={`${filter.name}`}
                        className="relative peer shrink-0 appearance-none cursor-pointer w-4 h-4 py-1  rounded-sm bg-white checked:bg-slate-100 checked:border-0"
                      />
                      <label
                        htmlFor={`${filter.name}`}
                        className="w-full py-1 text-slate-600 cursor-pointer"
                      >
                        {filter.name}
                      </label>
                      <svg
                        className="absolute w-4 h-4 top-2 left-2 hidden peer-checked:block text-fottoOrange"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <button
            onClick={() => clearFilters()}
            className="text-fottoText text-sm hover:text-black"
          >
            Sıfırla
          </button>
        </div>
      </header>
      <section className="container mx-auto">
        <div className="px-24 flex my-6 space-x-2">
          {selectedTags.length > 0 &&
            selectedTags.map((tag, index) => {
              return (
                <button
                  onClick={() => handleTags(tag)}
                  key={index}
                  className="p-1 flex border rounded-lg items-center space-x-3 bg-gray-200 text-fottoText hover:opacity-80"
                >
                  <span>{tag}</span>
                  <AiOutlineCloseCircle className="text-black" />
                </button>
              );
            })}
        </div>
        <div className="bg-white rounded-2xl flex flex-wrap gap-16 px-24 py-8">
          {selectedTags.length
            ? filteredVideos.map((video) => {
                const { id, date, instructor, thumbnail, title, slug } = video;
                return (
                  <VideoItem
                    key={id}
                    date={date}
                    instructor={instructor}
                    thumbnail={thumbnail}
                    title={title}
                    slug={slug}
                  />
                );
              })
            : videos?.map((video) => {
                const { id, date, instructor, thumbnail, title, slug } = video;
                return (
                  <VideoItem
                    key={id}
                    date={date}
                    instructor={instructor}
                    thumbnail={thumbnail}
                    title={title}
                    slug={slug}
                  />
                );
              })}
          {showPlaceholder && (
            <div
              ref={ref}
              className="flex flex-wrap gap-16 items-center justify-center max-w-sm md:max-w-none lg:justify-start"
            >
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <Placeholder key={i} />
                ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default VideoList;
