export default function LearningCard({
  title,
  lessons,
  // progress,
  // lastSeen,
}) {
  return (
    <div className="ci">
      <div className="ciinfo">
        <h4>{title}</h4>

        <p>
          {lessons} lessons • {lastSeen}
        </p>

        {/* <div className="minibar">
          <div
            className="minifill"
            style={{ width: `${progress}%` }}
          ></div>
        </div> */}
      </div>

      {/* <div className="cipct">
        {progress}%
      </div> */}
    </div>
  );
}