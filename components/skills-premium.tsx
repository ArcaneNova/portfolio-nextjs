"use client"

import React, { useState } from "react"
import { motion } from "@/lib/framer-exports"
import { BarChart3, Zap } from "lucide-react"

const skillMatrix = [
  { skill: "React", frontend: 95, backend: 0, ai_ml: 70, devops: 0, blockchain: 60 },
  { skill: "Next.js", frontend: 92, backend: 0, ai_ml: 0, devops: 0, blockchain: 0 },
  { skill: "TypeScript", frontend: 88, backend: 90, ai_ml: 80, devops: 70, blockchain: 75 },
  { skill: "Node.js", frontend: 0, backend: 93, ai_ml: 0, devops: 85, blockchain: 80 },
  { skill: "Python", frontend: 0, backend: 90, ai_ml: 92, devops: 78, blockchain: 60 },
  { skill: "PostgreSQL", frontend: 50, backend: 85, ai_ml: 60, devops: 75, blockchain: 0 },
  { skill: "MongoDB", frontend: 50, backend: 90, ai_ml: 60, devops: 70, blockchain: 0 },
  { skill: "OpenAI API", frontend: 60, backend: 0, ai_ml: 92, devops: 0, blockchain: 50 },
  { skill: "Docker", frontend: 60, backend: 85, ai_ml: 80, devops: 85, blockchain: 75 },
  { skill: "AWS", frontend: 60, backend: 87, ai_ml: 85, devops: 87, blockchain: 70 }
]

const categories = [
  { key: "frontend", label: "Frontend", color: "from-ai-cyan to-ai-blue" },
  { key: "backend", label: "Backend", color: "from-ai-purple to-ai-cyan" },
  { key: "ai_ml", label: "AI/ML", color: "from-ai-blue to-ai-purple" },
  { key: "devops", label: "DevOps", color: "from-ai-cyan to-ai-purple" },
  { key: "blockchain", label: "Blockchain", color: "from-ai-purple to-ai-blue" }
]

const getProficiencyColor = (value: number) => {
  if (value === 0) return "bg-slate-800/50 border-slate-700"
  if (value >= 90) return "bg-ai-cyan/80 border-ai-cyan/50 text-slate-900 font-bold"
  if (value >= 80) return "bg-ai-purple/60 border-ai-purple/50 text-white font-bold"
  if (value >= 70) return "bg-ai-blue/60 border-ai-blue/50 text-white"
  return "bg-slate-700/60 border-slate-600"
}

export default function SkillsPremium() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section className="py-24 px-4 relative bg-gradient-to-b from-ai-zinc to-ai-slate overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 bg-ai-cyan/5 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-ai-purple/5 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, delay: 5 }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-1 bg-gradient-to-b from-ai-cyan to-ai-purple rounded-full" />
            <h2 className="text-base font-semibold text-ai-cyan uppercase tracking-wider">Expertise</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
            Competency <span className="bg-gradient-to-r from-ai-cyan to-ai-blue bg-clip-text text-transparent">Matrix</span>
          </h3>
          <p className="text-gray-300 text-lg">Interactive skill visualization across technology domains</p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-12 justify-center"
        >
          <motion.button
            onClick={() => setSelectedCategory(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 border ${
              selectedCategory === null
                ? "bg-gradient-to-r from-ai-cyan to-ai-purple text-white border-transparent shadow-lg shadow-ai-cyan/30"
                : "border-white/20 text-gray-300 hover:border-ai-cyan/50 hover:text-white"
            }`}
          >
            All Skills
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 border ${
                selectedCategory === category.key
                  ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-lg`
                  : "border-white/20 text-gray-300 hover:border-ai-cyan/50 hover:text-white"
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Heatmap Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 overflow-x-auto pb-4"
        >
          <div className="min-w-max">
            {/* Header Row */}
            <div className="flex gap-3 mb-3">
              <div className="w-24" />
              {categories.map((category) => (
                <motion.div
                  key={category.key}
                  className="w-24 text-center"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className={`px-3 py-2 rounded-lg bg-gradient-to-r ${category.color} text-white font-bold text-xs`}>
                    {category.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skill Rows */}
            {skillMatrix.map((row, rowIndex) => (
              <motion.div
                key={row.skill}
                className="flex gap-3 mb-3 items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: rowIndex * 0.05 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredSkill(row.skill)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Skill Label */}
                <motion.div
                  className={`w-24 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                    hoveredSkill === row.skill
                      ? "bg-gradient-to-r from-ai-cyan to-ai-purple text-white shadow-lg"
                      : "bg-white/5 border border-white/10 text-white"
                  }`}
                  animate={hoveredSkill === row.skill ? { x: 4 } : { x: 0 }}
                >
                  {row.skill}
                </motion.div>

                {/* Proficiency Cells */}
                {categories.map((category, cellIndex) => {
                  const value = row[category.key as keyof typeof row] as number
                  const isHighlighted = selectedCategory === null || selectedCategory === category.key
                  const isHovered = hoveredSkill === row.skill

                  return (
                    <motion.div
                      key={`${row.skill}-${category.key}`}
                      className="w-24"
                      whileHover={{ scale: 1.08 }}
                      animate={{
                        opacity: isHighlighted ? 1 : 0.3,
                        scale: isHovered ? 1.05 : 1
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className={`h-12 rounded-lg border flex items-center justify-center transition-all ${getProficiencyColor(value)}`}
                        whileHover={{
                          boxShadow: value > 0 ? "0 0 20px rgba(6, 182, 212, 0.4)" : ""
                        }}
                      >
                        {value > 0 && (
                          <motion.span
                            className="text-sm font-bold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0.7 }}
                          >
                            {value}%
                          </motion.span>
                        )}
                      </motion.div>
                    </motion.div>
                  )
                })}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-6 justify-center mb-16 py-8 border-t border-white/10"
        >
          {[
            { range: "90-100%", color: "bg-ai-cyan", desc: "Expert" },
            { range: "80-89%", color: "bg-ai-purple/60", desc: "Advanced" },
            { range: "70-79%", color: "bg-ai-blue/60", desc: "Proficient" },
            { range: "60-69%", color: "bg-slate-700/60", desc: "Intermediate" },
            { range: "0%", color: "bg-slate-800/50", desc: "Not Specialized" }
          ].map((item, index) => (
            <motion.div
              key={item.range}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className={`w-8 h-8 rounded border border-white/20 ${item.color}`} />
              <div>
                <p className="text-sm font-semibold text-white">{item.desc}</p>
                <p className="text-xs text-gray-400">{item.range}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: "Total Skills", value: "30+" },
            { label: "Expert Level", value: "12+" },
            { label: "Technology Domains", value: "5" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/8 to-white/2 text-center"
            >
              <motion.p
                className="text-3xl font-black bg-gradient-to-r from-ai-cyan to-ai-purple bg-clip-text text-transparent mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
