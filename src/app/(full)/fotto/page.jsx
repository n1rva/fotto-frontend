import Link from "next/link";
import { FiUser, FiVideo } from "react-icons/fi";
import { MdPersonalVideo } from "react-icons/md";
import { TbCertificate } from "react-icons/tb";
import { IoNotifications } from "react-icons/io5";

export const metadata = {
  title: "Admin İşlemleri | Fizyotto Live",
  // description: "Fizyoterapistler İçin Online Eğitim Platformu🎓",
};

function Fotto() {
  return (
    <div className="min-h-screen container flex flex-col items-center justify-center lg:max-w-7xl mx-auto lg:flex-row lg:items-start ">
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
      <Link href={"/fotto/notification"} className={`flex space-x-2 p-3 h-fit`}>
        <div className="border rounded-lg h-40 w-40 flex flex-col items-center justify-center bg-slate-200 hover:text-darkerOrange hover:border-fottoOrange">
          <IoNotifications className="h-8 w-fit" />
          <span className="font-medium text-lg">Ödeme Bildirimleri</span>
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
