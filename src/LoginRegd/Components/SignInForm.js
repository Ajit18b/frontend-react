import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Animations/LoadingSpinner"; // Import the Loading component

export default function SignInForm({ onLoginSuccess }) {
  const [state, setState] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Add state for messages
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setState({ ...state, [evt.target.name]: evt.target.value });
    setErrors({ ...errors, [evt.target.name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { email: "", password: "", general: "" };

    if (!state.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!state.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    if (!validateForm()) return;

    setLoading(true); // Show the loading animation

    setTimeout(async () => {
      try {
        const response = await fetch(
          "http://192.168.4.122:5055/api/Auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: state.email,
              passwordHash: state.password, // Change 'password' to 'passwordHash'
            }),
          }
        );

        if (!response.ok)
          throw new Error("Login failed. Please check your details.");

        const data = await response.json();

        if (data.success) {
          localStorage.setItem("authToken", data.token); // Store the token in localStorage
          setMessage(data.message); // Display success message
          onLoginSuccess();
          navigate("/dashboard");
        } else {
          throw new Error(data.message || "Login failed.");
        }
      } catch (error) {
        setErrors({ ...errors, general: error.message });
      } finally {
        setLoading(false); // Hide the loading animation
      }
    }, 2000); // Show loading for 2 seconds
  };

  return (
    <>
      {loading && <Loading />} {/* Show the loading component when loading */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleOnSubmit}>
          <h1>Sign In</h1>
          <div className="social-container">
            <a href="#fb" className="social">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#g" className="social">
              <i className="fab fa-google-plus-g" />
            </a>
            <a href="#li" className="social">
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
          <span>or use your account</span>
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              placeholder="Email"
              style={{
                width: "300px", // Adjust width as needed
                height: "40px",
                padding: "0.5rem",
                //border: errors.email ? "2px solid red" : "1px solid #ccc",
                boxSizing: "border-box",
                display: "block",
              }}
            />
            {errors.email && (
              <p style={{ color: "red", margin: "0.25rem 0 0 0" }}>
                {errors.email}
              </p>
            )}
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              placeholder="Password"
              style={{
                width: "300px",
                height: "40px",
                padding: "0.5rem",
                //border: errors.password ? "2px solid red" : "1px solid #ccc",
                boxSizing: "border-box",
                display: "block",
              }}
            />
            {errors.password && (
              <p style={{ color: "red", margin: "0.25rem 0 0 0" }}>
                {errors.password}
              </p>
            )}
          </div>
          {errors.general && (
            <p style={{ color: "red", margin: "0.25rem 0 1rem 0" }}>
              {errors.general}
            </p>
          )}
          <button
            type="submit"
            style={{ padding: "0.5rem 1rem", height: "40px" }}
          >
            Sign In
          </button>
          {message && <p style={{ color: "green" }}>{message}</p>}{" "}
          {/* Display the success message */}
        </form>
      </div>
    </>
  );
}
