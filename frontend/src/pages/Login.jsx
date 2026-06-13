import { useState } from "react";

import { useNavigate, Link }
from "react-router-dom";

import API from "../api/axios";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await API.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    if (res.data.user.isAdmin) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  } catch (err) {
    setError(err.response?.data?.message || "Login failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (

    <div className="login-page">

      <form
        className="login-box"
        onSubmit={handleLogin}
      >

        <h1>
          Welcome Back
        </h1>

        <p className="login-subtitle">
          Login to continue learning
        </p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
        />

        <Link
          to="/forgot-password"
          className="forgot-password-link"
        >
          Forgot Password?
        </Link>

        {error && (

          <p className="login-error">
            {error}
          </p>

        )}

        <button
          type="submit"
        >

          {
            loading
              ? "Logging..."
              : "Login"
          }

        </button>

        <p className="auth-switch">email: admin@gmail.com</p>
        <p className="auth-switch">psw: 12345678</p>
        <p className="auth-switch">
          Don't have account?
          <Link to="/register">
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}