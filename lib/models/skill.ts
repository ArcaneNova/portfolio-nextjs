export interface Skill {
  name: string
  level: number
}

export interface SkillCategory {
  _id?: string
  title: string
  icon: string
  skills: Skill[]
  createdAt?: Date
  updatedAt?: Date
}

export interface SkillsResponse {
  skillCategories: SkillCategory[]
}
