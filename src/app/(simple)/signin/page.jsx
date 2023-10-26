import SigninForm from "@/components/signin";

export const metadata = {
  title: "Giriş Yap | Fizyotto Live",
};

function Signin() {
  return (
    <main className="flex min-h-[85vh] justify-center items-center">
      <SigninForm />
    </main>
  );
}

export default Signin;
