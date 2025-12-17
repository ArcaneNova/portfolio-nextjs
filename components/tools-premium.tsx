"use client"

import React, { useState, useEffect } from "react"
import { motion } from "@/lib/framer-exports"

interface Tool {
  _id: string
  name: string
  category: string
  proficiency: number
  description?: string
}

const categories = ["All", "Frontend", "Backend", "Database", "AI/ML", "DevOps"]

const getProficiencyGradient = (prof: number) => {
  if (prof >= 90) return "from-ai-cyan to-ai-blue"
  if (prof >= 85) return "from-ai-purple to-ai-cyan"
  if (prof >= 80) return "from-ai-blue to-ai-purple"
  return "from-ai-purple to-ai-blue"
}

export default function ToolsPremium() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [tools, setTools] = useState<Tool[]>([])
  const [filteredTools, setFilteredTools] = useState<Tool[]>([])
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/tools")
        if (!response.ok) throw new Error("Failed to fetch tools")
        const data = await response.json()
        setTools(data.tools || [])
      } catch (error) {
        console.error("Error fetching tools:", error)
        setTools([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchTools()
  }, [])

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredTools(tools)
    } else {
      setFilteredTools(tools.filter(t => t.category === selectedCategory))
    }
  }, [selectedCategory, tools])

  return (
    <section className="py-24 px-4 relative bg-gradient-to-b from-ai-slate to-ai-zinc overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-ai-cyan/5 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-ai-purple/5 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, delay: 10 }}
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
            <h2 className="text-base font-semibold text-ai-cyan uppercase tracking-wider">Tech Stack</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
            Tools & <span className="bg-gradient-to-r from-ai-cyan to-ai-blue bg-clip-text text-transparent">Technologies</span>
          </h3>
          <p className="text-gray-300 text-lg">The tools and frameworks I use to build modern applications</p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-12 justify-center"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 border ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-ai-cyan to-ai-purple text-white border-transparent shadow-lg shadow-ai-cyan/30"
                  : "border-white/20 text-gray-300 hover:border-ai-cyan/50"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Tools Grid */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-400">Loading tools...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredId(tool._id)}
                onMouseLeave={() => setHoveredId(null)}
                whileHover={{ y: -4 }}
              >
                <div className="relative h-full p-5 rounded-lg border border-white/10 bg-gradient-to-br from-white/8 to-white/2 hover:border-ai-cyan/30 transition-all duration-300 group">
                  {/* Top accent bar */}
                  <motion.div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getProficiencyGradient(tool.proficiency)} rounded-t-lg`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  />

                  {/* First letter as icon */}
                  <motion.div
                    className="text-3xl font-bold mb-3 text-ai-cyan group-hover:scale-110 transition-transform"
                    animate={hoveredId === tool._id ? { rotate: 12 } : { rotate: 0 }}
                  >
                    {tool.name[0]}
                  </motion.div>

                  {/* Name and Category */}
                  <h4 className="text-lg font-bold text-white mb-1 group-hover:text-ai-cyan transition-colors">
                    {tool.name}
                  </h4>
                  <p className="text-xs text-gray-400 mb-4">{tool.category}</p>

                  {/* Proficiency bar */}
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${getProficiencyGradient(tool.proficiency)}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tool.proficiency}%` }}
                      transition={{ duration: 0.8, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    />
                  </div>

                  {/* Proficiency text */}
                  <motion.p
                    className="text-xs font-bold text-ai-cyan"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === tool._id ? 1 : 0.6 }}
                  >
                    {tool.proficiency}% Proficiency
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/10"
        >
          {[
            { label: "Total Tools", value: tools.length },
            { label: "Categories", value: categories.length - 1 },
            { label: "Expert Level", value: "12+" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-lg border border-white/10 bg-white/5"
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
