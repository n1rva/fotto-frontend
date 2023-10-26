import Image from "next/image";
import SignupForm from "@/components/signup";

export const metadata = {
  title: "Üye Ol | Fizyotto Live",
};

function Signup() {
  return (
    <main className="flex min-h-[85vh] justify-center items-center ">
      <div className="w-full flex justify-center md:w-[48rem]">
        <SignupForm />
        <div className="hidden relative px-10 py-24 flex-col w-fit text-white bg-secBlue  md:flex md:basis-1/2">
          <Image
            src={"/doc.webp"}
            width={100}
            height={100}
            sizes="100vw"
            className="absolute left-0 top-0 w-full h-full object-cover opacity-10"
            alt="doc"
          />
          <h1 className="text-3xl font-medium">
            Kariyeriniz için doğru yerdesiniz!
          </h1>
          <div className="my-10">
            <h3 className="mb-10 text-xl">Şimdi üye olarak,</h3>
            <ul className="space-y-4 list-inside list-disc">
              <li>Webinarlara erişin</li>
              <li>Sertifika alın</li>
              <li>Webinar kayıtlarımıza ulaşın</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;
