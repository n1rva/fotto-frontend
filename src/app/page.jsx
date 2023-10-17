import Header from "@/components/header";
import Footer from "@/components/footer";
import Home from "@/components/home";
import { cookies } from "next/headers";

export default function HomePage() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");

  return (
    <main className="flex min-h-screen flex-col mx-auto">
      <Header />
      <Home access_token={accessToken} />
      <Footer />
    </main>
  );
}
