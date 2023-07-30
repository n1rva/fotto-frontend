import Accordion from "@/components/accordion";
import WebinarManagement from "@/components/usermanagement/webinars/webinarManagement";
import { cookies } from "next/headers";
import CertificateManagement from "@/components/usermanagement/certificate/certificateManagement";
import VideoManagement from "@/components/usermanagement/video/videoManagement";

const getUserByID = async (id) => {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");

  try {
    const response = await fetch(`${process.env.API_URL}/api/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.value}`,
      },
    });

    const data = await response.json();
    if (data.success) {
      return data.user;
    }
  } catch (error) {}
};
//fix

async function SingleUser({ params }) {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");
  const user = await getUserByID(params.userID);

  return (
    <div className="flex min-h-screen flex-col items-center p-8">
      <div className="container p-3 rounded-lg border border-iconBlue bg-fottoWhite/70 lg:max-w-4xl">
        <div className="">
          Kullanıcı
          <span className="font-medium">{` ${user.first_name} ${user.last_name}`}</span>
          <div className="bg-fottoWhite space-y-3 my-3">
            <Accordion
              title={"Katıldığı webinarlar"}
              info={
                <WebinarManagement
                  access_token={accessToken}
                  userID={user.id}
                />
              }
            />
            <Accordion
              title={"Sertifikaları"}
              info={
                <CertificateManagement
                  access_token={accessToken}
                  userID={user.id}
                />
              }
            />
            <Accordion
              title={"Satın aldığı webinar kayıtları"}
              info={
                <VideoManagement access_token={accessToken} userID={user.id} />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleUser;
