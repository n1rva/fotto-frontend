"use client";
import axios from "axios";
import { useState, createContext } from "react";

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [allVideos, setAllVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [userVideos, setUserVideos] = useState([]);

  const [videoFilters, setVideoFilters] = useState([]);

  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);

  const getAllVideos = async () => {
    try {
      setVideoLoading(true);
      const response = await fetch(`${process.env.API_URL}/api/v1/video`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();

        setVideoLoading(false);
        setAllVideos(data.results);

        return data;
      } else {
        throw new Error("Webinar kayıtlarına erişilemiyor.");
      }
    } catch (error) {
      setVideoLoading(false);
      setVideoError(error.message || "Webinar kayıtlarına erişilemiyor.");
    }
  };

  const getVideosByPagination = async (page) => {
    try {
      setVideoLoading(true);
      const response = await fetch(
        `${process.env.API_URL}/api/v1/video?p=${page}&page_size=8`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();

        setVideoLoading(false);

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
        `${process.env.API_URL}/api/v1/video/${videoID}`
      );

      const data = await response.json();
      if (response.ok) {
        setVideoLoading(false);

        return data;
      } else {
        throw new Error(data.message || "Webinar kaydına erişilemedi.");
      }
    } catch (error) {
      setVideoLoading(false);
      setVideoError(error.message || "Server hatası.");
    }
  };

  const getVideoBySlug = async (video_slug) => {
    setVideoLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/video/${video_slug}/slug`
      );

      const data = await response.json();
      if (response.ok) {
        setVideoLoading(false);

        return data;
      } else {
        throw new Error(data.message || "Webinar kaydına erişilemedi.");
      }
    } catch (error) {
      setVideoLoading(false);
      setVideoError(error.message || "Server hatası.");
    }
  };

  const searchVideo = async (access_token, query) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/video/search/${query}`,
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
        return data.videos || [];
      } else {
        throw new Error(data.message || "Video bulunamadı.");
      }
    } catch (error) {
      setVideoLoading(false);
      setVideoError(error.message || "Server hatası.");
    }
  };

  const getFilters = async () => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/video/filters`
      );

      const data = await response.json();
      if (response.ok) {
        setVideoFilters(data.tags || []);
      } else {
        throw new Error(data.message || "Filtrelere erişilemedi.");
      }
    } catch (error) {
      setVideoLoading(false);
      setVideoError(error.message || "Server hatası.");
    }
  };

  const searchFilters = async (query) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/video/filters/search/${query}`
      );

      const data = await response.json();
      if (response.ok) {
        return data.tags || [];
      } else {
        throw new Error(data.message || "Filtrelere erişilemedi.");
      }
    } catch (error) {
      setVideoLoading(false);
      setVideoError(error.message || "Server hatası.");
    }
  };

  const getVideosByTags = async (tags, page) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/video/filters/${tags}?p=${page}&page_size=8`
      );

      const data = await response.json();

      if (response.ok) {
        return data;
        // setFilteredVideos(data.videos);
      } else {
        throw new Error(data.message || "Video bulunamadı.");
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
      sourceCertificate,
      thumbnail,
      tags,
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

    sourceCertificate &&
      formData.append("source_certificate", sourceCertificate);

    formData.append("thumbnail", thumbnail);
    tags &&
      tags.forEach((tag) => {
        formData.append("tags[]", tag);
      });

    participants && formData.append("participants", participants);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/video/create`,
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
      sourceCertificate,
      certAdded,
      tags,
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

      if (sourceCertificate) {
        formData.append("source_certificate", sourceCertificate);
      }

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      if (tags) {
        formData.append("tags", tags);
      }

      if (participants) {
        participants.forEach((participantID) => {
          formData.append("participants", participantID);
        });
      }

      if (certAdded) {
        formData.append("certificates_added", certAdded);
      }

      const response = await fetch(
        `${process.env.API_URL}/api/v1/video/${videoID}/update`,
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
        `${process.env.API_URL}/api/v1/video/${videoID}/delete`,
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

        const filteredVideos = allVideos.filter((video) => {
          return video.id !== videoID;
        });
        setAllVideos(filteredVideos);

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

  const getUserVideos = async (userID, access_token) => {
    setVideoLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/video/user?user_id=${userID}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setVideoLoading(false);
        setUserVideos(data.videos);

        return data;
      } else {
        throw new Error(
          data.message || "Kullanıcı webinar kayıtları getirilemedi."
        );
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
        `${process.env.API_URL}/api/v1/video/user/current`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
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
        `${process.env.API_URL}/api/v1/video/${videoID}/participants`,
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

  const checkIfUserHasVideo = async (videoID, access_token) => {
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/video/${videoID}/check`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const msg = await response.json();

      if (msg.success) {
        return msg.has_video;
      }
    } catch (error) {
      setVideoError(error || "Server hatası.");
    }
  };

  const deleteVideoFromUser = async (videoID, userID, access_token) => {
    setVideoLoading(true);

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/video/user/${videoID}/delete`,
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
        `${process.env.API_URL}/api/v1/video/file/${videoFileID}`
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
        `${process.env.API_URL}/api/v1/video/file/${videoId}/create`,
        formData,
        config
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Webinar kaydı yüklenemedi.");
      }
    } catch (error) {
      setVideoError(error.message || "Webinar kaydı yüklenemedi.");
    }
  };

  const deleteVideoFile = async (videoFileID) => {
    setVideoLoading(true);
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/video/file/${videoFileID}/delete`,
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

  const clearVideoErrors = () => {
    setVideoError(null);
  };

  return (
    <VideoContext.Provider
      value={{
        getAllVideos,
        getVideosByPagination,
        getVideo,
        getVideoBySlug,
        searchVideo,
        createVideo,
        getFilters,
        searchFilters,
        getVideosByTags,
        getUserVideos,
        getVideoParticipants,
        getCurrentUserVideos,
        checkIfUserHasVideo,
        updateVideo,
        deleteVideo,
        deleteVideoFromUser,

        streamVideo,
        createVideoFile,
        deleteVideoFile,

        setUserVideos,
        clearVideoErrors,

        allVideos,
        userVideos,
        videoFilters,
        filteredVideos,
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
