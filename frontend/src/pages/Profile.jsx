import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [enrollments, setEnrollments] =
    useState([]);
  const [certificates, setCertificates] =
    useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchProfile();
    fetchEnrollments();
    fetchCertificates();
  }, []);

  // FETCH USER PROFILE

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem(
        "token"
      );

      const res = await API.get(
        "/profile",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH USER ENROLLMENTS

  const fetchEnrollments = async () => {
    try {
      const token = localStorage.getItem(
        "token"
      );

      const res = await API.get(
        "/enrollments/my-courses",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setEnrollments(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // FETCH CERTIFICATES

  const fetchCertificates = async () => {
    try {
      const token = localStorage.getItem(
        "token"
      );

      const res = await API.get(
        "/certificates/my",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setCertificates(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // CALCULATE STATS

  const totalHours = enrollments.reduce(
    (sum, item) =>
      sum + (item.courseId?.duration || 0),
    0
  );

  const completedCourses = enrollments.filter(
    (item) => item.completed === true
  ).length;

  const activeCourses = enrollments.filter(
    (item) => item.completed === false
  );

  // UPLOAD IMAGE

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      const token = localStorage.getItem(
        "token"
      );

      const res = await API.post(
        "/upload/image",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      // UPDATE PROFILE WITH NEW IMAGE
      const updated = await API.put(
        "/profile",
        {
          profileImage: res.data.imageUrl,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setUser(updated.data);
      alert("Profile photo updated successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to upload image");
    }
  };

  // LOGOUT

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="profile-page">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-header">

        <div className="profile-avatar-wrap">
          <img
            src={
             user?.profileImage ||
             "https://randomuser.me/api/portraits/men/32.jpg"
            }
            alt=""
            className="profile-avatar"
          />

          <label className="edit-icon-btn">
            ✎
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{
                display: "none",
              }}
            />
          </label>
        </div>

        <h2>{user?.name}</h2>
        <p>{user?.email}</p>

        <button className="pro-btn">
          🏆 Pro Member
        </button>

      </div>

      {/* STATS */}

      <div className="profile-stats">

        <div className="pstat">
          <h3>{enrollments.length}</h3>
          <span>Enrolled Courses</span>
        </div>

        <div className="pstat">
          <h3>{totalHours}h</h3>
          <span>Total Hours</span>
        </div>

        <div className="pstat">
          <h3>{completedCourses}</h3>
          <span>Completed</span>
        </div>

        <div className="pstat">
          <h3>{
            certificates.length
          }</h3>
          <span>Certificates</span>
        </div>

      </div>

      {/* ACTIVE COURSES */}

      {activeCourses.length > 0 && (

        <div className="profile-section">

          <h3 className="section-title">
            Continuing Learning
          </h3>

          <div className="courses-list">

            {activeCourses.map((item) => (

              <div
                key={item._id}
                className="course-item"
              >

                <img
                  src={
                    item.courseId?.image
                  }
                  alt={
                    item.courseId?.title
                  }
                  className="course-item-image"
                />

                <div className="course-item-content">

                  <h4>
                    {
                      item.courseId?.title
                    }
                  </h4>

                  <div className="progress-bar">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${
                          item.progress
                        }%`,
                      }}
                    ></div>

                  </div>

                  <p className="progress-text">
                    {item.progress}%
                    Complete
                  </p>

                </div>

                <Link
                  to={`/courses/${
                    item.courseId?._id
                  }`}
                  className="continue-btn"
                >
                  Continue →
                </Link>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* COMPLETED COURSES */}

      {completedCourses > 0 && (

        <div className="profile-section">

          <h3 className="section-title">
            Completed Courses ({
              completedCourses
            })
          </h3>

          <div className="completed-courses">

            {enrollments
              .filter(
                (item) =>
                  item.completed ===
                  true
              )
              .map((item) => (

                <div
                  key={item._id}
                  className="completed-course-card"
                >

                  <div className="course-icon">
                    ✅
                  </div>

                  <div className="course-info">

                    <h4>
                      {
                        item.courseId
                          ?.title
                      }
                    </h4>

                    <p>
                      Completed on {
                        new Date(
                          item.completedDate
                        ).toLocaleDateString()
                      }
                    </p>

                  </div>

                  <Link
                    to={`/courses/${
                      item.courseId?._id
                    }`}
                    className="review-btn"
                  >
                    Review
                  </Link>

                </div>

              ))}

          </div>

        </div>

      )}

      {/* CERTIFICATES */}

      {certificates.length > 0 && (

        <div className="profile-section">

          <h3 className="section-title">
            Certificates (
            {certificates.length})
          </h3>

          <div className="certificates-list">

            {certificates.map((cert) => (

              <div
                key={cert._id}
                className="certificate-card"
              >

                <div className="cert-icon">
                  🎓
                </div>

                <div className="cert-content">

                  <h4>
                    {cert.courseName}
                  </h4>

                  <p>
                    Issued on {
                      new Date(
                        cert.createdAt
                      ).toLocaleDateString()
                    }
                  </p>

                </div>

                <button
                  className="download-cert-btn"
                  onClick={() => {
                    const link =
                      document.createElement(
                        "a"
                      );
                    link.href =
                      cert.certificateUrl;
                    link.download = `${
                      cert.courseName
                    }_certificate.pdf`;
                    link.click();
                  }}
                >
                  Download
                </button>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* ACHIEVEMENTS */}

      <div className="profile-section">

        <h3 className="section-title">
          Achievements
        </h3>

        <div className="achievements">

          {completedCourses > 0 ? (

            <div className="ach-card">
              ✅
              <span>Certified</span>
            </div>

          ) : null}

          {enrollments.length >= 3 ? (

            <div className="ach-card">
              🚀
              <span>
                Eager Learner
              </span>
            </div>

          ) : null}

          {totalHours >= 10 ? (

            <div className="ach-card">
              ⚡
              <span>
                Fast Learner
              </span>
            </div>

          ) : null}

          {completedCourses >= 2 ? (

            <div className="ach-card">
              🏆
              <span>
                Top Student
              </span>
            </div>

          ) : null}

        </div>

      </div>

      {/* account */}

      <div className="profile-section">

        <h3 className="section-title">
          Account
        </h3>

        <div className="menu-card">

          <div className="menu-item">
            <div className="menu-left">
              👤 Edit Profile
            </div>

            <div>›</div>
          </div>

          <div className="menu-item">
            <div className="menu-left">
              🔔 Notifications
            </div>

            <div>›</div>
          </div>

          <div className="menu-item">
            <div className="menu-left">
              🔒 Privacy & Security
            </div>

            <div>›</div>
          </div>

        </div>

      </div>

      {/* learning */}

      <div className="profile-section">

        <h3 className="section-title">
          Learning
        </h3>

        <div className="menu-card">

          <div className="menu-item">
            <div className="menu-left">
              ⬇ Downloads
            </div>

            <div>›</div>
          </div>

          <div className="menu-item">
            <div className="menu-left">
              🛡 My Certificates
            </div>

            <div>›</div>
          </div>

          <div className="menu-item">
            <div className="menu-left">
              🔖 Saved Courses
            </div>

            <div>›</div>
          </div>

        </div>

      </div>

      {/* support */}

      <div className="profile-section">

        <h3 className="section-title">
          Support
        </h3>

        <div className="menu-card">

          <div className="menu-item">
            <div className="menu-left">
              ❓ Help Center
            </div>

            <div>›</div>
          </div>

          <div className="menu-item">
            <div className="menu-left">
              ℹ About LearnHub
            </div>

            <div>›</div>
          </div>

        </div>

      </div>

      <button
       className="logout-btn"
       onClick={handleLogout}
      >
       ↪ Sign Out
      </button>

    </div>
  );
}