import ManageVideos from "@/components/admin/video/manageVideos";

import { cookies } from "next/headers";
import Link from "next/link";
import { MdPersonalVideo, MdVideoFile } from "react-icons/md";

function WebinarManagement() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");

  return (
    <div className="min-h-screen container mx-auto max-w-6xl">
      <h3 className="text-2xl font-medium my-6">Yeni Webinar Kaydı</h3>
      <div className="flex flex-col lg:flex-row">
        <Link href={"/fotto/video/add"} className={`flex space-x-2 p-3 h-fit`}>
          <div className="border rounded-lg h-40 w-40 flex flex-col items-center justify-center bg-slate-200 hover:text-darkerOrange hover:border-fottoOrange">
            <MdPersonalVideo className="h-8 w-fit" />
            <span className="font-medium text-xl">Ekle</span>
          </div>
        </Link>
        <Link
          href={"/fotto/video/videofile"}
          className={`flex space-x-2 p-3 h-fit`}
        >
          <div className="border rounded-lg h-40 w-40 flex flex-col items-center justify-center bg-slate-200 hover:text-darkerOrange hover:border-fottoOrange">
            <MdVideoFile className="h-8 w-fit" />
            <span className="font-medium text-xl">Kaydı Yükle</span>
          </div>
        </Link>
      </div>
      <div>
        <h3 className=" my-6 text-2xl font-medium">Webinar Kaydını Düzelt</h3>
        <ManageVideos access_token={accessToken.value} />
      </div>
    </div>
  );
}

export default WebinarManagement;
