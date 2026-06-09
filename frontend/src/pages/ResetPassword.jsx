import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import API from "../api/axios";
import "../css/login.css";

export default function ResetPassword(){

 const navigate = useNavigate();
 const location = useLocation();

 const [email, setEmail] =
 useState(location.state?.email || "");

 const [otp, setOtp] =
 useState("");

 const [password, setPassword] =
 useState("");

 const [confirmPassword, setConfirmPassword] =
 useState("");

 const [message, setMessage] = 
 useState("");

 const [loading, setLoading] = 
 useState(false);

 const [error, setError] = 
 useState("");

 const handleReset =
 async(e)=>{

  e.preventDefault();
  setLoading(true);
  setMessage("");
  setError("");

  if(password !== confirmPassword){
   setError("Passwords do not match");
   setLoading(false);
   return;
  }

  try{

   await API.post(
    "/auth/reset-password",
    {
      email,
      otp,
      password
    }
   );

   setMessage(
    "Password updated successfully!"
   );

   setTimeout(() => {
    navigate("/login");
   }, 2000);

  }catch(error){

   setError(
    error.response?.data?.message || 
    "Failed to reset password"
   );

  }finally{

   setLoading(false);

  }

 };

 return(

  <div className="login-page">

   <form 
    className="login-box"
    onSubmit={handleReset}
   >

    <h1>
     Reset Password
    </h1>

    <p className="login-subtitle">
     Enter OTP and new password
    </p>

    <input
     type="email"
     placeholder="Email"
     value={email}
     onChange={(e)=>
      setEmail(
       e.target.value
      )
     }
     required
    />

    <input
     type="text"
     placeholder="Enter OTP"
     value={otp}
     onChange={(e)=>
      setOtp(
       e.target.value
      )
     }
     required
    />

    <input
     type="password"
     placeholder="New Password"
     value={password}
     onChange={(e)=>
      setPassword(
       e.target.value
      )
     }
     required
    />

    <input
     type="password"
     placeholder="Confirm Password"
     value={confirmPassword}
     onChange={(e)=>
      setConfirmPassword(
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

    {message && (

     <p style={{
      color: "green",
      fontSize: "14px",
      textAlign: "center"
     }}>
      {message}
     </p>

    )}

    <button
     type="submit"
     disabled={loading}
    >
     {
      loading
       ? "Resetting..."
       : "Reset Password"
     }
    </button>

    <p className="auth-switch">

     <Link to="/login">
      Back to Login
     </Link>

    </p>

   </form>

  </div>

 );

}