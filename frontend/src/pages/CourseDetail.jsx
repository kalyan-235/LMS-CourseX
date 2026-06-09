import {useState,useEffect,} from "react";
import {useParams,} from "react-router-dom";
import API from "../api/axios";
import Overview from "../components/Overview";
import InstructorCard from "../components/InstructorCard";
import ReviewSection from "../components/ReviewSection";
import Notes from "../components/Notes";
import Certificate from "../components/Certificate";
import Quiz from "../components/Quiz";
import PDFModal from "../components/PDFModal";

export default function CourseDetail() {

  const { id } = useParams();

  const [course, setCourse] =
    useState(null);


  const [enrollmentData, setEnrollmentData] =
    useState(null);

  const [loading, setLoading] =useState(true);

  const [activeTab, setActiveTab] = useState("overview");

  const [selectedPdf, setSelectedPdf] = useState(null);

  const [isEnrolled, setIsEnrolled] = useState(false);

  const [open, setOpen] = useState(false);

  const [showCertificate, setShowCertificate] = useState(false);

  const [userName, setUserName] = useState("");

  useEffect(() => {

    fetchCourse();

    checkEnrollment();

    fetchUserName();

  }, [id]);

// FETCH USER NAME

  const fetchUserName = async () => {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) return;

      const res =
        await API.get(
          "/users/profile",
          {
            headers:{
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setUserName(res.data.name || res.data.userName);

    } catch (err) {

      console.log(err);

    }

  };

// FETCH SINGLE COURSE

  const fetchCourse = async () => {
  
    try {
    
      const res =
        await API.get(
          `/courses/${id}`
        );
      
      setCourse(res.data);
      
    } catch (err) {
    
      console.log(err);
    
    } finally {
    
      setLoading(false);
    
    }
  
  };

// CHECK ENROLLMENT

  const checkEnrollment = async () => {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) return;

      const res =
        await API.get(
          "/enrollments/my-courses",
          {
            headers:{
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const enrolled =
        res.data.find(
          (item) =>

            item.courseId?._id === id
        );

      if (enrolled) {

        setIsEnrolled(true);
        setEnrollmentData( enrolled );

      }

    } catch (err) {

      console.log(err);

    }

  };

  // ENROLL

  const handleEnroll = async () => {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) {

        alert(
          "Please login first"
        );

        return;
      }

      await API.post(

        "/enrollments/enroll",

        {
          courseId:id,
        },

        {
          headers:{
            Authorization:
              `Bearer ${token}`,
          },
        }

      );

      setIsEnrolled(true);

      alert(
        "Course Enrolled Successfully"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Enrollment Failed"
      );

    }

  };

  const updateCourseProgress = async () => {

    try {

      if (!enrollmentData) return;

      const token =
        localStorage.getItem("token");

      let newProgress =
        enrollmentData.progress + 10;

      // MAX 100

      if (newProgress > 100) {

        newProgress = 100;

      }

      await API.put(

        `/enrollments/progress/${enrollmentData._id}`,

        {
          progress:newProgress,

          watchedHours:
            enrollmentData.watchedHours + 1,
        },

        {
          headers:{
            Authorization:
              `Bearer ${token}`,
          },
        }

      );

    } catch (err) {

      console.log(err);

    }

  };

  // VIDEO OPEN

const handleVideoOpen = async () => {

  if (!isEnrolled) {

    alert(
      "Please enroll to access videos"
    );

    return;

  }

  // PDF close cheyyi
  setSelectedPdf(null);

  // Video open cheyyi
  setOpen(true);

  await updateCourseProgress();

};

  // PDF OPEN

const handlePdfOpen = (file, title) => {

  if (!isEnrolled) {

    alert(
      "Please enroll to access PDFs"
    );

    return;

  }

  // Video close cheyyi
  setOpen(false);

  // PDF open cheyyi
  setSelectedPdf({
    file,
    title,
  });

};

  const generateCertificate = async()=>{
   try{
  
    const token =
     localStorage.getItem("token");
  
    await API.post(
    
     "/certificates/issue",
    
     {
      courseId:course._id
     },
    
     {
      headers:{
       Authorization:
       `Bearer ${token}`
      }
     }
    
    );
  
    setShowCertificate(true);

    setActiveTab("certificate");
  
    alert(
     "Certificate Generated Successfully!"
    );
  
   }catch(error){
  
    console.log(error);

    alert(
      "Error generating certificate"
    );
  
   }
  
  };


  if (loading) {

    return <h2>Loading...</h2>;

  }

  if (!course) {

    return <h2>Course Not Found</h2>;

  }

  return (

    <div className="course-detail-page">

      {open && (
      
        <div className="video-modal">
        
          <div className="video-container">
      
            <button
              className="close-video"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
      
            <iframe
              src={course.video}
              title="Course Video"
              allowFullScreen
            />
      
          </div>
      
        </div>
      
      )}

      {!open && (

        <div className="detail-card">
        
          <div className="detail-image">

            <img
              src={course.image}
              alt={course.title}
            />

            <button
              className="video-play-btn"
              onClick={handleVideoOpen}
            >
              {isEnrolled ? "▶" : "🔒"}
            </button>

          </div>

          <div className="detail-content">

            <div className="detail-category">
              {course.category}
            </div>

            <h1 className="detail-title">
              {course.title}
            </h1>

            <div className="detail-author">
              By {course.author}
            </div>

            <div className="detail-rating">
              ⭐ {course.rating}
            </div>

            {!isEnrolled && (
              <div className="price-box">
              
                <div>
                  <div className="course-price">
                    {course.price}
                  </div>
            
                  <div className="old-price">
                    {course.oldprice}
                  </div>
                </div>
            
                <button
                  className="enroll-btn"
                  onClick={handleEnroll}
                >
                  Enroll Now
                </button>
            
              </div>
            )}

            {isEnrolled && (
              <div className="already-enrolled">
                ✅ Already Enrolled
              </div>
            )}

          </div>
          
        </div>

      )}

      <div className="course-tabs">

        <div
          className={`course-tab ${
            activeTab === "overview"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("overview")
          }
        >
          Overview
        </div>

        <div
          className={`course-tab ${
            activeTab === "curriculum"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("curriculum")
          }
        >
          Curriculum
        </div>

        <div
          className={`course-tab ${
            activeTab === "instructor"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("instructor")
          }
        >
          Instructor
        </div>

        <div
          className={`course-tab ${
            activeTab === "reviews"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("reviews")
          }
        >
          Reviews
        </div>

        {isEnrolled && enrollmentData?.progress === 100 && (
          <div
            className={`course-tab ${
              activeTab === "certificate"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setActiveTab("certificate")
            }
          >
            🏆 Certificate
          </div>
        )}

      </div>

      {/* TAB CONTENT */}

      <div className="course-tab-content">

        {/* OVERVIEW */}

        {activeTab === "overview" && (

          <div className="tab-box">

            <Overview
              course={course}
            />

          </div>

        )}

        {/* CURRICULUM */}

        {activeTab === "curriculum" && (

          <div className="tab-box">

            {/* PDF SECTION */}

            <div className="pdf-section">

              <h2 className="pdf-heading">
                📚 Course PDFs
              </h2>

              {!course.pdfs || course.pdfs.length === 0 ? (
                <div className="no-pdf-message">
                  <p>No PDFs available for this course</p>
                </div>
              ) : (
                course.pdfs?.map(
                  (pdf) => (

                    <div
                      key={pdf._id}
                      className="pdf-item"
                    >

                      <div
                        className="pdf-card"
                        onClick={() =>
                          handlePdfOpen(
                            pdf.file,
                            pdf.title
                          )
                        }
                      >

                        <div className="pdf-icon">

                          {isEnrolled
                            ? "📄"
                            : "🔒"}

                        </div>

                        <div className="pdf-info">

                          <h4>
                            {pdf.title}
                          </h4>

                          <p>

                            {isEnrolled
                              ? "Click to view PDF"
                              : "Enroll to access"}

                          </p>

                        </div>

                      </div>

                    </div>

                  )
                )
              )}

            </div>

            {/* NOTES */}

            {isEnrolled && (

              <Notes
                courseId={course._id}
              />

            )}

            {/* QUIZ */}

            {isEnrolled && (

              <Quiz
                quiz={course.quiz}
                enrollmentId={
                  enrollmentData?._id
                }
              />
            )}

          </div>

        )}

        {/* INSTRUCTOR */}

        {activeTab === "instructor" && (

          <div className="tab-box">

            <InstructorCard
              name={course.instructor?.name}
              email={course.instructor?.email}
              role={course.instructor?.role}
              students={course.instructor?.students}
              rating={course.instructor?.rating}
              courses={course.instructor?.courses}
              satisfaction={course.instructor?.satisfaction}
              bio={course.instructor?.bio}
            />

          </div>

        )}

        {/* REVIEWS */}

        {activeTab === "reviews" && (

          <div className="tab-box">

            <ReviewSection
              reviews={course.reviews}
            />

          </div>

        )}

        {/* CERTIFICATE */}

        {activeTab === "certificate" && isEnrolled && (

          <div className="tab-box">

            {showCertificate && userName ? (

              <Certificate
                userName={userName}
                course={course}
              />

            ) : (

              <div className="certificate-prompt">

                <h2>🎓 Course Complete!</h2>

                <p>
                  Congratulations on completing this course!
                </p>

                <button
                  className="certificate-btn"
                  onClick={generateCertificate}
                >
                  📜 Generate Certificate
                </button>

              </div>

            )}

          </div>

        )}

      </div>

      {/* PDF MODAL */}

      {selectedPdf && (

        <PDFModal
          pdfFile={selectedPdf.file}
          pdfTitle={selectedPdf.title}
          onClose={() =>
            setSelectedPdf(null)
          }
        />

      )}

    </div>

  );

}