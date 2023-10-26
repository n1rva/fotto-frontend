import CertificateView from "@/components/certificate/certificateView";

export const metadata = {
  title: "Sertifika | Fizyotto Live",
};

function CertificateFile({ params }) {
  return (
    <div className="min-h-screen">
      <CertificateView uniqueId={params.uniqueId} />
    </div>
  );
}

export default CertificateFile;
