import Me from "@/components/userprofile/me";
import { cookies } from "next/headers";

export const metadata = {
  title: "Profilim | Fizyotto Live",
};

async function Account() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");

  return (
    <div className="p-8 lg:px-8 xl:px-20 w-full lg:basis-3/4">
      <Me access_token={accessToken.value} />
    </div>
  );
}

export default Account;
