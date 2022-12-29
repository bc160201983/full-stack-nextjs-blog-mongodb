import React, { useContext, useEffect, useState } from "react";
import { useGlobalContext } from "../context/authContext";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Loading from "../public/img/Rolling.svg";
import Alert from "./Alert";
// import login from "../pages/api/auth/login";

const Login = () => {
  const { login, currentUser, showAlert, alert } = useGlobalContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(input);
      router.push("/");
      loading(false);
    } catch (error) {
      console.log(error);
      const err = error ? error.response?.data.message : "";
      setLoading(false);
      showAlert(true, "danger", err);
    }
  };
  useEffect(() => {
    if (currentUser) {
      router.push("/login");
    }
    6;
  }, []);
  return (
    <div className="auth">
      <h1>Login</h1>
      <form action="">
        <input
          required
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          required
          name="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
        />
        {/* <img src={Loading.src} /> */}
        <button onClick={handleSubmit}>
          {loading ? <img src={Loading.src} /> : "Login"}
        </button>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <span>
          Don't have a account?
          <Link href="/register">
            <a>Register</a>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
