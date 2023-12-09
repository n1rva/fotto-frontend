"use client";

import CertificateContext from "@/context/CertificateContext";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { useContext } from "react";

function VerifyCertificate() {
  const { verifyCertificate } = useContext(CertificateContext);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setNotFound(false);

    const response = await verifyCertificate(query);
    setLoading(false);

    if (response.success) {
      setCertificateData(response.data);
    } else {
      setCertificateData(null);
      setNotFound(true);
    }
  };

  return (
    <>
      <header className="bg-[#F3FDFF] min-h-[10rem]  flex flex-col md:flex-row md:min-h-[14rem] lg:min-h-[18rem]">
        <div className="max-w-sm mx-auto w-full space-y-1 my-3 md:space-y-4 md:max-w-md md:py-4 lg:max-w-4xl lg:py-8 lg:space-y-5 lg:mx-52">
          <h1 className="text-xl font-bold md:text-2xl lg:text-3xl">
            Sertifika Doğrulama
          </h1>
          <p className="italic md:text-lg">
            Fizyotto Live tarafından verilmiş bir sertifikaya sahipsen
            sertifikan üzerinde yer alan “Sertifika No” ile sertifikana her
            zaman ulaşabilirsin.
          </p>
        </div>
      </header>
      <section className="h-[60rem] space-y-16 px-3 mx-auto container max-w-lg flex flex-col items-center mt-12 bg-[#F9FEFF]/75 rounded-lg md:max-w-2xl lg:max-w-5xl">
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-2xl my-10">Sertifika Doğrula</h3>
          <div className="relative flex justify-center">
            <input
              type="text"
              name="verify"
              id="verify"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-8 p-3 pt-6 placeholder-transparent bg-white text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm md:w-64"
              placeholder="verify"
              autoComplete="off"
            />
            <label
              htmlFor="verify"
              className="absolute top-0 left-0 h-full px-3 py-2 text-sm text-fottoText transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
            >
              Sertifika no
            </label>
            <button
              onClick={handleVerify}
              className="rounded-lg px-4 py-1 bg-secBlue mx-2 hover:bg-opacity-80"
            >
              <span className="text-white font-medium text-sm ">
                {loading ? "Yükleniyor..." : "Sorgula"}
              </span>
            </button>
          </div>
        </div>
        {notFound && (
          <div className="flex flex-col items-center">
            <h3 className="font-medium text-lg text-red-500">
              Sertifika bulunamadı.
            </h3>
          </div>
        )}
        {certificateData && (
          <div className="flex flex-col max-w-md w-full border rounded-lg bg-white p-3">
            <div className="font-medium">
              <p>
                Sertifika no:{" "}
                <span className="font-normal">{certificateData.unique_id}</span>
              </p>
              <p>
                Webinar ismi:{" "}
                <span className="font-normal">{certificateData.title}</span>
              </p>
              <p>
                Veriliş tarihi:{" "}
                <span className="font-normal">
                  {moment(certificateData.date).format("DD/MM/YYYY")}
                </span>
              </p>
            </div>
            <Link
              href={`/certificates/${certificateData.unique_id}`}
              className="rounded-lg px-4 py-2 bg-secBlue w-fit self-center mt-10 hover:bg-opacity-80"
            >
              <span className="text-white font-medium text-sm ">Görüntüle</span>
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

export default VerifyCertificate;
