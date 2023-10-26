"use client";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

function SigninForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { loading, error, isAuthenticated, login, clearErrors } =
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

  const handleSubmit = (e) => {
    e.preventDefault();

    login({ username: email, password });
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="w-full flex flex-col select-none py-16 bg-[#F9FEFF] rounded-lg max-w-sm md:items-center md:max-w-md lg:max-w-lg shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] shadow-black/10"
    >
      <div className="text-xl font-medium px-6 md:text-2xl ">
        Tekrar Hoşgeldiniz!
      </div>
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
          />
          <label
            htmlFor="password"
            className="absolute top-0 left-0 h-full px-3 py-3 text-sm text-fottoText transition-all duration-100 ease-in-out origin-left transform scale-75 translate-x-1 -translate-y-3 opacity-75 pointer-events-none peer-placeholder-shown:opacity-100 peer-focus:opacity-75 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-3 peer-placeholder-shown:translate-x-0 peer-focus:translate-x-1"
          >
            Password
          </label>
        </div>
        <div className="w-full flex justify-end">
          <Link
            href={"/password_reset"}
            className="text-sm text-secBlue hover:opacity-80"
          >
            Şifremi Unuttum
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <button
          type="submit"
          className={`rounded-lg px-4 py-2 bg-secBlue hover:bg-opacity-70 ${
            loading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin mx-2 rounded-full h-6 w-6 border-2 border-white border-t-fottoText" />
            </div>
          ) : (
            <span className="text-white font-medium text-sm">Giriş yap</span>
          )}
        </button>
      </div>
      <div className="mt-12 text-sm flex justify-center">
        <h4>
          Hesabınız yok mu?{" "}
          <Link href={"/signup"} className="text-darkerOrange hover:opacity-80">
            Hemen üye olun
          </Link>
        </h4>
      </div>
    </form>
  );
}

export default SigninForm;
