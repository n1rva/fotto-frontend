"use client";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="py-12 flex flex-col items-center bg-gradient-to-b from-mainBlue to-secBlue lg:justify-center lg:mt-14 2xl:flex-row ">
      {/* site map */}
      <div className="w-72 flex flex-col text-sm space-y-12 lg:flex-row lg:space-y-0 lg:w-full lg:container lg:px-8 lg:max-w-6xl">
        <div className="hidden lg:block">
          <Image
            src="/logo_fotto.webp"
            alt="logo"
            width={100}
            height={100}
            sizes="10vw"
            className="h-12 w-fit"
          />
        </div>
        <div className="flex lg:mx-20 lg:space-x-20">
          <div className="flex flex-col space-y-6 flex-1 lg:flex-auto">
            <h3 className="font-bold mb-3">Ürünler</h3>
            <Link href={"/webinars"} className="hover:opacity-80">
              Webinar
            </Link>
            <Link href={"/videos"} className="hover:opacity-80">
              Webinar Kayıtları
            </Link>
          </div>
          <div className="flex flex-col space-y-6 flex-1 lg:flex-auto">
            <h3 className="font-bold mb-3">Site</h3>
            <Link href={"/contact"} className="hover:opacity-80">
              İletişim
            </Link>
            <Link href={"/about"} className="hover:opacity-80">
              Hakkımızda
            </Link>
            <Link href={"/privacy"} className="hover:opacity-80">
              Gizlilik Politikası
            </Link>
            <Link href={"/cookies"} className="hover:opacity-80">
              Çerez Politikası
            </Link>
            <Link href={"/terms"} className="hover:opacity-80">
              Kullanım Koşulları
            </Link>
          </div>
        </div>
        <div className="flex lg:space-x-20">
          <div className="flex flex-col space-y-6 flex-1 lg:flex-auto">
            <h3 className="font-bold mb-3">Fizyotto Group</h3>
            <Link
              href={"https://www.instagram.com/fizyotto/"}
              className="hover:opacity-80"
            >
              Fizyotto
            </Link>
            <Link
              href={"https://www.instagram.com/fizyottolive/"}
              className="hover:opacity-80"
            >
              Fizyotto Live
            </Link>
            <Link
              href={"https://www.instagram.com/fizyottoplus/"}
              className="hover:opacity-80"
            >
              Fizyotto Plus
            </Link>
          </div>
          <div className="flex flex-col space-y-6 flex-1 lg:flex-auto">
            <h3 className="font-bold mb-3">Bizi Takip Et</h3>
            <Link
              href={"https://www.instagram.com/fizyottolive/"}
              className="hover:opacity-80"
            >
              Instagram
            </Link>
            <Link
              href={"https://www.twitter.com/fizyotto/"}
              className="hover:opacity-80"
            >
              Twitter
            </Link>
          </div>
        </div>
      </div>
      {/* logo */}
      <div className="mt-20 w-80 flex flex-col space-y-8 lg:space-y-0 lg:self-end lg:mt-3">
        <Image
          src={"/payment.webp"}
          width={100}
          height={100}
          sizes="100vw"
          className="w-56"
          alt="iyzico"
        />
        <div className="flex items-center space-x-6 lg:hidden">
          <Image
            src="/logo_fotto.webp"
            alt="logo"
            width={100}
            height={100}
            sizes="50vw"
            className="h-full w-16"
          />
          <span className="font-medium text-sm">Fizyotto Live 2023</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
