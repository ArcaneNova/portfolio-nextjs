import mongoose, { Schema } from "mongoose";

export interface Project {
  _id?: string
  title: string
  description: string
  image?: string
  tags: string[]
  techStack?: string[]
  features?: string[]
  featured: boolean
  github: string
  demo: string
  category: string
  details?: string
  links?: {
    github?: string
    demo?: string
  }
  createdAt?: Date
  updatedAt?: Date
}

export interface ProjectsResponse {
  projects: Project[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

const projectSchema = new Schema<Project>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "/placeholder.svg?height=400&width=600" },
    tags: [{ type: String }],
    techStack: [{ type: String }],
    features: [{ type: String }],
    featured: { type: Boolean, default: false },
    github: { type: String, default: "" },
    demo: { type: String, default: "" },
    category: { type: String, required: true },
    details: { type: String },
    links: {
      github: { type: String },
      demo: { type: String }
    }
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<Project>("Project", projectSchema);
