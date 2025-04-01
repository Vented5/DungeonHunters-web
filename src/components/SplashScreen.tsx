import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

interface SplashScreenProps {
  minDisplayTime?: number;
  navigateTo?: string;
  logo?: React.ReactNode;
  appName?: string;
  loadingText?: string;
  appVersion?: string;
  backgroundColor?: string;
  onInit?: () => Promise<boolean>;
}

const SplashScreenWrapper = styled.div<{ bg: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
  background: ${(props) => props.bg};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  width: 80%;
  max-width: 400px;
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const AppLogo = styled.svg`
  animation: ${pulse} 2s infinite;
`;

const AppName = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ width: number }>`
  height: 100%;
  background-color: white;
  border-radius: 2px;
  transition: width 0.3s ease;
  width: ${(props) => props.width}%;
`;

const LoadingIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
`;

const StatusText = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  opacity: 0.8;
`;

const LoadingText = styled.p`
  font-size: 1rem;
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-weight: bold;
`;

const AppVersion = styled.div`
  position: absolute;
  bottom: 1rem;
  font-size: 0.8rem;
  opacity: 0.6;
`;

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
          setProgress((prev) => (prev < 90 ? prev + 10 : prev));
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

        clearInterval(progressInterval);

        // Ensure minimum display time
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

        setProgress(100);
        setStatus("Ready!");

        setTimeout(() => {
          if (!accessToken || !customInitSuccess) {
            navigate("/dashboard");
          } else {
            navigate(navigateTo);
          }
        }, remainingTime);
      } catch (err) {
        clearInterval(progressInterval);
        setError("Failed to initialize the application");
        setStatus("Error");
        setProgress(100);

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

  const defaultLogo = (
    <AppLogo className="app-logo" viewBox="0 0 100 100" width="120" height="120">
      <circle cx="50" cy="50" r="40" fill="#4A90E2" />
      <polygon points="35,30 70,50 35,70" fill="white" />
    </AppLogo>
  );

  return (
    <SplashScreenWrapper bg={backgroundColor}>
      <Content>
        <LogoContainer>{logo || defaultLogo}</LogoContainer>
        <AppName className="app-name">{appName}</AppName>
        <ProgressContainer>
          <ProgressBar width={progress} />
        </ProgressContainer>
        <LoadingIndicator>
          {error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            <>
              <StatusText>{status}</StatusText>
              <LoadingText>{loadingText}</LoadingText>
            </>
          )}
        </LoadingIndicator>
        <AppVersion>{appVersion}</AppVersion>
      </Content>
    </SplashScreenWrapper>
  );
};

export default SplashScreen;
