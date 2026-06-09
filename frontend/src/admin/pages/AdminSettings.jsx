
import { useState, useEffect } from "react";

import AdminLayout
from "../layouts/AdminLayout";

// import AdminTopbar
// from "../components/AdminTopbar";

export default function AdminSettings() {

  const [siteName, setSiteName] =
    useState("SkillForge LMS");

  const [email, setEmail] =
    useState("admin@gmail.com");

  const [theme, setTheme] =
    useState(
      localStorage.getItem("theme") || "Light"
    );

  const [notifications, setNotifications] =
    useState(true);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (themeName) => {
    const root = document.documentElement;
    
    if (themeName === "Dark") {
      root.style.setProperty("--bg-primary", "#0f172a");
      root.style.setProperty("--bg-secondary", "#1e293b");
      root.style.setProperty("--bg-tertiary", "#334155");
      root.style.setProperty("--text-primary", "#f1f5f9");
      root.style.setProperty("--text-secondary", "#cbd5e1");
      root.style.setProperty("--border-color", "#475569");
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      root.style.setProperty("--bg-primary", "#ffffff");
      root.style.setProperty("--bg-secondary", "#f5f7fb");
      root.style.setProperty("--bg-tertiary", "#f3f4f6");
      root.style.setProperty("--text-primary", "#111827");
      root.style.setProperty("--text-secondary", "#6b7280");
      root.style.setProperty("--border-color", "#e5e7eb");
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
    
    localStorage.setItem("theme", themeName);
  };

  const handleSave = () => {

    applyTheme(theme);

    alert(
      "Settings Saved Successfully"
    );
  };

  return (

    <AdminLayout>

      <div className="admin-settings-page">

        {/* HEADER */}

        <div className="settings-header">

          <h1>
            Admin Settings
          </h1>

          <p>
            Manage LMS platform settings
          </p>

        </div>

        {/* SETTINGS BOX */}

        <div className="settings-container">

          {/* SITE NAME */}

          <div className="setting-group">

            <label>
              LMS Platform Name
            </label>

            <input
              type="text"
              value={siteName}
              onChange={(e) =>
                setSiteName(
                  e.target.value
                )
              }
            />

          </div>

          {/* ADMIN EMAIL */}

          <div className="setting-group">

            <label>
              Admin Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

          </div>

          {/* THEME */}

          <div className="setting-group">

            <label>
              Dashboard Theme
            </label>

            <select
              value={theme}
              onChange={(e) =>
                setTheme(
                  e.target.value
                )
              }
            >

              <option>
                Light
              </option>

              <option>
                Dark
              </option>

            </select>

          </div>

          {/* NOTIFICATIONS */}

          <div className="setting-toggle">

            <div>

              <h3>
                Notifications
              </h3>

              <p>
                Enable admin notifications
              </p>

            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={notifications}
                onChange={() =>
                  setNotifications(
                    !notifications
                  )
                }
              />

              <span className="slider"></span>

            </label>

          </div>

          {/* SAVE BUTTON */}

          <button
            className="save-settings-btn"
            onClick={handleSave}
          >

            Save Settings

          </button>

        </div>

      </div>

    </AdminLayout>

  );
}
