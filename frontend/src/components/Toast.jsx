import { useState, useEffect } from "react";

let toastId = 0;

export default function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    window.addToast = (message, type = "info", duration = 3000) => {
      const id = toastId++;
      setToasts((prev) => [
        ...prev,
        { id, message, type },
      ]);

      setTimeout(() => {
        setToasts((prev) =>
          prev.filter((t) => t.id !== id)
        );
      }, duration);
    };

    return () => {
      delete window.addToast;
    };
  }, []);

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.type} animate-slideInUp`}
        >
          <div className="toast-content">
            {toast.type === "success" && "✓"}
            {toast.type === "error" && "✕"}
            {toast.type === "info" && "ℹ"}
            {toast.type === "warning" && "⚠"}
            <span>{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Usage: window.addToast("Success!", "success", 3000) */
