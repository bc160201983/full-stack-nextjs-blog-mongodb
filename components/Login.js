import React, { useContext, useState } from "react";
import { useGlobalContext } from "../context/authContext";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
// import login from "../pages/api/auth/login";

const Login = () => {
  const { login } = useGlobalContext();
  const router = useRouter();
  const [input, setInput] = useState({ username: "", password: "" });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(input);
      router.replace("/");
    } catch (error) {
      console.log(error);
      // setErr(error);
    }
  };
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
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
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
