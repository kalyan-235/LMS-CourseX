import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import "../css/login.css";

export default function ForgotPassword(){

 const navigate = useNavigate();

 const [email,setEmail] =
 useState("");

 const [message, setMessage] = 
 useState("");

 const [loading, setLoading] = 
 useState(false);

 const [error, setError] = 
 useState("");

 const sendOtp =
 async(e)=>{

  e.preventDefault();
  setLoading(true);
  setMessage("");
  setError("");

  try{

   await API.post(
    "/auth/forgot-password",
    { email }
   );

   setMessage(
    "OTP sent to your email!"
   );
   
   setTimeout(() => {
    navigate("/reset-password", 
     { state: { email } }
    );
   }, 2000);

  }catch(error){

   setError(
    error.response?.data?.message || 
    "Failed to send OTP"
   );

  }finally{

   setLoading(false);

  }

 };

 return(

  <div className="login-page">

   <form 
    className="login-box"
    onSubmit={sendOtp}
   >

    <h1>
     Forgot Password
    </h1>

    <p className="login-subtitle">
     Enter your email to reset password
    </p>

    <input
     type="email"
     placeholder="Enter your email"
     value={email}
     onChange={(e)=>
      setEmail(
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
       ? "Sending..."
       : "Send OTP"
     }

    </button>

    <p className="auth-switch">

     Remember password?

     <Link to="/login">
      Back to Login
     </Link>

    </p>

   </form>

  </div>

 );

}