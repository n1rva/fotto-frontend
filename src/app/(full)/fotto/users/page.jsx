import UserManagement from "@/components/admin/user/userManagement";
import { cookies } from "next/headers";
import Link from "next/link";

async function UserManagementPage() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");

  return (
    <main className="flex min-h-screen flex-col items-center">
      <h3 className="font-bold my-8 lg:text-2xl">Kullanıcı İşlemleri</h3>

      <UserManagement access_token={accessToken.value} />
    </main>
  );
}

export default UserManagementPage;
