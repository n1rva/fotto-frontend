import AddCertificate from "@/components/admin/addCertificate";
import { cookies } from "next/headers";

function AddCertificatePage() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");

  return (
    <main className="flex min-h-screen flex-col items-center">
      <AddCertificate access_token={accessToken.value} />
    </main>
  );
}

export default AddCertificatePage;
