import { useState } from "react";

import AdminSidebar
from "../components/AdminSidebar";

// import AdminTopbar
// from "../components/AdminTopbar";

export default function AdminQuiz() {

  const [quizzes, setQuizzes] =
    useState([

      {
        id:1,
        title:"React Basics Quiz",
        course:"React Frontend Mastery",
        students:120,
        status:"Active",

        questions:[
          {
            question:"What is JSX?",
            options:[
              "JavaScript XML",
              "Java",
              "React CSS",
              "Node JS",
            ],
          },
        ],
      },

      {
        id:2,
        title:"MongoDB Quiz",
        course:"MongoDB Database Course",
        students:85,
        status:"Active",

        questions:[
          {
            question:"MongoDB is ?",
            options:[
              "SQL",
              "NoSQL",
              "Frontend",
              "Language",
            ],
          },
        ],
      },

    ]);

  const [showModal, setShowModal] =
    useState(false);

  const [editingQuiz, setEditingQuiz] =
    useState(null);

  const [quizTitle, setQuizTitle] =
    useState("");

  const [courseName, setCourseName] =
    useState("");

  const [questions, setQuestions] =
    useState([
      {
        question:"",
        options:["","","",""],
      },
    ]);

  // HANDLE QUESTION

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

  // HANDLE OPTIONS

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

  // ADD QUESTION

  const addQuestion = () => {

    const lastQuestion =
      questions[
        questions.length - 1
      ];

    const allOptionsFilled =
      lastQuestion.options.every(
        (option) =>
          option.trim() !== ""
      );

    if (
      lastQuestion.question.trim() === "" ||
      !allOptionsFilled
    ) {

      alert(
        "Fill question and all 4 options first"
      );

      return;
    }

    setQuestions([

      ...questions,

      {
        question:"",
        options:["","","",""],
      },

    ]);
  };

  // REMOVE QUESTION

  const removeQuestion = (index) => {

    if (
      questions.length === 1
    ) {

      alert(
        "At least one question required"
      );

      return;
    }

    const updated =
      questions.filter(
        (_,i) => i !== index
      );

    setQuestions(updated);
  };

  // SAVE QUIZ

  const saveQuiz = () => {

    if (
      quizTitle.trim() === "" ||
      courseName.trim() === ""
    ) {

      alert(
        "Fill all fields"
      );

      return;
    }

    // VALIDATE QUESTIONS

    for (
      let i = 0;
      i < questions.length;
      i++
    ) {

      const q =
        questions[i];

      const allOptionsFilled =
        q.options.every(
          (option) =>
            option.trim() !== ""
        );

      if (
        q.question.trim() === "" ||
        !allOptionsFilled
      ) {

        alert(
          `Question ${i + 1} is incomplete`
        );

        return;
      }
    }

    const newQuiz = {

      id:
        editingQuiz
          ? editingQuiz.id
          : Date.now(),

      title:quizTitle,

      course:courseName,

      students:
        editingQuiz
          ? editingQuiz.students
          : 0,

      status:"Active",

      questions:questions,
    };

    // EDIT

    if (editingQuiz) {

      const updatedQuiz =
        quizzes.map((quiz) =>

          quiz.id === editingQuiz.id

            ? newQuiz

            : quiz
        );

      setQuizzes(updatedQuiz);
    }

    // ADD

    else {

      setQuizzes([
        ...quizzes,
        newQuiz,
      ]);
    }

    // RESET

    setQuizTitle("");

    setCourseName("");

    setQuestions([
      {
        question:"",
        options:["","","",""],
      },
    ]);

    setEditingQuiz(null);

    setShowModal(false);
  };

  // DELETE QUIZ

  const deleteQuiz = (id) => {

    const filteredQuiz =
      quizzes.filter(
        (quiz) =>
          quiz.id !== id
      );

    setQuizzes(filteredQuiz);
  };

  // EDIT QUIZ

  const editQuiz = (quiz) => {

    setEditingQuiz(quiz);

    setQuizTitle(quiz.title);

    setCourseName(quiz.course);

    setQuestions(
      quiz.questions
    );

    setShowModal(true);
  };

  return (

    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-content">

        {/* <AdminTopbar /> */}

        <div className="admin-quiz-page">

          {/* HEADER */}

          <div className="admin-quiz-header">

            <h2>
              Quiz Management
            </h2>

            <button
              className="add-quiz-btn"
              onClick={() => {
              
                // RESET ALL FIELDS
              
                setEditingQuiz(null);
              
                setQuizTitle("");
              
                setCourseName("");
              
                setQuestions([
                  {
                    question:"",
                    options:["","","",""],
                  },
                ]);
              
                setShowModal(true);
              }}
            >
            
              + Add Quiz
            
            </button>

          </div>

          {/* QUIZ GRID */}

          <div className="quiz-grid">

            {quizzes.map((quiz) => (

              <div
                className="quiz-card"
                key={quiz.id}
              >

                <div className="quiz-top">

                  <div className="quiz-icon">
                    📝
                  </div>

                  <span className="quiz-status">

                    {quiz.status}

                  </span>

                </div>

                <h3 className="quiz-title">

                  {quiz.title}

                </h3>

                <p className="quiz-course">

                  {quiz.course}

                </p>

                <div className="quiz-info">

                  <div className="quiz-info-box">

                    <h4>
                      {
                        quiz.questions.length
                      }
                    </h4>

                    <span>
                      Questions
                    </span>

                  </div>

                  <div className="quiz-info-box">

                    <h4>
                      {quiz.students}
                    </h4>

                    <span>
                      Students
                    </span>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="quiz-actions">

                  <button
                    className="edit-quiz-btn"
                    onClick={() =>
                      editQuiz(quiz)
                    }
                  >

                    Edit

                  </button>

                  <button
                    className="delete-quiz-btn"
                    onClick={() =>
                      deleteQuiz(
                        quiz.id
                      )
                    }
                  >

                    Delete

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="quiz-modal">

          <div className="quiz-modal-box">

            <h2>

              {
                editingQuiz
                  ? "Edit Quiz"
                  : "Add New Quiz"
              }

            </h2>

            <input
              type="text"
              placeholder="Quiz Title"
              value={quizTitle}
              onChange={(e) =>
                setQuizTitle(
                  e.target.value
                )
              }
            />

            <input
              type="text"
              placeholder="Course Name"
              value={courseName}
              onChange={(e) =>
                setCourseName(
                  e.target.value
                )
              }
            />

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

    </div>

  );
}