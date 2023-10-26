import MyWebinars from "@/components/userprofile/myWebinars";
import { cookies } from "next/headers";

export const metadata = {
  title: "Webinarlarım | Fizyotto Live",
};

function UserWebinars() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");

  return (
    <div className="p-8 lg:px-20 w-full lg:basis-3/4">
      <MyWebinars access_token={accessToken.value} />
    </div>
  );
}

export default UserWebinars;
