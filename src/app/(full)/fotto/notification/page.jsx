import PaymentNotification from "@/components/paymentNotification";
import { cookies } from "next/headers";

function PaymentNotificationPage() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get("access");
  return (
    <div>
      <PaymentNotification access_token={accessToken.value} />
    </div>
  );
}

export default PaymentNotificationPage;
