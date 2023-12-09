"use client";

import { createContext, useState } from "react";

const CertificateContext = createContext();

export const CertificateProvider = ({ children }) => {
  const [usersCertificates, setUsersCertificates] = useState([]);
  const [previewedCertificate, setPreviewedCertificate] = useState(null);

  const [certificateLoading, setCertificateLoading] = useState(false);
  const [certificateError, setCertificateError] = useState(null);

  const getCertificatesByUserID = async (access_token, user_id) => {
    try {
      setCertificateLoading(true);
      const response = await fetch(
        `${process.env.API_URL}/api/v1/certificate?userid=${user_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setUsersCertificates(data.certificates);
        setCertificateLoading(false);

        return data;
      } else {
        throw new Error("Hatayla karşılaşıldı.");
      }
    } catch (error) {
      setCertificateLoading(false);
      setCertificateError(
        error.message || "Server kaynaklı bir hata ile karşılaşıldı."
      );
    }
  };

  const createCertificateByUserID = async (
    {
      userID,
      fontSize,
      color,
      yAxis,
      maxTextWidth,
      maxFontSize,
      font,
      source,
      id_xAxis,
      id_yAxis,
      id_fontSize,
      id_font,
      id_color,
      qr_x,
      qr_y,
      qr_size,
      qr_bg,
      qr_fg,
    },
    access_token
  ) => {
    try {
      setCertificateLoading(true);
      const formData = new FormData();

      formData.append("userID", userID);
      formData.append("font_size", fontSize);
      formData.append("color", color);
      formData.append("y_axis", yAxis);
      formData.append("max_text_width", maxTextWidth);
      formData.append("max_font_size", maxFontSize);
      formData.append("font", font);
      formData.append("source_id", source);

      formData.append("id_x_axis", id_xAxis);
      formData.append("id_y_axis", id_yAxis);
      formData.append("id_font_size", id_fontSize);
      formData.append("id_font", id_font);
      formData.append("id_color", id_color);

      formData.append("qr_x", qr_x);
      formData.append("qr_y", qr_y);
      formData.append("qr_size", qr_size);
      formData.append("qr_bg", qr_bg);
      formData.append("qr_fg", qr_fg);

      formData.append("certificate_type", certificate_type);

      const response = await fetch(
        `${process.env.API_URL}/api/v1/certificate`,
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

        setCertificateLoading(false);

        return data;
      } else {
        throw new Error("Sertifika oluşturulurken hata ile karşılaşıldı.");
      }
    } catch (error) {
      setCertificateLoading(false);
      setCertificateError(
        error.message || "Sertifika oluşturulurken hata ile karşılaşıldı."
      );
    }
  };

  const createAndPreviewCertificate = async (
    {
      name,
      fontSize,
      color,
      yAxis,
      maxTextWidth,
      maxFontSize,
      font,
      source,
      id_xAxis,
      id_yAxis,
      id_fontSize,
      id_font,
      id_color,
      qr_x,
      qr_y,
      qr_size,
      qr_bg,
      qr_fg,
      certificate_type,
    },
    access_token
  ) => {
    setCertificateLoading(true);
    const formData = new FormData();

    formData.append("name", name);
    formData.append("font_size", fontSize);
    formData.append("color", color);
    formData.append("y_axis", yAxis);
    formData.append("max_text_width", maxTextWidth);
    formData.append("max_font_size", maxFontSize);
    formData.append("font", font);
    formData.append("source_id", source);

    formData.append("id_x_axis", id_xAxis);
    formData.append("id_y_axis", id_yAxis);
    formData.append("id_font_size", id_fontSize);
    formData.append("id_font", id_font);
    formData.append("id_color", id_color);

    formData.append("qr_x", qr_x);
    formData.append("qr_y", qr_y);
    formData.append("qr_size", qr_size);
    formData.append("qr_bg", qr_bg);
    formData.append("qr_fg", qr_fg);

    formData.append("certificate_type", certificate_type);

    try {
      setCertificateLoading(false);
      const response = await fetch(
        `${process.env.API_URL}/api/v1/certificate/preview`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const pdf = await response.blob();
        setCertificateLoading(false);

        setPreviewedCertificate(URL.createObjectURL(pdf));
      } else {
        throw new Error("Sertifika bulunamadı.");
      }
    } catch (error) {
      setCertificateLoading(false);
      setCertificateError(error.message);
    }
  };

  const getCurrentUsersWebinarCertificates = async (access_token) => {
    setCertificateLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/certificate/user/webinar`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setCertificateLoading(false);

        return data;
      } else {
        throw new Error("Hatayla karşılaşıldı.");
      }
    } catch (error) {
      setCertificateLoading(false);
      setCertificateError(
        error.message || "Server kaynaklı bir hata ile karşılaşıldı."
      );
    }
  };

  const getCurrentUsersVideoCertificates = async (access_token) => {
    setCertificateLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/certificate/user/video`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setCertificateLoading(false);

        return data;
      } else {
        throw new Error("Hatayla karşılaşıldı.");
      }
    } catch (error) {
      setCertificateLoading(false);
      setCertificateError(
        error.message || "Server kaynaklı bir hata ile karşılaşıldı."
      );
    }
  };

  const getCertificateByUniqueID = async (unique_id) => {
    setCertificateLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/certificate/uniqueid`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ unique_id }),
        }
      );

      if (response.ok) {
        const pdf = await response.blob();

        setCertificateLoading(false);

        return URL.createObjectURL(pdf);
      } else {
        throw new Error("Hatayla karşılaşıldı.");
      }
    } catch (error) {
      setCertificateLoading(false);
      setCertificateError(
        error.message || "Server kaynaklı bir hata ile karşılaşıldı."
      );
    }
  };

  const deleteCertificate = async (id, access_token) => {
    setCertificateLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/certificate/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setCertificateLoading(false);

        return data;
      } else {
        throw new Error("Hatayla karşılaşıldı.");
      }
    } catch (error) {
      setCertificateLoading(false);
      setCertificateError(
        error.message || "Server kaynaklı bir hata ile karşılaşıldı."
      );
    }
  };

  const createCertificateForWebinarParticipants = async (
    {
      fontSize,
      color,
      yAxis,
      maxTextWidth,
      maxFontSize,
      font,
      webinar,
      id_xAxis,
      id_yAxis,
      id_fontSize,
      id_font,
      id_color,
      qr_x,
      qr_y,
      qr_size,
      qr_bg,
      qr_fg,
    },
    access_token
  ) => {
    setCertificateLoading(true);

    try {
      const formData = new FormData();

      formData.append("font_size", fontSize);
      formData.append("color", color);
      formData.append("y_axis", yAxis);
      formData.append("max_text_width", maxTextWidth);
      formData.append("max_font_size", maxFontSize);
      formData.append("font", font);
      formData.append("webinar_id", webinar);

      formData.append("id_x_axis", id_xAxis);
      formData.append("id_y_axis", id_yAxis);
      formData.append("id_font_size", id_fontSize);
      formData.append("id_font", id_font);
      formData.append("id_color", id_color);

      formData.append("qr_x", qr_x);
      formData.append("qr_y", qr_y);
      formData.append("qr_size", qr_size);
      formData.append("qr_bg", qr_bg);
      formData.append("qr_fg", qr_fg);

      const response = await fetch(
        `${process.env.API_URL}/api/v1/certificate/participants/webinar`,
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

        setCertificateLoading(false);

        return data;
      } else {
        throw new Error("Sertifika oluşturulurken hata ile karşılaşıldı.");
      }
    } catch (error) {
      setCertificateLoading(false);
      setCertificateError(
        error.message || "Sertifika oluşturulurken hata ile karşılaşıldı."
      );
    }
  };

  const createCertificateForVideoParticipants = async (
    {
      fontSize,
      color,
      yAxis,
      maxTextWidth,
      maxFontSize,
      font,
      video,
      id_xAxis,
      id_yAxis,
      id_fontSize,
      id_font,
      id_color,
      qr_x,
      qr_y,
      qr_size,
      qr_bg,
      qr_fg,
    },
    access_token
  ) => {
    setCertificateLoading(true);

    try {
      const formData = new FormData();

      formData.append("font_size", fontSize);
      formData.append("color", color);
      formData.append("y_axis", yAxis);
      formData.append("max_text_width", maxTextWidth);
      formData.append("max_font_size", maxFontSize);
      formData.append("font", font);
      formData.append("video_id", video);

      formData.append("id_x_axis", id_xAxis);
      formData.append("id_y_axis", id_yAxis);
      formData.append("id_font_size", id_fontSize);
      formData.append("id_font", id_font);
      formData.append("id_color", id_color);

      formData.append("qr_x", qr_x);
      formData.append("qr_y", qr_y);
      formData.append("qr_size", qr_size);
      formData.append("qr_bg", qr_bg);
      formData.append("qr_fg", qr_fg);

      const response = await fetch(
        `${process.env.API_URL}/api/v1/certificate/participants/video`,
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

        setCertificateLoading(false);

        return data;
      } else {
        throw new Error("Sertifika oluşturulurken hata ile karşılaşıldı.");
      }
    } catch (error) {
      setCertificateLoading(false);
      setCertificateError(
        error.message || "Sertifika oluşturulurken hata ile karşılaşıldı."
      );
    }
  };

  const verifyCertificate = async (query) => {
    setCertificateLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/certificate/verify?q=${query}`
      );

      if (response.ok) {
        const data = await response.json();

        setCertificateLoading(false);

        return data;
      } else {
        throw new Error("Sertifika bulunamadı.");
      }
    } catch (error) {
      setCertificateLoading(false);
      setCertificateError(error.message);
    }
  };

  const clearCertificateErrors = () => {
    setCertificateError(null);
  };

  return (
    <CertificateContext.Provider
      value={{
        usersCertificates,
        previewedCertificate,
        certificateLoading,
        certificateError,
        getCertificatesByUserID,
        createAndPreviewCertificate,
        createCertificateByUserID,
        getCurrentUsersWebinarCertificates,
        getCurrentUsersVideoCertificates,
        getCertificateByUniqueID,
        deleteCertificate,
        clearCertificateErrors,
        createCertificateForWebinarParticipants,
        createCertificateForVideoParticipants,
        verifyCertificate,
        setUsersCertificates,
      }}
    >
      {children}
    </CertificateContext.Provider>
  );
};

export default CertificateContext;
