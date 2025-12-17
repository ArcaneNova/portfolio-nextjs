"use client"

import { useState } from "react"
import { motion } from "@/lib/framer-exports"

interface Skill {
  name: string
  level: number
  category: string
}

const skills: Skill[] = [
  // Frontend (Cyan)
  { name: "React", level: 95, category: "frontend" },
  { name: "Next.js", level: 92, category: "frontend" },
  { name: "TypeScript", level: 88, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Framer Motion", level: 85, category: "frontend" },
  { name: "Figma", level: 80, category: "frontend" },

  // Backend (Purple)
  { name: "Node.js", level: 93, category: "backend" },
  { name: "Python", level: 90, category: "backend" },
  { name: "FastAPI", level: 87, category: "backend" },
  { name: "Express.js", level: 88, category: "backend" },
  { name: "GraphQL", level: 82, category: "backend" },
  { name: "REST APIs", level: 95, category: "backend" },

  // Database (Blue)
  { name: "MongoDB", level: 90, category: "database" },
  { name: "PostgreSQL", level: 85, category: "database" },
  { name: "Redis", level: 80, category: "database" },
  { name: "Supabase", level: 83, category: "database" },
  { name: "Prisma", level: 87, category: "database" },
  { name: "Firebase", level: 78, category: "database" },

  // AI/ML (Slate)
  { name: "OpenAI API", level: 92, category: "ai" },
  { name: "TensorFlow", level: 85, category: "ai" },
  { name: "LSTM Networks", level: 82, category: "ai" },
  { name: "Computer Vision", level: 80, category: "ai" },
  { name: "LangChain", level: 88, category: "ai" },
  { name: "Hugging Face", level: 83, category: "ai" },

  // DevOps (Zinc)
  { name: "AWS", level: 87, category: "devops" },
  { name: "Docker", level: 85, category: "devops" },
  { name: "Vercel", level: 92, category: "devops" },
  { name: "Git/GitHub", level: 95, category: "devops" },
  { name: "CI/CD", level: 80, category: "devops" },
  { name: "Linux", level: 83, category: "devops" },
]

const categoryConfig = {
  frontend: { label: "Frontend", color: "#06B6D4" },
  backend: { label: "Backend", color: "#A78BFA" },
  database: { label: "Database", color: "#3B82F6" },
  ai: { label: "AI/ML", color: "#1E293B" },
  devops: { label: "DevOps", color: "#09090B" },
}

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>
  const filteredSkills = selectedCategory
    ? skills.filter((s) => s.category === selectedCategory)
    : skills

  const getHeatmapColor = (level: number): string => {
    if (level >= 90) return "rgb(6, 182, 212)" // Cyan
    if (level >= 85) return "rgb(167, 139, 250)" // Purple
    if (level >= 80) return "rgb(59, 130, 246)" // Blue
    return "rgb(100, 116, 139)" // Slate
  }

  return (
    <section className="py-20 px-6 sm:px-12 bg-gradient-to-b from-ai-slate to-ai-zinc">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-ai-cyan via-ai-purple to-ai-blue bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-gray-400/70 text-lg max-w-2xl">
            A heatmap of my technical proficiency across key domains and technologies
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <motion.button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === null
                ? "bg-gradient-to-r from-ai-cyan to-ai-purple text-white"
                : "bg-ai-slate/40 text-gray-300 hover:bg-ai-slate/60 border border-ai-cyan/10"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Skills
          </motion.button>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-ai-cyan to-ai-purple text-white"
                  : "bg-ai-slate/40 text-gray-300 hover:bg-ai-slate/60 border border-ai-cyan/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {categoryConfig[cat].label}
            </motion.button>
          ))}
        </div>

        {/* Heatmap Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          {filteredSkills.map((skill, index) => {
            const color = getHeatmapColor(skill.level)
            const isHovered = hoveredSkill === skill.name

            return (
              <motion.div
                key={`${skill.name}-${index}`}
                className="relative group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.03,
                }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Background heatmap cell */}
                <div
                  className="absolute inset-0 rounded-lg opacity-20 transition-opacity"
                  style={{ backgroundColor: color }}
                />

                {/* Hover glow */}
                {isHovered && (
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      boxShadow: `0 0 20px ${color}`,
                      backgroundColor: color,
                      opacity: 0.1,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                  />
                )}

                {/* Card content */}
                <div className="relative p-3 rounded-lg border border-ai-cyan/20 hover:border-ai-cyan/50 transition-colors cursor-pointer bg-ai-cyan/5 hover:bg-ai-cyan/10">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-200 mb-1">
                      {skill.name}
                    </p>
                    <div className="h-1 bg-ai-slate/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.6, delay: index * 0.03 }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <p className="text-xs text-gray-400/70 mt-1">{skill.level}%</p>
                  </div>
                </div>

                {/* Tooltip */}
                <motion.div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-ai-slate/80 border border-ai-cyan/20 rounded-lg whitespace-nowrap text-xs text-gray-300 pointer-events-none"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {categoryConfig[skill.category as keyof typeof categoryConfig]?.label}
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Legend */}
        <motion.div
          className="mt-12 p-6 border border-ai-cyan/20 rounded-lg bg-ai-slate/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-sm font-semibold text-gray-300 mb-3">Proficiency Levels</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { range: "90-100%", color: "#06B6D4", label: "Expert" },
              { range: "85-89%", color: "#A78BFA", label: "Advanced" },
              { range: "80-84%", color: "#3B82F6", label: "Proficient" },
              { range: "<80%", color: "#647D8F", label: "Intermediate" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-400/70">
                  {item.label} ({item.range})
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
