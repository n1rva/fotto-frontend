import VerifyCertificate from "@/components/certificate/verifyCertificate";

export const metadata = {
  title: "Sertifika Doğrula | Fizyotto Live",
  description: "Sahibi olduğunuz sertifikaları görüntüleyin.",
};

function Verify() {
  return (
    <main className="min-h-screen my-12">
      <VerifyCertificate />
    </main>
  );
}

export default Verify;
