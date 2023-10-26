import VerifyCertificate from "@/components/certificate/verifyCertificate";

export const metadata = {
  title: "Sertifika Doğrula | Fizyotto Live",
  description: "Sahibi olduğunuz sertifikaları görüntüleyin.",
};

function Verify() {
  return (
    <main className="h-screen">
      <VerifyCertificate />
    </main>
  );
}

export default Verify;
