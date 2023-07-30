import MyCertificates from "@/components/userprofile/myCertificates";
import { cookies } from "next/headers";
import React from "react";

function UserCertificates() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");

  return (
    <div className="p-8 lg:px-20 w-full space-y-16 lg:basis-3/4">
      <MyCertificates access_token={accessToken.value} />
    </div>
  );
}

export default UserCertificates;
