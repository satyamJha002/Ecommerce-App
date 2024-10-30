import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signUp = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const userData = await response.json();
      const { success, message } = userData;

      if (success) {
        setUser(userData.user);
        setIsLoggedIn(true);
        return { success, message };
      } else {
        return { success, message };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: "An error occured duing signup." };
    }
  };

  const signIn = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      const { success, message } = data;

      if (success) {
        setUser(data.user);
        return { success, message };
      } else {
        return { success, message };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: "An error occured during login" };
    }
  };

  const logOut = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ user, signUp, signIn, isLoggedIn, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
