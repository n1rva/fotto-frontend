"use client";

import { toastProps } from "@/utils/toastProps";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function PassResetConfirmForm() {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [resetToken, setResetToken] = useState("");

  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    setResetToken(token);
  }, []);

  const resetPassword = async () => {
    const response = await fetch(
      `${process.env.API_URL}/api/v1/password_reset/confirm/?token=${resetToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword, token: resetToken }),
      }
    );

    if (response.ok) {
      toast("Şifreniz başarıyla değiştirildi", {
        isLoading: false,
        type: "success",
        ...toastProps,
      });
    } else {
      toast.error(
        "Şifreniz değiştirilemedi. Şifre sıfırlama maili süresi dolmuş."
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    resetPassword();
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="w-full flex flex-col select-none py-16 bg-[#F9FEFF] rounded-lg max-w-sm md:items-center md:max-w-md lg:max-w-lg shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] shadow-black/10"
    >
      <div className="text-xl font-medium px-6">Şifrenizi değiştirin</div>
      <div className="px-6 py-12 flex flex-col space-y-6 md:items-center">
        <div className="relative">
          <input
            type="password"
            name="password"
            id="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full h-12 p-3 pt-6 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm md:w-80"
            placeholder="password"
            autoComplete="off"
          />
          <label
            htmlFor="password"
            className="absolute top-0 left-0 h-full px-3 py-3 text-sm text-fottoText transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
          >
            Yeni Şifre
          </label>
        </div>
        <div className="relative">
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            className="w-full h-12 p-3 pt-6 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm md:w-80"
            placeholder="newPassword"
            autoComplete="off"
          />
          <label
            htmlFor="newPassword"
            className="absolute top-0 left-0 h-full px-3 py-3 text-sm text-fottoText transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
          >
            Yeni Şifre Tekrar
          </label>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <button
          type="submit"
          className="rounded-lg px-4 py-2 bg-secBlue hover:bg-opacity-70"
        >
          <span className="text-white font-medium text-sm ">Değiştir</span>
        </button>
      </div>
    </form>
  );
}

export default PassResetConfirmForm;
