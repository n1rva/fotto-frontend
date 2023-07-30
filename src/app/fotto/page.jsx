import Link from "next/link";
import { FiUser, FiVideo } from "react-icons/fi";
import { MdPersonalVideo } from "react-icons/md";
import { TbCertificate } from "react-icons/tb";

function Fotto() {
  return (
    <div className="h-screen container flex flex-col items-center justify-center lg:max-w-7xl mx-auto lg:flex-row lg:items-start ">
      <Link href={"/fotto/webinar"} className={`flex space-x-2 p-3 h-fit`}>
        <div className="border rounded-lg h-40 w-40 flex flex-col items-center justify-center bg-slate-200 hover:text-darkerOrange hover:border-fottoOrange">
          <MdPersonalVideo className="h-8 w-fit" />
          <span className="font-medium text-xl">Webinar</span>
        </div>
      </Link>
      <Link href={"/fotto/certificate"} className={`flex space-x-2 p-3 h-fit`}>
        <div className="border rounded-lg h-40 w-40 flex flex-col items-center justify-center bg-slate-200 hover:text-darkerOrange hover:border-fottoOrange">
          <TbCertificate className="h-8 w-fit" />
          <span className="font-medium text-xl">Sertifika</span>
        </div>
      </Link>
      <Link href={"/fotto/video"} className={`flex space-x-2 p-3 h-fit`}>
        <div className="border rounded-lg h-40 w-40 flex flex-col items-center justify-center bg-slate-200 hover:text-darkerOrange hover:border-fottoOrange">
          <FiVideo className="h-8 w-fit" />
          <span className="font-medium text-xl">Webinar Kaydı</span>
        </div>
      </Link>
      <Link href={"/fotto/users"} className={`flex space-x-2 p-3 h-fit`}>
        <div className="border rounded-lg h-40 w-40 flex flex-col items-center justify-center bg-slate-200 hover:text-darkerOrange hover:border-fottoOrange">
          <FiUser className="h-8 w-fit" />
          <span className="font-medium text-lg">Kullanıcı İşlemleri</span>
        </div>
      </Link>
    </div>
  );
}

export default Fotto;
