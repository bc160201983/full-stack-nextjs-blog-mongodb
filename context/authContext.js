import React, { useState, useContext, useEffect, createContext } from "react";
import { setCookie, getCookie } from "cookies-next";
import Cookies from "js-cookie";
import axios from "axios";

const AppContext = createContext();

const getLocalStorage = () => {
  let user = Cookies.get("user");
  if (user) {
    return (user = JSON.parse(Cookies.get("user")));
  } else {
    return null;
  }
};

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getLocalStorage() || null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const login = async (inputs) => {
    const res = await axios.post("/api/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setCurrentUser(null);
    Cookies.remove("user");
    Cookies.remove("access_token");
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  // useEffect(() => {
  //   setCurrentUser(getLocalStorage());
  // }, []);

  useEffect(() => {
    console.log(JSON.stringify(currentUser));
    Cookies.set("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AppContext.Provider
      value={{ currentUser, login, logout, showAlert, alert }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
