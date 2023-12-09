"use client";

import { createContext, useState } from "react";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [userBasket, setUserBasket] = useState(null);
  const [item, setItem] = useState();

  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [readNotifications, setReadNotifications] = useState([]);

  const [deletedItem, setDeletedItem] = useState("");

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const addItemToBasket = (
    itemName,
    itemPrice,
    type,
    title,
    instructor,
    date,
    price,
    image,
    productID
  ) => {
    setUserBasket([itemName, itemPrice, 1]);

    setItem({
      type,
      title,
      instructor,
      date,
      price,
      image,
      productID,
    });
  };

  const makePayment = async (formData, access_token) => {
    setPaymentLoading(true);

    try {
      const response = await fetch(`${process.env.API_URL}/api/v1/payment/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!response.ok)
        return {
          success: false,
          message:
            "Ödeme sistemi kaynaklı bir sorun sebebiyle ödeme yapılamıyor.",
        };

      const data = await response.json();

      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || "Ödeme Hatası");
      }
    } catch (error) {
      setPaymentLoading(false);
      setPaymentError(error.message || "Ödeme Hatası");
      return { success: false, message: error.message || "Ödeme Hatası" };
    }
  };

  const getUnreadNotifications = async (access_token, page, type) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/payment/notification/unread/${type}?p=${page}&page_size=4`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Bildirimler getirilirken hata ile karşılaşıldı.");
      }
    } catch (error) {
      return { success: false, msg: error.message || "Server hatası." };
    }
  };

  const getReadNotifications = async (access_token, page, type) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/payment/notification/read/${type}?p=${page}&page_size=4`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Bildirimler getirilirken hata ile karşılaşıldı.");
      }
    } catch (error) {
      return { success: false, msg: error.message || "Server hatası." };
    }
  };

  const updateNotification = async (
    { notification_id, is_read },
    access_token
  ) => {
    const formData = new FormData();

    formData.append("is_read", is_read);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/payment/notification/${notification_id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        return {
          success: true,
          message: data.msg,
        };
      } else {
        throw new Error("Bildirim güncellenemedi.");
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || "Bildirim güncellenemedi.",
      };
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        setUserBasket,
        setItem,

        addItemToBasket,
        makePayment,

        getUnreadNotifications,
        getReadNotifications,
        updateNotification,

        deletedItem,
        setDeletedItem,

        unreadNotifications,
        readNotifications,
        setReadNotifications,
        setUnreadNotifications,

        setPaymentLoading,
        setPaymentError,

        userBasket,
        item,

        paymentLoading,
        paymentError,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContext;
