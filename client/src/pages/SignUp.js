import React, { useEffect } from "react";
import { Navigate } from "react-router-dom"; // Import Link and Redirect from react-router-dom
import axios from "axios"; // Import axios
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const { isAuthenticated, handleAuthentication } = useAuth();
  useEffect(() => {
    // Make an API call to check if the user is authenticated
    axios
      .get("/auth/ensure", { withCredentials: true })
      .then((response) => {
        handleAuthentication(response.data.isAuthenticated);
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
      });
  }, [isAuthenticated, handleAuthentication]);

  const handleGoogleLogin = () => {
    // Replace "http://localhost:5000/auth/google" with your backend API endpoint for Google OAuth
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div>
      <h1>Click the Google Login Button Below to login</h1>
      <GoogleLoginButton onClick={handleGoogleLogin}></GoogleLoginButton>

      {/* Redirect to Dashboard if authenticated */}
      {isAuthenticated && <Navigate to="/dashboard" />}
    </div>
  );
};

export default SignUp;