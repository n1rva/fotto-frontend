"use client";

import { useContext, useEffect, useState } from "react";
import Datetime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";
import { BsPlusCircle } from "react-icons/bs";

import AuthContext from "@/context/AuthContext";
import useDebounce from "@/utils/useDebounce";
import { IoMdCloseCircle } from "react-icons/io";
import VideoContext from "@/context/VideoContext";
import SingleVideoItem from "@/components/video/singleVideoItem";
import { toast } from "react-toastify";
import { toastProps } from "@/utils/toastProps";
import { useRouter } from "next/navigation";

function UpdateVideo({ id, access_token }) {
  const [title, setTitle] = useState(null);
  const [data, setData] = useState({
    sec1: { title: "", desc: "" },
  });
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(moment());
  const [instructor, setInstructor] = useState(null);
  const [instructorImage, setInstructorImage] = useState(null);

  const [thumbnail, setThumbnail] = useState(null);
  const [participants, setParticipants] = useState(null);

  const [previewThumbnail, setPreviewThumbnail] = useState(null);
  const [previewInstructorImage, setPreviewInstructorImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [participantInfo, setParticipantInfo] = useState([]);

  const [activeParticipant, setActiveParticipant] = useState(null);

  const [videoData, setVideoData] = useState(null);

  const [loading, setLoading] = useState(false);

  const { getVideo, updateVideo, getVideoParticipants } =
    useContext(VideoContext);
  const { searchUsers, searchResults, setSearchResults } =
    useContext(AuthContext);

  const router = useRouter();

  const debouncedSearchTerm = useDebounce(searchQuery, 200);

  useEffect(() => {
    const getSingleVideo = async () => {
      const response = await getVideo(id);

      if (response.success) {
        const { video } = response;

        setVideoData(video);

        setTitle(video.title);
        setData(video.description);
        setPrice(video.price);
        setDate(moment(video.date));
        setInstructor(video.instructor);
        setPreviewInstructorImage(video.instructor_image);

        setPreviewThumbnail(video.thumbnail);
        setParticipants(video.participants);
      }
    };

    getSingleVideo();
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
      const data = await getVideoParticipants(id, access_token);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await updateVideo(
      {
        videoID: id,
        title: title !== videoData.title ? title : undefined,
        data: data !== videoData.description ? data : undefined,
        price: price !== videoData.price ? price : undefined,
        date: date !== videoData.date ? date.format() : undefined,
        instructor:
          instructor !== videoData.instructor ? instructor : undefined,
        instructorImage:
          instructorImage instanceof File ? instructorImage : undefined,
        participants:
          participants !== videoData.participants ? participants : undefined,
        thumbnail: thumbnail instanceof File ? thumbnail : undefined,
      },
      access_token
    );

    if (response.success) {
      toast(response.message, {
        isLoading: false,
        type: "success",
        ...toastProps,
      });
      router.push("/fotto/video");
    }
    setLoading(false);
  };

  return (
    <div className="container flex flex-col items-center py-8">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="p-5 w-full flex flex-col select-none bg-[#F9FEFF] my-8 rounded-lg max-w-sm lg:max-w-fit lg:space-x-24 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] shadow-black/10"
      >
        <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:max-w-fit lg:space-x-24">
          <div className="flex flex-col space-y-5">
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor="webinarname" className="text-sm">
                Webinar kaydı adı
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
              <label htmlFor="webinarPhoto" className="text-sm">
                Thumbnail
              </label>
              <input
                type="file"
                name="webinarPhoto"
                id="webinarPhoto"
                onChange={thumbnailHandler}
                className="relative m-0 block w-full min-w-0 flex-auto border border-secBlue rounded-md bg-clip-padding px-3 py-[0.32rem] text-sm text-fottoText transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-fottoOrange file:px-3 file:py-[0.32rem] file:text-black file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-fottoOrange/70 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none lg:w-80"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-5">
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
              {loading ? "Yükleniyor..." : "Webinar Kaydı Ekle"}
            </span>
          </button>
        </div>
      </form>
      {showPreview && (
        <SingleVideoItem
          date={date}
          description={data}
          instructor={instructor}
          previewInstructorImage={previewInstructorImage}
          previewThumbnail={previewThumbnail}
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
                                className="py-2 px-3 flex flex-col text-sm font-medium text-gray-600 hover:bg-slate-100 w-full"
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

export default UpdateVideo;
