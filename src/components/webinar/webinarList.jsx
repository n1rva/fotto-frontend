"use client";

import WebinarItem from "@/components/webinar/webinarItem";
import WebinarContext from "@/context/WebinarContext";
import { useContext, useEffect, useRef, useState } from "react";
import Placeholder from "../placeholder";
import { AiOutlineCloseCircle, AiOutlineDown } from "react-icons/ai";

function WebinarList() {
  const {
    getAllWebinars,
    allWebinars,
    webinarFilters,
    getWebinarsByTag,
    filteredWebinars,
    getFilters,
    webinarLoading,
    webinarError,
  } = useContext(WebinarContext);

  const [isFilterModeOn, setIsFilterModeOn] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const [showPlaceholder, setShowPlaceholder] = useState(true);

  useEffect(() => {
    const fetchWebinars = async () => {
      await getAllWebinars();

      setShowPlaceholder(false);
    };
    getFilters();
    fetchWebinars();
  }, []);

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

  useEffect(() => {
    getWebinarsByTag(selectedTags);
  }, [selectedTags]);

  const handleTags = (tagName) => {
    if (selectedTags.includes(tagName)) {
      let newTags = selectedTags.filter((e) => e !== tagName);

      if (newTags.length === 0) {
        setIsFilterModeOn(false);
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

  return (
    <>
      <header className="bg-[#F3FDFF] min-h-[18rem] flex flex-col md:flex-row">
        <div className="max-w-sm mx-auto space-y-1 my-3 md:space-y-4 md:max-w-md md:py-4 lg:max-w-4xl lg:py-8 lg:px-3 lg:space-y-5">
          <h1 className="text-xl font-bold md:text-2xl lg:text-3xl">
            Planlanan Webinarlar
          </h1>
          <p className="italic text-lg">
            Webinarlara canlı olarak katılım sağlayıp hemen öğrenmeye
            başlayabilirsiniz. Konusunda uzman eğitmenlerden, çeşitli konularda
            detaylı ve interaktif içerikler sunan webinarlar içermektedir. Bir
            online eğitimi tamamlayan katılımcılar fizyottolive internet sitesi
            üzerinden sorgulanabilir sertifikalar almaya hak kazanacaktır.
            Bilgilerinizi ve kariyerinizi geliştirmek artık bir tık uzağınızda!
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
              <div className="absolute rounded-md bg-[#DCFAFF] flex flex-col select-none max-h-52 overflow-y-auto sm-scrollbar">
                {webinarFilters.map((filter, index) => {
                  return (
                    <div
                      key={index}
                      className="relative rounded-md flex items-center space-x-1 px-3 hover:bg-[#d2f4fa] cursor-pointer "
                    >
                      <input
                        onChange={() => handleTags(filter.name)}
                        checked={selectedTags.includes(filter.name)}
                        value={filter.name}
                        type="checkbox"
                        name={`${filter.name}`}
                        id={`${filter.name}`}
                        className="relative peer shrink-0 appearance-none cursor-pointer w-4 h-4 py-1 rounded-sm bg-white checked:bg-slate-100 checked:border-0"
                      />
                      <label
                        htmlFor={`${filter.name}`}
                        className="w-full py-1 text-slate-600 cursor-pointer whitespace-nowrap"
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
            ? filteredWebinars.map((webinar) => {
                const { id, date, instructor, image, title, slug } = webinar;
                return (
                  <WebinarItem
                    key={id}
                    date={date}
                    instructor={instructor}
                    image={image}
                    title={title}
                    slug={slug}
                  />
                );
              })
            : allWebinars?.map((webinar) => {
                const { id, date, instructor, image, title, slug } = webinar;
                return (
                  <WebinarItem
                    key={id}
                    date={date}
                    instructor={instructor}
                    image={image}
                    title={title}
                    slug={slug}
                  />
                );
              })}
          {showPlaceholder && (
            <div className="flex flex-wrap gap-12 items-center justify-center max-w-sm md:max-w-none lg:justify-start">
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

export default WebinarList;
