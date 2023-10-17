"use client";

import { createContext, useState } from "react";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [userBasket, setUserBasket] = useState(null);
  const [item, setItem] = useState();

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
      console.log(data);

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

  return (
    <PaymentContext.Provider
      value={{
        setUserBasket,
        setItem,

        addItemToBasket,
        makePayment,

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
