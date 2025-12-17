// Example Work Experience Data
// Update this with your actual work experience

export const workExperienceData = [
  {
    id: "1",
    company: "Tech Startup Inc",
    position: "Senior Full Stack Developer",
    startDate: "Jan 2023",
    description:
      "Led development of scalable web applications using modern technologies. Mentored junior developers and implemented best practices across the team.",
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "AWS",
    ],
    achievements: [
      "Reduced API response time by 60% through optimization",
      "Mentored 5 junior developers",
      "Implemented CI/CD pipeline reducing deployment time by 70%",
    ],
  },
  {
    id: "2",
    company: "Digital Agency Pro",
    position: "Full Stack Developer",
    startDate: "Jun 2021",
    endDate: "Dec 2022",
    description:
      "Developed full-stack solutions for various clients including e-commerce platforms and content management systems.",
    technologies: [
      "JavaScript",
      "React",
      "Express.js",
      "PostgreSQL",
      "Docker",
    ],
    achievements: [
      "Delivered 15+ projects on time and within budget",
      "Built reusable component library used across 5 projects",
      "Achieved 98% test coverage for critical modules",
    ],
  },
  {
    id: "3",
    company: "StartupXYZ",
    position: "Junior Developer",
    startDate: "Jan 2021",
    endDate: "May 2021",
    description:
      "Started career building web applications and learning modern development practices in an agile environment.",
    technologies: ["JavaScript", "React", "Firebase", "Tailwind CSS"],
    achievements: [
      "Contributed to 3 major feature releases",
      "Improved code quality with automated tests",
      "Learned agile development methodology",
    ],
  },
];

// Example Blog Post Data
export const exampleBlogPosts = [
  {
    id: "1",
    title: "Getting Started with Next.js 15",
    excerpt:
      "Learn how to build fast, modern web applications with Next.js 15 and React 19.",
    slug: "getting-started-nextjs-15",
    category: "Next.js",
    imageUrl: "/blog-images/nextjs.jpg",
    date: new Date("2024-12-01"),
    readTime: 8,
    views: 234,
    likes: 45,
    tags: ["nextjs", "react", "web-development"],
  },
  {
    id: "2",
    title: "Building Scalable APIs with Node.js",
    excerpt:
      "Best practices for architecting scalable backend APIs using Node.js and Express.",
    slug: "scalable-nodejs-apis",
    category: "Backend",
    imageUrl: "/blog-images/nodejs.jpg",
    date: new Date("2024-11-15"),
    readTime: 12,
    views: 189,
    likes: 32,
    tags: ["nodejs", "backend", "api"],
  },
];

// Example Case Study Data
export const exampleCaseStudy = {
  id: "1",
  title: "E-Commerce Platform Redesign",
  projectDescription:
    "Complete redesign and optimization of a legacy e-commerce platform handling 1M+ monthly users.",
  challenge:
    "The existing e-commerce platform was built with outdated technologies, experiencing slow load times, poor user experience, and scaling issues during peak traffic periods. The checkout process was cumbersome and resulted in 35% cart abandonment rate.",
  solution:
    "We migrated the entire platform to a modern tech stack using Next.js for the frontend and Node.js for the backend. Implemented server-side rendering for better SEO, optimized images using Cloudinary, and used MongoDB for flexible data management. The checkout flow was completely redesigned using a step-by-step approach with real-time validation.",
  results: [
    { metric: "Page Load Time", value: "-75%" },
    { metric: "Cart Abandonment", value: "-35% → -8%" },
    { metric: "Conversion Rate", value: "+42%" },
    { metric: "Traffic Capacity", value: "5x" },
  ],
  keyLearnings: [
    "Modern technologies significantly impact user experience and business metrics",
    "API optimization is as important as frontend performance",
    "User research and testing should guide redesign decisions",
    "Migration planning requires careful attention to data integrity",
  ],
  technologies: [
    "Next.js",
    "React",
    "Node.js",
    "MongoDB",
    "Stripe",
    "AWS",
    "TypeScript",
  ],
  timeline: "6 months",
  teamSize: "5 developers, 1 designer",
  role: "Lead Full Stack Developer",
  images: {
    screenshots: [
      "/case-study/ecommerce-before.jpg",
      "/case-study/ecommerce-after.jpg",
    ],
  },
  codeSnippets: [
    {
      title: "Optimized Product Query",
      language: "typescript",
      code: `// Using MongoDB aggregation pipeline for efficient querying
const products = await Product.aggregate([
  { $match: { category: categoryId, published: true } },
  { $lookup: { from: 'reviews', localField: '_id', foreignField: 'productId', as: 'reviews' } },
  { $addFields: { avgRating: { $avg: '$reviews.rating' } } },
  { $skip: (page - 1) * limit },
  { $limit: limit },
  { $project: { title: 1, price: 1, image: 1, avgRating: 1 } },
]);`,
    },
    {
      title: "Image Optimization",
      language: "typescript",
      code: `// Using Cloudinary for automatic image optimization
import { CldImage } from 'next-cloudinary';

export function OptimizedProductImage({ imageId }) {
  return (
    <CldImage
      src={imageId}
      width={300}
      height={300}
      crop="fill"
      quality="auto"
      format="auto"
      alt="Product"
    />
  );
}`,
    },
  ],
};
