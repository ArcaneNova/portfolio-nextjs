"use client"

import React, { useState } from "react"
import { motion } from "@/lib/framer-exports"
import { ChevronDown, ChevronUp } from "lucide-react"

// Skill heatmap data
const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", proficiency: 95 },
      { name: "TypeScript", proficiency: 90 },
      { name: "Tailwind", proficiency: 95 },
      { name: "Next.js", proficiency: 92 },
      { name: "Vue.js", proficiency: 70 }
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", proficiency: 92 },
      { name: "Python", proficiency: 88 },
      { name: "PostgreSQL", proficiency: 85 },
      { name: "MongoDB", proficiency: 88 },
      { name: "REST APIs", proficiency: 94 }
    ]
  },
  {
    name: "AI/ML",
    skills: [
      { name: "LLMs", proficiency: 92 },
      { name: "RAG Systems", proficiency: 88 },
      { name: "PyTorch", proficiency: 80 },
      { name: "TensorFlow", proficiency: 82 },
      { name: "NLP", proficiency: 85 }
    ]
  },
  {
    name: "DevOps",
    skills: [
      { name: "Docker", proficiency: 85 },
      { name: "AWS", proficiency: 80 },
      { name: "CI/CD", proficiency: 88 },
      { name: "Kubernetes", proficiency: 75 },
      { name: "Monitoring", proficiency: 78 }
    ]
  }
]

// Color mapping for heatmap
const getProficiencyColor = (proficiency: number) => {
  if (proficiency >= 90) return "bg-ai-cyan text-slate-950"
  if (proficiency >= 85) return "bg-ai-purple/70 text-white"
  if (proficiency >= 80) return "bg-ai-blue/70 text-white"
  if (proficiency >= 75) return "bg-slate-600 text-white"
  return "bg-slate-700 text-white"
}

export default function AboutSectionPremium() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Frontend")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section className="py-24 px-4 relative bg-gradient-to-b from-ai-zinc to-ai-slate">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-ai-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-ai-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-1 bg-gradient-to-b from-ai-cyan to-ai-purple rounded-full" />
            <h2 className="text-base font-semibold text-ai-cyan uppercase tracking-wider">About Me</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
            Engineer Profile <span className="bg-gradient-to-r from-ai-cyan to-ai-blue bg-clip-text text-transparent">Matrix</span>
          </h3>
          <p className="text-gray-300 text-lg max-w-2xl">
            Full-stack engineer specializing in AI/ML solutions, scalable systems, and product architecture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24">
              <div className="rounded-lg border border-white/10 bg-gradient-to-br from-white/8 to-white/2 p-6">
                <div className="aspect-square mb-6 rounded-lg overflow-hidden bg-gradient-to-br from-ai-cyan/20 to-ai-blue/20 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-ai-cyan/10 via-ai-purple/10 to-ai-blue/10 flex items-center justify-center text-ai-cyan/50 text-5xl font-black">
                    AN
                  </div>
                </div>

                {/* Bio Stats */}
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Experience</p>
                    <p className="text-xl font-bold text-white">5+ Years</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Focus Area</p>
                    <p className="text-white">AI/ML & Full Stack</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Specialization</p>
                    <p className="text-white">SaaS, Blockchain, ML Systems</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skill Heatmap */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="space-y-4">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="border border-white/10 rounded-lg overflow-hidden bg-white/5 hover:border-ai-cyan/30 transition-all duration-300"
                >
                  {/* Category Header */}
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === category.name ? null : category.name)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-ai-cyan to-ai-purple group-hover:w-3 group-hover:h-3 transition-all" />
                      <h4 className="text-lg font-bold text-white">{category.name}</h4>
                      <span className="text-xs text-gray-400">({category.skills.length} skills)</span>
                    </div>
                    {expandedCategory === category.name ? (
                      <ChevronUp className="w-5 h-5 text-ai-cyan" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {/* Skills Grid */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedCategory === category.name ? "auto" : 0,
                      opacity: expandedCategory === category.name ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 border-t border-white/5">
                      <div className="grid grid-cols-2 gap-3">
                        {category.skills.map((skill) => (
                          <motion.div
                            key={skill.name}
                            onMouseEnter={() => setHoveredSkill(skill.name)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            whileHover={{ scale: 1.05 }}
                            className="relative group"
                          >
                            <div
                              className={`p-3 rounded-lg border border-white/10 transition-all duration-300 ${
                                hoveredSkill === skill.name
                                  ? getProficiencyColor(skill.proficiency)
                                  : "bg-white/5"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-semibold">{skill.name}</span>
                                <span className="text-xs opacity-75">{skill.proficiency}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-ai-cyan to-ai-purple"
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.proficiency}%` }}
                                  transition={{ duration: 0.8, delay: 0.1 }}
                                  viewport={{ once: true }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Key Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { title: "AI/ML Expertise", desc: "LLMs, RAG systems, PyTorch, NLP" },
            { title: "Full Stack", desc: "React, Node.js, PostgreSQL, AWS" },
            { title: "System Design", desc: "Scalable architecture, SaaS, Blockchain" }
          ].map((strength, index) => (
            <motion.div
              key={strength.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/8 to-white/2 hover:border-ai-cyan/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ai-cyan to-ai-purple mb-4 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                {index + 1}
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{strength.title}</h4>
              <p className="text-sm text-gray-300">{strength.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
