import mongoose, { Schema } from "mongoose";

export interface Project {
  _id?: string
  title: string
  description: string
  image: string
  tags: string[]
  featured: boolean
  github: string
  demo: string
  category: string
  details?: string
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
    image: { type: String, required: true },
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
    github: { type: String, required: true },
    demo: { type: String, required: true },
    category: { type: String, required: true },
    details: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<Project>("Project", projectSchema);
