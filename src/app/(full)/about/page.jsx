export const metadata = {
  title: "Hakkımızda | Fizyotto Live",
  // description: "Fizyoterapistler İçin Online Eğitim Platformu🎓",
};

function About() {
  return (
    <main className="min-h-[80vh] p-3 mx-auto container max-w-lg flex flex-col mt-12 bg-[#F9FEFF]/75 rounded-lg md:max-w-2xl lg:max-w-5xl xl:max-w-7xl">
      <h1 className="font-medium text-xl lg:text-2xl">Hakkımızda</h1>
      <div className="my-10">
        <p className="">
          Fizyotto adıyla 2020 yılında fizyoterapist meslektaşlarımız için
          sosyal medya içerikleri üretmek için çıktığımız yolculukta sizlerin de
          desteği ile kısa zamanda geniş kitlelere ulaşmayı başardık.
        </p>
        <br />
        <p className="">
          2020'den beri devam eden bu süreçte sırasıyla Fizyotto Shop, Fizyotto
          Plus ve Fizyotto Live iştiraklerini hem toplum hem de
          meslektaşlarımızın faydasına sunduk.
        </p>
        <br />
        <p className="">
          Mesleğimizin ve meslektaşlarımızın gelişimine ciddi katkıda
          bulunabileceğini düşündüğümüz Fizyotto Live’ı geliştirebilmek ve yeni
          eğitimleri sizlerle buluşturabilmek için yoğun çalışmalarımız devam
          ediyor. Fizyotto Live, değerli fizyoterapist meslektaşlarımız ve FTR
          bölümü öğrencileri için çeşitli eğitim ve etkinlikler düzenlemek için
          kurulmuş bir Fizyotto Markası iştirakidir. Birbirinden değerli
          akademisyenler ve fizyoterapistlerin anlatımları ile gerçekleşen
          eğitimlerimiz vasıtasıyla meslektaşlarımıza faydalı olabilmek
          öncelikli hedefimizdir.
        </p>
        <br />
        <p className="">
          Online webinarlar ve yüzyüze eğitimler ile fizyoterapistlerin mesleki
          gelişimine katkı sağlamak temel hedefiyle çıktığımız bu yolda sizlerin
          de desteği ile her geçen gün daha iyiye gideceğiz.
        </p>
      </div>
    </main>
  );
}

export default About;
