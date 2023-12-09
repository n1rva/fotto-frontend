"use client";

import AuthContext from "@/context/AuthContext";
import CertificateContext from "@/context/CertificateContext";
import VideoContext from "@/context/VideoContext";
import { toastProps } from "@/utils/toastProps";
import useDebounce from "@/utils/useDebounce";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

function AddCertificateForVideo({ access_token }) {
  const [name, setName] = useState("");
  const [fontSize, setFontSize] = useState(20);
  const [color, setColor] = useState("#000000");
  const [yAxis, setYAxis] = useState(4);
  const [maxTextWidth, setMaxTextWidth] = useState(7.5);
  const [maxFontSize, setMaxFontSize] = useState(50);
  const [video, setVideo] = useState(undefined);
  const [font, setFont] = useState("");

  const [id_xAxis, setId_xAxis] = useState(2.4);
  const [id_yAxis, setId_yAxis] = useState(2);
  const [id_font, setId_font] = useState("");
  const [id_fontSize, setId_fontSize] = useState(12);
  const [id_color, setId_color] = useState("#000000");

  const [qr_x, setQr_x] = useState(2.4);
  const [qr_y, setQr_y] = useState(2);
  const [qr_size, setQr_size] = useState(1);
  const [qr_bg, setQr_bg] = useState("#000000");
  const [qr_fg, setQr_fg] = useState("#000000");

  const [showFontFileInput, setShowFontFileInput] = useState(false);

  const [enableAddBtn, setEnableAddBtn] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    previewedCertificate,
    createAndPreviewCertificate,
    certificateLoading,
    certificateError,
    clearCertificateErrors,
    createCertificateForVideoParticipants,
    createCertificateByUserID,
  } = useContext(CertificateContext);

  const { allVideos, getAllVideos } = useContext(VideoContext);

  const { searchUsers, searchResults, setSearchResults, error, clearErrors } =
    useContext(AuthContext);

  const debouncedSearchTerm = useDebounce(searchQuery, 200);

  useEffect(() => {
    if (certificateError) {
      toast.error(certificateError);
      clearCertificateErrors();
    }
  }, [certificateError]);

  const handleUserSearch = async (query) => {
    const response = await searchUsers(query, access_token);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);

    setSearchResults([]);
  };

  useEffect(() => {
    getAllVideos();
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

  const fontHandler = (e) => {
    setFont(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    createAndPreviewCertificate(
      {
        name,
        fontSize,
        color,
        yAxis,
        maxTextWidth,
        maxFontSize,
        font,
        source: video,
        id_xAxis,
        id_yAxis,
        id_fontSize,
        id_font,
        id_color,
        qr_x,
        qr_y,
        qr_size,
        qr_bg,
        qr_fg,
        certificate_type: "video",
      },
      access_token
    );
  };

  const createCertificatesForParticipants = async () => {
    setLoading(true);
    const response = await createCertificateForVideoParticipants(
      {
        fontSize,
        color,
        yAxis,
        maxTextWidth,
        maxFontSize,
        font,
        video,
        id_xAxis,
        id_yAxis,
        id_fontSize,
        id_font,
        id_color,
        qr_x,
        qr_y,
        qr_size,
        qr_bg,
        qr_fg,
      },
      access_token
    );

    if (response.success) {
      router.push("/fotto/certificate");

      toast(response.message, {
        isLoading: false,
        type: "success",
        ...toastProps,
      });
    }
    setLoading(false);
  };

  const createForUser = async (userID) => {
    const response = await createCertificateByUserID(
      {
        userID,
        fontSize,
        color,
        yAxis,
        maxTextWidth,
        maxFontSize,
        font,
        source: video,
        id_xAxis,
        id_yAxis,
        id_fontSize,
        id_font,
        id_color,
        qr_x,
        qr_y,
        qr_size,
        qr_bg,
        qr_fg,
        certificate_type: "video",
      },
      access_token
    );

    if (response.success) {
      router.push("/fotto/certificate");

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
        className="p-5 my-20 w-full flex flex-col select-none bg-[#F9FEFF] rounded-lg max-w-sm space-y-6 lg:max-w-fit lg:space-y-24 shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] shadow-black/10"
      >
        <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:max-w-fit lg:space-x-24">
          <div className="flex flex-col space-y-5">
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor="webinarname" className="text-sm">
                Yazı
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 p-3 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
                placeholder="name"
                autoComplete="off"
              />
            </div>
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor="price" className="text-sm">
                Minimum yazı tipi büyüklüğü
              </label>
              <input
                type="number"
                name="fontSize"
                id="fontSize"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-full h-12 p-3 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
                placeholder="fontSize"
                autoComplete="off"
              />
            </div>
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor="maxFontSize" className="text-sm">
                Maksimum yazı tipi büyüklüğü
              </label>
              <input
                type="number"
                name="maxFontSize"
                id="maxFontSize"
                value={maxFontSize}
                onChange={(e) => setMaxFontSize(e.target.value)}
                className="w-full h-12 p-3 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
                placeholder="maxFontSize"
                autoComplete="off"
              />
            </div>
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor="maxTextWidth" className="text-sm">
                Maksimum yazı genişliği
              </label>
              <input
                type="number"
                name="maxTextWidth"
                id="maxTextWidth"
                value={maxTextWidth}
                onChange={(e) => setMaxTextWidth(e.target.value)}
                className="w-full h-12 p-3 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
                placeholder="maxTextWidth"
                step={0.1}
                autoComplete="off"
              />
            </div>
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor="yAxis" className="text-sm">
                İsmin y ekseni konumu
              </label>
              <input
                type="number"
                name="yAxis"
                id="yAxis"
                value={yAxis}
                onChange={(e) => setYAxis(e.target.value)}
                className="w-full h-12 p-3 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
                placeholder="yAxis"
                step={0.1}
                autoComplete="off"
              />
            </div>
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor="color" className="text-sm">
                Yazı rengi
              </label>
              <input
                type="color"
                name="color"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className=" h-12 bg-transparent rounded-md peer focus:outline-none focus:shadow-sm"
              />
            </div>
            <div className="relative space-y-3 flex flex-col">
              <label
                htmlFor={`${showFontFileInput ? "fontFile" : "fontType"}`}
                className="text-sm"
              >
                Yazı tipi
              </label>
              <div className={`${showFontFileInput ? "hidden" : "block"}`}>
                <select
                  name="fontType"
                  id="fontType"
                  value={font}
                  onChange={(e) => setFont(e.target.value)}
                  className="p-2 pr-9 block w-full border border-iconBlue rounded-lg text-sm outline-none focus:border-fottoOrange"
                >
                  <option disabled selected value="">
                    Seçiniz
                  </option>
                  <option value="LibreBaskerville-Bold.ttf">
                    LibreBaskerville-Bold
                  </option>
                  <option value="LibreBaskerville-Italic.ttf">
                    LibreBaskerville-Italic
                  </option>
                  <option value="LibreBaskerville-Regular.ttf">
                    LibreBaskerville-Regular
                  </option>
                  <option value="Merriweather-Bold.ttf">
                    Merriweather-Bold
                  </option>
                  <option value="Merriweather-Italic.ttf">
                    Merriweather-Italic
                  </option>
                  <option value="Merriweather-Regular.ttf">
                    Merriweather-Regular
                  </option>
                  <option value="AlegreyaSans-Bold.ttf">
                    AlegreyaSans-Bold
                  </option>
                  <option value="KaushanScript-Regular.ttf">
                    KaushanScript-Regular
                  </option>
                  <option value="Lobster-Regular.ttf">Lobster-Regular</option>
                  <option value="LucienSchoenschriftv-Regular.ttf">
                    LucienSchoenschriftv-Regular
                  </option>
                  <option value="Nunito-Bold.ttf">Nunito-Bold</option>
                </select>
              </div>
              <input
                type="file"
                name="fontFile"
                id="fontFile"
                onChange={fontHandler}
                className={`${
                  showFontFileInput ? "block" : "hidden"
                } relative m-0 block w-full min-w-0 flex-auto border border-secBlue rounded-md bg-clip-padding px-3 py-[0.32rem] text-sm text-fottoText transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-fottoOrange file:px-3 file:py-[0.32rem] file:text-black file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-fottoOrange/70 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none lg:w-80`}
              />
              <div className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  name="showInput"
                  id="showInput"
                  value={showFontFileInput}
                  onChange={() => setShowFontFileInput(!showFontFileInput)}
                />
                <label htmlFor="showInput" className="text-sm">
                  Font dosyası
                </label>
              </div>
            </div>
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor="video" className="text-sm">
                Webinar kaydı
              </label>
              <select
                name="video"
                id="video"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                className="p-2 pr-9 block w-full border border-iconBlue rounded-lg text-sm outline-none focus:border-fottoOrange"
              >
                <option disabled selected value="">
                  Seçiniz
                </option>
                {allVideos?.map((e) => {
                  return (
                    <option value={e.id} className="cursor-pointer text-sm">
                      {e.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="relative my-3 ">
              {selectedUser ? (
                <div className="space-y-5">
                  <label htmlFor="selectedUser" className="text-sm">
                    Kullanıcı için ekle
                  </label>
                  <div className="flex items-center border border-iconBlue rounded-full px-2 py-1 w-fit bg-white">
                    <span>
                      {selectedUser.first_name + " " + selectedUser.last_name}
                    </span>

                    <button
                      onClick={() => setSelectedUser("")}
                      className="mx-3 p-1 w-fit h-fit"
                    >
                      <IoMdClose className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="rounded-lg px-4 py-2 w-fit bg-secBlue hover:bg-opacity-70"
                    onClick={() => createForUser(selectedUser.id)}
                  >
                    <span className="text-white font-medium text-sm ">
                      Ekle
                    </span>
                  </button>
                </div>
              ) : (
                <div>
                  <div className="space-y-5">
                    <label htmlFor="user" className="text-sm">
                      Kullanıcı için ekle
                    </label>
                    <input
                      type="search"
                      id="user"
                      name="user"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      value={searchQuery}
                      className="relative m-0 block w-full min-w-0 flex-auto border border-secBlue rounded-md bg-clip-padding px-3 py-[0.32rem] text-sm text-fottoText transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-fottoOrange file:px-3 file:py-[0.32rem] file:text-black file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-fottoOrange/70 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none lg:w-80"
                    />
                  </div>
                  <div className="absolute mt-2 w-full overflow-hidden rounded-md bg-white">
                    <div className="cursor-pointer ">
                      {searchResults?.map((user) => {
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
              )}
            </div>
          </div>
          <div className="flex flex-col space-y-5">
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor="id_xAxis" className="text-sm">
                Sertifika no x ekseni konumu
              </label>
              <input
                type="number"
                name="id_xAxis"
                id="id_xAxis"
                value={id_xAxis}
                onChange={(e) => setId_xAxis(e.target.value)}
                className="w-full h-12 p-3 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
                placeholder="id_xAxis"
                step={0.1}
                autoComplete="off"
              />
            </div>
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor="id_yAxis" className="text-sm">
                Sertifika no y ekseni konumu
              </label>
              <input
                type="number"
                name="id_yAxis"
                id="id_yAxis"
                value={id_yAxis}
                onChange={(e) => setId_yAxis(e.target.value)}
                className="w-full h-12 p-3 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
                placeholder="id_yAxis"
                step={0.1}
                autoComplete="off"
              />
            </div>
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor={`id_font`} className="text-sm">
                Sertifika no yazı tipi
              </label>
              <div>
                <select
                  name="id_font"
                  id="id_font"
                  value={id_font}
                  onChange={(e) => setId_font(e.target.value)}
                  className="p-2 pr-9 block w-full border border-iconBlue rounded-lg text-sm outline-none focus:border-fottoOrange"
                >
                  <option disabled selected value="">
                    Seçiniz
                  </option>
                  <option value="LibreBaskerville-Bold.ttf">
                    LibreBaskerville-Bold
                  </option>
                  <option value="LibreBaskerville-Italic.ttf">
                    LibreBaskerville-Italic
                  </option>
                  <option value="LibreBaskerville-Regular.ttf">
                    LibreBaskerville-Regular
                  </option>
                  <option value="Merriweather-Bold.ttf">
                    Merriweather-Bold
                  </option>
                  <option value="Merriweather-Italic.ttf">
                    Merriweather-Italic
                  </option>
                  <option value="Merriweather-Regular.ttf">
                    Merriweather-Regular
                  </option>
                  <option value="AlegreyaSans-Bold.ttf">
                    AlegreyaSans-Bold
                  </option>
                  <option value="KaushanScript-Regular.ttf">
                    KaushanScript-Regular
                  </option>
                  <option value="Lobster-Regular.ttf">Lobster-Regular</option>
                  <option value="LucienSchoenschriftv-Regular.ttf">
                    LucienSchoenschriftv-Regular
                  </option>
                  <option value="Nunito-Bold.ttf">Nunito-Bold</option>
                </select>
              </div>
            </div>
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor="id_fontSize" className="text-sm">
                Sertifika no yazı tipi büyüklüğü
              </label>
              <input
                type="number"
                name="id_fontSize"
                id="id_fontSize"
                value={id_fontSize}
                onChange={(e) => setId_fontSize(e.target.value)}
                className="w-full h-12 p-3 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
                placeholder="id_fontSize"
                autoComplete="off"
              />
            </div>
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor="id_color" className="text-sm">
                Sertifika no yazı rengi
              </label>
              <input
                type="color"
                name="id_color"
                id="id_color"
                value={id_color}
                onChange={(e) => setId_color(e.target.value)}
                className=" h-12 bg-transparent rounded-md peer focus:outline-none focus:shadow-sm"
              />
            </div>
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor="qr_x" className="text-sm">
                QR kod x ekseni konumu
              </label>
              <input
                type="number"
                name="qr_x"
                id="qr_x"
                value={qr_x}
                onChange={(e) => setQr_x(e.target.value)}
                className="w-full h-12 p-3 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
                placeholder="id_xAxis"
                step={0.1}
                autoComplete="off"
              />
            </div>
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor="qr_y" className="text-sm">
                QR kod y ekseni konumu
              </label>
              <input
                type="number"
                name="qr_y"
                id="qr_y"
                value={qr_y}
                step={0.1}
                onChange={(e) => setQr_y(e.target.value)}
                className="w-full h-12 p-3 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
                placeholder="qr_y"
                autoComplete="off"
              />
            </div>
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor="qr_size" className="text-sm">
                QR kod büyüklüğü
              </label>
              <input
                type="number"
                name="qr_size"
                id="qr_size"
                value={qr_size}
                onChange={(e) => setQr_size(e.target.value)}
                className="w-full h-12 p-3 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm lg:w-80"
                placeholder="qr_size"
                step={0.1}
                autoComplete="off"
              />
            </div>
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor="qr_fg" className="text-sm">
                QR kod ön plan rengi
              </label>
              <input
                type="color"
                name="qr_fg"
                id="qr_fg"
                value={qr_fg}
                onChange={(e) => setQr_fg(e.target.value)}
                className=" h-12 bg-transparent rounded-md peer focus:outline-none focus:shadow-sm"
              />
            </div>
            <div className="relative space-y-3 flex flex-col">
              <label htmlFor="qr_bg" className="text-sm">
                QR kod arka plan rengi
              </label>
              <input
                type="color"
                name="qr_bg"
                id="qr_bg"
                value={qr_bg}
                onChange={(e) => setQr_bg(e.target.value)}
                className=" h-12 bg-transparent rounded-md peer focus:outline-none focus:shadow-sm"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end space-y-6 lg:justify-start lg:items-end lg:flex-row lg:space-y-0 lg:space-x-6">
          <button
            type="submit"
            className="rounded-lg px-4 py-2 w-fit bg-secBlue hover:bg-opacity-70"
          >
            <span className="text-white font-medium text-sm ">Önizle</span>
          </button>
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-1">
              <input
                type="checkbox"
                name="showAddToUsers"
                id="showAddToUsers"
                value={enableAddBtn}
                onChange={() => setEnableAddBtn(!enableAddBtn)}
              />
              <label htmlFor="showAddToUsers" className="text-sm">
                Ödeme yapmış kullanıcılar için ekle
              </label>
            </div>
            <button
              type="button"
              onClick={createCertificatesForParticipants}
              className={` ${
                enableAddBtn
                  ? "block bg-secBlue hover:bg-opacity-70"
                  : "cursor-not-allowed bg-fottoText"
              } rounded-lg px-4 py-2 w-fit `}
            >
              <span className={`text-white font-medium text-sm`}>
                {loading ? "Yükleniyor..." : "Sertifika ekle"}
              </span>
            </button>
          </div>
        </div>
      </form>
      <div className="p-4 w-full h-[25rem] lg:h-[60rem]">
        {previewedCertificate && (
          <object
            data={previewedCertificate}
            type="application/pdf"
            className="w-full h-full"
          ></object>
        )}
      </div>
    </div>
  );
}

export default AddCertificateForVideo;
