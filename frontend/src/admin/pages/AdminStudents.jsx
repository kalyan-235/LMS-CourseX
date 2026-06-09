import { useState , useEffect} from "react";
import API from "../../api/axios";
import AdminLayout from "../layouts/AdminLayout";
import "../css/adminstudents.css";

export default function AdminStudents() {

  const [students,setStudents] =
useState([]);

  const [search, setSearch] = useState("");

  const [loading,setLoading] =
  useState(true);

  useEffect(()=>{

   fetchStudents();

  },[]);
  const fetchStudents =
  async()=>{

   try{

    const res =
     await API.get(
      "/users/students"
     );

    setStudents(
     res.data
    );

   }catch(error){

    console.log(error);

   }finally{

    setLoading(false);

   }

  };

  const filteredStudents = students.filter((student) =>
    student.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
    student.userId?.email?.toLowerCase().includes(search.toLowerCase())
  );

  if(loading){

   return (
    <AdminLayout>
     <h2>
      Loading Students...
     </h2>
    </AdminLayout>
   );

  }

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
                    student.completed === false
                ).length
              }

            </h2>

            <span>
              Currently Learning
            </span>

          </div>

          <div className="student-stat-card completed">

            <h2>

              {
                students.filter(
                  (student) =>
                    student.completed === true
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
                            src={student.userId?.profileImage || "https://via.placeholder.com/40"}
                            alt={student.userId?.name}
                            className="student-avatar"
                          />

                          {/* Online status not available in current data */}

                        </div>

                        <div>

                          <h4>
                            {student.userId?.name}
                          </h4>

                          <p>
                            ID : {student._id}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* EMAIL */}
                    <td>
                      {student.userId?.email}
                    </td>

                    {/* COURSE */}
                    <td>
                      {student.courseId?.title}
                    </td>

                    {/* PROGRESS */}
                    <td>
                      <div className="progress-box">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${student.progress}%`,
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
                        📝 {student.quizScore}%
                      </span>
                    </td>
                    <td>
                      <span className="streak-box">
                        🔥 {student.userId?.streak || 0} Days
                      </span>
                    </td>
                          
                    {/* HOURS */}
                    <td>
                      {student.watchedHours}h
                    </td>
                          
                    {/* STATUS */}
                    <td>
                      <span
                        className={`student-status ${
                          student.completed
                            ? "completed"
                            : "active"
                        }`}
                      >
                        {
                          student.completed
                            ? "Completed"
                            : "Learning"
                        }
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