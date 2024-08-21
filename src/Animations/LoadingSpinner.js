// src/Components/Loading.js
import React from "react";
import "./LoadingSpinner.css"; // Import the CSS for the loading spinner

const Loading = ({ message }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      {message && <div className="loading-message">{message}</div>}
    </div>
  );
};

export default Loading;
