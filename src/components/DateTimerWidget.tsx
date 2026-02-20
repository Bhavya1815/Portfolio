import { useState, useEffect } from "react";
import "./DateTimerWidget.css";

const DateTimerWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const formattedDate = currentTime.toLocaleDateString([], {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedTime = `${String(hours % 12 || 12).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div
      onClick={toggleDarkMode}
      className={`fixed bottom-5 left-5 w-28 h-16 rounded-xl flex flex-col items-center justify-center font-orbitron text-center text-xs select-none cursor-pointer transition-colors duration-300 z-[9999]`}
      style={{
        backgroundColor: darkMode ? "#000000" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        border: darkMode ? "none" : "1px solid #ccc",
      }}
    >
      <div className="mb-1">{formattedDate}</div>
      <div className="text-sm font-bold flex items-baseline">
        <span>{formattedTime}</span>
        <span className="ml-1 text-[0.6em]">{ampm}</span>
      </div>
    </div>
  );
};

export default DateTimerWidget;
