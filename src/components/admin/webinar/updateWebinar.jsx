"use client";

import { useContext, useEffect, useRef, useState } from "react";
import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { BsPlusCircle, BsPlusLg } from "react-icons/bs";
import WebinarContext from "@/context/WebinarContext";
import SingleWebinarItem from "@/components/webinar/singleWebinarItem";
import AuthContext from "@/context/AuthContext";
import useDebounce from "@/utils/useDebounce";
import { IoMdCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";
import { toastProps } from "@/utils/toastProps";
import { useRouter } from "next/navigation";
import { MdOutlineClose } from "react-icons/md";

function UpdateWebinar({ id, access_token }) {
  const [title, setTitle] = useState("");
  const [data, setData] = useState({
    sec1: { title: "", desc: "" },
  });
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(moment());
  const [instructor, setInstructor] = useState("");
  const [instructorImage, setInstructorImage] = useState(undefined);
  const [tags, setTags] = useState(undefined);
  const [sourceCertificate, setSourceCertificate] = useState(undefined);
  const [webinarImage, setWebinarImage] = useState(undefined);
  const [participants, setParticipants] = useState(undefined);
  const [certAdded, setCertAdded] = useState(false);
  const [wpGroupUrl, setWpGroupUrl] = useState("");

  const [previewWebinarImage, setPreviewWebinarImage] = useState(undefined);
  const [previewInstructorImage, setPreviewInstructorImage] =
    useState(undefined);
  const [showPreview, setShowPreview] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [participantInfo, setParticipantInfo] = useState([]);

  const [activeParticipant, setActiveParticipant] = useState(undefined);

  const [webinarData, setWebinarData] = useState(undefined);

  const [newFilters, setNewFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [filterResults, setFilterResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const searchFilterRef = useRef(null);

  const router = useRouter();

  const {
    getWebinarByWebinarId,
    updateWebinar,
    getWebinarParticipants,
    searchFilters,
    info,
    setInfo,
    webinarError,
    clearWebinarErrors,
  } = useContext(WebinarContext);

  const {
    searchUsers,
    searchResults,
    setSearchResults,
    getUserByID,
    error,
    clearErrors,
  } = useContext(AuthContext);

  const debouncedSearchTerm = useDebounce(searchQuery, 200);

  useEffect(() => {
    if (webinarError) {
      toast.error(webinarError);
      clearWebinarErrors();
    }
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [webinarError, error]);

  useEffect(() => {
    const getWebinar = async () => {
      const webinar = await getWebinarByWebinarId(id);

      const webinarTags = webinar.tags.map((e) => {
        return e.name;
      });

      webinar.tags = webinarTags;

      if (webinar) {
        setWebinarData(webinar);

        setTitle(webinar.title);
        setData(webinar.description);
        setPrice(webinar.price);
        setDate(moment(webinar.date));
        setInstructor(webinar.instructor);
        setPreviewInstructorImage(webinar.instructor_image);
        setNewFilters(webinarTags);
        setSourceCertificate(webinar.source_certificate);
        setPreviewWebinarImage(webinar.image);
        setParticipants(webinar.participants);
        setCertAdded(webinar.certificates_added);
        setWpGroupUrl(webinar.wp_group_url);
      }
    };

    getWebinar();
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm.length > 2 && searchQuery !== selectedUser) {
      handleUserSearch(debouncedSearchTerm);
      // setSearchIsLoading(false);
    } else {
      // setSearchIsLoading(false);
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

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

  const handleUserSearch = async (query) => {
    const response = await searchUsers(query, access_token);
  };

  const checkUserWhetherParticipant = async (user) => {
    participants.some((e) => {
      if (e.id === user.id) return true;
      else return false;
    });
  };

  const addParticipant = (user) => {
    setParticipants((prev) => prev.concat(user.id));

    setParticipantInfo((prev) => prev.concat(user));
  };

  const handleParticipantHover = (participant) => {
    setActiveParticipant(participant);
  };

  const handleParticipantLeave = () => {
    setActiveParticipant(null);
  };

  useEffect(() => {
    const getParticipants = async () => {
      const data = await getWebinarParticipants(id, access_token);

      setParticipantInfo(data.participants);
    };
    getParticipants();
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);

    setSearchResults([]);
  };

  const deleteParticipant = (participantID) => {
    setParticipantInfo((prevParticipants) =>
      prevParticipants.filter((participant) => participant.id !== participantID)
    );

    setParticipants((prevParticipants) =>
      prevParticipants.filter((participant) => participant !== participantID)
    );
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

  const debouncedFilterTerm = useDebounce(filterQuery, 200);

  useEffect(() => {
    if (debouncedFilterTerm.length > 2) {
      searchFilterByQuery(debouncedFilterTerm);
      // setSearchIsLoading(false);
    } else {
      // setSearchIsLoading(false);
      setFilterResults([]);
    }
  }, [debouncedFilterTerm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await updateWebinar(
      {
        webinarID: id,
        title: title !== webinarData.title ? title : undefined,
        data: data !== webinarData.description ? data : undefined,
        price: price !== webinarData.price ? price : undefined,
        date: date !== webinarData.date ? date.format() : undefined,
        instructor:
          instructor !== webinarData.instructor ? instructor : undefined,
        instructorImage:
          instructorImage instanceof File ? instructorImage : undefined,
        tags:
          newFilters.concat(selectedFilters) !== webinarData.tags
            ? newFilters.concat(selectedFilters)
            : undefined,
        participants:
          participants !== webinarData.participants ? participants : undefined,
        sourceCertificate:
          sourceCertificate instanceof File ? sourceCertificate : undefined,
        webinarImage: webinarImage instanceof File ? webinarImage : undefined,
        certAdded:
          certAdded !== webinarData.certificates_added ? certAdded : undefined,
        wpGroupUrl:
          wpGroupUrl !== webinarData.wp_group_url ? wpGroupUrl : undefined,
      },
      access_token
    );

    if (response.success) {
      toast(response.message, {
        isLoading: false,
        type: "success",
        ...toastProps,
      });
      router.push("/fotto/webinar");
    }
    setLoading(false);
  };

  return (
    <div className="container flex flex-col items-center py-8">
      <h1 className="text-lg font-medium md:text-2xl">Webinarı düzenle</h1>
      <form
        method="post"
        onSubmit={handleSubmit}
        className="p-5 w-full flex flex-col select-none bg-[#F9FEFF] rounded-lg max-w-sm my-8 lg:max-w-fit lg:space-x-24 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] shadow-black/10"
      >
        <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:max-w-fit lg:space-x-24">
          <div className="flex flex-col space-y-5">
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor="webinarname" className="text-sm">
                Webinar adı
              </label>
              <input
                type="text"
                name="webinarname"
                id="webinarname"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
            <div className="space-y-3">
              <h3 className="text-sm">Sertifikalar</h3>
              <div className="flex space-x-2 mx-1">
                <input
                  type="checkbox"
                  name="certAdded"
                  id="certAdded"
                  checked={certAdded}
                  onChange={(e) => setCertAdded(e.target.checked)}
                  className="relative"
                />
                <label htmlFor="certAdded" className="text-sm">
                  Sertifikalar eklendi
                </label>
              </div>
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
            <div className="flex flex-col space-y-3">
              <label htmlFor="participants" className="text-sm">
                Katılımcılar
              </label>
              <button
                type="button"
                onClick={() => setShowParticipantsModal(true)}
                className="w-fit text-white rounded-lg px-4 py-2 bg-secBlue hover:bg-opacity-70"
              >
                Düzenle
              </button>
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
                    onChange={(e) =>
                      handleDescChange(sectionKey, e.target.value)
                    }
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
        </div>
        <div className="flex flex-col items-center space-y-6">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="rounded-lg px-4 py-2 bg-fottoText hover:bg-opacity-70"
          >
            <span className="text-white font-medium text-sm ">Önizle</span>
          </button>
          <button
            type="submit"
            className={`rounded-lg px-4 py-2 hover:bg-opacity-70 ${
              loading
                ? "cursor-not-allowed bg-gray-500"
                : "cursor-pointer bg-secBlue"
            }`}
          >
            <span className={`text-white font-medium text-sm`}>
              {loading ? "Yükleniyor..." : "Webinar Güncelle"}
            </span>
          </button>
        </div>
      </form>
      {showPreview && (
        <SingleWebinarItem
          date={date}
          description={data}
          instructor={instructor}
          instructorImage={previewInstructorImage}
          image={previewWebinarImage}
          price={price}
          title={title}
        />
      )}

      {showParticipantsModal && (
        <>
          <div
            className={`fixed flex justify-center items-center w-full h-full left-0 top-0 bg-fottoText backdrop-blur-sm bg-opacity-70 z-40 ${
              showParticipantsModal ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div
              onClick={() => setShowParticipantsModal(false)}
              className="absolute top-0 left-0 w-full h-full"
            />
            <div
              className={`fixed z-50 bg-fottoWhite border rounded-lg font-medium p-2 h-[40rem] overflow-auto`}
            >
              <div className="flex flex-col-reverse p-3 w-full lg:space-x-10 lg:flex-row">
                <div className="">
                  <h3 className="my-4 font-medium text-lg">Katılımcılar</h3>
                  <ul className="flex flex-col border border-fottoOrange rounded-lg min-w-[25rem] ">
                    {participantInfo.map((participant, index) => (
                      <li
                        key={index}
                        className="p-2 rounded-md text-sm cursor-default hover:bg-slate-200"
                        onMouseEnter={() => handleParticipantHover(participant)}
                        onMouseLeave={handleParticipantLeave}
                      >
                        <div className="flex">
                          <span className="flex-grow">{`${participant.first_name} ${participant.last_name}`}</span>
                          <button
                            onClick={() => deleteParticipant(participant.id)}
                          >
                            <IoMdCloseCircle className="h-6 w-6 fill-red-700 hover:fill-red-600" />
                          </button>
                        </div>
                        {activeParticipant === participant && (
                          <div className="absolute bg-white p-2 shadow-lg rounded-lg">
                            <span>{participant.email}</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col lg:space-y-8">
                  <div className="relative my-3 ">
                    <div className="space-y-5">
                      <label
                        htmlFor="addParticipants"
                        className="text-lg font-medium my-3"
                      >
                        Katılımcı ekle
                      </label>
                      <input
                        type="search"
                        id="addParticipants"
                        name="addParticipants"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        className="relative m-0 block w-full min-w-0 flex-auto border border-secBlue rounded-md bg-clip-padding px-3 py-[0.32rem] text-sm text-fottoText transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-fottoOrange file:px-3 file:py-[0.32rem] file:text-black file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-fottoOrange/70 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none lg:w-80"
                      />
                    </div>
                    <div className="absolute mt-2 w-full overflow-hidden rounded-md bg-white">
                      <div className="cursor-pointer ">
                        {searchResults?.map((user) => {
                          if (!checkUserWhetherParticipant(user)) return;
                          else
                            return (
                              <button
                                type="button"
                                onClick={() => handleSelectUser(user)}
                                className="py-2 px-3 flex flex-col text-sm font-medium text-gray-600 w-full hover:bg-slate-100"
                              >
                                <span>{`${user.first_name} ${user.last_name}`}</span>
                                <span>{`${user.email}`}</span>
                              </button>
                            );
                        })}
                      </div>
                    </div>
                  </div>
                  {selectedUser && (
                    <div className="flex flex-col my-4 space-y-3">
                      <h3 className="font-medium">Seçilen kullanıcı</h3>
                      <div className="flex  text-sm font-medium text-gray-600">
                        {`${selectedUser.first_name} ${selectedUser.last_name} - ${selectedUser.email}`}
                      </div>
                      <button
                        type="button"
                        onClick={() => addParticipant(selectedUser)}
                        className="text-white w-fit rounded-lg px-3 py-2 bg-secBlue hover:bg-opacity-70"
                      >
                        Ekle
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UpdateWebinar;
