import mongoose, { Schema } from "mongoose";

interface ResumeTemplate {
  name: string;
  role: string;
  description: string;
  template: string; // template identifier
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ResumeSection {
  templateId: mongoose.Types.ObjectId;
  name: string; // e.g., "Work Experience", "Education", "Skills", etc.
  order: number;
  content: string;
  projectIds?: mongoose.Types.ObjectId[]; // Optional array of project IDs for Projects section
  skillIds?: mongoose.Types.ObjectId[]; // Optional array of skill IDs for Skills section
}

const resumeTemplateSchema = new Schema<ResumeTemplate>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String, required: true },
    template: { type: String, required: true, default: "standard" },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const resumeSectionSchema = new Schema<ResumeSection>(
  {
    templateId: { type: Schema.Types.ObjectId, ref: "ResumeTemplate", required: true },
    name: { type: String, required: true },
    order: { type: Number, required: true },
    content: { type: String, required: true },
    projectIds: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    skillIds: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  },
  { timestamps: true }
);

export const ResumeTemplate = mongoose.models.ResumeTemplate || mongoose.model<ResumeTemplate>("ResumeTemplate", resumeTemplateSchema);
export const ResumeSection = mongoose.models.ResumeSection || mongoose.model<ResumeSection>("ResumeSection", resumeSectionSchema); 