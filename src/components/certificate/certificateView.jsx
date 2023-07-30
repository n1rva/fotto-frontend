"use client";

import CertificateContext from "@/context/CertificateContext";
import { useContext, useEffect, useState } from "react";

function CertificateView({ uniqueId }) {
  const { getCertificateByUniqueID } = useContext(CertificateContext);

  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    const getCertificate = async () => {
      const data = await getCertificateByUniqueID(uniqueId);

      setCertificate(data);
    };
    getCertificate();
  }, []);

  return (
    <div className="h-screen container mx-auto my-4 max-w-7xl">
      {certificate && (
        <object
          width="100%"
          height="100%"
          data={certificate}
          type="application/pdf"
          className=""
        ></object>
      )}
    </div>
  );
}

export default CertificateView;
