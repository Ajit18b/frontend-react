// SuccessMessage.js

import React, { useEffect } from "react";
import "./SuccessMessage.css"; // Add your CSS for styling

const SuccessMessage = ({ message, onClose }) => {
  useEffect(() => {
    // Set a timer to close the message after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="success-message-container">
      <div className="success-message">
        <p>{message}</p>
        <button type="submit" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
