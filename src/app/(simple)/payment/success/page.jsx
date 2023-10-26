import Link from "next/link";
import { BsCheckCircleFill } from "react-icons/bs";

export const metadata = {
  title: `Ödeme başarılı | Fizyotto Live`,
};

function Success() {
  return (
    <main className="min-h-screen flex justify-center ">
      <div className="flex flex-col items-center h-fit w-full max-w-sm py-12 mt-36 space-y-8 md:max-w-2xl rounded-xl bg-[#F9FEFF] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] shadow-black/10">
        <h1 className="font-bold text-xl flex items-center">
          <span className="text-emerald-400 mr-4">
            <BsCheckCircleFill className="h-12 w-12" />
          </span>
          Ödeme başarılı
        </h1>
        <h2 className="text-fottoText">
          Ödemeniz başarıyla gerçekleşti. Teşekkür ederiz.
        </h2>
        <Link
          href={"/"}
          className="py-2 px-6 bg-darkerOrange rounded-lg text-white font-medium hover:bg-darkerOrange/90"
        >
          Anasayfaya dön
        </Link>
      </div>
    </main>
  );
}

export default Success;
