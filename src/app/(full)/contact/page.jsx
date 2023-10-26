import { FaWhatsapp } from "react-icons/fa";
import { TbMail } from "react-icons/tb";

export const metadata = {
  title: "İletişim | Fizyotto Live",
  description:
    "Bize Fizyotto Live WhatsApp hattı, mail adresimiz ve sosyal medya hesaplarımız aracılığı her zaman ile ulaşabilirsiniz.",
};

function Contact() {
  return (
    <main className="min-h-[80vh] p-3 mx-auto container max-w-lg flex flex-col mt-12 bg-[#F9FEFF]/75 rounded-lg md:max-w-2xl lg:max-w-5xl xl:max-w-7xl">
      <h1 className="font-medium text-xl lg:text-2xl">İletişim</h1>
      <div className="my-10 lg:my-14">
        <p className="lg:text-lg">
          Bize Fizyotto Live WhatsApp hattı, mail adresimiz ve sosyal medya
          hesaplarımız aracılığı her zaman ile ulaşabilirsiniz.
        </p>
        <div className="mt-4 space-y-4">
          <h3 className="text-lg font-medium">İletişim adreslerimiz</h3>

          <div className="flex items-center ">
            <FaWhatsapp className="h-6 w-6" />
            <p className="mx-2 hover:opacity-80">
              <a href="tel:+905519814415">0 551 981 44 15</a>
            </p>
          </div>
          <div className="flex items-center ">
            <TbMail className="h-6 w-6" />
            <p className="mx-2 hover:opacity-80">
              <a href="mailto:fizyottolive@gmail.com">fizyottolive@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contact;
