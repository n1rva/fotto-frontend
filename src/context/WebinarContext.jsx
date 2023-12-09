"use client";

import { useState, createContext } from "react";

const WebinarContext = createContext();

export const WebinarProvider = ({ children }) => {
  const [allWebinars, setAllWebinars] = useState([]);
  const [userWebinars, setUserWebinars] = useState([]);

  const [webinarFilters, setWebinarFilters] = useState([]);
  const [filteredWebinars, setFilteredWebinars] = useState([]);

  const [webinarLoading, setWebinarLoading] = useState(false);
  const [webinarError, setWebinarError] = useState(null);
  const [info, setInfo] = useState("");

  const getAllWebinars = async () => {
    setWebinarLoading(true);
    try {
      const response = await fetch(`${process.env.API_URL}/api/v1/webinar`, {
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
      tags,
      wpGroupUrl,
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

    if (tags) {
      tags.forEach((tag) => {
        formData.append("tags[]", tag);
      });
    }

    if (participants) formData.append("participants", participants);
    if (wpGroupUrl) formData.append("wp_group_url", wpGroupUrl);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/webinar/create`,
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
      tags,
      participants,
      webinarID,
      certAdded,
      wpGroupUrl,
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

      if (tags) {
        tags.forEach((tag) => {
          formData.append("tags[]", tag);
        });
      }

      if (participants) {
        participants.forEach((participantID) => {
          formData.append("participants", participantID);
        });
      }

      if (certAdded) {
        formData.append("certificates_added", certAdded);
      }

      if (wpGroupUrl) {
        formData.append("wp_group_url", wpGroupUrl);
      }

      const response = await fetch(
        `${process.env.API_URL}/api/v1/webinar/${webinarID}/update`,
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
        `${process.env.API_URL}/api/v1/webinar/${webinarID}/delete`,
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

  const getUserWebinars = async (id, access_token) => {
    setWebinarLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/webinar/user?id=${id}`,
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

  const getCurrentUserActiveWebinars = async (access_token) => {
    setWebinarLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/webinar/current/active`,
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

  const searchWebinar = async (access_token, query) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/webinar/search/${query}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        return data.webinars || [];
      } else {
        throw new Error(data.message || "Webinar bulunamadı.");
      }
    } catch (error) {
      setWebinarLoading(false);
      setWebinarError(error.message || "Server hatası.");
    }
  };

  const getCurrentUserExpiredWebinars = async (access_token) => {
    setWebinarLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/webinar/current/expired`,
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
        `${process.env.API_URL}/api/v1/webinar/${webinarID}`
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

  const getWebinarBySlug = async (slug, access_token) => {
    setWebinarLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/webinar/${slug}/slug`
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

  const getFilters = async () => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/webinar/filters`
      );

      const data = await response.json();
      if (response.ok) {
        setWebinarFilters(data.tags || []);
      } else {
        throw new Error(data.message || "Filtrelere erişilemedi.");
      }
    } catch (error) {
      setWebinarLoading(false);
      setWebinarError(error.message || "Server hatası.");
    }
  };

  const searchFilters = async (query) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/webinar/filters/search/${query}`
      );

      const data = await response.json();
      if (response.ok) {
        return data.tags || [];
      } else {
        throw new Error(data.message || "Filtrelere erişilemedi.");
      }
    } catch (error) {
      setWebinarLoading(false);
      setWebinarError(error.message || "Server hatası.");
    }
  };

  const getWebinarsByTag = async (tags) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/webinar/filters/${tags}`
      );

      const data = await response.json();

      if (response.ok) {
        setFilteredWebinars(data.filtered_webinars);
      } else {
        throw new Error(data.message || "Video bulunamadı.");
      }
    } catch (error) {
      setWebinarLoading(false);
      setWebinarError(error.message || "Server hatası.");
    }
  };

  const getWebinarParticipants = async (webinarID, access_token) => {
    setWebinarLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/webinar/${webinarID}/participants`,
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
        `${process.env.API_URL}/api/v1/webinar/${webinarID}/user`,
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

  const checkIfUserHasWebinar = async (webinarID, access_token) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/webinar/${webinarID}/check`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const msg = await response.json();

      if (msg.success) {
        return msg.has_webinar;
      }
    } catch (error) {
      setWebinarError(error || "Server hatası.");
    }
  };

  const deneme = async (access_token) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/payment/deneme`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        return data;
      }
    } catch (error) {
      setWebinarError(error || "Server hatası.");
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
        getWebinarBySlug,
        getWebinarParticipants,
        getCurrentUserActiveWebinars,
        getCurrentUserExpiredWebinars,
        updateWebinar,
        deleteWebinar,
        deleteWebinarFromUser,
        checkIfUserHasWebinar,
        searchWebinar,
        getFilters,
        searchFilters,
        getWebinarsByTag,
        clearWebinarErrors,
        allWebinars,
        userWebinars,
        filteredWebinars,
        webinarFilters,
        webinarLoading,
        webinarError,
        info,
        setInfo,
        setUserWebinars,

        deneme,
      }}
    >
      {children}
    </WebinarContext.Provider>
  );
};

export default WebinarContext;
