import CertificateView from "@/components/certificate/certificateView";

export const metadata = {
  title: "Sertifika | Fizyotto Live",
  // description: "Fizyoterapistler İçin Online Eğitim Platformu🎓",
};

function CertificateFile({ params }) {
  return (
    <div className="min-h-screen">
      <CertificateView uniqueId={params.uniqueId} />
    </div>
  );
}

export default CertificateFile;
