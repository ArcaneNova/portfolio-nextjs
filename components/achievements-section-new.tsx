"use client"

import { useState } from "react"
import { motion } from "@/lib/framer-exports"
import { Trophy, Award, Brain, Rocket } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  type: "award" | "product" | "research" | "technical"
  impact?: string
}

const achievements: Achievement[] = [
  {
    id: "1",
    title: "50+ Projects Built",
    description: "Shipped and shipped full-stack projects across multiple domains",
    date: "2024",
    type: "technical",
    impact: "Consistent shipping",
  },
  {
    id: "2",
    title: "100K+ Users Impacted",
    description: "Built products and solutions that reached and served 100K+ users globally",
    date: "2024",
    type: "product",
    impact: "Global reach",
  },
  {
    id: "3",
    title: "5 SaaS Products",
    description: "Founded and shipped 5 production SaaS products",
    date: "2023-2024",
    type: "product",
    impact: "Entrepreneurial track record",
  },
  {
    id: "4",
    title: "AI/ML Specialization",
    description: "Deep dive into machine learning, LLMs, and AI engineering",
    date: "2024",
    type: "research",
    impact: "Technical expertise",
  },
  {
    id: "5",
    title: "Full Stack Mastery",
    description: "Expert-level proficiency across frontend, backend, database, and DevOps",
    date: "2023",
    type: "technical",
    impact: "Diverse skillset",
  },
  {
    id: "6",
    title: "Open Source Contributions",
    description: "Active contributions to open-source projects and community",
    date: "2022-2024",
    type: "technical",
    impact: "Community involvement",
  },
]

const typeConfig = {
  award: { icon: Trophy, color: "from-yellow-500 to-orange-500", label: "Award" },
  product: { icon: Rocket, color: "from-ai-cyan to-ai-blue", label: "Product" },
  research: { icon: Brain, color: "from-ai-purple to-ai-cyan", label: "Research" },
  technical: { icon: Award, color: "from-ai-blue to-ai-purple", label: "Technical" },
}

export default function AchievementsSection() {
  const [selectedType, setSelectedType] = useState<Achievement["type"] | "all">("all")

  const filteredAchievements =
    selectedType === "all"
      ? achievements
      : achievements.filter((a) => a.type === selectedType)

  return (
    <section className="py-20 px-6 sm:px-12 bg-gradient-to-b from-ai-slate to-ai-zinc">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-ai-cyan via-ai-purple to-ai-blue bg-clip-text text-transparent">
              Achievements & Impact
            </span>
          </h2>
          <p className="text-gray-400/70">Milestones and recognitions from my journey</p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex justify-center gap-2 mb-12 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {["all", "award", "product", "research", "technical"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type as any)}
              className={`px-4 py-2 rounded-lg transition-all capitalize ${
                selectedType === type
                  ? "bg-ai-cyan text-ai-zinc font-medium"
                  : "bg-ai-slate/50 text-gray-300 border border-ai-cyan/10 hover:border-ai-cyan/30"
              }`}
            >
              {type === "all" ? "All" : type}
            </button>
          ))}
        </motion.div>

        {/* Achievements Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          {filteredAchievements.map((achievement, index) => {
            const config = typeConfig[achievement.type]
            const IconComponent = config.icon

            return (
              <motion.div
                key={achievement.id}
                className="group relative bg-ai-slate/50 border border-ai-cyan/10 rounded-lg p-6 hover:border-ai-cyan/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${config.color} rounded-t-lg`} />

                {/* Icon */}
                <div className="mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center text-white`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-ai-cyan transition-colors">
                  {achievement.title}
                </h3>

                <p className="text-sm text-gray-400/70 mb-4 leading-relaxed">
                  {achievement.description}
                </p>

                {/* Metadata */}
                <div className="flex items-center justify-between pt-4 border-t border-ai-cyan/10">
                  <span className="text-xs text-gray-500/70">{achievement.date}</span>
                  {achievement.impact && (
                    <span className="text-xs bg-ai-cyan/10 text-ai-cyan px-2 py-1 rounded">
                      {achievement.impact}
                    </span>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Empty state */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-12 text-gray-400/70">
            No achievements found in this category
          </div>
        )}
      </div>
    </section>
  )
}
