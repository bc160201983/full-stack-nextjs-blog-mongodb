import { setCookie, deleteCookie } from "cookies-next";

const logout = async (req, res) => {
  deleteCookie("access_token", { path: "/", domain: "http://localhost:3000/" });
  res.status(200).json("User has been logged out");
};

export default logout;
