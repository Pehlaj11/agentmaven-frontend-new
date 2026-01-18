// src/context/UIContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { formatDuration } from "../lib/utils";
import { toast } from 'react-hot-toast';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);
  const [expandedLog, setExpandedLog] = useState(null);

  // Initialize dark mode based on saved preference or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    } else if (savedTheme === "light") {
      setIsDarkMode(false);
    } else {
      // Default to system preference
      setIsDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Apply dark mode to <html> when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const handleCallClick = (call) => {
    const formattedCall = {
      ...call,
      duration:
        typeof call.duration === "number"
          ? formatDuration(call.duration)
          : call.duration,
    };
    setSelectedCall(formattedCall);
  };

  const handleCloseModal = () => setSelectedCall(null);

  const toggleLogExpansion = (logId) => {
    setExpandedLog(expandedLog === logId ? null : logId);
  };

  const showToast = (message, type = 'success') => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    } else if (type === 'info') {
      toast.info(message);
    } else {
      toast(message);
    }
  };

  return (
    <UIContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        selectedCall,
        handleCallClick,
        handleCloseModal,
        expandedLog,
        toggleLogExpansion,
        showToast,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);