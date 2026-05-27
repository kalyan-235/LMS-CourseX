import { useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

export default function AdminStudents() {

  const [search, setSearch] =
    useState("");

  const [students] = useState([

    {
      id:1,
      name:"Kalyan",
      email:"kalyan@gmail.com",
      course:"React Frontend Mastery",
      progress:100,
      hours:18,
      status:"Completed",
      quizScore:"92%",
      streak:14,
      online:true,
      avatar:
      "https://randomuser.me/api/portraits/men/32.jpg",
    },

    {
      id:2,
      name:"Teja",
      email:"teja@gmail.com",
      course:"MongoDB Database Course",
      progress:40,
      hours:9,
      status:"Inactive",
      quizScore:"68%",
      streak:4,
      online:false,
      avatar:
      "https://randomuser.me/api/portraits/men/45.jpg",
    },

    {
      id:3,
      name:"Ajay",
      email:"ajay@gmail.com",
      course:"Node JS Backend",
      progress:75,
      hours:28,
      status:"Active",
      quizScore:"88%",
      streak:20,
      online:true,
      avatar:
      "https://randomuser.me/api/portraits/men/11.jpg",
    },

    {
      id:4,
      name:"Ravi",
      email:"ravi@gmail.com",
      course:"JavaScript Basics",
      progress:55,
      hours:12,
      status:"Active",
      quizScore:"73%",
      streak:7,
      online:true,
      avatar:
      "https://randomuser.me/api/portraits/men/18.jpg",
    },

  ]);

  // SEARCH FILTER

  const filteredStudents =
    students.filter((student) =>

      student.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <AdminLayout>

      <div className="admin-students-page">

        {/* TOP */}

        <div className="student-top">

          <div>

            <h1>
              Student Management
            </h1>

            <p>
              Manage all enrolled students
            </p>

          </div>

          <input
            type="text"
            placeholder="Search student..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="student-search"
          />

        </div>

        {/* STATS */}

        <div className="student-stats">

          <div className="student-stat-card">

            <h2>
              {students.length}
            </h2>

            <span>
              Total Students
            </span>

          </div>

          <div className="student-stat-card active">

            <h2>

              {
                students.filter(
                  (student) =>
                    student.online
                ).length
              }

            </h2>

            <span>
              Online Students
            </span>

          </div>

          <div className="student-stat-card completed">

            <h2>

              {
                students.filter(
                  (student) =>
                    student.status ===
                    "Completed"
                ).length
              }

            </h2>

            <span>
              Course Completed
            </span>

          </div>

        </div>

        {/* TABLE */}

        <div className="students-table">

          <table>

            <thead>

              <tr>

                <th>Student</th>

                <th>Email</th>

                <th>Course</th>

                <th>Progress</th>

                <th>Quiz Score</th>

                <th>Daily Streak</th>

                <th>Hours</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredStudents.map(
                (student) => (

                  <tr
                    key={student.id}
                  >

                    {/* PROFILE */}

                    <td>

                      <div className="student-info">

                        <div className="avatar-wrapper">

                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="student-avatar"
                          />

                          {student.online && (

                            <span className="online-dot"></span>

                          )}

                        </div>

                        <div>

                          <h4>
                            {student.name}
                          </h4>

                          <p>
                            ID :
                            {student.id}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* EMAIL */}

                    <td>
                      {student.email}
                    </td>

                    {/* COURSE */}

                    <td>
                      {student.course}
                    </td>

                    {/* PROGRESS */}

                    <td>

                      <div className="progress-box">

                        <div className="progress-bar">

                          <div
                            className="progress-fill"
                            style={{
                              width:
                              `${student.progress}%`,
                            }}
                          ></div>

                        </div>

                        <span>
                          {student.progress}%
                        </span>

                      </div>

                    </td>

                    {/* QUIZ */}

                    <td>

                      <span className="quiz-score">

                        📝 {student.quizScore}

                      </span>

                    </td>

                    {/* STREAK */}

                    <td>

                      <span className="streak-box">

                        🔥 {student.streak} Days

                      </span>

                    </td>

                    {/* HOURS */}

                    <td>
                      {student.hours}h
                    </td>

                    {/* STATUS */}

                    <td>

                      <span
                        className={`student-status ${student.status.toLowerCase()}`}
                      >

                        {student.status}

                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td>

                      <div className="student-actions">

                        <button className="block-btn">

                          Block

                        </button>

                        <button className="remove-btn">

                          Remove

                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>

  );
}