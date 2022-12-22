import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const router = useRouter();
  const [input, setInput] = useState({ username: "", email: "", password: "" });
  const [err, setErr] = useState(null);
  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", input);
      router.replace("/login");
    } catch (error) {
      setErr(error.response.data.message);
    }
  };
  return (
    <div className="auth">
      <h1>Register</h1>
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
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
          required
          name="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Sign Up</button>
        {err && <p>{err}</p>}
        <span>
          Already have an account?
          <Link href="/login">
            <a>Login</a>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
