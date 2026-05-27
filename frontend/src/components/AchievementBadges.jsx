export default function AchievementBadges() {

  const streak =
    Number(localStorage.getItem("streak")) || 0;

  const hours =
    Number(localStorage.getItem("hours")) || 0;

  const badges = [];

  if (streak >= 3) {

    badges.push("🔥 3 Day Streak");

  }

  if (streak >= 7) {

    badges.push("🏆 Weekly Warrior");

  }

  if (hours >= 10) {

    badges.push("⚡ Fast Learner");

  }

  if (hours >= 20) {

    badges.push("🚀 Learning Master");

  }

  return (

    <div className="badge-card">

      <h2 className="badge-title">
        Achievement Badges
      </h2>

      <div className="badge-list">

        {badges.length > 0 ? (

          badges.map((badge,index) => (

            <div
              className="badge-item"
              key={index}
            >
              {badge}
            </div>

          ))

        ) : (

          <p>
            No achievements yet
          </p>

        )}

      </div>

    </div>

  );
}