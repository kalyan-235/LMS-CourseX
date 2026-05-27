import { Routes, Route, useLocation } from "react-router-dom";

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

import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminCourses from "./admin/pages/AdminCourses";
import AdminStudents from "./admin/pages/AdminStudents";
import AdminQuiz from "./admin/pages/AdminQuiz";
import AdminCertificates from "./admin/pages/AdminCertificates";
import AdminSettings from "./admin/pages/AdminSettings";

export default function App() {

  const location = useLocation();
  
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
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute>
              <AdminCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute>
              <AdminStudents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/quiz"
          element={
            <ProtectedRoute>
              <AdminQuiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/certificates"
          element={
            <ProtectedRoute>
              <AdminCertificates />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
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
                path="/login"
                element={<Login />}
              />
              <Route
                path="/register"
                element={<Register />}
              />

            </Routes>

          </div>

        </div>

      </div>

    )}

  </>

);
}