import ManageWebinars from "@/components/admin/webinar/manageWebinars";
import { cookies } from "next/headers";
import Link from "next/link";
import { TbCertificate } from "react-icons/tb";

function CertificateManagement() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");

  return (
    <div className="min-h-screen container mx-auto max-w-6xl">
      <div className="">
        <h3 className="text-2xl font-medium my-6">Yeni Sertifika</h3>
        <Link
          href={"/fotto/certificate/add"}
          className={`flex space-x-2 p-3 h-fit w-fit`}
        >
          <div className="border rounded-lg h-40 w-40 flex flex-col items-center justify-center bg-slate-200 hover:text-darkerOrange hover:border-fottoOrange">
            <TbCertificate className="h-8 w-fit" />
            <span className="font-medium text-xl">Sertifika Ekle</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CertificateManagement;
