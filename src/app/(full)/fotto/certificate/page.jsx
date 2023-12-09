import ManageWebinars from "@/components/admin/webinar/manageWebinars";
import { cookies } from "next/headers";
import Link from "next/link";
import { TbCertificate } from "react-icons/tb";

function CertificateManagement() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");

  return (
    <div className="min-h-screen container mx-auto max-w-6xl">
      <h3 className="text-2xl font-medium my-6">Yeni Sertifika</h3>
      <div className="flex">
        <Link
          href={"/fotto/certificate/add/webinar"}
          className={`flex space-x-2 p-3 h-fit w-fit`}
        >
          <div className="border rounded-lg h-40 w-40 flex flex-col items-center justify-center bg-slate-200 hover:text-darkerOrange hover:border-fottoOrange">
            <TbCertificate className="h-8 w-fit" />
            <span className="font-medium text-xl text-center">Webinar</span>
          </div>
        </Link>
        <Link
          href={"/fotto/certificate/add/video"}
          className={`flex space-x-2 p-3 h-fit w-fit`}
        >
          <div className="border rounded-lg h-40 w-40 flex flex-col items-center justify-center bg-slate-200 hover:text-darkerOrange hover:border-fottoOrange">
            <TbCertificate className="h-8 w-fit" />
            <span className="font-medium text-xl text-center">
              Webinar arşivi
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CertificateManagement;
