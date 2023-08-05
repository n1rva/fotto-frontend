import PassResetForm from "@/components/passwordreset";

export const metadata = {
  title: "Şifremi Unuttum | Fizyotto Live",
  // description: "Fizyoterapistler İçin Online Eğitim Platformu🎓",
};

function PassReset() {
  return (
    <main className="flex min-h-[85vh] justify-center items-center">
      <PassResetForm />
    </main>
  );
}

export default PassReset;
