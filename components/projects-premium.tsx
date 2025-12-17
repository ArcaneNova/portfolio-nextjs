"use client"

import React, { useState, useEffect } from "react"
import { motion } from "@/lib/framer-exports"
import Link from "next/link"
import { Eye, Github, ArrowRight, Code2, TrendingUp } from "lucide-react"

interface Project {
  _id: string
  title: string
  description: string
  image?: string
  technologies: string[]
  category: string
  impact?: string
  link?: string
  github?: string
}

const categories = ["All", "AI/ML", "Full Stack", "Blockchain", "Mobile", "DevOps"]

const getCategoryGradient = (category: string) => {
  switch (category) {
    case "AI/ML":
      return "from-ai-purple to-ai-blue"
    case "Full Stack":
      return "from-ai-cyan to-ai-purple"
    case "Blockchain":
      return "from-ai-blue to-ai-cyan"
    case "Mobile":
      return "from-ai-cyan to-ai-blue"
    default:
      return "from-ai-purple to-ai-cyan"
  }
}

export default function ProjectsPremium() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/projects")
        if (!response.ok) throw new Error("Failed to fetch projects")
        const data = await response.json()
        setProjects(data.projects || [])
        if (data.projects?.length > 0) {
          setSelectedProject(data.projects[0]._id)
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
        setProjects([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(p => p.category === selectedCategory))
    }
  }, [selectedCategory, projects])

  return (
    <section className="py-24 px-4 relative bg-gradient-to-b from-ai-zinc to-ai-slate overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/3 right-0 w-96 h-96 bg-ai-cyan/5 rounded-full blur-3xl"
          animate={{ x: [0, 50, -30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-96 h-96 bg-ai-purple/5 rounded-full blur-3xl"
          animate={{ y: [0, 50, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, delay: 5 }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
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
            <h2 className="text-base font-semibold text-ai-cyan uppercase tracking-wider">Portfolio</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
            Case Study <span className="bg-gradient-to-r from-ai-cyan to-ai-blue bg-clip-text text-transparent">Showcase</span>
          </h3>
          <p className="text-gray-300 text-lg">Featured projects demonstrating technical excellence and impact</p>
        </motion.div>

        {/* Featured Project */}
        {!isLoading && projects.length > 0 && projects[0] && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-16 relative"
          >
            <div className="relative p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/2 overflow-hidden">
              {/* Accent bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ai-cyan via-ai-purple to-ai-blue"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Featured Image */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="aspect-video rounded-xl bg-gradient-to-br from-ai-cyan/20 to-ai-purple/20 border border-white/10 flex items-center justify-center"
                >
                  <Code2 className="w-24 h-24 text-ai-cyan/50" />
                </motion.div>

                {/* Featured Content */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-ai-cyan/20 to-ai-purple/20 border border-ai-cyan/30 mb-4">
                    <span className="text-xs font-bold text-ai-cyan">Featured Project</span>
                  </div>

                  <h4 className="text-3xl font-bold text-white mb-3">{projects[0].title}</h4>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">{projects[0].description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {projects[0].technologies.map(tech => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-gray-200 hover:border-ai-cyan/50 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    {projects[0].link && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                          href={projects[0].link}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-ai-cyan to-ai-blue text-white font-semibold hover:shadow-lg hover:shadow-ai-cyan/30 transition-all"
                        >
                          <Eye className="w-4 h-4" />
                          View Project
                        </Link>
                      </motion.div>
                    )}
                    {projects[0].github && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                          href={projects[0].github}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white font-semibold hover:border-ai-cyan/50 transition-all"
                        >
                          <Github className="w-4 h-4" />
                          View Code
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredProjects.slice(1).map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project._id)}
              whileHover={{ y: -4 }}
              className="cursor-pointer group"
            >
              <div className="h-full p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/8 to-white/2 hover:border-ai-cyan/30 transition-all">
                {/* Top accent */}
                <motion.div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getCategoryGradient(project.category)} rounded-t-lg`}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                />

                <div className="mb-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-3">
                    <span className="text-xs font-semibold text-gray-300">{project.category}</span>
                  </div>
                  <h5 className="text-lg font-bold text-white group-hover:text-ai-cyan transition-colors">{project.title}</h5>
                </div>

                <p className="text-sm text-gray-300 mb-4 line-clamp-2">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 2).map(tech => (
                    <span key={tech} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 2 && (
                    <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400">
                      +{project.technologies.length - 2}
                    </span>
                  )}
                </div>

                {project.impact && (
                  <div className="flex items-center gap-2 text-sm text-ai-cyan font-semibold pt-4 border-t border-white/10">
                    <TrendingUp className="w-4 h-4" />
                    {project.impact}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-ai-cyan/30 text-ai-cyan font-semibold hover:bg-ai-cyan/10 transition-all"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
