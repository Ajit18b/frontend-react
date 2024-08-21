import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Loading from "../../Animations/LoadingSpinner"; // Import the Loading component

export default function SignUpForm({ onSignUpSuccess }) {
  const [state, setState] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    general: "",
  });
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (evt) => {
    setState({ ...state, [evt.target.name]: evt.target.value });
    setErrors({ ...errors, [evt.target.name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { name: "", email: "", password: "", general: "" };

    if (!state.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

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
    } else if (state.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
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
          "http://192.168.4.122:5055/api/Auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...state,
              passwordHash: state.password, // Change 'password' to 'passwordHash'
            }),
          }
        );

        if (!response.ok)
          throw new Error(
            "Sign-up failed. Email already taken Please check your details."
          );

        const data = await response.json();

        if (data.success) {
          setState({ name: "", email: "", password: "" }); // Clear form fields
          setLoading(false);
          setShowMessage(true); // Show the success message after loading
          onSignUpSuccess(); // Notify parent component of successful registration

          // Hide the success message after 2 seconds
          setTimeout(() => {
            setShowMessage(false);
          }, 2000);
        } else {
          throw new Error(data.message || "Sign-up failed.");
        }
      } catch (error) {
        setErrors({ ...errors, general: error.message });
        setLoading(false);
      }
    }, 2000); // Simulate 2 seconds loading
  };
  return (
    <>
      {loading && <Loading />} {/* Show loading component */}
      {!loading && showMessage && (
        <Loading message="Registration successful!" />
      )}{" "}
      {/* Show success message immediately after loading */}
      {!loading && !showMessage && (
        <div className="form-container sign-up-container">
          <form onSubmit={handleOnSubmit}>
            <h1>Create Account</h1>
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
            <span>or use your email for registration</span>
            <div style={{ marginBottom: "1rem" }}>
              <input
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
                placeholder="Name"
                style={{
                  width: "300px", // Adjust width as needed
                  padding: "0.5rem",
                  //border: errors.name ? "2px solid red" : "1px solid #ccc",
                  boxSizing: "border-box",
                  display: "block",
                }}
              />
              {errors.name && (
                <p style={{ color: "red", margin: "0.25rem 0 0 0" }}>
                  {errors.name}
                </p>
              )}
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <input
                type="email"
                name="email"
                value={state.email}
                onChange={handleChange}
                placeholder="Email"
                style={{
                  width: "300px", // Adjust width as needed
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
                  width: "300px", // Adjust width as needed
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
            <button type="submit">Sign Up</button>
          </form>
        </div>
      )}
    </>
  );
}
