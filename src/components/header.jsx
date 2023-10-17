"use client";

import AuthContext from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <header className="sticky top-0 h-12 bg-white bg-opacity-50 border-b backdrop-blur-sm z-30 lg:h-16">
        <div className="max-w-md mx-auto px-8 h-full flex justify-between items-center lg:container ">
          <Link href={"/"} className="w-16 md:w-fit">
            <Image
              src="/logo_fotto.webp"
              alt="logo"
              width={100}
              height={100}
              sizes="10vw"
              className="h-10 w-full lg:h-12"
            />
          </Link>
          <div className="flex flex-col items-start select-none">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-1"
            >
              <FiMenu className="text-secBlue w-6 h-6" />
            </button>
            <div className="hidden lg:flex space-x-8 text-sm font-medium text-fottoText">
              {user?.is_admin && (
                <Link href={"/fotto"} className="hover:opacity-80">
                  Admin İşlemleri
                </Link>
              )}

              <Link href={"/verify"} className="hover:opacity-80">
                Sertifika Doğrula
              </Link>
              <Link href={"/webinars"} className="hover:opacity-80">
                Webinarlar
              </Link>
              <Link href={"/videos"} className="hover:opacity-80">
                Webinar Kayıtları
              </Link>
              <Link href={"/about"} className="hover:opacity-80">
                Hakkımızda
              </Link>
              {isAuthenticated ? (
                <Link
                  href={"/profile/account"}
                  className="text-secBlue pl-4 hover:opacity-80"
                >
                  Profilim
                </Link>
              ) : (
                <Link
                  href={"/signin"}
                  className="text-secBlue pl-4 hover:opacity-80"
                >
                  Giriş Yap
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <div
        className={`fixed w-full h-full left-0 top-0 bg-fottoText backdrop-blur-sm bg-opacity-70 z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          onClick={() => setIsOpen(false)}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
      <div
        className={`fixed top-0 right-0 h-full w-1/2 px-3 bg-darkerMain ease-in-out duration-300 z-50
             ${isOpen ? "translate-x-0 " : "translate-x-full"}
            `}
      >
        <div className="flex flex-col select-none">
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center fill-white self-end mt-1 mr-4 p-1"
          >
            <IoMdClose className="w-8 h-8 fill-secBlue" />
          </button>
          <ul
            onClick={() => setIsOpen(false)}
            className="flex flex-col py-1 my-20 font-medium text-xl"
          >
            {isAuthenticated ? (
              <li className="rounded-md hover:bg-gray/30">
                <Link
                  href={"/profile"}
                  className="h-20 px-4 w-full flex items-center space-x-2  hover:bg-sec/40"
                >
                  {/* <FaUserPlus className="w-6 h-6 fill-lightBlue" /> */}
                  <span>Profilim</span>
                </Link>
              </li>
            ) : (
              <li className="rounded-md hover:bg-gray/30">
                <Link
                  href={"/signin"}
                  className="h-20 px-4 w-full flex items-center space-x-2  hover:bg-sec/40"
                >
                  {/* <FaUserPlus className="w-6 h-6 fill-lightBlue" /> */}
                  <span>Giriş Yap</span>
                </Link>
              </li>
            )}
            <li className="rounded-md hover:bg-gray/30">
              <Link
                href={"/webinars"}
                className="h-20 px-4 w-full flex items-center space-x-2 hover:bg-sec/40"
              >
                {/* <FaSignInAlt className="w-6 h-6 fill-lightBlue" /> */}
                <span>Webinarlar</span>
              </Link>
            </li>
            <li className="rounded-md hover:bg-gray/30">
              <Link
                href={"/videos"}
                className="h-20 px-4 w-full flex items-center space-x-2 hover:bg-sec/40"
              >
                {/* <FaSignInAlt className="w-6 h-6 fill-lightBlue" /> */}
                <span>Webinar Kayıtları</span>
              </Link>
            </li>
            <li className="rounded-md hover:bg-gray/30">
              <Link
                href={"/about"}
                className="h-20 px-4 w-full flex items-center space-x-2  hover:bg-sec/40"
              >
                {/* <FaUserPlus className="w-6 h-6 fill-lightBlue" /> */}
                <span>Hakkımızda</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
