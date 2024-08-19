import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function SignInForm({ onLoginSuccess }) {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password } = state;

    try {
      const response = await fetch("https://your-api-endpoint.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      alert(`Login successful: ${JSON.stringify(data)}`);

      // Call the callback function to handle successful login
      onLoginSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
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
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <a href="#">Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
