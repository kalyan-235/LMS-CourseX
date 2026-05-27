import { useNavigate } from "react-router-dom";

export default function Hero() {

  const navigate = useNavigate();

  return (
    <div className="hero">

      <div>

        <div className="hlabel">
          Continue Learning
        </div>

        <div className="htitle">
          Full-Stack Web Development with React & Node.js
        </div>

        <div className="hsub">
          Module 4 · Lesson 7: Authentication with JWT
        </div>

      </div>

      <button
        className="pbtn"
        onClick={() => navigate("/course")}
      >
        ▶
      </button>

    </div>
  );
}