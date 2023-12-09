import PaymentContext from "@/context/PaymentContext";
import { useContext } from "react";
import { MdOutlineMarkChatRead } from "react-icons/md";

function Notification({
  notification_id,
  title,
  is_read,
  price,
  user_name,
  user_mail,
  access_token,
}) {
  const { updateNotification, setDeletedItem } = useContext(PaymentContext);

  const updateIsRead = async () => {
    const data = await updateNotification(
      { notification_id, is_read },
      access_token
    );

    if (data.success) {
      setDeletedItem(notification_id + is_read);
    }
  };

  return (
    <div className="flex p-4 justify-between items-center rounded-lg product">
      <h1 className="text-sm font-bold text-fottoOrange">{price}</h1>
      <h2 className="text-xs font-bold w-80">{title}</h2>
      <h1 className="font-bold">{user_name}</h1>
      <h1 className="font-medium">{user_mail}</h1>
      <button onClick={updateIsRead} className="">
        <MdOutlineMarkChatRead className="w-8 h-8 fill-fottoOrange" />
      </button>
    </div>
  );
}

export default Notification;
