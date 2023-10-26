import Payment from "@/components/payment";

export const metadata = {
  title: `Ödeme | Fizyotto Live`,
};

function PaymentPage() {
  return (
    <>
      <main className="min-h-screen w-full">
        <Payment />
      </main>
    </>
  );
}

export default PaymentPage;
