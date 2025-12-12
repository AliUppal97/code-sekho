export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  readingTime: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "shipping-enterprise-react",
    title: "Shipping Enterprise-Grade React Apps: A Pragmatic Guide",
    summary: "Architecture, performance, and DX tips for scalable React in 2025.",
    author: "CodeSekho Team",
    date: "2025-01-10",
    readingTime: "8 min read",
  },
  {
    slug: "interview-prep-playbook",
    title: "The 6-Week Interview Prep Playbook",
    summary: "A structured, outcome-focused plan for DSA, system design, and behaviorals.",
    author: "CodeSekho Mentors",
    date: "2024-12-18",
    readingTime: "10 min read",
  },
  {
    slug: "scaling-backend-node",
    title: "Scaling Node.js Backends: Patterns That Actually Work",
    summary: "From rate limits to observability: production patterns we teach in class.",
    author: "Guest: Sara Malik",
    date: "2024-11-22",
    readingTime: "7 min read",
  },
];
