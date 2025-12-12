export type Course = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  students: string;
  rating: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  discountPrice?: number;
  category: string;
  outcomes?: string[];
  syllabus?: { title: string; content: string }[];
  instructors?: { name: string; title: string; avatar?: string }[];
};

export const FEATURED_COURSES: Course[] = [
  {
    id: "1",
    title: "C Programming Beginner Course",
    description: "The Programming Fundamentals of video lecture",
    thumbnail: "/courses/c-programming.jpg",
    duration: "12 hours",
    students: "50K",
    rating: 4.8,
    level: "Beginner",
    price: 2999,
    discountPrice: 999,
    category: "Programming",
    outcomes: [
      "Master C syntax and core programming constructs",
      "Write memory-safe code and debug efficiently",
      "Build console apps and prep for embedded systems",
    ],
  },
  {
    id: "2",
    title: "Python for Data Science",
    description: "Master Python for data analysis and machine learning",
    thumbnail: "/courses/python-ds.jpg",
    duration: "20 hours",
    students: "35K",
    rating: 4.9,
    level: "Intermediate",
    price: 4999,
    discountPrice: 1999,
    category: "Data Science",
    outcomes: [
      "Analyze data with pandas and NumPy",
      "Build ML models with scikit-learn",
      "Deploy notebooks to production-ready pipelines",
    ],
  },
  {
    id: "3",
    title: "React.js Complete Guide",
    description: "Build modern web applications with React",
    thumbnail: "/courses/react.jpg",
    duration: "18 hours",
    students: "42K",
    rating: 4.7,
    level: "Intermediate",
    price: 3999,
    discountPrice: 1499,
    category: "Web Development",
    outcomes: [
      "Ship production-ready React SPAs",
      "Optimize performance with hooks and suspense",
      "Integrate APIs, routing, and state management",
    ],
  },
  {
    id: "4",
    title: "DSA Masterclass",
    description: "Data Structures & Algorithms for interviews",
    thumbnail: "/courses/dsa.jpg",
    duration: "30 hours",
    students: "28K",
    rating: 4.9,
    level: "Advanced",
    price: 5999,
    discountPrice: 2499,
    category: "Interview Prep",
    outcomes: [
      "Ace technical interviews with confidence",
      "Implement optimal solutions in code",
      "Master patterns across arrays, trees, graphs, DP",
    ],
  },
  {
    id: "5",
    title: "System Design",
    description: "Design scalable systems like a pro",
    thumbnail: "/courses/system-design.jpg",
    duration: "15 hours",
    students: "18K",
    rating: 4.8,
    level: "Advanced",
    price: 6999,
    discountPrice: 2999,
    category: "Interview Prep",
    outcomes: [
      "Design fault-tolerant distributed systems",
      "Communicate tradeoffs with diagrams and metrics",
      "Prepare for senior/lead interviews",
    ],
  },
  {
    id: "6",
    title: "Node.js Backend",
    description: "Build robust backend APIs with Node.js",
    thumbnail: "/courses/nodejs.jpg",
    duration: "16 hours",
    students: "22K",
    rating: 4.6,
    level: "Intermediate",
    price: 3999,
    discountPrice: 1499,
    category: "Web Development",
    outcomes: [
      "Design clean RESTful services",
      "Secure APIs with auth, rate limits, and logging",
      "Deploy with CI/CD best practices",
    ],
  },
];


