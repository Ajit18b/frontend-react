import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Style.css";
import SignInForm from "./Components/SignInForm";
import SignUpForm from "./Components/SignUpForm";
import SuccessMessage from "./../Animations/SuccessMessage"; // Import the SuccessMessage component

export default function LoginRegdMain() {
  const navigate = useNavigate();
  const [type, setType] = useState(
    localStorage.getItem("authType") || "signIn"
  ); // Retrieve the state from localStorage
  const [showSuccess, setShowSuccess] = useState(false); // State to manage success message visibility

  useEffect(() => {
    localStorage.setItem("authType", type); // Store the current type in localStorage
  }, [type]);

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const handleLoginSuccess = () => {
    navigate("/dashboard"); // Redirect to the dashboard or another route
  };

  const handleSignUpSuccess = () => {
    setShowSuccess(true); // Show success message
    setType("signIn"); // Reset to login view after successful registration
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccess(false); // Hide success message
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="App">
      <h2></h2>
      <div className={containerClass} id="container">
        {type === "signIn" && (
          <SignInForm onLoginSuccess={handleLoginSuccess} />
        )}
        {type === "signUp" && (
          <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
        )}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Create a New Profile</h1>
              <p>Enter your personal details and register your profile</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      {showSuccess && (
        <SuccessMessage
          message="Registration successful! Please login to access your account"
          onClose={handleCloseSuccessMessage}
        />
      )}
    </div>
  );
}
