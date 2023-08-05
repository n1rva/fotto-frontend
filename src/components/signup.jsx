"use client";

import AuthContext from "@/context/AuthContext";
import { capitalizeFirstLetter } from "@/utils/capitilalizeFirstLetter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [termsCheck, setTermsCheck] = useState(false);
  const [privacyCheck, setPrivacyCheck] = useState(false);

  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const { loading, error, isAuthenticated, signup, clearErrors } =
    useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }

    if (isAuthenticated && !loading) {
      router.push("/");
    }
  }, [isAuthenticated, error, loading]);

  const emailValidate = (mail) => {
    let regEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validate = regEmail.test(mail);

    validate
      ? setMailError("")
      : setMailError("Geçerli bir mail adresi giriniz.");
  };

  const handlePasswordConfirm = (pass) => {
    setPasswordConfirm(pass);

    if (password === pass) setPasswordError("");
    else setPasswordError("Şifreler aynı değil");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!termsCheck) {
      return toast.error("Kullanıcı sözleşmesini kabul etmediniz");
    }

    if (!privacyCheck) {
      return toast.error("Gizlilik politikasını kabul etmediniz");
    }

    if (password !== passwordConfirm) {
      return toast.error("Şifreler aynı değil");
    }

    signup({ firstName, lastName, email, password });
  };
  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="w-full flex flex-col select-none py-4 bg-[#F9FEFF] rounded-lg max-w-sm md:basis-1/2 md:items-center md:max-w-md lg:max-w-lg shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] shadow-black/10"
    >
      <div className="px-6 py-12 flex flex-col space-y-6 md:items-center">
        <div className="relative">
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={(e) => setFirstName(capitalizeFirstLetter(e.target.value))}
            className="w-full h-12 p-3 pt-6 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm md:w-80"
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
            onChange={(e) => setLastName(e.target.value)}
            onBlur={(e) => setLastName(capitalizeFirstLetter(e.target.value))}
            className="w-full h-12 p-3 pt-6 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm md:w-80"
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
            className="w-full h-12 p-3 pt-6 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm md:w-80"
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
          <span className="text-sm text-red-500 pt-1">{mailError}</span>
        </div>
        <div className="relative">
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 p-3 pt-6 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm md:w-80"
            placeholder="Password"
            autoComplete="off"
            minLength={6}
            required
          />
          <label
            htmlFor="password"
            className="absolute top-0 left-0 h-full px-3 py-3 text-sm text-fottoText transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
          >
            Şifre
          </label>
        </div>
        <div className="relative flex flex-col">
          <input
            type="password"
            name="repassword"
            id="repassword"
            value={passwordConfirm}
            onChange={(e) => handlePasswordConfirm(e.target.value)}
            className="w-full h-12 p-3 pt-6 placeholder-transparent text-black bg-transparent border border-secBlue rounded-md peer focus:outline-none focus:shadow-sm md:w-80"
            placeholder="Password"
            autoComplete="off"
            minLength={6}
            required
          />
          <label
            htmlFor="repassword"
            className="absolute top-0 left-0 h-full px-3 py-3 text-sm text-fottoText transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
          >
            Şifre tekrar
          </label>
          <span className="text-sm text-red-500 pt-1">{passwordError}</span>
        </div>
        <div className="w-full flex flex-col space-y-3">
          <div>
            <label className="space-x-2 flex items-center" for="terms">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={termsCheck}
                onChange={(e) => setTermsCheck(e.target.checked)}
              />
              <div className="text-sm space-x-1">
                <Link
                  href={"/terms"}
                  className="text-fottoOrange hover:opacity-80"
                >
                  Kullanıcı sözleşmesini
                </Link>
                <span>kabul ediyorum.</span>
              </div>
            </label>
          </div>
          <div>
            <label className="space-x-2 flex items-center" for="privacy">
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                checked={privacyCheck}
                onChange={(e) => setPrivacyCheck(e.target.checked)}
              />
              <div className="text-sm space-x-1">
                <Link
                  href={"/privacy"}
                  className="text-fottoOrange hover:opacity-80"
                >
                  Gizlilik Politikasını
                </Link>
                <span>kabul ediyorum.</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <button
          type="submit"
          className="rounded-lg px-4 py-2 bg-secBlue hover:bg-opacity-70"
        >
          <span className="text-white font-medium text-sm ">Üye ol</span>
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
