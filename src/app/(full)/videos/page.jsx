import VideoList from "@/components/video/videoList";
import { AiOutlineDown } from "react-icons/ai";

export const metadata = {
  title: "Webinar Kayıtları | Fizyotto Live",
  // description: "Fizyoterapistler İçin Online Eğitim Platformu🎓",
};

async function Webinars() {
  return (
    <main className="min-h-screen my-12">
      <VideoList />
    </main>
  );
}

export default Webinars;
