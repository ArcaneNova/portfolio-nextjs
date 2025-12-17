"use client"

import { useState, useEffect } from "react"
import { motion } from "@/lib/framer-exports"

interface Tool {
  _id: string
  name: string
  category: string
  proficiency: number
  description: string
}

interface ToolsResponse {
  tools: Tool[]
}

export default function ToolsSection() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [tools, setTools] = useState<Tool[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/tools")

        if (!response.ok) {
          throw new Error("Failed to fetch tools")
        }

        const data: ToolsResponse = await response.json()
        setTools(data.tools || [])
        setError(null)
      } catch (err) {
        console.error("Error fetching tools:", err)
        setError("Failed to load tools")
        setTools([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchTools()
  }, [])

  const categories = Array.from(
    new Set(tools.map((t) => t.category))
  ).sort()

  const filteredTools =
    selectedCategory === "all"
      ? tools
      : tools.filter((t) => t.category === selectedCategory)

  return (
    <section className="py-20 px-6 sm:px-12 bg-gradient-to-b from-ai-zinc to-ai-slate">
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
              Tools & Technologies
            </span>
          </h2>
          <p className="text-gray-400/70">Technologies I work with at an expert level</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex justify-center gap-2 mb-12 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {["all", ...categories].map((cat) => {
            const uniqueKey = typeof cat === 'string' ? cat : `cat-${cat}`
            return (
              <button
                key={uniqueKey}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg transition-all capitalize ${
                  selectedCategory === cat
                    ? "bg-ai-cyan text-ai-zinc font-medium"
                    : "bg-ai-slate/50 text-gray-300 border border-ai-cyan/10 hover:border-ai-cyan/30"
                }`}
              >
                {cat === "all" ? "All Tools" : cat}
              </button>
            )
          })}
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          {isLoading ? (
            <div className="col-span-full text-center py-12 text-gray-400">Loading tools...</div>
          ) : error ? (
            <div className="col-span-full text-center py-12 text-red-400">{error}</div>
          ) : filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => (
            <motion.div
              key={tool.name}
              className="group bg-ai-slate/50 border border-ai-cyan/10 rounded-lg p-5 hover:border-ai-cyan/30 transition-all"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
              viewport={{ once: true }}
            >
              {/* Tool Name */}
              <h3 className="text-base font-semibold text-white mb-1 group-hover:text-ai-cyan transition-colors">
                {tool.name}
              </h3>

              {/* Description */}
              <p className="text-xs text-gray-400/60 mb-4 line-clamp-2">
                {tool.description}
              </p>

              {/* Proficiency Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500/70">Proficiency</span>
                  <span className="text-xs font-medium text-ai-cyan">{tool.proficiency}%</span>
                </div>
                <div className="h-1.5 bg-ai-slate/70 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-ai-cyan to-ai-purple rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tool.proficiency}%` }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>

              {/* Category Badge */}
              <div className="mt-4 pt-4 border-t border-ai-cyan/10">
                <span className="text-xs bg-ai-cyan/10 text-ai-cyan px-2 py-1 rounded capitalize">
                  {tool.category}
                </span>
              </div>
            </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400">No tools found</div>
          )}
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Tools Mastered", value: tools.length },
            { label: "Categories", value: categories.length },
            { label: "Avg Proficiency", value: tools.length > 0 ? Math.round(tools.reduce((a, t) => a + t.proficiency, 0) / tools.length) + "%" : "0%" },
          ].map((stat, i) => (
            <div key={i} className="bg-ai-slate/50 border border-ai-cyan/10 rounded-lg p-6 text-center">
              <p className="text-3xl font-bold text-ai-cyan mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400/70">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
