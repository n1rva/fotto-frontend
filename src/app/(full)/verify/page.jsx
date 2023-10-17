import VerifyCertificate from "@/components/certificate/verifyCertificate";

export const metadata = {
  title: "Sertifika Doğrula | Fizyotto Live",
  // description: "Fizyoterapistler İçin Online Eğitim Platformu🎓",
};

function Verify() {
  return (
    <main className="h-screen">
      <VerifyCertificate />
    </main>
  );
}

export default Verify;
