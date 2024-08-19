import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Style.css";
import SignInForm from "./Components/LoginPage";
import SignUpForm from "./Components/RegistrationPage";

export default function LoginRegdMain() {
  const [type, setType] = useState("signIn");
  const navigate = useNavigate();

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
    }
  };

  const handleLoginSuccess = () => {
    navigate("/dashboard"); // Redirect to the dashboard or another route
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
        {type === "signUp" && <SignUpForm />}
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
    </div>
  );
}
