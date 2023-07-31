"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [allUsers, setAllUsers] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, [user]);

  // Login user
  const login = async ({ username, password }) => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        loadUser();
        setIsAuthenticated(true);
        setLoading(false);
        router.push("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  // Register user
  const signup = async ({ firstName, lastName, email, password }) => {
    try {
      setLoading(true);

      const res = await fetch(`${process.env.API_URL}/api/v1/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        setLoading(false);
        data.success && router.push("/signin");
      } else {
        throw new Error("Hatayla karşılaşıldı.");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message || "Server kaynaklı bir hata ile karşılaşıldı.");
    }
  };

  const updateProfile = async (
    { firstName, lastName, email },
    access_token
  ) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.API_URL}/api/v1/user/update/info`,
        {
          method: "PUT",
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setLoading(false);
        setUpdated(true);
        setUser(data.user);
      } else {
        throw new Error("Hatayla karşılaşıldı.");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message || "Server kaynaklı bir hata ile karşılaşıldı.");
    }
  };

  const updatePassword = async (
    { currentPassword, newPassword, confirmNewPassword },
    access_token
  ) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.API_URL}/api/v1/user/update/pass`,
        {
          method: "PUT",
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmNewPassword,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        setUpdated(true);
      } else {
        throw new Error(data.message || "Hata ile karşılaşıldı");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message || "Server kaynaklı bir hata ile karşılaşıldı.");
    }
  };

  // Load user
  const loadUser = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/user");

      const data = await res.json();

      if (data.user) {
        setIsAuthenticated(true);
        setLoading(false);
        setUser(data.user);
      }
    } catch (error) {
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  // Logout user
  const logout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/logout", { method: "POST" });

      const data = await res.json();

      if (data.success) {
        setLoading(false);
        setIsAuthenticated(false);
        setUser(null);
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  const getAllUsers = async (access_token) => {
    try {
      const response = await fetch(`${process.env.API_URL}/api/v1/allusers/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setAllUsers(data.users);
      }
    } catch (error) {
      setError("Server hatası.");
    }
  };

  const getUserByID = async (userID, access_token) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/user/${userID}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        setLoading(false);

        return data.user;
      } else {
        throw new Error("Hatayla karşılaşıldı.");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message || "Server kaynaklı bir hata ile karşılaşıldı.");
    }
  };

  const searchUsers = async (query, access_token) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.API_URL}/api/v1/user/search?q=${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        setSearchResults(data.users);
        return data;
      } else {
        throw new Error("Hatayla karşılaşıldı.");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message || "Server kaynaklı bir hata ile karşılaşıldı.");
    }
  };

  // Clear Errors
  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        error,
        isAuthenticated,
        updated,
        allUsers,
        searchResults,
        login,
        signup,
        updateProfile,
        logout,
        clearErrors,
        setUpdated,
        getAllUsers,
        searchUsers,
        getUserByID,
        setSearchResults,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
