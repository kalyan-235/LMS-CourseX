// src/data/courses.js

export const database = [

  {
    id:1,

    title:"MongoDB Database Course",
    author:"Ajay",
    instructor:{
      name:"Ajay",
      role:"Full Stack Developer",
      email:"ajay@gmail.com",
      students:"12k",
      rating:"4.8⭐",
      courses:"14",
      satisfaction:"97%",
      bio:"MongoDB and MERN Stack expert with 5 years experience."
    },


    totalHours:18,

    watchedHours:7,

    lastOpened:"2026-05-20",
  
    price:"₹999",

    oldprice:"₹1999",
    
    rating:"4.8⭐",

    category:"database",

    progress:65,

    image:"https://images.unsplash.com/photo-1544383835-bda2bc66a55d",

    video:"https://www.youtube.com/embed/ZQuQ-wHuPlg",

  pdfs:[
    {
      id:1,
      title:"MongoDB Notes PDF",
      file:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },

    {
      id:2,
      title:"MongoDB Interview Questions",
      file:"https://www.africau.edu/images/default/sample.pdf"
    }
  ],


    learn:[
      "MongoDB CRUD Operations",
      "Aggregation Pipeline",
      "Database Relationships",
      "Mongoose ODM",
      "Performance Optimization"
    ],

    description:"Learn MongoDB from basics to advanced.",

    prerequisites:"Basic JavaScript",

    curriculum:[

      {
        id:1,

        title:"MongoDB Basics",

        duration:"2h 20m",

        completed:"2/5 Done",

        lessons:[
          "Introduction",
          "MongoDB Setup",
          "CRUD Operations",
          "Mongo Queries",
          "Project",
        ]
      },

      {
        id:2,

        title:"Advanced MongoDB",

        duration:"3h 10m",

        completed:"1/4 Done",

        lessons:[
          "Aggregation",
          "Indexing",
          "Performance",
          "Deployment"
        ]
      }

    ],

    quiz:[
      {
        id:1,
        question:"MongoDB is a ?",
        options:[
          "Relational Database",
          "NoSQL Database",
          "Programming Language",
          "Framework"
        ],
        answer:"NoSQL Database"
      },
    
      {
        id:2,
        question:"Which operation inserts data?",
        options:[
          "find()",
          "insertOne()",
          "deleteOne()",
          "updateOne()"
        ],
        answer:"insertOne()"
      },
    
      {
        id:3,
        question:"MongoDB stores data in ?",
        options:[
          "Tables",
          "Rows",
          "Collections",
          "Functions"
        ],
        answer:"Collections"
      }
    ],

    reviews:[

      {
        id:1,
        name:"Tom",
        rating:5,
        review:"Best MongoDB course",
        date:"Mar 12, 2026"
      }

    ]

  },

  {
    id:2,

    title:"React Frontend Mastery",
    author:"Teja",
    instructor:{
      name:"Teja",
      email:"kiran@gmail.com",
      role:"Database Administrator",
      students:"8k",
      rating:"4.7",
      courses:"9",
      satisfaction:"95%",
      bio:"Expert in MySQL optimization and SQL performance tuning."
    },

    totalHours:22,

    watchedHours:22,

    lastOpened:"2026-05-19",

    price:"₹1499",

    oldPrice:"₹2499",
    
    rating:"4.9 ⭐",
    
    category:"frontend",
    // students:"24k",

    // duration:"22 Hours",
  
    progress:100,

    // lessonsCount:"56 Lessons",


    image:
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",

    video:"https://www.youtube.com/embed/zUx56TYIE24",

      pdfs:[
    {
      id:1,
      title:"MongoDB Notes PDF",
      file:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },

    {
      id:2,
      title:"MongoDB Interview Questions",
      file:"https://www.africau.edu/images/default/sample.pdf"
    }
  ],
    learn:[
      "MongoDB CRUD Operations",
      "Aggregation Pipeline",
      "Database Relationships",
      "Mongoose ODM",
      "Performance Optimization"
    ],

    description:
    "Learn React.js from scratch with hooks, routing, APIs, context API, projects, and advanced frontend architecture.",

    prerequisites:[
      "HTML",
      "CSS",
      "JavaScript Basics"
    ],

    // learning:[
    //   "React Components",
    //   "Hooks",
    //   "Routing",
    //   "Context API",
    //   "Project Building"
    // ],

    curriculum:[

      {
        id:1,

        title:"React Fundamentals",

        duration:"3h 20m",

        completed:"3/5 Done",

        lessons:[
          "Introduction",
          "JSX",
          "Components",
          "Props",
          "Events"
        ],
      },

      {
        id:2,

        title:"React Hooks",

        duration:"5h 30m",

        completed:"1/4 Done",

        lessons:[
          "useState",
          "useEffect",
          "useContext",
          "Custom Hooks"
        ],
      }

    ],
    quiz:[
      {
        id:1,
        question:"MongoDB is a ?",
        options:[
          "Relational Database",
          "NoSQL Database",
          "Programming Language",
          "Framework"
        ],
        answer:"NoSQL Database"
      },
    
      {
        id:2,
        question:"Which operation inserts data?",
        options:[
          "find()",
          "insertOne()",
          "deleteOne()",
          "updateOne()"
        ],
        answer:"insertOne()"
      },
    
      {
        id:3,
        question:"MongoDB stores data in ?",
        options:[
          "Tables",
          "Rows",
          "Collections",
          "Functions"
        ],
        answer:"Collections"
      }
    ],

    reviews:[

      {
        id:1,
        name:"David",
        rating:5,
        review:"Excellent React explanations and projects.",
        date:"Jan 18, 2026"
      }

    ]

  }

];