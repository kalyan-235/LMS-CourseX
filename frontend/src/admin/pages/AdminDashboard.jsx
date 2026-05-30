
import { useEffect, useState } from "react";

import API from "../../api/axios";

import AdminLayout from "../layouts/AdminLayout";

export default function AdminDashboard() {

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await API.get(
          "/admin/dashboard",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setData(res.data);

    } catch (err) {

      console.log(
        "Analytics Error:",
        err
      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return <h2>Loading...</h2>;

  }

  if (!data) {

    return (
      <h2>
        Failed to load dashboard
      </h2>
    );

  }

  return (

    <AdminLayout>

      <div className="admin-dashboard">

        <h1>
          LMS Analytics Dashboard
        </h1>

        <div className="analytics-grid">

          <div className="analytics-card">

            <h2>
              {data.totalUsers}
            </h2>

            <p>
              Total Users
            </p>

          </div>

          <div className="analytics-card">

            <h2>
              {data.totalCourses}
            </h2>

            <p>
              Total Courses
            </p>

          </div>

          <div className="analytics-card">

            <h2>
              {data.totalEnrollments}
            </h2>

            <p>
              Total Enrollments
            </p>

          </div>

          <div className="analytics-card">

            <h2>
              ₹{data.totalRevenue}
            </h2>

            <p>
              Revenue
            </p>

          </div>

          <div className="analytics-card">

            <h2>
              {data.completedCourses}
            </h2>

            <p>
              Completed Courses
            </p>

          </div>

        </div>

        {/* RECENT */}

        <div className="recent-box">

          <h2>
            Recent Enrollments
          </h2>

          {data.recentEnrollments?.map(
            (item) => (

              <div
                key={item._id}
                className="recent-item"
              >

                <h4>
                  {item.userId?.name}
                </h4>

                <p>
                  {item.courseId?.title}
                </p>

              </div>

            )
          )}

        </div>

      </div>

    </AdminLayout>

  );

}
