
import { useState } from "react";

import AdminSidebar
from "../components/AdminSidebar";

// import AdminTopbar
// from "../components/AdminTopbar";

export default function AdminSettings() {

  const [siteName, setSiteName] =
    useState("SkillForge LMS");

  const [email, setEmail] =
    useState("admin@gmail.com");

  const [theme, setTheme] =
    useState("Light");

  const [notifications, setNotifications] =
    useState(true);

  const handleSave = () => {

    alert(
      "Settings Saved Successfully"
    );
  };

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-content">

        {/* <AdminTopbar /> */}

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

      </div>

    </div>

  );
}
