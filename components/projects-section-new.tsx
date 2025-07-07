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
  Code, 
  Rocket, 
  Star, 
  Users, 
  Calendar,
  TrendingUp,
  Zap,
  Eye,
  GitBranch,
  Award,
  Sparkles
} from "lucide-react"
import type { Project, ProjectsResponse } from "@/lib/models/project"

const categories = ["All", "SaaS Products", "AI/ML Projects", "Web Apps", "Mobile Apps"]

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [visibleProjects, setVisibleProjects] = useState(6)
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
    setVisibleProjects((prev) => Math.min(prev + 6, filteredProjects.length))
  }

  // Fallback projects for demonstration
  const fallbackProjects = [
    {
      _id: "1",
      title: "AI-Powered Energy Forecasting System",
      description: "A machine learning platform that predicts electricity demand for the Indian power grid using LSTM models and real-time data analysis.",
      image: "/placeholder.jpg",
      technologies: ["Python", "TensorFlow", "FastAPI", "React", "AWS"],
      github: "https://github.com/arcanenova/energy-forecasting",
      liveUrl: "https://energy-forecast.arshadnoor.me",
      category: "AI/ML Projects",
      featured: true,
      stats: { stars: 45, forks: 12, views: 1200 }
    },
    {
      _id: "2", 
      title: "Farmer-Vendor Marketplace",
      description: "A grassroots platform connecting farmers directly with street vendors, eliminating middlemen and ensuring fair prices for both parties.",
      image: "/placeholder.jpg",
      technologies: ["Next.js", "Node.js", "MongoDB", "Socket.io", "Stripe"],
      github: "https://github.com/arcanenova/farmer-marketplace",
      liveUrl: "https://farmer-connect.arshadnoor.me",
      category: "SaaS Products",
      featured: true,
      stats: { stars: 67, forks: 23, views: 2400 }
    },
    {
      _id: "3",
      title: "Voice-Controlled AI Assistant",
      description: "An intelligent voice automation system using OpenAI APIs for natural language processing and task automation.",
      image: "/placeholder.jpg", 
      technologies: ["Python", "OpenAI API", "FastAPI", "WebRTC", "React"],
      github: "https://github.com/arcanenova/voice-ai",
      liveUrl: "https://voice-ai.arshadnoor.me",
      category: "AI/ML Projects",
      featured: false,
      stats: { stars: 34, forks: 8, views: 890 }
    },
    {
      _id: "4",
      title: "Real-time Pose Detection App",
      description: "Computer vision application using MoveNet for real-time human pose detection and fitness tracking.",
      image: "/placeholder.jpg",
      technologies: ["JavaScript", "TensorFlow.js", "WebGL", "React Native"],
      github: "https://github.com/arcanenova/pose-detection",
      liveUrl: "https://pose-tracker.arshadnoor.me",
      category: "Mobile Apps",
      featured: false,
      stats: { stars: 28, forks: 15, views: 650 }
    },
    {
      _id: "5",
      title: "SaaS Analytics Dashboard",
      description: "A comprehensive analytics platform for SaaS businesses with real-time metrics, user tracking, and revenue insights.",
      image: "/placeholder.jpg",
      technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "Redis"],
      github: "https://github.com/arcanenova/saas-analytics",
      liveUrl: "https://analytics-pro.arshadnoor.me",
      category: "SaaS Products",
      featured: true,
      stats: { stars: 89, forks: 34, views: 3200 }
    },
    {
      _id: "6",
      title: "Blockchain Voting System",
      description: "A secure, transparent voting platform built on blockchain technology to ensure election integrity and trust.",
      image: "/placeholder.jpg",
      technologies: ["Solidity", "Web3.js", "React", "Node.js", "IPFS"],
      github: "https://github.com/arcanenova/blockchain-voting",
      liveUrl: "https://secure-vote.arshadnoor.me",
      category: "Web Apps",
      featured: false,
      stats: { stars: 52, forks: 19, views: 1800 }
    }
  ]

  const displayProjects = filteredProjects.length > 0 ? filteredProjects : fallbackProjects

  const ProjectCard = ({ project, index }: { project: any, index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 ${
        project.featured ? 'ring-2 ring-purple-500/50' : ''
      }`}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-medium">
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
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Live Demo Overlay */}
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium">
              <Eye className="w-4 h-4" />
              Live Demo
            </div>
          </Link>
        )}
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

        {/* Project Stats */}
        {project.stats && (
          <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              {project.stats.stars}
            </div>
            <div className="flex items-center gap-1">
              <GitBranch className="w-4 h-4" />
              {project.stats.forks}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {project.stats.views}
            </div>
          </div>
        )}

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies?.slice(0, 4).map((tech: string, techIndex: number) => (
            <span
              key={techIndex}
              className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-md text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 4 && (
            <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-md text-xs">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.github && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex-1 border-white/20 text-gray-300 hover:bg-white/10"
            >
              <Link href={project.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </Link>
            </Button>
          )}
          {project.liveUrl && (
            <Button
              asChild
              size="sm"
              className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            >
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
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
              Building the Future
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            I blend creativity with code to turn ambitious ideas into reality — from full-blown SaaS products 
            to grassroots-level platforms used by thousands.
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

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <p className="text-gray-400 mt-4">Loading amazing projects...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400 mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProjects.slice(0, visibleProjects).map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
              ))}
            </div>

            {/* Load More Button */}
            {visibleProjects < displayProjects.length && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <Button
                  onClick={loadMore}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-6 text-lg rounded-full group"
                >
                  Load More Projects
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            )}

            {/* View All Projects CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-16 p-8 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-3xl backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Want to see more?</h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Check out my GitHub for more projects, experiments, and open-source contributions. 
                I'm always building something new!
              </p>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 px-8 py-6 text-lg rounded-full"
              >
                <Link href="https://github.com/arcanenova" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  View All on GitHub
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
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
