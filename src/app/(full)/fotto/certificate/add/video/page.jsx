import AddCertificateForVideo from "@/components/admin/addCertificateForVideo";
import { cookies } from "next/headers";

function AddCertificateForVideoPage() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");

  return (
    <main className="flex min-h-screen flex-col items-center">
      <AddCertificateForVideo access_token={accessToken.value} />
    </main>
  );
}

export default AddCertificateForVideoPage;
