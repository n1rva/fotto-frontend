export const metadata = {
  title: "Hakkımızda | Fizyotto Live",
  description:
    "Fizyotto adıyla 2020 yılında fizyoterapist meslektaşlarımız için sosyal medya içerikleri üretmek için çıktığımız bu yolculuğa Fizyotto Live ile devam ediyoruz.",
};

function About() {
  return (
    <main className="min-h-screen my-12">
      <div className="bg-[#F3FDFF] min-h-[18rem] flex flex-col md:flex-row">
        <div className="max-w-sm mx-auto space-y-1 my-3 md:space-y-4 md:max-w-md md:py-4 lg:max-w-4xl lg:py-8 lg:px-3 lg:space-y-5">
          <h1 className="font-medium text-xl lg:text-2xl">Hakkımızda</h1>

          <div className="my-10 lg:my-14">
            <div className="my-10">
              <p className="">
                Fizyotto adıyla 2020 yılında fizyoterapist meslektaşlarımız için
                sosyal medya içerikleri üretmek için çıktığımız yolculukta
                sizlerin de desteği ile kısa zamanda geniş kitlelere ulaşmayı
                başardık.
              </p>
              <br />
              <p className="">
                2020'den beri devam eden bu süreçte sırasıyla Fizyotto Shop,
                Fizyotto Plus ve Fizyotto Live iştiraklerini hem toplum hem de
                meslektaşlarımızın faydasına sunduk.
              </p>
              <br />
              <p className="">
                Mesleğimizin ve meslektaşlarımızın gelişimine ciddi katkıda
                bulunabileceğini düşündüğümüz Fizyotto Live’ı geliştirebilmek ve
                yeni eğitimleri sizlerle buluşturabilmek için yoğun
                çalışmalarımız devam ediyor. Fizyotto Live, değerli
                fizyoterapist meslektaşlarımız ve FTR bölümü öğrencileri için
                çeşitli eğitim ve etkinlikler düzenlemek için kurulmuş bir
                Fizyotto Markası iştirakidir. Birbirinden değerli akademisyenler
                ve fizyoterapistlerin anlatımları ile gerçekleşen eğitimlerimiz
                vasıtasıyla meslektaşlarımıza faydalı olabilmek öncelikli
                hedefimizdir.
              </p>
              <br />
              <p className="">
                Online webinarlar ve yüzyüze eğitimler ile fizyoterapistlerin
                mesleki gelişimine katkı sağlamak temel hedefiyle çıktığımız bu
                yolda sizlerin de desteği ile her geçen gün daha iyiye
                gideceğiz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;
