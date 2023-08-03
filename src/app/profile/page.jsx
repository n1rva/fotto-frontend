import ProfileSidebar from "@/components/profileSidebar";

export const metadata = {
  title: "Profilim | Fizyotto Live",
  // description: "Fizyoterapistler İçin Online Eğitim Platformu🎓",
};

function Profile() {
  return (
    <main className="flex flex-col mx-3 my-10 w-full md:mx-auto md:container md:items-start">
      <ProfileSidebar />
    </main>
  );
}

export default Profile;
