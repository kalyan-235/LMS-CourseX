import { useState } from "react";
import API from "../api/axios";

export default function Quiz({
  quiz = [],
  enrollmentId,
}) {

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const [showResult, setShowResult] =
    useState(false);

  // NO QUIZ

  if (!quiz || quiz.length === 0) {

    return (

      <div className="quiz-box">

        <h3>
          No Quiz Available
        </h3>

      </div>

    );

  }

  const handleAnswer =
    async (option) => {

    let newScore = score;

    if (
      option ===
      quiz[currentQuestion].answer
    ) {

      newScore++;

      setScore(newScore);

    }

    const nextQuestion =
      currentQuestion + 1;

    if (
      nextQuestion <
      quiz.length
    ) {

      setCurrentQuestion(
        nextQuestion
      );

    } else {

      setShowResult(true);

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const finalScore =
          Math.round(
            (
              newScore /
              quiz.length
            ) * 100
          );

        await API.put(

          `/enrollments/quiz/${enrollmentId}`,

          {
            score: finalScore,
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }

        );

      } catch (err) {

        console.log(err);

      }

    }

  };

  return (

    <div className="quiz-box">

      <h2 className="quiz-heading">

        Course Quiz

      </h2>

      {showResult ? (

        <div className="quiz-result">

          <h2>

            Score:
            {" "}
            {score}
            /
            {quiz.length}

          </h2>

          <p>

            {score >=
            Math.ceil(
              quiz.length * 0.7
            )

              ? "🎉 Quiz Passed"

              : "❌ Quiz Failed"}

          </p>

        </div>

      ) : (

        <div>

          <h3 className="quiz-question">

            Q{currentQuestion + 1}.
            {" "}

            {
              quiz[currentQuestion]
                ?.question
            }

          </h3>

          <div className="quiz-options">

            {
              quiz[currentQuestion]
                ?.options
                ?.map(
                  (
                    option,
                    index
                  ) => (

                    <button
                      key={index}
                      className="quiz-btn"
                      onClick={() =>
                        handleAnswer(
                          option
                        )
                      }
                    >

                      {option}

                    </button>

                  )
                )
            }

          </div>

        </div>

      )}

    </div>

  );

}