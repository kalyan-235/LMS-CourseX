import { useState, useEffect } from "react";
import API from "../../api/axios";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminQuiz() {

  const [courses, setCourses] = useState([]);
  const [editingQuiz, setEditingQuiz] = useState(null);

  const [selectedCourse, setSelectedCourse] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [questions, setQuestions] =
    useState([
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {

    try {

      const res =
        await API.get("/courses");

      setCourses(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const openQuizModal = (course) => {

  setSelectedCourse(course);

  setQuestions(
    course.quiz?.length
      ? course.quiz
      : [
          {
            question: "",
            options: ["", "", "", ""],
            answer: "",
          },
        ]
  );

  setShowModal(true);
};

  const handleQuestionChange = (
    index,
    value
  ) => {

    const updated =
      [...questions];

    updated[index].question =
      value;

    setQuestions(updated);

  };

  const handleOptionChange = (
    qIndex,
    oIndex,
    value
  ) => {

    const updated =
      [...questions];

    updated[qIndex]
      .options[oIndex] = value;

    setQuestions(updated);

  };

  const handleAnswerChange = (
    index,
    value
  ) => {

    const updated =
      [...questions];

    updated[index].answer =
      value;

    setQuestions(updated);

  };

  const addQuestion = () => {

    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ]);

  };

  const removeQuestion = (
    index
  ) => {

    if (
      questions.length === 1
    ) {

      return;

    }

    const updated =
      questions.filter(
        (_, i) =>
          i !== index
      );

    setQuestions(updated);

  };

  const saveQuiz = async () => {

    try {

      setLoading(true);

      await API.put(

        `/courses/${selectedCourse._id}/quiz`,

        {
          quiz: questions,
        }

      );

      window.addToast?.("Quiz saved successfully!", "success");

      setShowModal(false);

      fetchCourses();

    } catch (error) {

      console.log(error);

      window.addToast?.("Failed to save quiz", "error");

    } finally {

      setLoading(false);

    }

  };

  return (

    <AdminLayout>

      <div className="admin-quiz-page">

        {/* HEADER */}
        <div className="admin-quiz-header">
          <h2>Quiz Management</h2>
          <button
            className="add-quiz-btn"
            onClick={() => {
              setSelectedCourse(null);
              setQuestions([{ question: "", options: ["", "", "", ""], answer: "" }]);
              setShowModal(true);
            }}
          >
            + Add New Quiz
          </button>
        </div>

        {/* COURSE QUIZ CARDS */}
        <div className="quiz-cards-grid">
          {courses.map((course) => (
            <div className="quiz-card" key={course._id}>
              <img src={course.image} alt={course.title} className="quiz-course-image" />
              <h3>{course.title}</h3>
              <p>{course.category}</p>
              <p>Questions: {course.quiz?.length || 0}</p>
              <button className="edit-quiz-btn" onClick={() => openQuizModal(course)}>
                Manage Quiz
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="quiz-modal">

          <div className="quiz-modal-box">

            <div className="quiz-modal-header">

              <h2>

                {
                  selectedCourse
                    ? selectedCourse.title
                    : "Add New Quiz"
                }

              </h2>

              <button
                className="close-modal-btn"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>

            </div>

            {/* COURSE SELECT FOR NEW QUIZ */}

            {!selectedCourse && (

              <div className="course-select-box">

                <label>
                  Select Course
                </label>

                <select
                  onChange={(e) => {
                    const course = courses.find(
                      c => c._id === e.target.value
                    );
                    setSelectedCourse(course);
                  }}
                >

                  <option value="">
                    Choose a course...
                  </option>

                  {courses.map((course) => (

                    <option
                      key={course._id}
                      value={course._id}
                    >
                      {course.title}
                    </option>

                  ))}

                </select>

              </div>

            )}

            {/* QUESTIONS */}

            {questions.map(
              (q,qIndex) => (

                <div
                  className="question-box"
                  key={qIndex}
                >

                  <div className="question-head">

                    <h4>
                      Question {qIndex + 1}
                    </h4>

                    <button
                      className="remove-question-btn"
                      onClick={() =>
                        removeQuestion(
                          qIndex
                        )
                      }
                    >

                      Remove

                    </button>

                  </div>

                  <input
                    type="text"
                    placeholder="Enter Question"
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionChange(
                        qIndex,
                        e.target.value
                      )
                    }
                  />

                  {q.options.map(
                    (
                      option,
                      oIndex
                    ) => (

                      <input
                        key={oIndex}
                        type="text"
                        placeholder={`Option ${oIndex + 1}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(
                            qIndex,
                            oIndex,
                            e.target.value
                          )
                        }
                      />
                    )
                  )}
                  <input
                    type="text"
                    placeholder="Correct Answer"
                    value={q.answer}
                    onChange={(e) =>
                      handleAnswerChange(
                        qIndex,
                        e.target.value
                      )
                    }
                  />
                </div>
              )
            )}

            <button
              className="question-add-btn"
              onClick={addQuestion}
            >

              + Add Question

            </button>

            <div className="quiz-modal-actions">

              <button
                className="save-quiz-btn"
                onClick={saveQuiz}
              >

                Save Quiz

              </button>

              <button
                className="cancel-quiz-btn"
                onClick={() => {

                  setShowModal(false);

                  setEditingQuiz(null);
                }}
              >

                Cancel

              </button>

            </div>

          </div>

        </div>

      )}

    </AdminLayout>

  );
}