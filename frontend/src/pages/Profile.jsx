export default function Profile() {
  return (
    <div className="profile-page">

      <div className="profile-header">

        <div className="profile-avatar-wrap">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt=""
            className="profile-avatar"
          />

          <div className="edit-icon">
            ✎
          </div>
        </div>

        <h2>Marcus Johnson</h2>

        <p>marcus.dev@learnhub.io</p>

        <button className="pro-btn">
          🏆 Pro Member
        </button>

      </div>

      {/* stats */}

      <div className="profile-stats">

        <div className="pstat">
          <h3>5</h3>
          <span>Courses</span>
        </div>

        <div className="pstat">
          <h3>128</h3>
          <span>Hours</span>
        </div>

        <div className="pstat">
          <h3>2</h3>
          <span>Certificates</span>
        </div>

        <div className="pstat">
          <h3>14d</h3>
          <span>Streak</span>
        </div>

      </div>

      {/* achievements */}

      <div className="profile-section">

        <h3 className="section-title">
          Achievements
        </h3>

        <div className="achievements">

          <div className="ach-card">
            ⚡
            <span>Fast Learner</span>
          </div>

          <div className="ach-card">
            🔥
            <span>Consistent</span>
          </div>

          <div className="ach-card">
            🏆
            <span>Top Student</span>
          </div>

          <div className="ach-card">
            ✅
            <span>Certified</span>
          </div>

        </div>

      </div>

      {/* account */}

      <div className="profile-section">

        <h3 className="section-title">
          Account
        </h3>

        <div className="menu-card">

          <div className="menu-item">
            <div className="menu-left">
              👤 Edit Profile
            </div>

            <div>›</div>
          </div>

          <div className="menu-item">
            <div className="menu-left">
              🔔 Notifications
            </div>

            <div>›</div>
          </div>

          <div className="menu-item">
            <div className="menu-left">
              🔒 Privacy & Security
            </div>

            <div>›</div>
          </div>

        </div>

      </div>

      {/* learning */}

      <div className="profile-section">

        <h3 className="section-title">
          Learning
        </h3>

        <div className="menu-card">

          <div className="menu-item">
            <div className="menu-left">
              ⬇ Downloads
            </div>

            <div>›</div>
          </div>

          <div className="menu-item">
            <div className="menu-left">
              🛡 Certificates
            </div>

            <div>›</div>
          </div>

          <div className="menu-item">
            <div className="menu-left">
              🔖 Saved Courses
            </div>

            <div>›</div>
          </div>

        </div>

      </div>

      {/* support */}

      <div className="profile-section">

        <h3 className="section-title">
          Support
        </h3>

        <div className="menu-card">

          <div className="menu-item">
            <div className="menu-left">
              ❓ Help Center
            </div>

            <div>›</div>
          </div>

          <div className="menu-item">
            <div className="menu-left">
              ℹ About LearnHub
            </div>

            <div>›</div>
          </div>

        </div>

      </div>

      <button className="logout-btn">
        ↪ Sign Out
      </button>

    </div>
  );
}