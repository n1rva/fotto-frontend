import UpdateVideo from "@/components/admin/video/updateVideo";

import { cookies } from "next/headers";

function UpdateWebinarPage({ params }) {
  const videoID = params.videoID;

  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");

  return (
    <div className="container mx-auto">
      <UpdateVideo id={videoID} access_token={accessToken.value} />
    </div>
  );
}

export default UpdateWebinarPage;
