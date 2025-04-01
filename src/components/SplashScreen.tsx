import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SplashScreen.css";

interface SplashScreenProps {
  minDisplayTime?: number;
  navigateTo?: string;
  logo?: React.ReactNode;
  appName?: string;
  loadingText?: string;
  appVersion?: string;
  backgroundColor?: string;
  onInit?: () => Promise<boolean>; // Custom initialization function
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  minDisplayTime = 2000,
  navigateTo = "/dashboard",
  logo,
  appName = "Dungeon Hunters",
  loadingText = "Loading...",
  appVersion = "v1.0.0",
  backgroundColor = "linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)",
  onInit,
}) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startTime = Date.now();
    let progressInterval: NodeJS.Timeout;

    const initializeApp = async () => {
      try {
        // Setup a fake progress indicator
        progressInterval = setInterval(() => {
          setProgress((prev) => {
            // Max progress at 90% until we're actually done
            return prev < 90 ? prev + 10 : prev;
          });
        }, minDisplayTime / 50);

        // Check authentication
        setStatus("Checking authentication...");
        const accessToken = localStorage.getItem("accessToken");

        // Run custom initialization if provided
        let customInitSuccess = true;
        if (onInit) {
          setStatus("Loading app data...");
          customInitSuccess = await onInit();
        }

        // Clear the progress interval
        clearInterval(progressInterval);

        // Ensure minimum display time has elapsed
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

        // Set progress to 100%
        setProgress(100);
        setStatus("Ready!");

        // Navigate after the remaining time
        setTimeout(() => {
          if (!accessToken || !customInitSuccess) {
            navigate("/dashboard");
          } else {
            navigate(navigateTo);
          }
        }, remainingTime);
      } catch (error) {
        clearInterval(progressInterval);
        setError("Failed to initialize the application");
        setStatus("Error");
        setProgress(100);

        // Navigate to login after delay even on error
        setTimeout(() => {
          navigate("/login");
        }, 10000);
      }
    };

    initializeApp();

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [minDisplayTime, navigate, navigateTo, onInit]);

  // Default logo if none provided
  const defaultLogo = (
    <svg className="app-logo" viewBox="0 0 100 100" width="120" height="120">
      <circle cx="50" cy="50" r="40" fill="#4A90E2" />
      <polygon points="35,30 70,50 35,70" fill="white" />
    </svg>
  );

  return (
    <div className="splash-screen" style={{ background: backgroundColor }}>
      <div className="splash-content">
        <div className="logo-container">{logo || defaultLogo}</div>

        <h1 className="app-name">{appName}</h1>

        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="loading-indicator">
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <>
              <p className="status-text">{status}</p>
              <p className="loading-text">{loadingText}</p>
            </>
          )}
        </div>

        <div className="app-version">{appVersion}</div>
      </div>
    </div>
  );
};

export default SplashScreen;
