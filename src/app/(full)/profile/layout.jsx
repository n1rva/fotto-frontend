import ProfileSidebar from "@/components/profileSidebar";
import { isAuthenticatedUser } from "@/utils/isAuthenticated";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function userAuth() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");

  if (!accessToken) {
    redirect("/signin");
  }

  const user = await isAuthenticatedUser(accessToken.value);

  if (!user) {
    redirect("/signin");
  }

  return;
}

async function ProfileLayout({ children }) {
  await userAuth();
  return (
    <main className="min-h-[80vh] mx-auto container max-w-lg flex justify-center mt-12 bg-[#F9FEFF]/75 rounded-lg md:max-w-2xl lg:max-w-5xl lg:justify-between xl:max-w-7xl">
      <div className="hidden relative px-2 lg:block lg:py-4 lg:basis-1/4 ">
        <ProfileSidebar />
        <div className="absolute right-0 top-0 -ml-0.5 w-0.5 h-full bg-secBlue/50" />
      </div>
      {children}
    </main>
  );
}

export default ProfileLayout;
