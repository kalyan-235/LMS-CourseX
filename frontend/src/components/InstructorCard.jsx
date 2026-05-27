export default function InstructorCard({
  name,
  email,
  role,
  students,
  rating,
  courses,
  satisfaction,
  bio,
}) {
  return (
    <div className="instcard">
      <div className="insthead">
        <div className="instavatar">
          {name.charAt(0)}
        </div>

        <div>
          <div className="instname">
            {name}
          </div>

          <div className="insttitle">
            {email}
          </div>
          <div className="insttitle">
            {role}
          </div>
        </div>
      </div>

      <div className="inststats">
        <div className="iss">
          <div className="issv">
            {rating}
          </div>

          <div className="issl">
            Rating
          </div>
        </div>
        <div className="iss">
          <div className="issv">
            {students}
          </div>

          <div className="issl">
            Students
          </div>
        </div>
        <div className="iss">
          <div className="issv">
            {courses}
          </div>

          <div className="issl">
            Courses
          </div>
        </div>

        <div className="iss">
          <div className="issv">
            {satisfaction}
          </div>

          <div className="issl">
            Satisfaction
          </div>
        </div>
      </div>

      <div className="instbio">
        <h3 className="ov-title">About the Instructor</h3>
        <p>{bio}</p>
      </div>
    </div>
  );
}