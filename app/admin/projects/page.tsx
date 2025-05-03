import type { Project } from "@/lib/models/project"
import { connect } from "@/lib/db"
import ProjectModel from "@/lib/models/project"
import { ProjectsClient } from "@/components/admin/projects-client"

async function getProjects() {
  await connect()
  try {
    const projects = await ProjectModel.find({})
      .sort({ featured: -1, createdAt: -1 })
      .lean()
    
    return JSON.parse(JSON.stringify(projects)) as Project[]
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  
  // Pass data to client component
  return <ProjectsClient projects={projects} />
}
