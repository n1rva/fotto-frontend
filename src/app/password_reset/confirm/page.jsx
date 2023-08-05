import PassResetConfirmForm from "@/components/pass-reset-confirm";

export const metadata = {
  title: "Şifre Değiştirme | Fizyotto Live",
  // description: "Fizyoterapistler İçin Online Eğitim Platformu🎓",
};

function PassResetConfirm() {
  return (
    <main className="flex min-h-[85vh] justify-center items-center">
      <PassResetConfirmForm />
    </main>
  );
}

export default PassResetConfirm;
