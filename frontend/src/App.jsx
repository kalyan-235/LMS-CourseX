import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Toast from "./components/Toast";
import DarkModeToggle from "./components/DarkModeToggle";

import Sidebar from "./components/Sidebar";
// import Topbar from "./components/Topbar";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import MyLearning from "./pages/MyLearning";
import CourseDetail from "./pages/CourseDetail";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PaymentHistory from "./pages/PaymentHistory";

import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminCourses from "./admin/pages/AdminCourses";
import AdminStudents from "./admin/pages/AdminStudents";
import AdminQuiz from "./admin/pages/AdminQuiz";
import AdminCertificates from "./admin/pages/AdminCertificates";
import AdminPayments from "./admin/pages/AdminPayments";
import AdminSettings from "./admin/pages/AdminSettings";

export default function App() {

  const location = useLocation();
  
  // THEME INITIALIZATION
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "Light";
    applyTheme(savedTheme);
  }, []);

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
  };
  
  const isAdminRoute =
  location.pathname.startsWith("/admin");

  const hideTopbar =

    location.pathname === "/explore" ||

    location.pathname === "/mylearning" ||

    location.pathname === "/profile" ||

    location.pathname.startsWith("/course/");
    isAdminRoute;

return (

  <>
  
    {isAdminRoute ? (

      <Routes>

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute adminOnly>
              <AdminCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute adminOnly>
              <AdminStudents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/quiz"
          element={
            <ProtectedRoute adminOnly>
              <AdminQuiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/certificates"
          element={
            <ProtectedRoute adminOnly>
              <AdminCertificates />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute adminOnly>
              <AdminPayments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute adminOnly>
              <AdminSettings />
            </ProtectedRoute>
          }
        />

      </Routes>

    ) : (

      <div className="app">

        <Sidebar />

        <div className="main">

          {/* {!hideTopbar && <Topbar />} */}

          <div className="content">

            <Routes>

              <Route
                path="/"
                element={<Home />}
              />

              <Route
                path="/explore"
                element={<Explore />}
              />

              <Route
                path="/mylearning"
                element={<MyLearning />}
              />

              <Route
                path="/course/:id"
                element={<CourseDetail />}
              />

              <Route
                path="/profile"
                element={<Profile />}
              />

              <Route
                path="/payment-history"
                element={
                  <ProtectedRoute>
                    <PaymentHistory />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/register"
                element={<Register />}
              />
              <Route
                 path="/forgot-password"
                 element={
                  <ForgotPassword />
                 }
                />

                <Route
                 path="/reset-password"
                 element={
                  <ResetPassword />
                 }
                />

            </Routes>

          </div>

        </div>

      </div>

    )}

    <Toast />
    <DarkModeToggle />

  </>

);
}