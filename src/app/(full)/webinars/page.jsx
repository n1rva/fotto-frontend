import WebinarList from "@/components/webinar/webinarList";

export const metadata = {
  title: "Webinarlar | Fizyotto Live",
  // description: "Fizyoterapistler İçin Online Eğitim Platformu🎓",
};

async function Webinars() {
  return (
    <main className="min-h-screen my-12">
      <WebinarList />
    </main>
  );
}

export default Webinars;
