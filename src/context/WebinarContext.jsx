"use client";

import { useState, createContext } from "react";

const WebinarContext = createContext();

export const WebinarProvider = ({ children }) => {
  const [allWebinars, setAllWebinars] = useState(null);
  const [userWebinars, setUserWebinars] = useState(null);

  const [webinarLoading, setWebinarLoading] = useState(false);
  const [webinarError, setWebinarError] = useState(null);
  const [info, setInfo] = useState("");

  const getAllWebinars = async () => {
    setWebinarLoading(true);
    try {
      const response = await fetch(`${process.env.API_URL}/api/webinar`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setWebinarLoading(false);
        setAllWebinars(data.webinars);
        return data;
      } else {
        throw new Error("Webinar getirilirken hata ile karşılaşıldı.");
      }
    } catch (error) {
      setWebinarLoading(false);
      setWebinarError("Server hatası.");
    }
  };

  const createWebinar = async (
    {
      title,
      data,
      price,
      date,
      instructor,
      instructorImage,
      sourceCertificate,
      webinarImage,
      participants,
    },
    access_token
  ) => {
    setWebinarLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", JSON.stringify(data));
    formData.append("price", price);
    formData.append("date", date);

    formData.append("instructor", instructor);
    formData.append("instructor_image", instructorImage);

    if (sourceCertificate)
      formData.append("source_certificate", sourceCertificate);
    formData.append("image", webinarImage);
    if (participants) formData.append("participants", participants);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/webinar/create`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setWebinarLoading(false);
        setInfo(data.message);
        return data;
      } else {
        throw new Error("Webinar oluşturulurken hata ile karşılaşıldı.");
      }
    } catch (error) {
      setWebinarLoading(false);
      setWebinarError(
        error.message || "Webinar oluşturulurken hata ile karşılaşıldı."
      );
    }
  };

  const updateWebinar = async (
    {
      title,
      data,
      price,
      date,
      instructor,
      instructorImage,
      sourceCertificate,
      webinarImage,
      participants,
      webinarID,
      certAdded,
    },
    access_token
  ) => {
    setWebinarLoading(true);

    try {
      const formData = new FormData();

      if (title) {
        formData.append("title", title);
      }

      if (data) {
        formData.append("description", JSON.stringify(data));
      }

      if (price) {
        formData.append("price", price);
      }

      if (date) {
        formData.append("date", date);
      }

      if (instructor) {
        formData.append("instructor", instructor);
      }

      if (instructorImage) {
        formData.append("instructor_image", instructorImage);
      }

      if (sourceCertificate) {
        formData.append("source_certificate", sourceCertificate);
      }

      if (webinarImage) {
        formData.append("image", webinarImage);
      }

      if (participants) {
        participants.forEach((participantID) => {
          formData.append("participants", participantID);
        });
      }

      if (certAdded) {
        formData.append("certificate_added", certAdded);
      }

      const response = await fetch(
        `${process.env.API_URL}/api/webinar/${webinarID}/update`,
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
        setWebinarLoading(false);
        setInfo(data.message);
        return data;
      } else {
        throw new Error("Webinar düzenlenirken hata ile karşılaşıldı.");
      }
    } catch (error) {
      setWebinarLoading(false);
      setWebinarError("Server hatası.");
    }
  };

  const deleteWebinar = async (webinarID, access_token) => {
    setWebinarLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/webinar/${webinarID}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setWebinarLoading(false);
        setInfo(data.message);

        const filteredWebinars = allWebinars.filter((webinar) => {
          return webinar.id !== webinarID;
        });

        setAllWebinars(filteredWebinars);

        return data;
      } else {
        throw new Error("Webinar silinirken hata ile karşılaşıldı.");
      }
    } catch (error) {
      setWebinarLoading(false);
      setWebinarError("Server hatası.");
    }
  };

  const getExpiredWebinars = async () => {};

  const getUserWebinars = async (id, access_token) => {
    setWebinarLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/webinar/user?id=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setWebinarLoading(false);
        setUserWebinars(data.webinars);
        return data;
      } else {
        throw new Error("Webinar getirilirken hata ile karşılaşıldı.");
      }
    } catch (error) {
      setWebinarLoading(false);
      setWebinarError("Server hatası.");
    }
  };

  const getCurrentUserWebinars = async (access_token) => {
    setWebinarLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/webinar/current`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setWebinarLoading(false);
        return data;
      } else {
        throw new Error("Webinar getirilirken hata ile karşılaşıldı.");
      }
    } catch (error) {
      setWebinarLoading(false);
      setWebinarError("Server hatası.");
    }
  };

  const getWebinarByWebinarId = async (webinarID, access_token) => {
    setWebinarLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/webinar/${webinarID}`
      );

      if (response.ok) {
        const data = await response.json();
        setWebinarLoading(false);
        return data.webinar;
      } else {
        throw new Error("Webinar getirilirken hata ile karşılaşıldı.");
      }
    } catch (error) {
      setWebinarLoading(false);
      setWebinarError("Server hatası.");
    }
  };

  const getWebinarParticipants = async (webinarID, access_token) => {
    setWebinarLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/webinar/${webinarID}/participants`
      );

      const data = await response.json();

      if (data.success) {
        setWebinarLoading(false);
        return data;
      }
    } catch (error) {
      setWebinarLoading(false);
      setWebinarError("Server hatası.");
    }
  };

  const deleteWebinarFromUser = async (webinarID, userID, access_token) => {
    setWebinarLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/webinar/${webinarID}/user`,
        {
          method: "DELETE",
          body: JSON.stringify({ user_id: userID }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const msg = await response.json();

      if (msg.success) {
        setWebinarLoading(false);
        return msg;
      }
    } catch (error) {
      setWebinarLoading(false);
      setWebinarError("Server hatası.");
    }
  };

  const clearWebinarErrors = () => {
    setWebinarError(null);
  };

  return (
    <WebinarContext.Provider
      value={{
        getAllWebinars,
        createWebinar,
        getUserWebinars,
        getWebinarByWebinarId,
        getWebinarParticipants,
        getCurrentUserWebinars,
        updateWebinar,
        deleteWebinar,
        deleteWebinarFromUser,
        clearWebinarErrors,
        allWebinars,
        userWebinars,
        webinarLoading,
        webinarError,
        info,
        setInfo,
        setUserWebinars,
      }}
    >
      {children}
    </WebinarContext.Provider>
  );
};

export default WebinarContext;
