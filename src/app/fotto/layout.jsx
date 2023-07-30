import { redirect } from "next/navigation";
import { isAdmin } from "@/utils/isAdmin";
import { cookies } from "next/headers";

async function FottoLayout({ children }) {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access");

  if (!access_token) redirect("/signin");

  const isUserAdmin = await isAdmin(access_token.value);

  if (!isUserAdmin) {
    redirect("/");
  }

  return <>{children}</>;
}

export default FottoLayout;
