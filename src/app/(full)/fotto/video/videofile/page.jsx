import AddVideo from "@/components/admin/video/addVideo";
import AddVideoFile from "@/components/admin/videoFile/addVideoFile";
import { cookies } from "next/headers";

function AddVideoFilePage() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h3 className="text-lg font-medium mt-10 mb-20 lg:text-2xl">
        Webinar Kaydı Dosyası Yükle
      </h3>
      <AddVideoFile access_token={accessToken.value} />
    </main>
  );
}

export default AddVideoFilePage;
