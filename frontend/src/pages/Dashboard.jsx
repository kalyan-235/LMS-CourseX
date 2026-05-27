// // src/pages/Dashboard.jsx

// import { database } from "../data/courses";

// export default function Dashboard() {

//   const totalCourses = database.length;

//   const totalStudents = 12450;

//   const totalRevenue = "₹4.8L";

//   const completedCourses =
//     database.filter(
//       (course) => course.progress === 100
//     ).length;

//   const inProgress =
//     database.filter(
//       (course) => course.progress < 100
//     ).length;

//   return (

//     <div className="dashpage">

//       {/* HEADER */}

//       <div className="dashhead">

//         <div>

//           <h1>
//             Dashboard
//           </h1>

//           <p>
//             Welcome back 👋
//           </p>

//         </div>

//         <button className="dashbtn">
//           + Add Course
//         </button>

//       </div>

//       {/* STATS */}

//       <div className="dashstats">

//         <div className="dashcard">

//           <div className="dashicon blue">
//             🎓
//           </div>

//           <div>

//             <h2>
//               {totalCourses}
//             </h2>

//             <span>
//               Total Courses
//             </span>

//           </div>

//         </div>

//         <div className="dashcard">

//           <div className="dashicon purple">
//             👨‍🎓
//           </div>

//           <div>

//             <h2>
//               {totalStudents}
//             </h2>

//             <span>
//               Students
//             </span>

//           </div>

//         </div>

//         <div className="dashcard">

//           <div className="dashicon green">
//             💰
//           </div>

//           <div>

//             <h2>
//               {totalRevenue}
//             </h2>

//             <span>
//               Revenue
//             </span>

//           </div>

//         </div>

//         <div className="dashcard">

//           <div className="dashicon orange">
//             📚
//           </div>

//           <div>

//             <h2>
//               {inProgress}
//             </h2>

//             <span>
//               In Progress
//             </span>

//           </div>

//         </div>

//       </div>

//       {/* TABLE */}

//       <div className="dashtablebox">

//         <div className="tablehead">

//           <h2>
//             Recent Courses
//           </h2>

//         </div>

//         <table className="dashtable">

//           <thead>

//             <tr>

//               <th>
//                 Course
//               </th>

//               <th>
//                 Instructor
//               </th>

//               <th>
//                 Category
//               </th>

//               <th>
//                 Price
//               </th>

//               <th>
//                 Progress
//               </th>

//               <th>
//                 Status
//               </th>

//             </tr>

//           </thead>

//           <tbody>

//             {database.map((course) => (

//               <tr key={course.id}>

//                 <td className="coursedata">

//                   <img
//                     src={course.image}
//                     alt={course.title}
//                   />

//                   <span>
//                     {course.title}
//                   </span>

//                 </td>

//                 <td>
//                   {course.author}
//                 </td>

//                 <td>
//                   {course.category}
//                 </td>

//                 <td>
//                   {course.price}
//                 </td>

//                 <td>

//                   <div className="tbprogress">

//                     <div
//                       className="tbfill"
//                       style={{
//                         width: `${course.progress}%`,
//                       }}
//                     ></div>

//                   </div>

//                 </td>

//                 <td>

//                   <span
//                     className={
//                       course.progress === 100
//                         ? "done"
//                         : "progress"
//                     }
//                   >

//                     {course.progress === 100
//                       ? "Completed"
//                       : "Learning"}

//                   </span>

//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// }