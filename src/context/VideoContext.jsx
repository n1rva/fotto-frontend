"use client";
import axios from "axios";
import { useState, createContext } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [allVideos, setAllVideos] = useState(null);

  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);

  const getAllVideos = async () => {
    try {
      setVideoLoading(true);
      const response = await fetch(`${process.env.API_URL}/api/video`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();

        setVideoLoading(false);
        setAllVideos(data.videos);

        return data;
      } else {
        throw new Error("Webinar kayıtlarına erişilemiyor.");
      }
    } catch (error) {
      setVideoLoading(false);
      setVideoError(error.message || "Webinar kayıtlarına erişilemiyor.");
    }
  };

  const getVideo = async (videoID) => {
    setVideoLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/video/${videoID}`
      );

      if (response.ok) {
        const data = await response.json();

        setVideoLoading(false);

        return data;
      } else {
        throw new Error("Webinar kaydına erişilemedi.");
      }
    } catch (error) {
      setVideoLoading(false);
      setVideoError(error.message || "Server hatası.");
    }
  };

  const createVideo = async (
    {
      title,
      data,
      price,
      date,
      instructor,
      instructorImage,

      thumbnail,
      participants,
    },
    access_token
  ) => {
    setVideoLoading(true);

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", JSON.stringify(data));
    formData.append("price", price);
    formData.append("date", date);

    formData.append("instructor", instructor);
    formData.append("instructor_image", instructorImage);

    formData.append("thumbnail", thumbnail);
    participants && formData.append("participants", participants);

    try {
      const response = await fetch(`${process.env.API_URL}/api/video/create`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVideoLoading(false);
        return data;
      } else {
        throw new Error("Webinar kaydı oluşturulurken hata ile karşılaşıldı.");
      }
    } catch (error) {
      setVideoLoading(false);
      setVideoError(
        error.message || "Webinar kaydı oluşturulurken hata ile karşılaşıldı."
      );
    }
  };

  const updateVideo = async (
    {
      title,
      data,
      price,
      date,
      instructor,
      instructorImage,
      thumbnail,
      participants,
      videoID,
    },
    access_token
  ) => {
    setVideoLoading(true);

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

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      if (participants) {
        participants.forEach((participantID) => {
          formData.append("participants", participantID);
        });
      }

      const response = await fetch(
        `${process.env.API_URL}/api/video/${videoID}/update`,
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
        setVideoLoading(false);
        return data;
      } else {
        throw new Error("Webinar kaydı düzeltilirken hata ile karşılaşıldı.");
      }
    } catch (error) {
      setVideoLoading(false);
      setVideoError(
        error.message || "Webinar kaydı düzeltilirken hata ile karşılaşıldı."
      );
    }
  };

  const deleteVideo = async (videoID, access_token) => {
    setVideoLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/video/${videoID}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setVideoLoading(false);

        return data;
      } else {
        throw new Error("Webinar silinirken hata ile karşılaşıldı.");
      }
    } catch (error) {
      setVideoLoading(false);
      setVideoError(
        error.message || "Webinar silinirken hata ile karşılaşıldı."
      );
    }
  };

  const getExpiredVideo = async () => {};

  const getUserVideos = async (userID, access_token) => {
    setVideoLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/video/user?user_id=${userID}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setVideoLoading(false);

        return data;
      } else {
        throw new Error("Kullanıcı webinar kayıtları getirilemedi.");
      }
    } catch (error) {
      setVideoLoading(false);
      setVideoError(
        error.message || "Kullanıcı webinar kayıtları getirilemedi."
      );
    }
  };

  const getCurrentUserVideos = async (access_token) => {
    setVideoLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/video/user/current`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setVideoLoading(false);
        return data;
      } else {
        throw new Error(
          "Kullanıcı webinar kayıtlarını getirirken hata ile karşılaşıldı."
        );
      }
    } catch (error) {
      setVideoError(
        error.message ||
          "Kullanıcı webinar kayıtlarını getirirken hata ile karşılaşıldı."
      );
      setVideoLoading(false);
    }
  };

  const getVideoParticipants = async (videoID, access_token) => {
    setVideoLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/video/${videoID}/participants`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setVideoLoading(false);

        return data;
      } else {
        throw new Error(
          "Webinar kaydı kullanıcıları getirilirken bir hatayla karşılaşıldı."
        );
      }
    } catch (error) {
      setVideoLoading(false);
      setVideoError(
        error.message ||
          "Webinar kaydı kullanıcıları getirilirken bir hatayla karşılaşıldı."
      );
    }
  };

  const deleteVideoFromUser = async (videoID, userID, access_token) => {
    setVideoLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/video/user/${videoID}/delete`,
        {
          method: "DELETE",
          body: JSON.stringify({ user_id: userID }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setVideoLoading(false);

        return data;
      } else {
        throw new Error(
          "Webinar kaydı kullanıcıdan kaldırılırken hata ile karşılaşıldı."
        );
      }
    } catch (error) {
      setVideoLoading(false);
      setVideoError(
        error.message ||
          "Webinar kaydı kullanıcıdan kaldırılırken hata ile karşılaşıldı."
      );
    }
  };

  const streamVideo = async (videoFileID) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/video/file/${videoFileID}`
      );
      const videoBlob = await response.blob();

      const videoUrl = URL.createObjectURL(videoBlob);
      return videoUrl;
    } catch (error) {
      setVideoError(error.message || "Video yüklenemedi.");
    }
  };

  const createVideoFile = async (file, videoId, token) => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        // progress güncelleme
        setUploadProgress(progress);
      },
    };

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${process.env.API_URL}/api/video/file/${videoId}/create`,
        formData,
        config
      );
      console.log(response);

      // başarı durumu
    } catch (error) {
      // hata durumu
    }
  };

  const deleteVideoFile = async (videoFileID) => {
    setVideoLoading(true);
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/video/file/${videoFileID}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setVideoLoading(false);

        return data;
      } else {
        throw new Error("Webinar kaydı silinemedi.");
      }
    } catch (error) {
      setVideoLoading(false);
      setVideoError(error.message || "Webinar kaydı silinemedi.");
    }
  };

  const clearErrors = () => {
    setVideoError(null);
  };

  return (
    <VideoContext.Provider
      value={{
        getAllVideos,
        getVideo,
        createVideo,
        getUserVideos,
        getVideoParticipants,
        getCurrentUserVideos,
        updateVideo,
        deleteVideo,
        deleteVideoFromUser,

        streamVideo,
        createVideoFile,
        deleteVideoFile,

        clearErrors,

        allVideos,
        videoLoading,
        videoError,
        uploadProgress,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoContext;
