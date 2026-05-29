import { useState } from "react";

export default function Quiz({
  quiz = [],
}) {

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const [showResult, setShowResult] =
    useState(false);

  const handleAnswer = (option) => {

    if (
      option ===
      quiz[currentQuestion].answer
    ) {

      setScore(score + 1);

    }

    const nextQuestion =
      currentQuestion + 1;

    if (nextQuestion < quiz.length) {

      setCurrentQuestion(
        nextQuestion
      );

    } else {

      setShowResult(true);

    }
  };
  const handleSubmitQuiz =async () => {

    let score = 0;

    quiz.forEach((q,index) => {

      if (
        answers[index] ===
        q.answer
      ) {

        score += 10;

      }

    });

    setQuizScore(score);

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await API.put(

        `/enrollment/quiz/${enrollmentId}`,

        { score },

        {
          headers:{
            Authorization:
              `Bearer ${token}`,
          },
        }

      );

      if (score >= 70) {

        alert(
          "Quiz Passed 🎉"
        );

      } else {

        alert(
          "Quiz Failed"
        );

      }

    } catch (err) {

      console.log(err);

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
            Your Score:
            {" "}
            {score}/{quiz.length}
          </h2>

          <p>

            {score >= 2
              ? "🎉 Congratulations! You Passed"
              : "❌ Try Again"}

          </p>

        </div>

      ) : (

        <div>

          <h3 className="quiz-question">

            Q{currentQuestion + 1}.
            {" "}
            {
              quiz[currentQuestion]
                .question
            }

          </h3>

          <div className="quiz-options">

            {quiz[currentQuestion]
              .options.map(
                (option, index) => (

                <button
                  key={index}
                  className="quiz-btn"
                  onClick={() =>
                    handleAnswer(option)
                  }
                >

                  {option}

                </button>

              ))}

          </div>

        </div>

      )}

    </div>

  );
}