import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    const { name, email, password } = state;

    try {
      const response = await fetch("https://your-api-endpoint.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Sign-up failed. Please check your details.");
      }

      const data = await response.json();
      alert(`Sign-up successful: ${JSON.stringify(data)}`);

      // Clear form fields
      setState({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
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
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
