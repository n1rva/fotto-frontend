"use client";
import { iframeResizer } from "iframe-resizer";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

function Payment() {
  const [token, setToken] = useState("");

  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    setToken(token);
  }, []);

  return (
    <>
      <div className="pt-12 flex justify-center  h-full">
        <iframe
          className="h-full w-full"
          src={`https://www.paytr.com/odeme/guvenli/${token}`}
          id="paytriframe"
          frameborder="0"
          scrolling="no"
        ></iframe>
        <Script>{iframeResizer({}, "#paytriframe")}</Script>
      </div>
    </>
  );
}

export default Payment;
