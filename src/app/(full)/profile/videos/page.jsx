import MyVideos from "@/components/userprofile/myVideos";

import { cookies } from "next/headers";

export const metadata = {
  title: "Webinar Kayıtlarım | Fizyotto Live",
};

function UserWebinars() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");

  return (
    <div className="p-8 lg:px-20 w-full space-y-16 lg:basis-3/4">
      <MyVideos access_token={accessToken.value} />
    </div>
  );
}

export default UserWebinars;
