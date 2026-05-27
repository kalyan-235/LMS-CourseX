import { useState } from "react";

export default function CurriculumModule({
  title,
  duration,
  completed,
  lessons = [],
}) {

  const [open, setOpen] =
    useState(false);

  return (

    <div className="curriculum-section">

      <div
        className="section-header"
        onClick={() => setOpen(!open)}
      >

        <div>

          <strong>{title}</strong>

          <div className="lesson-duration">
            {duration}
          </div>

        </div>

        <div className="lesson-duration">
          {completed}
        </div>

      </div>

      {open && (

        <div className="section-content">

          {lessons.map((lesson, index) => (

            <div
              className="lesson-item"
              key={index}
            >

              <div className="lesson-left">

                <div className="lesson-icon">
                  ▶
                </div>

                <div className="lesson-title">
                  {lesson}
                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}