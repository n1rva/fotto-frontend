import VideoList from "@/components/video/videoList";

export const metadata = {
  title: "Webinar Kayıtları | Fizyotto Live",
  // description: "Fizyoterapistler İçin Online Eğitim Platformu🎓",
};

async function Webinars() {
  return (
    <main className="flex flex-col px-8 items-center my-10 min-h-screen md:mx-auto md:container md:items-start md:max-w-3xl xl:max-w-7xl">
      <h3 className="text-lg font-medium xl:text-2xl">Webinar Kayıtları</h3>
      <VideoList />
    </main>
  );
}

export default Webinars;
