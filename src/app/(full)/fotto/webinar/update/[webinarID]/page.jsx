import UpdateWebinar from "@/components/admin/webinar/updateWebinar";
import { cookies } from "next/headers";

function UpdateWebinarPage({ params }) {
  const webinarID = params.webinarID;

  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");

  return (
    <div className="container mx-auto">
      <UpdateWebinar id={webinarID} access_token={accessToken.value} />
    </div>
  );
}

export default UpdateWebinarPage;
