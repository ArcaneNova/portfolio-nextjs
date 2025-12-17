"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "@/lib/framer-exports"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Zap } from "lucide-react"
import type { Project, ProjectsResponse } from "@/lib/models/project"

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [visibleProjects, setVisibleProjects] = useState(6)
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        const categoryParam = activeCategory === "All" ? "" : activeCategory
        const response = await fetch(`/api/projects?category=${categoryParam}&limit=50`)

        if (!response.ok) {
          throw new Error("Failed to fetch projects")
        }

        const data: ProjectsResponse = await response.json()
        setProjects(data.projects || [])
        setError(null)
      } catch (err) {
        console.error("Error fetching projects:", err)
        setError("Failed to load projects")
        setProjects([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [activeCategory])

  const displayProjects = projects.slice(0, visibleProjects)

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
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400/70 text-lg max-w-2xl">
            Showcasing my work across SaaS products, AI/ML solutions, and web applications
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12">
          {["All", "SaaS Products", "AI/ML Projects", "Web Apps", "Mobile Apps"].map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-ai-cyan to-ai-purple text-white"
                  : "bg-ai-slate/40 text-gray-300 hover:bg-ai-slate/60 border border-ai-cyan/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-slate-800 rounded-lg mb-4" />
                <div className="h-6 bg-slate-800 rounded w-3/4 mb-2" />
                <div className="h-4 bg-slate-800 rounded w-full mb-4" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-12 text-red-400">{error}</div>
        )}

        {/* Projects Grid */}
        {!isLoading && !error && (
          <>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              {displayProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  className="group relative bg-ai-slate/50 border border-ai-cyan/10 rounded-lg overflow-hidden hover:border-ai-cyan/50 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  viewport={{ once: true }}
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-ai-slate to-ai-zinc overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Zap className="w-12 h-12 text-ai-slate" />
                      </div>
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ai-zinc via-transparent to-transparent" />

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-ai-cyan to-ai-purple text-white text-xs font-medium rounded-full">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-ai-cyan transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-400/70 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(project.techStack || project.tags)?.slice(0, 3).map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-ai-slate/50 text-gray-300 rounded text-xs border border-ai-cyan/20"
                        >
                          {tech}
                        </span>
                      ))}
                      {((project.techStack?.length || 0) > 3 || (project.tags?.length || 0) > 3) && (
                        <span className="px-2 py-1 text-gray-400/70 text-xs">
                          +{Math.max((project.techStack?.length || 0) - 3, (project.tags?.length || 0) - 3)}
                        </span>
                      )}
                    </div>

                    {/* Category */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500/70">
                        {project.category || "Project"}
                      </span>

                      {/* Links */}
                      <div className="flex gap-2">
                        {(project.demo || project.links?.demo) && (
                          <Link
                            href={project.demo || project.links?.demo || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-gray-400/70 hover:text-ai-cyan transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        {(project.github || project.links?.github) && (
                          <Link
                            href={project.github || project.links?.github || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-gray-400/70 hover:text-ai-cyan transition-colors"
                          >
                            <Github className="w-4 h-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Load More Button */}
            {visibleProjects < projects.length && (
              <motion.div
                className="flex justify-center mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Button
                  onClick={() => setVisibleProjects((prev) => Math.min(prev + 6, projects.length))}
                  className="bg-gradient-to-r from-ai-cyan to-ai-purple hover:from-ai-cyan hover:to-ai-purple text-white px-8 py-2"
                >
                  Load More Projects
                </Button>
              </motion.div>
            )}

            {/* Empty State */}
            {projects.length === 0 && (
              <div className="text-center py-12 text-gray-400/70">
                No projects found in this category
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
