"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { motion } from "@/lib/framer-exports"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ChevronRight } from "lucide-react"
import type { Project, ProjectsResponse } from "@/lib/models/project"

const categories = ["All", "Web Development", "Machine Learning", "App Development"]

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [visibleProjects, setVisibleProjects] = useState(3)
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalProjects, setTotalProjects] = useState(0)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/projects?category=${activeCategory}&limit=100`)

        if (!response.ok) {
          throw new Error("Failed to fetch projects")
        }

        const data: ProjectsResponse = await response.json()
        setProjects(data.projects)
        setFilteredProjects(data.projects)
        setTotalProjects(data.pagination.total)
        setError(null)
      } catch (err) {
        console.error("Error fetching projects:", err)
        setError("Failed to load projects. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [activeCategory])

  const loadMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, filteredProjects.length))
  }

  const displayedProjects = filteredProjects.slice(0, visibleProjects)

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work, ranging from web applications to machine learning projects
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => {
                setActiveCategory(category)
                setVisibleProjects(3)
              }}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg overflow-hidden shadow-lg h-96 animate-pulse"
              >
                <div className="h-48 bg-muted"></div>
                <div className="p-6">
                  <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded w-5/6 mb-4"></div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-6 bg-muted rounded-full w-16"></div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <div className="h-9 bg-muted rounded w-20"></div>
                    <div className="h-9 bg-muted rounded w-20"></div>
                    <div className="h-9 bg-muted rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => setActiveCategory(activeCategory)}>Retry</Button>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No projects found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project._id}
                className={`bg-card border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                  project.featured ? "md:col-span-2 lg:col-span-1" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg?height=400&width=600"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button asChild variant="outline" size="sm">
                      <Link href={project.github} target="_blank">
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={project.demo} target="_blank">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Demo
                      </Link>
                    </Button>
                    <Button asChild variant="default" size="sm">
                      <Link href={`/projects/${project._id}`}>
                        Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && !error && visibleProjects < filteredProjects.length && (
          <div className="text-center mt-12">
            <Button onClick={loadMore} variant="outline" size="lg">
              Load More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
