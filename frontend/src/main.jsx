import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./css/reviewsection.css";
import "./css/reviewcard.css";
import "./css/global.css";
import "./css/global-professional.css";
import "./css/professional-components.css";
import "./css/sidebar.css";
import "./css/topbar.css";
import "./css/home.css";
import "./css/home-professional.css";
import "./css/explore.css";
import "./css/explore-professional.css";
import "./css/mylearning.css";
import "./css/course.css";
import "./css/profile.css";
import "./css/components.css";
import "./css/curriculum.css";
import "./css/dashboard.css";
import "./css/admin.css";
import "./css/notes.css";
import "./css/certificate.css";
import "./css/quiz.css";
import "./css/login.css";
import "./admin/css/adminlayout.css";
import "./admin/css/adminsidebar.css";
import "./admin/css/admintopbar.css";
import "./admin/css/admindashboard.css";
import "./admin/css/admin-dashboard-professional.css";
import "./admin/css/admincourses.css";
import "./admin/css/adminstudents.css";
import "./admin/css/adminquiz.css";
import "./admin/css/admincertificate.css";
import "./admin/css/adminsetting.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);