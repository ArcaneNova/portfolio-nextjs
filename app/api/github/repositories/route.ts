import { NextRequest, NextResponse } from "next/server"
import { connect } from "@/lib/db"
import ProjectModel from "@/lib/models/project"

interface Repository {
  _id: string
  name: string
  description: string
  language: string
  stars: number
  forks: number
  language_color: string
  url: string
  topics: string[]
}

export async function GET(req: NextRequest) {
  try {
    await connect()

    // Fetch projects with GitHub links as "repositories"
    const projects = await ProjectModel.find({
      github: { $exists: true, $ne: "" }, // Only projects with GitHub URLs
      featured: true, // Show featured projects only
    })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean()

    // Map projects to repository format
    const repositories: Repository[] = projects.map((project: any) => ({
      _id: project._id.toString(),
      name: project.name,
      description: project.description,
      language: project.technologies[0] || "TypeScript", // Use first technology as language
      stars: project.stars || Math.floor(Math.random() * 1000), // Placeholder if not set
      forks: project.forks || Math.floor(Math.random() * 100), // Placeholder if not set
      language_color: "from-ai-cyan to-ai-purple", // Default gradient
      url: project.github,
      topics: project.technologies || [],
    }))

    return NextResponse.json({
      repositories,
    })
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error)
    return NextResponse.json({
      repositories: [],
    })
  }
}
