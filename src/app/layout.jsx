import Header from "@/components/header";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import Footer from "@/components/footer";
import { AuthProvider } from "@/context/AuthContext";
import { WebinarProvider } from "@/context/WebinarContext";
import { CertificateProvider } from "@/context/CertificateContext";
import { VideoProvider } from "@/context/VideoContext";
import ToastProvider from "@/utils/toastprovider";
import Head from "next/head";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Fizyotto Live",
  description: "Fizyoterapistler İçin Online Eğitim Platformu🎓",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta
          property="og:description"
          content="Fizyoterapistler İçin Online Eğitim Platformu🎓"
        />
        <meta property="og:image" content={"/social-fotto.webp"} />
      </Head>
      <body className={dmSans.className}>
        <AuthProvider>
          <WebinarProvider>
            <CertificateProvider>
              <VideoProvider>
                <ToastProvider>
                  <Header />
                  {children}
                  <Footer />
                </ToastProvider>
              </VideoProvider>
            </CertificateProvider>
          </WebinarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
