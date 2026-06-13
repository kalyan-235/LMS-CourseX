import { useState, useEffect } from "react";
import {
  Settings, Monitor, Bell, Shield, Globe,
  Save, Sun, Moon, CheckCircle2, Mail,
  Building2, Palette, ToggleLeft, ToggleRight,
} from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminSettings() {
  const [saved,          setSaved]          = useState(false);
  const [siteName,       setSiteName]       = useState("CourseX LMS");
  const [adminEmail,     setAdminEmail]     = useState("admin@coursex.in");
  const [supportEmail,   setSupportEmail]   = useState("support@coursex.in");
  const [theme,          setTheme]          = useState(localStorage.getItem("theme") || "Light");
  const [emailNotify,    setEmailNotify]    = useState(true);
  const [enrollNotify,   setEnrollNotify]   = useState(true);
  const [paymentNotify,  setPaymentNotify]  = useState(true);
  const [quizNotify,     setQuizNotify]     = useState(false);
  const [maintenance,    setMaintenance]    = useState(false);
  const [autoApprove,    setAutoApprove]    = useState(true);

  useEffect(() => { applyTheme(theme); }, [theme]);

  const applyTheme = (t) => {
    const root = document.documentElement;
    const dark = t === "Dark";
    root.style.setProperty("--bg-primary",    dark ? "#0f172a" : "#ffffff");
    root.style.setProperty("--bg-secondary",  dark ? "#1e293b" : "#f5f7fb");
    root.style.setProperty("--bg-tertiary",   dark ? "#334155" : "#f3f4f6");
    root.style.setProperty("--text-primary",  dark ? "#f1f5f9" : "#111827");
    root.style.setProperty("--text-secondary",dark ? "#cbd5e1" : "#6b7280");
    root.style.setProperty("--border-color",  dark ? "#475569" : "#e5e7eb");
    document.body.classList.toggle("dark-mode",  dark);
    document.body.classList.toggle("light-mode", !dark);
    localStorage.setItem("theme", t);
  };

  const handleSave = () => {
    applyTheme(theme);
    setSaved(true);
    window.addToast?.("Settings saved successfully!", "success");
    setTimeout(() => setSaved(false), 3000);
  };

  const Toggle = ({ checked, onChange }) => (
    <button
      className={`ase-toggle ${checked ? "ase-toggle--on" : ""}`}
      onClick={() => onChange(!checked)}
      type="button"
      role="switch"
      aria-checked={checked}
    >
      <span className="ase-toggle-thumb" />
    </button>
  );

  const SettingRow = ({ icon, label, desc, children }) => (
    <div className="ase-setting-row">
      <div className="ase-row-left">
        <div className="ase-row-icon">{icon}</div>
        <div>
          <div className="ase-row-label">{label}</div>
          <div className="ase-row-desc">{desc}</div>
        </div>
      </div>
      <div className="ase-row-right">{children}</div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="ase-page">

        {/* ── TOPBAR ──────────────────────────────────── */}
        <div className="ase-topbar">
          <div>
            <h1 className="ase-title">Settings</h1>
            <p className="ase-sub">Manage your platform preferences and configuration</p>
          </div>
          <button className="ase-save-btn" onClick={handleSave}>
            {saved
              ? <><CheckCircle2 size={16}/> Saved!</>
              : <><Save size={16}/> Save Changes</>}
          </button>
        </div>

        <div className="ase-layout">

          {/* ── LEFT: Sections ─────────────────────── */}
          <div className="ase-sections">

            {/* Platform */}
            <section className="ase-card">
              <div className="ase-card-header">
                <div className="ase-card-icon ase-icon-indigo"><Building2 size={18}/></div>
                <div>
                  <h2>Platform</h2>
                  <p>General platform configuration</p>
                </div>
              </div>
              <div className="ase-card-body">
                <div className="ase-field">
                  <label>Platform Name</label>
                  <input value={siteName} onChange={e => setSiteName(e.target.value)} placeholder="e.g. CourseX LMS"/>
                </div>
                <div className="ase-field">
                  <label>Admin Email</label>
                  <input type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} placeholder="admin@example.com"/>
                </div>
                <div className="ase-field">
                  <label>Support Email</label>
                  <input type="email" value={supportEmail} onChange={e => setSupportEmail(e.target.value)} placeholder="support@example.com"/>
                </div>
              </div>
            </section>

            {/* Appearance */}
            <section className="ase-card">
              <div className="ase-card-header">
                <div className="ase-card-icon ase-icon-violet"><Palette size={18}/></div>
                <div>
                  <h2>Appearance</h2>
                  <p>Choose how the admin panel looks</p>
                </div>
              </div>
              <div className="ase-card-body">
                <div className="ase-theme-row">
                  <button
                    className={`ase-theme-btn ${theme === "Light" ? "ase-theme-btn--active" : ""}`}
                    onClick={() => setTheme("Light")}
                  >
                    <Sun size={20}/>
                    <span>Light</span>
                    {theme === "Light" && <CheckCircle2 size={14} className="ase-theme-check"/>}
                  </button>
                  <button
                    className={`ase-theme-btn ${theme === "Dark" ? "ase-theme-btn--active" : ""}`}
                    onClick={() => setTheme("Dark")}
                  >
                    <Moon size={20}/>
                    <span>Dark</span>
                    {theme === "Dark" && <CheckCircle2 size={14} className="ase-theme-check"/>}
                  </button>
                </div>
              </div>
            </section>

            {/* Notifications */}
            <section className="ase-card">
              <div className="ase-card-header">
                <div className="ase-card-icon ase-icon-amber"><Bell size={18}/></div>
                <div>
                  <h2>Notifications</h2>
                  <p>Choose which events trigger admin alerts</p>
                </div>
              </div>
              <div className="ase-card-body ase-rows">
                <SettingRow
                  icon={<Mail size={15}/>}
                  label="Email Notifications"
                  desc="Receive notifications via email"
                >
                  <Toggle checked={emailNotify} onChange={setEmailNotify}/>
                </SettingRow>
                <SettingRow
                  icon={<Globe size={15}/>}
                  label="New Enrollments"
                  desc="Alert when a student enrolls"
                >
                  <Toggle checked={enrollNotify} onChange={setEnrollNotify}/>
                </SettingRow>
                <SettingRow
                  icon={<Shield size={15}/>}
                  label="Payment Alerts"
                  desc="Notify on successful payments"
                >
                  <Toggle checked={paymentNotify} onChange={setPaymentNotify}/>
                </SettingRow>
                <SettingRow
                  icon={<Monitor size={15}/>}
                  label="Quiz Submissions"
                  desc="Alert when students complete a quiz"
                >
                  <Toggle checked={quizNotify} onChange={setQuizNotify}/>
                </SettingRow>
              </div>
            </section>

            {/* System */}
            <section className="ase-card">
              <div className="ase-card-header">
                <div className="ase-card-icon ase-icon-red"><Shield size={18}/></div>
                <div>
                  <h2>System</h2>
                  <p>Platform-level control options</p>
                </div>
              </div>
              <div className="ase-card-body ase-rows">
                <SettingRow
                  icon={<Settings size={15}/>}
                  label="Maintenance Mode"
                  desc="Temporarily disable the platform for users"
                >
                  <Toggle checked={maintenance} onChange={setMaintenance}/>
                </SettingRow>
                <SettingRow
                  icon={<CheckCircle2 size={15}/>}
                  label="Auto-approve Enrollments"
                  desc="Automatically enroll students after payment"
                >
                  <Toggle checked={autoApprove} onChange={setAutoApprove}/>
                </SettingRow>
              </div>
            </section>

          </div>

          {/* ── RIGHT: Info card ─────────────────────── */}
          <div className="ase-sidebar">
            <div className="ase-info-card">
              <div className="ase-info-icon">⚙️</div>
              <h3>Quick Guide</h3>
              <ul className="ase-guide-list">
                <li>Changes are applied immediately after saving</li>
                <li>Dark mode applies to the entire admin panel</li>
                <li>Maintenance mode hides the site from students</li>
                <li>Email notifications require a valid SMTP setup</li>
              </ul>
            </div>

            <div className="ase-status-card">
              <h4>Current Status</h4>
              <div className="ase-status-list">
                <div className="ase-status-row">
                  <span>Platform</span>
                  <span className={`ase-status-dot ${maintenance ? "ase-dot-red" : "ase-dot-green"}`}>
                    {maintenance ? "● Maintenance" : "● Online"}
                  </span>
                </div>
                <div className="ase-status-row">
                  <span>Theme</span>
                  <span className="ase-status-val">{theme} Mode</span>
                </div>
                <div className="ase-status-row">
                  <span>Notifications</span>
                  <span className="ase-status-val">{emailNotify ? "Enabled" : "Disabled"}</span>
                </div>
                <div className="ase-status-row">
                  <span>Auto-enroll</span>
                  <span className="ase-status-val">{autoApprove ? "On" : "Off"}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
