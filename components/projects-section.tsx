"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "@/lib/framer-exports"
import { Button } from "@/components/ui/button"
import { 
  Github, 
  ExternalLink, 
  ChevronRight, 
  Code2, 
  Rocket, 
  Star, 
  Users, 
  TrendingUp,
  Eye,
  GitBranch,
  Award,
  Code,
  Calendar,
  Zap,
  Play,
  Filter,
  Sparkles,
  ArrowUpRight,
  Heart,
  Bookmark
} from "lucide-react"
import type { Project, ProjectsResponse } from "@/lib/models/project"

const categories = [
  { id: "All", label: "All Projects", icon: Code2, gradient: "from-slate-500 to-slate-600" },
  { id: "SaaS Products", label: "SaaS", icon: Rocket, gradient: "from-purple-500 to-purple-600" },
  { id: "AI/ML Projects", label: "AI/ML", icon: Zap, gradient: "from-cyan-500 to-cyan-600" },
  { id: "Web Apps", label: "Web Apps", icon: Code, gradient: "from-green-500 to-green-600" },
  { id: "Mobile Apps", label: "Mobile", icon: Play, gradient: "from-pink-500 to-pink-600" }
]

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
        setError("Failed to load projects. Please try again later.")
        setProjects([]) // Clear projects on error
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [activeCategory])

  const loadMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 6, projects.length))
  }

  const displayProjects = projects.slice(0, visibleProjects)

  const ProjectCard = ({ project, index }: { project: Project, index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 ${
        project.featured ? 'ring-2 ring-purple-500/50 ring-opacity-50' : ''
      }`}
    >
      {/* Holographic shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-medium shadow-lg">
          <Star className="w-3 h-3" />
          Featured
        </div>
      )}

      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
        <Image
          src={project.image || "/placeholder.jpg"}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Live Demo Overlay */}
        {(project.demo || project.links?.demo) && (
          <Link
            href={project.demo || project.links?.demo || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600/80 to-cyan-600/80 backdrop-blur-sm rounded-full text-white font-medium transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <Eye className="w-4 h-4" />
              Live Demo
            </div>
          </Link>
        )}

        {/* Neon glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-t from-purple-500/20 via-transparent to-cyan-500/20" />
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>
          <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
            {project.category}
          </span>
        </div>

        <p className="text-gray-400 leading-relaxed mb-6 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(project.techStack || project.tags)?.slice(0, 4).map((tech: string, techIndex: number) => (
            <span
              key={techIndex}
              className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-xs font-medium border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors"
            >
              {tech}
            </span>
          ))}
          {(project.techStack || project.tags)?.length > 4 && (
            <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-lg text-xs border border-gray-500/30">
              +{(project.techStack || project.tags).length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {(project.github || project.links?.github) && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 border-white/20 text-gray-300 hover:bg-white/10 hover:border-purple-500/50 hover:text-purple-300 transition-all duration-300"
            >
              <Link href={project.github || project.links?.github || '#'} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </Link>
            </Button>
          )}
          {(project.demo || project.links?.demo) && (
            <Button
              asChild
              size="sm"
              className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              <Link href={project.demo || project.links?.demo || '#'} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm backdrop-blur-sm mb-6"
          >
            <Rocket className="w-4 h-4" />
            <span>My Projects</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Building Digital Experiences
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            From innovative SaaS platforms to cutting-edge AI solutions — I create impactful digital experiences 
            that solve real-world problems and delight users.
          </p>
        </motion.div>

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { icon: <Code className="w-6 h-6" />, number: "50+", label: "Projects Built" },
            { icon: <Users className="w-6 h-6" />, number: "10K+", label: "Users Impacted" },
            { icon: <TrendingUp className="w-6 h-6" />, number: "5", label: "SaaS Products" },
            { icon: <Award className="w-6 h-6" />, number: "3", label: "AI Solutions" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="text-purple-400 mb-2 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => {
            const IconComponent = category.icon
            const isActive = activeCategory === category.id
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-6 py-4 rounded-2xl transition-all duration-300 overflow-hidden ${
                  isActive
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-xl shadow-purple-500/25`
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {/* Background glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                
                <div className="relative flex items-center gap-3">
                  <IconComponent className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className="font-medium">{category.label}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </div>

                {/* Sparkle effect for active category */}
                {isActive && (
                  <div className="absolute top-1 right-1">
                    <Sparkles className="w-3 h-3 text-white/60" />
                  </div>
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="relative inline-block">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-t-2 border-purple-500"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-purple-500/30"></div>
            </div>
            <p className="text-gray-400 mt-6 text-lg">Loading amazing projects...</p>
            <p className="text-gray-500 mt-2 text-sm">Fetching from database</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="mb-6 text-red-400 text-6xl">⚠️</div>
            <p className="text-red-400 mb-6 text-xl">{error}</p>
            <p className="text-gray-500 mb-8">Unable to load projects from the database</p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300"
            >
              <span className="mr-2">🔄</span>
              Try Again
            </Button>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-6 text-gray-400 text-6xl">📝</div>
            <p className="text-gray-400 mb-4 text-xl">No projects found</p>
            <p className="text-gray-500">I have not added projects yet, please check my github for project repos!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProjects.map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
              ))}
            </div>

            {/* Load More Button */}
            {visibleProjects < projects.length && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mt-16"
              >
                <Button
                  onClick={loadMore}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-10 py-6 text-lg rounded-full group shadow-xl hover:shadow-purple-500/25 transition-all duration-300"
                >
                  <span className="mr-3">Load More Projects</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <p className="text-gray-500 mt-4 text-sm">
                  Showing {visibleProjects} of {projects.length} projects
                </p>
              </motion.div>
            )}

            {/* View All Projects CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-20 p-8 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-3xl backdrop-blur-sm relative overflow-hidden"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 opacity-50" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-4">Want to see more?</h3>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                  Check out my GitHub for more projects, experiments, and open-source contributions. 
                  I'm always building something new and exciting!
                </p>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 px-10 py-6 text-lg rounded-full transition-all duration-300 group"
                >
                  <Link href="https://github.com/md-arshad-noor" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-3" />
                    View All on GitHub
                    <ExternalLink className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/6 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      </div>
    </section>
  )
}
