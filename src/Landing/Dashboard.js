import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Animations/LoadingSpinner";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [idleTimer, setIdleTimer] = useState(null); // Timer ID for managing idle logout
  const [expirationTimer, setExpirationTimer] = useState(null); // Timer ID for managing token expiration
  const [logoutCountdown, setLogoutCountdown] = useState(null); // Timer for displaying countdown
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = payload.exp * 1000; // Convert expiration time to milliseconds
      const currentTime = Date.now();

      if (currentTime >= expirationTime) {
        handleLogout(); // Log out if token is already expired
        return;
      }

      // Set user info
      setUserInfo({
        email: payload.email,
        name: payload.name || "User",
      });

      // Set a timer to log out when the token expires
      const timeUntilExpiration = expirationTime - currentTime;
      const expirationTimerId = setTimeout(() => {
        handleLogout(); // Trigger logout when token expires
      }, timeUntilExpiration);
      setExpirationTimer(expirationTimerId);

      // Setup idle detection
      const idleTimeoutDuration = 60000; // 60 seconds
      const resetIdleTimer = () => {
        clearTimeout(idleTimer);
        setIdleTimer(
          setTimeout(() => {
            handleLogout(); // Trigger logout after idle period
          }, idleTimeoutDuration)
        );
      };

      // Add event listeners to reset idle timer on user activity
      document.addEventListener("mousemove", resetIdleTimer);
      document.addEventListener("keydown", resetIdleTimer);
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          resetIdleTimer();
        }
      });

      // Reset idle timer on page reload
      window.addEventListener("beforeunload", () => {
        clearTimeout(idleTimer);
      });

      // Update logout countdown
      const updateCountdown = () => {
        const remainingTime = Math.max(expirationTime - Date.now(), 0);
        setLogoutCountdown(remainingTime);
        if (remainingTime <= 0) {
          clearInterval(countdownInterval);
        }
      };

      const countdownInterval = setInterval(updateCountdown, 1000);
      updateCountdown();

      // Cleanup on component unmount
      return () => {
        clearTimeout(expirationTimerId);
        clearTimeout(idleTimer);
        clearInterval(countdownInterval);
        document.removeEventListener("mousemove", resetIdleTimer);
        document.removeEventListener("keydown", resetIdleTimer);
        document.removeEventListener("visibilitychange", resetIdleTimer);
        window.removeEventListener("beforeunload", () => {
          clearTimeout(idleTimer);
        });
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/login");
    }
  }, [navigate, idleTimer]);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("authToken");
      setLoading(false);
      navigate("/login");
    }, 2000);
  };

  const formatCountdown = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="dashboard">
      {loading && <Loading />}
      <h1>Dashboard</h1>
      {userInfo ? (
        <div>
          <h2>Welcome, {userInfo.name}</h2>
          <p>Email: {userInfo.email}</p>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
          <div className="logout-countdown">
            {logoutCountdown !== null && (
              <p>
                Time until automatic logout: {formatCountdown(logoutCountdown)}
              </p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
