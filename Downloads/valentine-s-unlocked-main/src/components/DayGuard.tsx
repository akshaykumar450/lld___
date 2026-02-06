import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isDayUnlocked, valentineWeekConfig, passwordConfig } from "@/config/valentine.config";
import PasswordLock from "./PasswordLock";

interface DayGuardProps {
  dayId: string;
  children: React.ReactNode;
}

const DayGuard = ({ dayId, children }: DayGuardProps) => {
  const navigate = useNavigate();
  const day = valentineWeekConfig.find((d) => d.id === dayId);

  // Initialize from session storage to persist unlock during session
  const [isPasswordUnlocked, setIsPasswordUnlocked] = useState(() => {
    return sessionStorage.getItem(`unlocked-${dayId}`) === "true";
  });

  useEffect(() => {
    if (!day || !isDayUnlocked(day.date)) {
      navigate("/", { replace: true });
    }
  }, [day, navigate]);

  const handleUnlock = () => {
    setIsPasswordUnlocked(true);
    sessionStorage.setItem(`unlocked-${dayId}`, "true");
  };

  if (!day || !isDayUnlocked(day.date)) {
    return null;
  }

  // If password exists for this day and not unlocked, show lock
  if (passwordConfig[dayId] && !isPasswordUnlocked) {
    return <PasswordLock dayId={dayId} onUnlock={handleUnlock} />;
  }

  return <>{children}</>;
};

export default DayGuard;
