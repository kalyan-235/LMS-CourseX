export default function AnalyticsCards() {

  const analytics = [

    {
      id:1,
      title:"Total Courses",
      value:"24",
      icon:"📚",
    },

    {
      id:2,
      title:"Students",
      value:"1,240",
      icon:"👨‍🎓",
    },

    {
      id:3,
      title:"Certificates",
      value:"320",
      icon:"🏆",
    },

    {
      id:4,
      title:"Revenue",
      value:"₹48,000",
      icon:"💰",
    },

  ];

  return (

    <div className="analytics-grid">

      {analytics.map((item) => (

        <div
          className="analytics-card"
          key={item.id}
        >

          <div className="analytics-icon">
            {item.icon}
          </div>

          <h2>
            {item.value}
          </h2>

          <p>
            {item.title}
          </p>

        </div>

      ))}

    </div>

  );
}