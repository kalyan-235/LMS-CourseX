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

  // LOGIN

  const handleLogin =
    async (e) => {

      e.preventDefault();

      setError("");

      try {

        setLoading(true);

        const response =
          await API.post(
            "/auth/login",
            {
              email,
              password,
            }
          );

        // SAVE TOKEN

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.user
          )
        );

        // ADMIN CHECK

        if (
          response.data.user.isAdmin
        ) {

          navigate("/admin");

        } else {

          navigate("/mylearning");
        }

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Login Failed"
        );

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