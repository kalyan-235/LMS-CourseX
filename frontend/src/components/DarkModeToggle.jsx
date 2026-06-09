import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import "./DarkModeToggle.css";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "Light";
    const isDark = savedTheme === "Dark";
    setIsDarkMode(isDark);
    applyTheme(isDark);
  }, []);

  const applyTheme = (isDark) => {
    const root = document.documentElement;

    if (isDark) {
      root.style.setProperty("--bg-primary", "#0f172a");
      root.style.setProperty("--bg-secondary", "#1e293b");
      root.style.setProperty("--bg-tertiary", "#334155");
      root.style.setProperty("--text-primary", "#f1f5f9");
      root.style.setProperty("--text-secondary", "#cbd5e1");
      root.style.setProperty("--border-color", "#475569");
      root.style.setProperty("--border-light", "#475569");
      root.style.setProperty("--border-dark", "#334155");
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "Dark");
    } else {
      root.style.setProperty("--bg-primary", "#ffffff");
      root.style.setProperty("--bg-secondary", "#f5f7fb");
      root.style.setProperty("--bg-tertiary", "#f3f4f6");
      root.style.setProperty("--text-primary", "#111827");
      root.style.setProperty("--text-secondary", "#6b7280");
      root.style.setProperty("--border-color", "#e5e7eb");
      root.style.setProperty("--border-light", "#e5e7eb");
      root.style.setProperty("--border-dark", "#d1d5db");
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "Light");
    }
  };

  const handleToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    applyTheme(newMode);
    window.addToast?.(
      `${newMode ? "Dark" : "Light"} mode enabled`,
      "success",
      2000
    );
  };

  return (
    <button
      className="dark-mode-toggle"
      onClick={handleToggle}
      title={`Switch to ${isDarkMode ? "Light" : "Dark"} mode`}
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <Sun size={20} className="toggle-icon" />
      ) : (
        <Moon size={20} className="toggle-icon" />
      )}
    </button>
  );
}
