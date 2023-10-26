import Checkout from "@/components/checkout";
import { cookies } from "next/headers";

export const metadata = {
  title: `Ödeme | Fizyotto Live`,
};

function CheckoutPage() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");
  return (
    <>
      <Checkout access_token={accessToken.value} />
    </>
  );
}

export default CheckoutPage;
