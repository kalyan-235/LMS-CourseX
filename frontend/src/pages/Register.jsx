import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import API from "../api/axios";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // REGISTER

  const handleRegister =
    async (e) => {

      e.preventDefault();

      setError("");

      try {

        setLoading(true);

        const response =
          await API.post(
            "/auth/register",
            {
              name,
              email,
              password,
            }
          );

        alert(
          response.data.message
        );

        navigate("/login");

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Registration Failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="login-page">

      <form
        className="login-box"
        onSubmit={handleRegister}
      >

        <h1>
          Create Account
        </h1>

        <p className="login-subtitle">
          Start your learning journey
        </p>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          required
        />

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
              ? "Creating..."
              : "Register"
          }

        </button>

        <p className="auth-switch">

          Already have account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}