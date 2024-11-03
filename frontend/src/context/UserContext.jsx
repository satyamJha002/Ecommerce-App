import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const savedToken = localStorage.getItem("token");
    if (savedUser) setUser(savedUser);
    if (savedToken) setToken(savedToken);
  }, []);

  const saveUser = (formData) => {
    setUser(formData);
    setToken(formData.token);
    localStorage.setItem("user", JSON.stringify(formData));
    localStorage.setItem("token", formData.token);
  };

  const signUp = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        formData
      );
      console.log(response.data);
      saveUser(response.data);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  const logIn = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        formData
      );
      console.log(response.data);
      setIsLoggedIn(true);
      saveUser(response.data);
    } catch (error) {
      console.log(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{ user, loading, error, isLoggedIn, token, signUp, logIn, logOut }}
    >
      {children}
    </UserContext.Provider>
  );
};
