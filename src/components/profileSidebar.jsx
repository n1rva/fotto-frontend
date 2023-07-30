"use client";

import Link from "next/link";
import { FiUser, FiVideo } from "react-icons/fi";
import { TbCertificate } from "react-icons/tb";
import { MdPersonalVideo, MdLogout } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

function ProfileSidebar() {
  const path = usePathname();

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <h3 className="p-4 font-medium text-lg">
        {user && `Merhaba, ${user.first_name} ${user.last_name}`}
      </h3>
      <div className="flex flex-col my-12 space-y-4 w-full max-w-sm lg:space-y-8">
        <Link
          href={"/profile/account"}
          className={`flex space-x-2 p-3 ${
            path == "/profile/account" && "text-fottoOrange"
          } hover:text-darkerOrange`}
        >
          <FiUser className="h-6 w-fit" />
          <span className="font-bold text-lg">Profilim</span>
        </Link>
        <Link
          href={"/profile/webinars"}
          className={`flex space-x-2 p-3 ${
            path == "/profile/webinars" && "text-fottoOrange"
          } hover:text-darkerOrange`}
        >
          <MdPersonalVideo className="h-6 w-fit" />
          <span className="font-bold text-lg">Webinarlarım</span>
        </Link>
        <Link
          href={"/profile/certificates"}
          className={`flex space-x-2 p-3 ${
            path == "/profile/certificates" && "text-fottoOrange"
          } hover:text-darkerOrange`}
        >
          <TbCertificate className="h-6 w-fit" />
          <span className="font-bold text-lg">Sertifikalarım</span>
        </Link>
        <Link
          href={"/profile/videos"}
          className={`flex space-x-2 p-3 ${
            path == "/profile/videos" && "text-fottoOrange"
          } hover:text-darkerOrange`}
        >
          <FiVideo className="h-6 w-fit" />
          <span className="font-bold text-lg">Webinar Kayıtlarım</span>
        </Link>
      </div>

      <button
        className="flex space-x-2 p-3 text-red-600 hover:text-darkerOrange"
        onClick={handleLogout}
      >
        <MdLogout className="h-6 w-fit" />
        <span className="font-bold text-lg"> Çıkış Yap</span>
      </button>
    </>
  );
}

export default ProfileSidebar;
