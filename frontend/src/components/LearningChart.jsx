import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function LearningChart() {

  const weeklyData = [

    {
      day:"Mon",
      hours:2,
    },

    {
      day:"Tue",
      hours:1,
    },

    {
      day:"Wed",
      hours:3,
    },

    {
      day:"Thu",
      hours:2,
    },

    {
      day:"Fri",
      hours:4,
    },

    {
      day:"Sat",
      hours:1,
    },

    {
      day:"Sun",
      hours:5,
    },

  ];

  return (

    <div className="chart-card">

      <h2 className="chart-title">
        Weekly Learning Activity
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <BarChart data={weeklyData}>

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="hours"
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );
}