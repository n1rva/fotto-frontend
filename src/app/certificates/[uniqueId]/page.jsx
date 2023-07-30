import CertificateView from "@/components/certificate/certificateView";

function CertificateFile({ params }) {
  return (
    <div className="min-h-screen">
      <CertificateView uniqueId={params.uniqueId} />
    </div>
  );
}

export default CertificateFile;
