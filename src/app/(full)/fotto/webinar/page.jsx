import SearchWebinars from "@/components/usermanagement/webinars/searchWebinars";
import { cookies } from "next/headers";
import Link from "next/link";
import { MdPersonalVideo } from "react-icons/md";

function WebinarManagement() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");

  return (
    <div className="min-h-screen container mx-auto max-w-6xl">
      <div className="">
        <h3 className="text-2xl font-medium my-6">Yeni Webinar</h3>
        <Link
          href={"/fotto/webinar/add"}
          className={`flex space-x-2 p-3 h-fit w-fit`}
        >
          <div className="border rounded-lg h-40 w-40 flex flex-col items-center justify-center bg-slate-200 hover:text-darkerOrange hover:border-fottoOrange">
            <MdPersonalVideo className="h-8 w-fit" />
            <span className="font-medium text-xl">Webinar Ekle</span>
          </div>
        </Link>
      </div>
      <div>
        <h3 className=" my-6 text-2xl font-medium">Webinar Düzelt</h3>
        {/* <ManageWebinars access_token={accessToken.value} /> */}
        <SearchWebinars access_token={accessToken.value} />
      </div>
    </div>
  );
}

export default WebinarManagement;
