import { NextResponse } from "next/server"
import { getCollection } from "@/lib/db"

// Sample data for seeding the database
const projects = [
  {
    title: "AI-Powered Content Generator",
    description: "A machine learning application that generates high-quality content based on user prompts.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Machine Learning", "Python", "React", "API"],
    featured: true,
    github: "https://github.com",
    demo: "https://demo.com",
    category: "Machine Learning",
    createdAt: new Date(),
  },
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution with payment processing and inventory management.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
    featured: true,
    github: "https://github.com",
    demo: "https://demo.com",
    category: "Web Development",
    createdAt: new Date(),
  },
  {
    title: "Task Management App",
    description: "A productivity application for managing tasks, projects, and team collaboration.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Firebase", "Redux", "Material UI"],
    featured: true,
    github: "https://github.com",
    demo: "https://demo.com",
    category: "Web Development",
    createdAt: new Date(),
  },
  {
    title: "Sentiment Analysis Tool",
    description: "A natural language processing tool that analyzes sentiment in text data.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Python", "NLP", "Flask", "React"],
    featured: false,
    github: "https://github.com",
    demo: "https://demo.com",
    category: "Machine Learning",
    createdAt: new Date(),
  },
  {
    title: "Fitness Tracking Mobile App",
    description: "A cross-platform mobile application for tracking workouts and fitness progress.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React Native", "Firebase", "Redux", "Health API"],
    featured: false,
    github: "https://github.com",
    demo: "https://demo.com",
    category: "App Development",
    createdAt: new Date(),
  },
  {
    title: "Real-time Chat Application",
    description: "A real-time messaging platform with end-to-end encryption and file sharing.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Socket.io", "Node.js", "MongoDB", "React"],
    featured: false,
    github: "https://github.com",
    demo: "https://demo.com",
    category: "Web Development",
    createdAt: new Date(),
  },
]

const challenges = [
  {
    title: "100 Days of DSA",
    description: "Mastering Data Structures and Algorithms one day at a time.",
    image: "/placeholder.svg?height=300&width=500",
    startDate: "2024-01-01",
    currentDay: 45,
    totalDays: 100,
    latestUpdate: {
      day: 45,
      topic: "Dynamic Programming",
      description: "Solved 5 problems on dynamic programming, focusing on the Knapsack problem and its variations.",
      date: "2024-02-14",
    },
    createdAt: new Date(),
  },
  {
    title: "30 Days of Web Components",
    description: "Building a new web component every day for 30 days.",
    image: "/placeholder.svg?height=300&width=500",
    startDate: "2024-03-01",
    currentDay: 15,
    totalDays: 30,
    latestUpdate: {
      day: 15,
      topic: "Custom Sliders",
      description: "Created a responsive, accessible range slider component with custom styling and touch support.",
      date: "2024-03-15",
    },
    createdAt: new Date(),
  },
]

const achievements = [
  {
    title: "Hackathon Winner",
    description: "First place in the National Coding Hackathon 2023",
    icon: "Trophy",
    createdAt: new Date(),
  },
  {
    title: "Research Publication",
    description: "Published a paper on machine learning algorithms in a prestigious journal",
    icon: "Award",
    createdAt: new Date(),
  },
  {
    title: "Open Source Recognition",
    description: "Recognized as a top contributor to several open source projects",
    icon: "Star",
    createdAt: new Date(),
  },
  {
    title: "Certification Excellence",
    description: "Achieved top scores in multiple professional certifications",
    icon: "Medal",
    createdAt: new Date(),
  },
]

const skillCategories = [
  {
    title: "Programming Languages",
    icon: "Code",
    skills: [
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Python", level: 85 },
      { name: "Java", level: 75 },
      { name: "C++", level: 70 },
    ],
    order: 1,
    createdAt: new Date(),
  },
  {
    title: "Frontend Development",
    icon: "Globe",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "HTML/CSS", level: 95 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Vue.js", level: 75 },
    ],
    order: 2,
    createdAt: new Date(),
  },
  {
    title: "Backend Development",
    icon: "Server",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 85 },
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "GraphQL", level: 75 },
    ],
    order: 3,
    createdAt: new Date(),
  },
  {
    title: "Machine Learning & AI",
    icon: "Brain",
    skills: [
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 80 },
      { name: "Scikit-learn", level: 85 },
      { name: "NLP", level: 75 },
      { name: "Computer Vision", level: 70 },
    ],
    order: 4,
    createdAt: new Date(),
  },
]

