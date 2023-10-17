import AddWebinar from "@/components/admin/addWebinar";
import { cookies } from "next/headers";

function AddWebinarPage() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");
  return (
    <main className="flex min-h-screen flex-col items-center py-8">
      <h3 className="text-lg font-medium lg:text-2xl">Webinar Ekle</h3>
      <AddWebinar access_token={accessToken.value} />
    </main>
  );
}

export default AddWebinarPage;
