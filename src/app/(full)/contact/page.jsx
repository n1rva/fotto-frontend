import { FaWhatsapp } from "react-icons/fa";
import { TbMail } from "react-icons/tb";

export const metadata = {
  title: "Bize Ulaşın | Fizyotto Live",
  description:
    "Bize Fizyotto Live WhatsApp hattı, mail adresimiz ve sosyal medya hesaplarımız aracılığı her zaman ile ulaşabilirsiniz.",
};

function Contact() {
  return (
    <main className="min-h-screen my-12">
      <div className="bg-[#F3FDFF] min-h-[18rem] flex flex-col md:flex-row">
        <div className="max-w-sm mx-auto space-y-1 my-3 md:space-y-4 md:max-w-md md:py-4 lg:max-w-4xl lg:py-8 lg:px-3 lg:space-y-5">
          <h1 className="text-xl font-bold md:text-2xl lg:text-3xl">
            İletişim
          </h1>
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
                  <a href="mailto:fizyottolive@gmail.com">
                    fizyottolive@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contact;