const tools = [
  { name: "VS Code", icon: "Code", color: "text-blue-500", order: 1, createdAt: new Date() },
  { name: "Git", icon: "GitBranch", color: "text-orange-500", order: 2, createdAt: new Date() },
  { name: "Docker", icon: "Box", color: "text-blue-400", order: 3, createdAt: new Date() },
  { name: "AWS", icon: "Cloud", color: "text-yellow-500", order: 4, createdAt: new Date() },
  { name: "GitHub", icon: "Github", color: "text-gray-500", order: 5, createdAt: new Date() },
  { name: "Kubernetes", icon: "Layers", color: "text-blue-600", order: 6, createdAt: new Date() },
  { name: "Figma", icon: "Figma", color: "text-purple-500", order: 7, createdAt: new Date() },
  { name: "Jupyter", icon: "Terminal", color: "text-orange-600", order: 8, createdAt: new Date() },
]

const codingStats = [
  {
    label: "Lines of Code",
    value: "500,000+",
    icon: "Code",
    color: "from-purple-500 to-blue-500",
    order: 1,
    createdAt: new Date(),
  },
  {
    label: "Total Projects",
    value: "75+",
    icon: "FileCode",
    color: "from-blue-500 to-cyan-500",
    order: 2,
    createdAt: new Date(),
  },
  {
    label: "GitHub Contributions",
    value: "2,500+",
    icon: "GitPullRequest",
    color: "from-green-500 to-emerald-500",
    order: 3,
    createdAt: new Date(),
  },
  {
    label: "Coding Awards",
    value: "12",
    icon: "Award",
    color: "from-yellow-500 to-orange-500",
    order: 4,
    createdAt: new Date(),
  },
]

const platformStats = [
  {
    platform: "GitHub",
    icon: "Github",
    stats: [
      { label: "Stars", value: "250+" },
      { label: "Repositories", value: "45" },
      { label: "Followers", value: "120" },
      { label: "Contributions", value: "2,500+" },
    ],
    order: 1,
    createdAt: new Date(),
  },
  {
    platform: "LeetCode",
    icon: "Code",
    stats: [
      { label: "Problems Solved", value: "450+" },
      { label: "Contest Rating", value: "1850" },
      { label: "Global Rank", value: "Top 5%" },
      { label: "Badges", value: "15" },
    ],
    order: 2,
    createdAt: new Date(),
  },
  {
    platform: "GeeksforGeeks",
    icon: "Award",
    stats: [
      { label: "Problems Solved", value: "350+" },
      { label: "Articles Published", value: "12" },
      { label: "Institution Rank", value: "#3" },
      { label: "Total Score", value: "2200" },
    ],
    order: 3,
    createdAt: new Date(),
  },
  {
    platform: "Codeforces",
    icon: "Trophy",
    stats: [
      { label: "Rating", value: "1750" },
      { label: "Rank", value: "Expert" },
      { label: "Contests", value: "35" },
      { label: "Problems Solved", value: "320+" },
    ],
    order: 4,
    createdAt: new Date(),
  },
]

export async function GET() {
  try {
    // Get collections
    const projectsCollection = await getCollection("projects")
    const challengesCollection = await getCollection("challenges")
    const achievementsCollection = await getCollection("achievements")
    const skillsCollection = await getCollection("skills")
    const toolsCollection = await getCollection("tools")
    const statsCollection = await getCollection("stats")
    const platformsCollection = await getCollection("platforms")

    // Clear existing data
    await projectsCollection.deleteMany({})
    await challengesCollection.deleteMany({})
    await achievementsCollection.deleteMany({})
    await skillsCollection.deleteMany({})
    await toolsCollection.deleteMany({})
    await statsCollection.deleteMany({})
    await platformsCollection.deleteMany({})

    // Insert new data
    await projectsCollection.insertMany(projects)
    await challengesCollection.insertMany(challenges)
    await achievementsCollection.insertMany(achievements)
    await skillsCollection.insertMany(skillCategories)
    await toolsCollection.insertMany(tools)
    await statsCollection.insertMany(codingStats)
    await platformsCollection.insertMany(platformStats)

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      counts: {
        projects: projects.length,
        challenges: challenges.length,
        achievements: achievements.length,
        skillCategories: skillCategories.length,
        tools: tools.length,
        codingStats: codingStats.length,
        platformStats: platformStats.length,
      },
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 })
  }
}
