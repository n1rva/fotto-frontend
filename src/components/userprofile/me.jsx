"use client";

import AuthContext from "@/context/AuthContext";
import { capitalizeFirstLetter } from "@/utils/capitilalizeFirstLetter";
import { toastProps } from "@/utils/toastProps";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Me({ access_token }) {
  // State for user information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mailError, setMailError] = useState("");

  // State for password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const {
    user,
    updateProfile,
    updatePassword,
    error,
    clearErrors,
    updated,
    setUpdated,
  } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (updated) {
      setUpdated(false);

      toast("Kullanıcı bilgileri güncellendi.", {
        isLoading: false,
        type: "success",
        ...toastProps,
      });
    }
  }, [error, updated]);

  const emailValidate = (mail) => {
    let regEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validate = regEmail.test(mail);

    validate
      ? setMailError("")
      : setMailError("Geçerli bir mail adresi giriniz.");
  };

  const handlePasswordConfirm = (pass) => {
    setConfirmNewPassword(pass);

    if (newPassword === pass) setPasswordError("");
    else {
      setPasswordError("Şifreler aynı değil");
    }
  };

  const handleInfo = (e) => {
    e.preventDefault();

    updateProfile({ firstName, lastName, email }, access_token);
  };

  const handlePass = (e) => {
    e.preventDefault();

    updatePassword(
      { currentPassword, newPassword, confirmNewPassword },
      access_token
    );
  };
  return (
    <section className="w-full flex flex-col select-none py-4 space-y-6 rounded-lg max-w-sm md:items-center md:max-w-2xl md:justify-between lg:space-y-0 lg:flex-row lg:max-w-6xl">
      <form
        method="put"
        onSubmit={handleInfo}
        className="border border-iconBlue rounded-lg p-3 bg-fottoWhite"
      >
        <h2 className="text-lg font-medium">Kişisel bilgilerini değiştir</h2>
        <div className=" py-12 flex flex-col space-y-6 md:items-center">
          <div className="relative">
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onBlur={(e) =>
                setFirstName(capitalizeFirstLetter(e.target.value))
              }
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full bg-white h-12 p-3 pt-6 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm md:w-80"
              placeholder="firstName"
              autoComplete="off"
              required
            />
            <label
              htmlFor="firstName"
              className="absolute top-0 left-0 h-full px-3 py-3 text-sm text-fottoText transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
            >
              İsim
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onBlur={(e) => setLastName(capitalizeFirstLetter(e.target.value))}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full bg-white h-12 p-3 pt-6 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm md:w-80"
              placeholder="lastName"
              autoComplete="off"
              required
            />
            <label
              htmlFor="lastName"
              className="absolute top-0 left-0 h-full px-3 py-3 text-sm text-fottoText transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
            >
              Soyisim
            </label>
          </div>
          <div className="relative flex flex-col">
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white h-12 p-3 pt-6 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm md:w-80"
              placeholder="email"
              autoComplete="off"
              onBlur={(e) => emailValidate(e.target.value)}
              required
            />
            <label
              htmlFor="email"
              className="absolute top-0 left-0 h-full px-3 py-3 text-sm text-fottoText transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
            >
              Email
            </label>
            <span className="text-sm text-red-500 p-1">{mailError}</span>
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
      <form
        method="put"
        onSubmit={handlePass}
        className="border border-iconBlue rounded-lg p-3 bg-fottoWhite"
      >
        <h2 className="text-lg font-medium">Şifreni değiştir</h2>
        <div className="py-12 flex flex-col space-y-6 md:items-center">
          <div className="relative">
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-white h-12 p-3 pt-6 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm md:w-80"
              placeholder="Password"
              autoComplete="off"
              minLength={6}
              required
            />
            <label
              htmlFor="currentPassword"
              className="absolute top-0 left-0 h-full px-3 py-3 text-sm text-fottoText transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
            >
              Şifre
            </label>
          </div>
          <div className="relative flex flex-col">
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-white h-12 p-3 pt-6 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm md:w-80"
              placeholder="Password"
              autoComplete="off"
              minLength={6}
              required
            />
            <label
              htmlFor="newPassword"
              className="absolute top-0 left-0 h-full px-3 py-3 text-sm text-fottoText transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
            >
              Yeni şifre
            </label>
          </div>
          <div className="relative flex flex-col">
            <input
              type="password"
              name="confirmNewPassword"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => handlePasswordConfirm(e.target.value)}
              className="w-full bg-white h-12 p-3 pt-6 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm md:w-80"
              placeholder="Password"
              autoComplete="off"
              minLength={6}
              required
            />
            <label
              htmlFor="confirmNewPassword"
              className="absolute top-0 left-0 h-full px-3 py-3 text-sm text-fottoText transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
            >
              Yeni şifre tekrar
            </label>
            <span className="text-sm text-red-500 pt-1">{passwordError}</span>
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
    </section>
  );
}

export default Me;
