"use client";

import { toastProps } from "@/utils/toastProps";
import { useState } from "react";
import { toast } from "react-toastify";

function PassResetForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendResetMail = async () => {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/password_reset/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (response.ok) {
      setLoading(false);
      toast("Şifre sıfırlama maili gönderildi.", {
        isLoading: false,
        type: "success",
        ...toastProps,
      });
    } else {
      setLoading(false);
      toast.error("Bu mail adresi ile kullanıcı yok.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    sendResetMail();
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="w-full flex flex-col select-none py-16 bg-[#F9FEFF] rounded-lg max-w-sm md:items-center md:max-w-md lg:max-w-lg shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] shadow-black/10"
    >
      <div className="text-xl font-medium px-6">Şifrenizi mi unuttunuz?</div>
      <div className="px-6 py-12 flex flex-col space-y-6 md:items-center">
        <div className="relative">
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 p-3 pt-6 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm md:w-80"
            placeholder="email"
            autoComplete="off"
          />
          <label
            htmlFor="email"
            className="absolute top-0 left-0 h-full px-3 py-3 text-sm text-fottoText transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
          >
            Email
          </label>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <button
          type="submit"
          className="rounded-lg px-4 py-2 bg-secBlue hover:bg-opacity-70"
        >
          <span className="text-white font-medium text-sm ">
            {loading ? "Yükleniyor..." : "Sorgula"}
          </span>
        </button>
      </div>
    </form>
  );
}

export default PassResetForm;
