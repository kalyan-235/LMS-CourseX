import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Course from "./models/Course.js";

const MONGO_URL = process.env.MONGO_URL;

const courses = [
  // ─────────────────────────────────────────────
  // 1. Full Stack Web Development (MERN)
  // ─────────────────────────────────────────────
  {
    title: "Full Stack Web Development with MERN",
    author: "Harish Kumar",
    category: "Web Development",
    description:
      "Master the complete MERN stack — MongoDB, Express.js, React, and Node.js — to build production-ready full stack web applications from scratch. This course covers REST APIs, JWT authentication, deployment on Vercel & Render, and real-world project building.",
    image:
      "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800&h=500&fit=crop&crop=center",
    video: "https://www.youtube.com/embed/7CqJlxBYj-M",
    price: "1299",
    oldPrice: "3999",
    rating: "4.9⭐",
    totalHours: 42,
    instructor: {
      name: "Harish Kumar",
      role: "Senior Full Stack Engineer @ Google",
      email: "harish@coursex.in",
      bio: "10+ years building scalable web apps. Ex-Google, Ex-Flipkart. Taught 80,000+ students worldwide.",
    },
    learn: [
      "Build complete MERN stack web applications from scratch",
      "Design and implement RESTful APIs with Express.js & Node.js",
      "Create dynamic UIs with React hooks and context API",
      "Integrate MongoDB with Mongoose ODM",
      "Implement JWT-based authentication and authorization",
      "Deploy frontend on Vercel and backend on Render",
      "Handle file uploads with Multer and Cloudinary",
      "Build real-time features using Socket.io",
    ],
    prerequisites: [
      "Basic knowledge of HTML, CSS and JavaScript",
      "Familiarity with any programming language",
      "A computer with internet access",
    ],
    pdfs: [
      { title: "MERN Stack Cheatsheet", file: "" },
      { title: "React Hooks Reference Guide", file: "" },
      { title: "MongoDB Query Cheatsheet", file: "" },
    ],
    quiz: [
      {
        question: "What does MERN stand for?",
        options: [
          "MongoDB, Express, React, Node",
          "MySQL, Express, Redux, Node",
          "MongoDB, Ember, React, Nginx",
          "MySQL, Electron, React, Node",
        ],
        answer: "MongoDB, Express, React, Node",
      },
      {
        question: "Which hook manages local state in React?",
        options: ["useEffect", "useContext", "useState", "useReducer"],
        answer: "useState",
      },
      {
        question: "What is the default port for a Node.js/Express app?",
        options: ["3000", "8080", "5000", "4000"],
        answer: "3000",
      },
      {
        question: "Which HTTP method is used to update a resource partially?",
        options: ["PUT", "POST", "PATCH", "DELETE"],
        answer: "PATCH",
      },
      {
        question: "Which Mongoose method finds a document by its ID?",
        options: ["findOne()", "findById()", "find()", "findByIdAndUpdate()"],
        answer: "findById()",
      },
    ],
    reviews: [
      { name: "Priya S.", rating: 5, review: "Best MERN course out there. Harish explains everything clearly!" },
      { name: "Rahul V.", rating: 5, review: "Completed in 3 weeks and already got an internship. 🙌" },
      { name: "Anita N.", rating: 4, review: "Very detailed and practical. Loved the project-based approach." },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. Python for Data Science & Machine Learning
  // ─────────────────────────────────────────────
  {
    title: "Python for Data Science & Machine Learning",
    author: "Dr. Sneha Reddy",
    category: "Data Science",
    description:
      "A comprehensive journey from Python basics to advanced machine learning algorithms. Learn NumPy, Pandas, Matplotlib, Scikit-learn, and build real ML models including regression, classification, clustering, and neural networks using real-world datasets.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&crop=center",
    video: "https://www.youtube.com/embed/ua-CiDNNj30",
    price: "1499",
    oldPrice: "4499",
    rating: "4.9⭐",
    totalHours: 48,
    instructor: {
      name: "Dr. Sneha Reddy",
      role: "Data Scientist @ Microsoft Research",
      email: "sneha@coursex.in",
      bio: "PhD in Computer Science with 8 years in data science and AI research. Published 15+ research papers.",
    },
    learn: [
      "Master Python programming from beginner to advanced level",
      "Data manipulation with NumPy and Pandas",
      "Data visualization with Matplotlib and Seaborn",
      "Build and evaluate ML models with Scikit-learn",
      "Understand regression, classification, and clustering algorithms",
      "Perform feature engineering and model optimization",
      "Introduction to neural networks with TensorFlow/Keras",
      "Work with real-world datasets (Kaggle projects included)",
    ],
    prerequisites: [
      "No prior programming experience needed",
      "Basic high school mathematics",
      "Willingness to learn and practice daily",
    ],
    pdfs: [
      { title: "Python Data Science Handbook", file: "" },
      { title: "Pandas Cheatsheet", file: "" },
      { title: "ML Algorithms Reference", file: "" },
    ],
    quiz: [
      {
        question: "Which library is primarily used for data manipulation in Python?",
        options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
        answer: "Pandas",
      },
      {
        question: "What does 'overfitting' mean in machine learning?",
        options: [
          "Model performs well on training but poorly on new data",
          "Model performs poorly on training data",
          "Model has too few parameters",
          "Model trains too slowly",
        ],
        answer: "Model performs well on training but poorly on new data",
      },
      {
        question: "Which algorithm is best suited for classification tasks?",
        options: ["Linear Regression", "K-Means", "Random Forest", "PCA"],
        answer: "Random Forest",
      },
      {
        question: "What is the purpose of train-test split?",
        options: [
          "To speed up training",
          "To evaluate model on unseen data",
          "To reduce dataset size",
          "To normalize features",
        ],
        answer: "To evaluate model on unseen data",
      },
      {
        question: "Which function is used to read a CSV file in Pandas?",
        options: ["pd.read_csv()", "pd.load_csv()", "pd.import_csv()", "pd.open_csv()"],
        answer: "pd.read_csv()",
      },
    ],
    reviews: [
      { name: "Kiran M.", rating: 5, review: "Dr. Sneha's teaching style is phenomenal. Complex concepts made simple." },
      { name: "Deepa L.", rating: 5, review: "Got my first data science job after this course. Forever grateful!" },
      { name: "Vijay T.", rating: 4, review: "Excellent content. Would love more deep learning topics." },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. React.js — The Complete Guide
  // ─────────────────────────────────────────────
  {
    title: "React.js — The Complete Developer Guide",
    author: "Aravind Sharma",
    category: "Frontend",
    description:
      "Master React.js from the ground up. This course covers functional components, hooks (useState, useEffect, useContext, useReducer), React Router v6, Redux Toolkit, performance optimization, and building production-level SPAs with best practices.",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop&crop=center",
    video: "https://www.youtube.com/embed/w7ejDZ8SWv8",
    price: "999",
    oldPrice: "2999",
    rating: "4.8⭐",
    totalHours: 36,
    instructor: {
      name: "Aravind Sharma",
      role: "Frontend Tech Lead @ Swiggy",
      email: "aravind@coursex.in",
      bio: "7 years of React experience. Built consumer apps with 10M+ users. Passionate about clean UI code.",
    },
    learn: [
      "Build modern React applications with hooks and functional components",
      "Master React Router v6 for client-side navigation",
      "Global state management with Redux Toolkit",
      "Component lifecycle and side effects with useEffect",
      "Context API for sharing state across components",
      "Performance optimization with React.memo and useMemo",
      "Fetch and display data from REST APIs",
      "Testing React components with Jest and React Testing Library",
    ],
    prerequisites: [
      "Good understanding of HTML, CSS",
      "JavaScript fundamentals (ES6+)",
      "Basic understanding of DOM manipulation",
    ],
    pdfs: [
      { title: "React Hooks Cheatsheet", file: "" },
      { title: "Redux Toolkit Quick Start", file: "" },
    ],
    quiz: [
      {
        question: "Which hook is used to perform side effects in React?",
        options: ["useState", "useEffect", "useContext", "useRef"],
        answer: "useEffect",
      },
      {
        question: "What does JSX stand for?",
        options: [
          "JavaScript XML",
          "Java Syntax Extension",
          "JavaScript Extension",
          "JSON XML",
        ],
        answer: "JavaScript XML",
      },
      {
        question: "How do you pass data from parent to child in React?",
        options: ["State", "Props", "Context", "Redux"],
        answer: "Props",
      },
      {
        question: "Which method prevents a component from re-rendering unnecessarily?",
        options: ["useCallback", "React.memo", "useMemo", "Both React.memo and useMemo"],
        answer: "Both React.memo and useMemo",
      },
      {
        question: "What is the virtual DOM?",
        options: [
          "A lightweight copy of the real DOM",
          "A database for DOM elements",
          "A CSS framework",
          "A React state manager",
        ],
        answer: "A lightweight copy of the real DOM",
      },
    ],
    reviews: [
      { name: "Sai K.", rating: 5, review: "Aravind explains React so intuitively. This course is gold!" },
      { name: "Nandini P.", rating: 5, review: "Finally understood Redux after watching this. Amazing!" },
      { name: "Ravi C.", rating: 4, review: "Very structured and easy to follow. Highly recommend." },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. Node.js & Express.js Backend Development
  // ─────────────────────────────────────────────
  {
    title: "Node.js & Express.js Backend Development",
    author: "Vikram Nair",
    category: "Backend",
    description:
      "Build robust, scalable backend systems using Node.js and Express.js. Learn REST API design, middleware, error handling, authentication with JWT, file uploads, email sending, rate limiting, and deploy your APIs to production on Railway and Render.",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=500&fit=crop&crop=center",
    video: "https://www.youtube.com/embed/Oe421EPjeBE",
    price: "1099",
    oldPrice: "3299",
    rating: "4.8⭐",
    totalHours: 32,
    instructor: {
      name: "Vikram Nair",
      role: "Backend Engineer @ Amazon",
      email: "vikram@coursex.in",
      bio: "8 years building high-traffic APIs. Specializes in microservices, REST, and cloud deployments.",
    },
    learn: [
      "Build RESTful APIs with Node.js and Express.js",
      "Understand the Node.js event loop and async programming",
      "Middleware, routing, and error handling in Express",
      "JWT authentication and role-based authorization",
      "File uploads with Multer and cloud storage",
      "Send emails with Nodemailer",
      "Rate limiting, CORS, and security best practices",
      "Deploy Node.js apps to Render and Railway",
    ],
    prerequisites: [
      "JavaScript fundamentals (ES6+)",
      "Basic understanding of HTTP and REST",
      "Familiarity with any database",
    ],
    pdfs: [
      { title: "Express.js Quick Reference", file: "" },
      { title: "REST API Design Best Practices", file: "" },
    ],
    quiz: [
      {
        question: "What is the purpose of middleware in Express.js?",
        options: [
          "To style HTML pages",
          "To process requests before they reach route handlers",
          "To connect to databases only",
          "To serve static files only",
        ],
        answer: "To process requests before they reach route handlers",
      },
      {
        question: "Which method is used to parse JSON request bodies in Express?",
        options: [
          "app.use(express.text())",
          "app.use(express.json())",
          "app.use(bodyParser.raw())",
          "app.use(express.urlencoded())",
        ],
        answer: "app.use(express.json())",
      },
      {
        question: "What does JWT stand for?",
        options: [
          "JavaScript Web Token",
          "JSON Web Token",
          "Java Web Toolkit",
          "JSON With Token",
        ],
        answer: "JSON Web Token",
      },
      {
        question: "Which Node.js module is used to work with file paths?",
        options: ["fs", "path", "os", "http"],
        answer: "path",
      },
      {
        question: "What is CORS?",
        options: [
          "A database protocol",
          "Cross-Origin Resource Sharing",
          "Content Object Resource System",
          "Cross-Origin Routing System",
        ],
        answer: "Cross-Origin Resource Sharing",
      },
    ],
    reviews: [
      { name: "Anil R.", rating: 5, review: "Vikram covers everything from basics to advanced. Perfect course!" },
      { name: "Pooja S.", rating: 4, review: "Very practical. I built 3 APIs by the end of the course." },
      { name: "Suresh M.", rating: 5, review: "Best backend course I've taken. Clean code, clean explanations." },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. JavaScript — From Zero to Expert
  // ─────────────────────────────────────────────
  {
    title: "JavaScript — From Zero to Expert (ES6+)",
    author: "Meera Krishnan",
    category: "Programming",
    description:
      "The most comprehensive JavaScript course on the platform. Start from absolute basics and progress to advanced concepts like closures, prototypes, async/await, Promises, the event loop, design patterns, and modern ES6-ES2024 features with real projects.",
    image:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=500&fit=crop&crop=center",
    video: "https://www.youtube.com/embed/PkZNo7MFNFg",
    price: "799",
    oldPrice: "2499",
    rating: "4.9⭐",
    totalHours: 52,
    instructor: {
      name: "Meera Krishnan",
      role: "JavaScript Expert & Tech Educator",
      email: "meera@coursex.in",
      bio: "Author of 'Modern JavaScript' book. 12 years of JavaScript development. YouTube channel with 500K+ subscribers.",
    },
    learn: [
      "JavaScript fundamentals: variables, functions, loops, arrays, objects",
      "DOM manipulation and event handling",
      "ES6+ features: arrow functions, destructuring, spread/rest, modules",
      "Asynchronous JavaScript: callbacks, Promises, async/await",
      "Deep dive into closures, scope, and the prototype chain",
      "Error handling and debugging techniques",
      "Working with APIs using Fetch",
      "JavaScript design patterns for scalable code",
    ],
    prerequisites: [
      "Basic knowledge of HTML and CSS",
      "No programming experience required",
      "Curiosity and willingness to practice",
    ],
    pdfs: [
      { title: "JavaScript ES6+ Cheatsheet", file: "" },
      { title: "Async JavaScript Guide", file: "" },
      { title: "JS Design Patterns Reference", file: "" },
    ],
    quiz: [
      {
        question: "What is the difference between 'let' and 'var'?",
        options: [
          "let is block-scoped, var is function-scoped",
          "var is block-scoped, let is function-scoped",
          "They are identical",
          "let cannot be reassigned",
        ],
        answer: "let is block-scoped, var is function-scoped",
      },
      {
        question: "What does the spread operator (...) do?",
        options: [
          "Copies all elements of an iterable",
          "Creates a new empty array",
          "Merges two objects with priority",
          "Deletes object properties",
        ],
        answer: "Copies all elements of an iterable",
      },
      {
        question: "What is a closure in JavaScript?",
        options: [
          "A way to close a browser window",
          "A function that remembers its lexical scope even when executed outside",
          "A method to close event listeners",
          "A CSS class toggle method",
        ],
        answer: "A function that remembers its lexical scope even when executed outside",
      },
      {
        question: "What does 'async/await' simplify?",
        options: [
          "DOM manipulation",
          "Working with Promises",
          "CSS animations",
          "Array iteration",
        ],
        answer: "Working with Promises",
      },
      {
        question: "Which method converts a JSON string to a JavaScript object?",
        options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.toObject()"],
        answer: "JSON.parse()",
      },
    ],
    reviews: [
      { name: "Arjun B.", rating: 5, review: "Meera is the best JS teacher I've ever learned from. Period." },
      { name: "Lakshmi D.", rating: 5, review: "52 hours of pure gold. Every concept is crystal clear." },
      { name: "Mohan G.", rating: 5, review: "Finally understand closures and async! This course changed everything." },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. UI/UX Design with Figma
  // ─────────────────────────────────────────────
  {
    title: "UI/UX Design Masterclass with Figma",
    author: "Kavya Menon",
    category: "Design",
    description:
      "Learn professional UI/UX design from scratch using Figma. This course covers design thinking, wireframing, prototyping, design systems, color theory, typography, accessibility, and how to hand off designs to developers. Build a portfolio with 5 real projects.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop&crop=center",
    video: "https://www.youtube.com/embed/FTFaQWZBqQ8",
    price: "1199",
    oldPrice: "3499",
    rating: "4.8⭐",
    totalHours: 30,
    instructor: {
      name: "Kavya Menon",
      role: "Lead UX Designer @ Razorpay",
      email: "kavya@coursex.in",
      bio: "6 years designing fintech products. Speaker at UX Conf 2023. Specializes in design systems and accessibility.",
    },
    learn: [
      "Master Figma tools, shortcuts, and advanced features",
      "Apply design thinking and user-centered design principles",
      "Create wireframes, mockups, and interactive prototypes",
      "Build scalable design systems and component libraries",
      "Understand color theory, typography, and visual hierarchy",
      "Design for accessibility (WCAG standards)",
      "Conduct user research and usability testing",
      "Developer handoff with Figma Inspect and Zeplin",
    ],
    prerequisites: [
      "No design experience required",
      "A computer with Figma installed (free)",
      "Interest in creating beautiful and usable products",
    ],
    pdfs: [
      { title: "Figma Shortcuts Cheatsheet", file: "" },
      { title: "Color Theory Guide", file: "" },
      { title: "UX Research Methods", file: "" },
    ],
    quiz: [
      {
        question: "What is the primary purpose of wireframing in design?",
        options: [
          "To add final colors and typography",
          "To create a low-fidelity layout structure",
          "To write HTML code",
          "To test the final product",
        ],
        answer: "To create a low-fidelity layout structure",
      },
      {
        question: "What does UX stand for?",
        options: ["User Execution", "User Experience", "Universal Extension", "User Exchange"],
        answer: "User Experience",
      },
      {
        question: "Which Figma feature allows you to reuse design elements across files?",
        options: ["Frames", "Components", "Groups", "Layers"],
        answer: "Components",
      },
      {
        question: "What is the 60-30-10 rule in design?",
        options: [
          "A rule for font sizing",
          "A color proportion rule (dominant, secondary, accent)",
          "A spacing system",
          "A layout grid rule",
        ],
        answer: "A color proportion rule (dominant, secondary, accent)",
      },
      {
        question: "What is 'affordance' in UX design?",
        options: [
          "The cost of designing a product",
          "A visual cue that indicates how an element can be used",
          "The time to complete a design",
          "The number of user tests required",
        ],
        answer: "A visual cue that indicates how an element can be used",
      },
    ],
    reviews: [
      { name: "Tanvi B.", rating: 5, review: "Kavya's eye for detail is incredible. Learned more in this course than in 2 years!" },
      { name: "Rishi P.", rating: 5, review: "Landed a junior UI job after building my portfolio from this course." },
      { name: "Neha S.", rating: 4, review: "Great balance of theory and practical. The Figma projects are top-notch." },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. DevOps & Docker for Developers
  // ─────────────────────────────────────────────
  {
    title: "DevOps & Docker for Developers",
    author: "Rajesh Patel",
    category: "DevOps",
    description:
      "A hands-on DevOps course covering Docker, Docker Compose, Kubernetes basics, CI/CD pipelines with GitHub Actions, Linux essentials, Nginx reverse proxy, and cloud deployments on AWS EC2. Build a complete deployment pipeline for a full-stack application.",
    image:
      "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=500&fit=crop&crop=center",
    video: "https://www.youtube.com/embed/fqMOX6JJhGo",
    price: "1399",
    oldPrice: "4199",
    rating: "4.7⭐",
    totalHours: 38,
    instructor: {
      name: "Rajesh Patel",
      role: "DevOps Lead @ Infosys",
      email: "rajesh@coursex.in",
      bio: "10 years in DevOps and cloud engineering. AWS Certified Solutions Architect. Kubernetes and Docker trainer.",
    },
    learn: [
      "Understand DevOps culture and CI/CD principles",
      "Containerize applications with Docker and Dockerfile",
      "Manage multi-container apps with Docker Compose",
      "Linux command line essentials for developers",
      "Set up CI/CD pipelines with GitHub Actions",
      "Deploy applications to AWS EC2 with Nginx",
      "Introduction to Kubernetes pods, deployments, and services",
      "Monitor applications with logs and health checks",
    ],
    prerequisites: [
      "Basic command line knowledge",
      "Experience with at least one web framework",
      "A GitHub account",
    ],
    pdfs: [
      { title: "Docker Commands Cheatsheet", file: "" },
      { title: "GitHub Actions Workflow Guide", file: "" },
    ],
    quiz: [
      {
        question: "What is a Docker container?",
        options: [
          "A virtual machine",
          "A lightweight isolated environment for running applications",
          "A cloud storage service",
          "A type of database",
        ],
        answer: "A lightweight isolated environment for running applications",
      },
      {
        question: "What file is used to define a Docker image?",
        options: ["docker-compose.yml", "Dockerfile", ".dockerignore", "docker.config"],
        answer: "Dockerfile",
      },
      {
        question: "What does CI/CD stand for?",
        options: [
          "Code Integration / Code Deployment",
          "Continuous Integration / Continuous Deployment",
          "Container Image / Container Deployment",
          "Central Infrastructure / Central DevOps",
        ],
        answer: "Continuous Integration / Continuous Deployment",
      },
      {
        question: "Which command starts all services defined in docker-compose.yml?",
        options: [
          "docker start all",
          "docker-compose up",
          "docker run compose",
          "docker init",
        ],
        answer: "docker-compose up",
      },
      {
        question: "What is Kubernetes used for?",
        options: [
          "Writing backend code",
          "Orchestrating and managing containers at scale",
          "Designing UI components",
          "Storing application logs",
        ],
        answer: "Orchestrating and managing containers at scale",
      },
    ],
    reviews: [
      { name: "Ganesh T.", rating: 5, review: "Most practical DevOps course I've done. Got my Docker cert too!" },
      { name: "Shruti A.", rating: 4, review: "Excellent content. Kubernetes section could be expanded though." },
      { name: "Naveen K.", rating: 5, review: "My team now uses Docker Compose daily thanks to this course." },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. AWS Cloud Practitioner + Solutions Architect
  // ─────────────────────────────────────────────
  {
    title: "AWS Cloud — Practitioner to Solutions Architect",
    author: "Suresh Iyer",
    category: "Cloud",
    description:
      "Prepare for AWS Cloud Practitioner and Solutions Architect exams while building real cloud projects. Covers EC2, S3, RDS, Lambda, IAM, VPC, CloudFront, Route53, and best practices for building highly available, cost-effective cloud architectures.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop&crop=center",
    video: "https://www.youtube.com/embed/k1RI5locZE4",
    price: "1599",
    oldPrice: "4999",
    rating: "4.8⭐",
    totalHours: 45,
    instructor: {
      name: "Suresh Iyer",
      role: "AWS Solutions Architect @ HCL",
      email: "suresh@coursex.in",
      bio: "AWS Certified Solutions Architect Professional. 12 years cloud architecture experience. Helped 200+ companies migrate to AWS.",
    },
    learn: [
      "Navigate and understand the AWS Management Console",
      "Launch and manage EC2 instances and load balancers",
      "Store and manage files with S3, Glacier, and EFS",
      "Build serverless applications with AWS Lambda and API Gateway",
      "Configure IAM roles, policies, and security groups",
      "Set up relational and NoSQL databases with RDS and DynamoDB",
      "Configure VPC, subnets, and network security",
      "Prepare for AWS Cloud Practitioner and SAA-C03 exam",
    ],
    prerequisites: [
      "Basic understanding of networking concepts",
      "Familiarity with web applications",
      "An AWS free-tier account",
    ],
    pdfs: [
      { title: "AWS Services Cheatsheet", file: "" },
      { title: "SAA-C03 Exam Tips", file: "" },
      { title: "AWS Well-Architected Framework Summary", file: "" },
    ],
    quiz: [
      {
        question: "Which AWS service is used for object storage?",
        options: ["EC2", "RDS", "S3", "Lambda"],
        answer: "S3",
      },
      {
        question: "What is an IAM role?",
        options: [
          "A database permission system",
          "A set of permissions assigned to AWS resources",
          "A virtual machine type",
          "A networking component",
        ],
        answer: "A set of permissions assigned to AWS resources",
      },
      {
        question: "What is AWS Lambda?",
        options: [
          "A container service",
          "A serverless compute service that runs code on demand",
          "A DNS management service",
          "A cloud storage service",
        ],
        answer: "A serverless compute service that runs code on demand",
      },
      {
        question: "Which service provides a managed relational database?",
        options: ["S3", "Lambda", "RDS", "EC2"],
        answer: "RDS",
      },
      {
        question: "What does VPC stand for?",
        options: [
          "Virtual Private Cloud",
          "Virtual Public Connection",
          "Volume Processing Center",
          "Verified Private Component",
        ],
        answer: "Virtual Private Cloud",
      },
    ],
    reviews: [
      { name: "Mahesh R.", rating: 5, review: "Cleared my AWS SAA exam on first attempt with this course!" },
      { name: "Divya C.", rating: 5, review: "Suresh makes AWS simple. Best cloud course in India." },
      { name: "Kartik N.", rating: 4, review: "Great depth and coverage. Practice tests are very helpful." },
    ],
  },

  // ─────────────────────────────────────────────
  // 9. Django REST Framework — Backend with Python
  // ─────────────────────────────────────────────
  {
    title: "Django REST Framework — Python Backend",
    author: "Pradeep Varma",
    category: "Backend",
    description:
      "Build powerful REST APIs with Django and Django REST Framework. Learn models, serializers, viewsets, authentication (JWT, Token), permissions, filtering, pagination, and deploy your Django API to production with PostgreSQL on Heroku or Railway.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=500&fit=crop&crop=center",
    video: "https://www.youtube.com/embed/TmsD8QOptDY",
    price: "1099",
    oldPrice: "3299",
    rating: "4.7⭐",
    totalHours: 34,
    instructor: {
      name: "Pradeep Varma",
      role: "Python Backend Lead @ Zepto",
      email: "pradeep@coursex.in",
      bio: "9 years building Python/Django backends for high-scale e-commerce. Open source contributor to DRF.",
    },
    learn: [
      "Build REST APIs from scratch using Django and DRF",
      "Design database models with Django ORM",
      "Create serializers for data validation and transformation",
      "Use ViewSets and Routers for rapid API development",
      "Implement JWT and Token-based authentication",
      "Add filtering, searching, and pagination to APIs",
      "Write unit and integration tests for Django APIs",
      "Deploy Django with PostgreSQL to Railway",
    ],
    prerequisites: [
      "Python fundamentals (functions, classes, modules)",
      "Basic understanding of HTTP and REST",
      "Familiarity with databases and SQL",
    ],
    pdfs: [
      { title: "Django ORM Cheatsheet", file: "" },
      { title: "DRF Serializers Quick Guide", file: "" },
    ],
    quiz: [
      {
        question: "What does DRF stand for?",
        options: [
          "Django Resource Framework",
          "Django REST Framework",
          "Dynamic Request Flow",
          "Django Routing Framework",
        ],
        answer: "Django REST Framework",
      },
      {
        question: "Which class is used to convert Django model instances to JSON?",
        options: ["ViewSet", "Serializer", "Model", "Router"],
        answer: "Serializer",
      },
      {
        question: "What command creates a new Django project?",
        options: [
          "django new project",
          "django-admin startproject",
          "python manage.py create",
          "django init project",
        ],
        answer: "django-admin startproject",
      },
      {
        question: "Which Django feature handles URL routing?",
        options: ["models.py", "views.py", "urls.py", "settings.py"],
        answer: "urls.py",
      },
      {
        question: "What is a Django migration?",
        options: [
          "Moving the project to another server",
          "A way to propagate model changes to the database schema",
          "Copying data between databases",
          "Changing the Django version",
        ],
        answer: "A way to propagate model changes to the database schema",
      },
    ],
    reviews: [
      { name: "Ishaan J.", rating: 5, review: "Best Django course available. Pradeep's real-world projects are amazing." },
      { name: "Anjali V.", rating: 4, review: "Thorough and well-paced. Deployment section was super helpful." },
      { name: "Rohan S.", rating: 5, review: "Switched from Node to Django after this. No regrets at all!" },
    ],
  },

  // ─────────────────────────────────────────────
  // 10. Android App Development with Kotlin
  // ─────────────────────────────────────────────
  {
    title: "Android App Development with Kotlin",
    author: "Vivek Anand",
    category: "Mobile",
    description:
      "Build modern Android applications using Kotlin and Jetpack Compose. Learn the Android SDK, MVVM architecture, Room database, Retrofit for API calls, Navigation component, Material 3 design, and publish your app on the Google Play Store.",
    image:
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&h=500&fit=crop&crop=center",
    video: "https://www.youtube.com/embed/EExSSotojVI",
    price: "1299",
    oldPrice: "3999",
    rating: "4.7⭐",
    totalHours: 40,
    instructor: {
      name: "Vivek Anand",
      role: "Android Engineer @ PhonePe",
      email: "vivek@coursex.in",
      bio: "8 years building Android apps with 50M+ downloads combined. Google Developer Expert (GDE) for Android.",
    },
    learn: [
      "Build Android apps with Kotlin and Jetpack Compose",
      "Understand Android app architecture with MVVM",
      "Store data locally with Room database",
      "Fetch data from REST APIs using Retrofit and Coroutines",
      "Navigate between screens with Navigation Component",
      "Apply Material 3 design principles",
      "Handle permissions, notifications, and background tasks",
      "Publish your app on Google Play Store",
    ],
    prerequisites: [
      "Basic object-oriented programming knowledge",
      "A PC/Mac with Android Studio installed",
      "Android device or emulator",
    ],
    pdfs: [
      { title: "Kotlin Syntax Cheatsheet", file: "" },
      { title: "Jetpack Compose Quick Reference", file: "" },
      { title: "Android Architecture Guide", file: "" },
    ],
    quiz: [
      {
        question: "What is Jetpack Compose?",
        options: [
          "An Android testing framework",
          "A modern toolkit for building Android UI declaratively",
          "A database library for Android",
          "An Android networking library",
        ],
        answer: "A modern toolkit for building Android UI declaratively",
      },
      {
        question: "What architecture pattern is recommended by Google for Android?",
        options: ["MVC", "MVP", "MVVM", "MVI"],
        answer: "MVVM",
      },
      {
        question: "Which library is used for network requests in Android?",
        options: ["Volley", "Retrofit", "OkHttp", "All of the above"],
        answer: "Retrofit",
      },
      {
        question: "What is a Coroutine in Kotlin?",
        options: [
          "A type of Android activity",
          "A concurrency design pattern for asynchronous code",
          "A UI component",
          "A database query builder",
        ],
        answer: "A concurrency design pattern for asynchronous code",
      },
      {
        question: "What does Room provide in Android development?",
        options: [
          "Network caching",
          "An abstraction layer over SQLite for local data storage",
          "UI component library",
          "Push notifications",
        ],
        answer: "An abstraction layer over SQLite for local data storage",
      },
    ],
    reviews: [
      { name: "Sandeep K.", rating: 5, review: "Published my first app after completing this course. Thanks Vivek!" },
      { name: "Priyanka M.", rating: 4, review: "Jetpack Compose section is the best I've seen anywhere." },
      { name: "Ajay B.", rating: 5, review: "Very hands-on and practical. Great for beginners and intermediate devs." },
    ],
  },

  // ─────────────────────────────────────────────
  // 11. Cybersecurity Fundamentals & Ethical Hacking
  // ─────────────────────────────────────────────
  {
    title: "Cybersecurity Fundamentals & Ethical Hacking",
    author: "Aditya Rao",
    category: "Cybersecurity",
    description:
      "Learn ethical hacking, penetration testing, and cybersecurity fundamentals. Covers network security, Linux security tools, OWASP Top 10 vulnerabilities, Kali Linux, Metasploit, Burp Suite, cryptography basics, and how to defend applications against attacks.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop&crop=center",
    video: "https://www.youtube.com/embed/3Kq1MIfTWCE",
    price: "1499",
    oldPrice: "4499",
    rating: "4.8⭐",
    totalHours: 44,
    instructor: {
      name: "Aditya Rao",
      role: "Certified Ethical Hacker (CEH) & OSCP",
      email: "aditya@coursex.in",
      bio: "10 years in cybersecurity. Certified CEH, OSCP, and CISSP. Bug bounty hunter with $200K+ in rewards.",
    },
    learn: [
      "Understand core cybersecurity concepts and threat landscape",
      "Linux fundamentals for penetration testing",
      "Reconnaissance with Nmap, Shodan, and OSINT tools",
      "Exploit vulnerabilities with Metasploit Framework",
      "Web app testing with Burp Suite (OWASP Top 10)",
      "Password cracking and brute force techniques",
      "Network traffic analysis with Wireshark",
      "Cryptography basics: encryption, hashing, and SSL/TLS",
    ],
    prerequisites: [
      "Basic understanding of networking (TCP/IP, DNS, HTTP)",
      "Familiarity with Linux command line",
      "Ethical use commitment — for learning and defense only",
    ],
    pdfs: [
      { title: "OWASP Top 10 Cheatsheet", file: "" },
      { title: "Kali Linux Command Reference", file: "" },
      { title: "Network Security Fundamentals", file: "" },
    ],
    quiz: [
      {
        question: "What does SQL Injection exploit?",
        options: [
          "Weak passwords",
          "Unsanitized user input in database queries",
          "Outdated SSL certificates",
          "Open network ports",
        ],
        answer: "Unsanitized user input in database queries",
      },
      {
        question: "What is a man-in-the-middle (MITM) attack?",
        options: [
          "Flooding a server with requests",
          "Secretly intercepting communication between two parties",
          "Injecting malicious scripts into websites",
          "Cracking encrypted passwords",
        ],
        answer: "Secretly intercepting communication between two parties",
      },
      {
        question: "What is Kali Linux primarily used for?",
        options: [
          "Web development",
          "Penetration testing and ethical hacking",
          "Cloud computing",
          "Database management",
        ],
        answer: "Penetration testing and ethical hacking",
      },
      {
        question: "What does XSS stand for?",
        options: [
          "Cross-Site Scripting",
          "External Server Script",
          "Cross-System Security",
          "Extended Scripting Standard",
        ],
        answer: "Cross-Site Scripting",
      },
      {
        question: "What is the purpose of a firewall?",
        options: [
          "Speed up internet connection",
          "Monitor and control incoming/outgoing network traffic",
          "Encrypt hard drive data",
          "Manage user accounts",
        ],
        answer: "Monitor and control incoming/outgoing network traffic",
      },
    ],
    reviews: [
      { name: "Rohit S.", rating: 5, review: "Aditya is brilliant. This course got me my first bug bounty!" },
      { name: "Sneha P.", rating: 5, review: "Very well-structured. Goes from fundamentals to advanced smoothly." },
      { name: "Nikhil R.", rating: 4, review: "Great course. Would love a dedicated CTF challenge section." },
    ],
  },

  // ─────────────────────────────────────────────
  // 12. SQL & PostgreSQL for Developers
  // ─────────────────────────────────────────────
  {
    title: "SQL & PostgreSQL for Developers",
    author: "Sunita Krishnamurthy",
    category: "Database",
    description:
      "Master SQL and PostgreSQL for real-world backend development. Covers DDL/DML, complex JOINs, subqueries, window functions, indexes, transactions, stored procedures, query optimization, and integrating PostgreSQL with Node.js and Python applications.",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=500&fit=crop&crop=center",
    video: "https://www.youtube.com/embed/qw--VYLpxG4",
    price: "899",
    oldPrice: "2799",
    rating: "4.8⭐",
    totalHours: 28,
    instructor: {
      name: "Sunita Krishnamurthy",
      role: "Database Architect @ Paytm",
      email: "sunita@coursex.in",
      bio: "15 years as a database engineer and architect. Designed databases for 100M+ user applications. PostgreSQL Certified.",
    },
    learn: [
      "Write complex SQL queries from scratch",
      "Master all types of JOINs: INNER, LEFT, RIGHT, FULL, CROSS",
      "Use subqueries, CTEs, and window functions",
      "Design normalized database schemas",
      "Create and use indexes for query optimization",
      "Understand ACID transactions and isolation levels",
      "Write stored procedures, triggers, and views",
      "Integrate PostgreSQL with Node.js (pg) and Python (psycopg2)",
    ],
    prerequisites: [
      "Basic understanding of data and spreadsheets",
      "No prior SQL experience required",
      "PostgreSQL installed (free) or use any online SQL playground",
    ],
    pdfs: [
      { title: "SQL Cheatsheet — All Commands", file: "" },
      { title: "PostgreSQL vs MySQL Comparison", file: "" },
      { title: "Database Design Best Practices", file: "" },
    ],
    quiz: [
      {
        question: "Which SQL clause filters records after a GROUP BY?",
        options: ["WHERE", "FILTER", "HAVING", "ORDER BY"],
        answer: "HAVING",
      },
      {
        question: "What is a PRIMARY KEY?",
        options: [
          "The first column in a table",
          "A unique identifier for each row in a table",
          "A foreign table reference",
          "An index on all columns",
        ],
        answer: "A unique identifier for each row in a table",
      },
      {
        question: "What does a LEFT JOIN return?",
        options: [
          "Only matching rows from both tables",
          "All rows from the left table and matching rows from the right",
          "Only rows from the right table",
          "All rows from both tables",
        ],
        answer: "All rows from the left table and matching rows from the right",
      },
      {
        question: "What is the purpose of an index in a database?",
        options: [
          "To store backup data",
          "To speed up data retrieval operations",
          "To encrypt sensitive columns",
          "To create foreign key constraints",
        ],
        answer: "To speed up data retrieval operations",
      },
      {
        question: "What does ACID stand for in database transactions?",
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Access, Control, Integration, Data",
          "Aggregate, Combine, Index, Delete",
          "Atomic, Committed, Indexed, Durable",
        ],
        answer: "Atomicity, Consistency, Isolation, Durability",
      },
    ],
    reviews: [
      { name: "Vinay T.", rating: 5, review: "Window functions finally make sense to me! Sunita explains amazingly." },
      { name: "Meena B.", rating: 5, review: "Best SQL course I've taken. Covers everything you need for interviews too." },
      { name: "Ashok P.", rating: 4, review: "Practical and thorough. Used this knowledge in my first backend project." },
    ],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB Connected");

    // Remove existing courses
    const deleted = await Course.deleteMany({});
    console.log(`🗑️  Cleared ${deleted.deletedCount} existing courses`);

    // Insert new courses
    const inserted = await Course.insertMany(courses);
    console.log(`🎉 Successfully seeded ${inserted.length} courses:`);
    inserted.forEach((c, i) => console.log(`   ${i + 1}. ${c.title}`));

  } catch (err) {
    console.error("❌ Seed failed:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB Disconnected");
    process.exit(0);
  }
}

seed();
