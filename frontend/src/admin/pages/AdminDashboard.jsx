import { BarChart3 } from "lucide-react";

import AdminLayout from "../layouts/AdminLayout";

export default function AdminDashboard() {

  const analytics = [

    {
      id:1,
      title:"Total Students",
      value:"1,245",
      growth:"+12%",
      icon:"👨‍🎓",
    },

    {
      id:2,
      title:"Total Courses",
      value:"48",
      growth:"+5%",
      icon:"📚",
    },

    {
      id:3,
      title:"Revenue",
      value:"₹2.4L",
      growth:"+18%",
      icon:"💰",
    },

    {
      id:4,
      title:"Certificates",
      value:"320",
      growth:"+9%",
      icon:"🏆",
    },

  ];

  const activities = [

    "Kalyan completed React Frontend Mastery",

    "Ajay enrolled in MongoDB Course",

    "Teja downloaded certificate",

    "Ravi completed JavaScript Quiz",

  ];

  const monthlyData = [

    {
      month:"Jan",
      value:40,
    },

    {
      month:"Feb",
      value:60,
    },

    {
      month:"Mar",
      value:75,
    },

    {
      month:"Apr",
      value:55,
    },

    {
      month:"May",
      value:95,
    },

    {
      month:"Jun",
      value:85,
    },

  ];

  return (

    <AdminLayout>

      <div className="admin-dashboard-page">

        {/* HEADER */}

        <div className="admin-dashboard-header">

          <div>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              LMS analytics and overview
            </p>

          </div>

          <div className="dashboard-icon">

            <BarChart3 size={34} />

          </div>

        </div>

        {/* STATS */}

        <div className="analytics-grid">

          {analytics.map((item) => (

            <div
              className="analytics-card"
              key={item.id}
            >

              <div className="analytics-top">

                <div className="analytics-icon">

                  {item.icon}

                </div>

                <span className="growth">

                  {item.growth}

                </span>

              </div>

              <h2>
                {item.value}
              </h2>

              <p>
                {item.title}
              </p>

            </div>

          ))}

        </div>

        {/* CHART SECTION */}

        <div className="dashboard-middle">

          {/* BAR CHART */}

          <div className="chart-card">

            <div className="chart-head">

              <h2>
                Monthly Enrollments
              </h2>

            </div>

            <div className="bar-chart">

              {monthlyData.map((item,index) => (

                <div
                  className="bar-item"
                  key={index}
                >

                  <div
                    className="bar-fill"
                    style={{
                      height:
                      `${item.value}%`,
                    }}
                  ></div>

                  <span>
                    {item.month}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* ACTIVITY */}

          <div className="activity-card">

            <h2>
              Recent Activity
            </h2>

            <div className="activity-list">

              {activities.map(
                (activity,index) => (

                  <div
                    className="activity-item"
                    key={index}
                  >

                    🔥 {activity}

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>

  );
}