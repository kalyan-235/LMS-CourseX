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
import PaymentModal from "../components/PaymentModal";

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

  const [isGenerating, setIsGenerating] = useState(false);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [selectedPaymentId, setSelectedPaymentId] = useState(null);

  useEffect(() => {

    fetchCourse();

    checkEnrollment();

    fetchUserName();

  }, [id]);

// FETCH USER NAME — read from localStorage first, fallback to /api/profile
  const fetchUserName = async () => {
    try {
      // Try localStorage first (set during login/register)
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        const name = parsed?.name || parsed?.userName;
        if (name) {
          setUserName(name);
          return;
        }
      }

      // Fallback: fetch from correct endpoint /api/profile
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await API.get("/profile");
      setUserName(res.data.name || res.data.userName || "");
    } catch (err) {
      console.log("[fetchUserName] error:", err?.response?.status, err?.message);
      // Non-critical — don't show toast
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

        window.addToast(
          "Please login first",
          "warning"
        );

        return;
      }

      // Check if course is paid (price is a number string like "1299")
      const priceNum = parseInt(String(course.price).replace(/[^0-9]/g, ""), 10);
      if (priceNum && priceNum > 0 && course.price !== "Free" && course.price !== "0") {
        setShowPaymentModal(true);
        return;
      }

      // Enroll directly for free courses
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

      window.addToast(
        "Course Enrolled Successfully",
        "success"
      );

    } catch (err) {

      console.log(err);

      window.addToast(
        "Enrollment Failed: " + err.response?.data?.message || err.message,
        "error"
      );

    }

  };

  // PAYMENT SUCCESS HANDLER
  // paymentRecordId = null means "already enrolled" detected at order creation stage
  // For mock mode: backend (mock-enroll) already created the enrollment
  // For real Razorpay: need to call /enrollments/enroll here
  const handlePaymentSuccess = async (paymentRecordId) => {
    try {
      if (paymentRecordId) {
        // Try enroll — for mock mode backend already enrolled, so "Already enrolled" is fine
        try {
          await API.post("/enrollments/enroll", {
            courseId: id,
            paymentId: paymentRecordId,
          });
        } catch (err) {
          const msg = err?.response?.data?.message || "";
          // "Already enrolled" from mock-enroll having done it already — ignore
          if (!msg.toLowerCase().includes("already enrolled")) {
            throw err;
          }
        }
      }

      setIsEnrolled(true);
      window.addToast?.("🎉 Enrolled Successfully!", "success");
      checkEnrollment();

    } catch (err) {
      console.log("[handlePaymentSuccess] error:", err?.response?.data);
      const msg = err?.response?.data?.message || err?.message || "Enrollment failed";
      window.addToast?.("Enrollment failed: " + msg, "error");
      throw err;
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
      window.addToast("Error updating progress", "error");

    }

  };

  // VIDEO OPEN

const handleVideoOpen = async () => {

  if (!isEnrolled) {

    window.addToast(
      "Please enroll to access videos",
      "warning"
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

    window.addToast(
      "Please enroll to access PDFs",
      "warning"
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
  
    // PREVENT MULTIPLE CLICKS
    if(isGenerating) return;
    
    setIsGenerating(true);
  
    const token =
     localStorage.getItem("token");
  
    const response = await API.post(
    
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
  
    window.addToast(
     "Certificate Generated Successfully!",
     "success"
    );
  
   }catch(error){
  
    console.log(error);
    
    // SHOW MESSAGE IF CERTIFICATE ALREADY EXISTS
    if(error.response?.status === 400){
      window.addToast(
        "Certificate already exists for this course! You cannot generate it again.",
        "info"
      );
    } else {
      window.addToast(
        "Error generating certificate: " + (error.response?.data?.message || error.message),
        "error"
      );
    }
  
   } finally {
    setIsGenerating(false);
   }
  
  };


  if (loading) {

    return <h2>Loading...</h2>;

  }

  if (!course) {

    window.addToast("Course not found", "error");
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
                    ₹{course.oldPrice}
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
                  disabled={isGenerating || showCertificate}
                >
                  {isGenerating ? "⏳ Generating..." : showCertificate ? "✅ Certificate Generated" : "📜 Generate Certificate"}
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

      {/* PAYMENT MODAL */}

      {showPaymentModal && (

        <PaymentModal
          course={course}
          onClose={() =>
            setShowPaymentModal(false)
          }
          onPaymentSuccess={handlePaymentSuccess}
        />

      )}

    </div>

  );

}