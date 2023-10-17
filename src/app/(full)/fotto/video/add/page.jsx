import AddVideo from "@/components/admin/video/addVideo";
import { cookies } from "next/headers";

function AddVideoPage() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h3 className="text-lg font-medium my-10 lg:text-2xl">
        Webinar Kaydı Ekle
      </h3>
      <AddVideo access_token={accessToken.value} />
    </main>
  );
}

export default AddVideoPage;
