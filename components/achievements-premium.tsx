"use client"

import React, { useState } from "react"
import { motion } from "@/lib/framer-exports"
import { Trophy, Zap, Target, Code, Star, Award } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "50+ Projects Built",
    subtitle: "Technical Excellence",
    description: "Shipped and shipped full-stack projects across multiple domains",
    type: "Technical",
    icon: Trophy,
    date: "2024",
    gradient: "from-ai-cyan to-ai-blue",
    metrics: ["50+", "Projects", "Shipped"]
  },
  {
    id: 2,
    title: "100K+ Users Impacted",
    subtitle: "Product Launch Achievement",
    description: "Built products and solutions that reached and served 100K+ users globally",
    type: "Product Launch",
    icon: Zap,
    date: "2024",
    gradient: "from-ai-purple to-ai-blue",
    metrics: ["100K+", "Users", "Global"]
  },
  {
    id: 3,
    title: "5 SaaS Products",
    subtitle: "Entrepreneurial",
    description: "Founded and shipped 5 production SaaS products",
    type: "Innovation",
    icon: Code,
    date: "2023-2024",
    gradient: "from-ai-blue to-ai-cyan",
    metrics: ["5", "SaaS", "Products"]
  },
  {
    id: 4,
    title: "AI/ML Specialization",
    subtitle: "Research & Learning",
    description: "Deep dive into machine learning, LLMs, and AI engineering",
    type: "Research",
    icon: Target,
    date: "2024",
    gradient: "from-ai-cyan to-ai-purple",
    metrics: ["Expert", "AI/ML", "Knowledge"]
  },
  {
    id: 5,
    title: "Full Stack Expertise",
    subtitle: "Technical Mastery",
    description: "Mastered frontend, backend, DevOps, and system design across the stack",
    type: "Technical",
    icon: Star,
    date: "2023-2024",
    gradient: "from-ai-purple to-ai-blue",
    metrics: ["Full", "Stack", "Master"]
  },
  {
    id: 6,
    title: "Blockchain Development",
    subtitle: "Web3 Innovation",
    description: "Developed smart contracts and decentralized applications",
    type: "Innovation",
    icon: Award,
    date: "2023",
    gradient: "from-ai-blue to-ai-cyan",
    metrics: ["Blockchain", "Smart", "Contracts"]
  }
]

const types = ["All", ...new Set(achievements.map(a => a.type))]

export default function AchievementsPremium() {
  const [selectedType, setSelectedType] = useState("All")
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null)

  const filteredAchievements =
    selectedType === "All"
      ? achievements
      : achievements.filter(a => a.type === selectedType)

  return (
    <section className="py-24 px-4 relative bg-gradient-to-b from-ai-slate via-ai-zinc to-ai-slate overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-ai-cyan/5 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-ai-purple/5 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
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
            <h2 className="text-base font-semibold text-ai-cyan uppercase tracking-wider">Recognition</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
            Achievements <span className="bg-gradient-to-r from-ai-cyan to-ai-blue bg-clip-text text-transparent">Dashboard</span>
          </h3>
          <p className="text-gray-300 text-lg">Notable accomplishments and impact metrics</p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-12 justify-center"
        >
          {types.map((type) => (
            <motion.button
              key={type}
              onClick={() => setSelectedType(type)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 border ${
                selectedType === type
                  ? "bg-gradient-to-r from-ai-cyan to-ai-purple text-white border-transparent shadow-lg shadow-ai-cyan/30"
                  : "border-white/20 text-gray-300 hover:border-ai-cyan/50 hover:text-white"
              }`}
            >
              {type}
            </motion.button>
          ))}
        </motion.div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredAchievements.map((achievement, index) => {
            const Icon = achievement.icon
            const isSelected = selectedAchievement === achievement.id

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                onClick={() => setSelectedAchievement(isSelected ? null : achievement.id)}
                whileHover={{ y: -8 }}
                className="cursor-pointer group"
              >
                <div
                  className={`relative h-full p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/8 to-white/2 hover:border-ai-cyan/30 transition-all duration-300 overflow-hidden ${
                    isSelected ? "ring-2 ring-ai-cyan" : ""
                  }`}
                >
                  {/* Animated top bar */}
                  <motion.div
                    className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${achievement.gradient}`}
                    initial={{ width: 0 }}
                    animate={{ width: isSelected ? "100%" : "40%" }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Icon */}
                  <motion.div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${achievement.gradient} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    animate={isSelected ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>

                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-lg font-bold text-white group-hover:text-ai-cyan transition-colors">
                        {achievement.title}
                      </h4>
                      <span className="text-xs text-gray-400">{achievement.date}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{achievement.subtitle}</p>
                    <p className="text-sm text-gray-300 leading-relaxed">{achievement.description}</p>
                  </div>

                  {/* Metrics */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: isSelected ? 1 : 0, height: isSelected ? "auto" : 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {achievement.metrics.map((metric, i) => (
                        <div key={i}>
                          <p className="font-bold text-ai-cyan text-sm">{metric}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Type badge */}
                  <div className="mt-4 inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 group-hover:border-ai-cyan/30">
                    <span className="text-xs font-semibold text-gray-300">{achievement.type}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 border-t border-white/10"
        >
          {[
            { label: "Total Achievements", value: achievements.length },
            { label: "Categories", value: types.length - 1 },
            { label: "Years Active", value: "2+" },
            { label: "Global Reach", value: "100K+" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.p
                className="text-3xl font-black bg-gradient-to-r from-ai-cyan to-ai-purple bg-clip-text text-transparent mb-1"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
