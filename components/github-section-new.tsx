"use client"

import { useState, useEffect } from "react"
import { motion } from "@/lib/framer-exports"
import { Github, Star, GitFork, MessageCircle } from "lucide-react"

interface Repository {
  _id: string
  name: string
  description: string
  language: string
  stars: number
  forks: number
  language_color: string
  url: string
  topics: string[]
}

interface GithubResponse {
  repositories: Repository[]
}

export default function GitHubSection() {
  const [hoveredRepo, setHoveredRepo] = useState<string | null>(null)
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [stats, setStats] = useState({
    repos: 0,
    stars: 0,
    forks: 0,
    followers: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setIsLoading(true)
        // Fetch GitHub repositories from API
        const response = await fetch("/api/github/repositories", { method: "GET" })

        if (response.ok) {
          const data: GithubResponse = await response.json()
          const repos = data.repositories || []
          setRepositories(repos)
          
          // Calculate stats from actual repositories
          const totalStars = repos.reduce((sum, repo) => sum + (repo.stars || 0), 0)
          const totalForks = repos.reduce((sum, repo) => sum + (repo.forks || 0), 0)
          
          setStats({
            repos: repos.length,
            stars: totalStars,
            forks: totalForks,
            followers: 0, // Placeholder - would need separate API
          })
        } else {
          // API endpoint doesn't exist yet, use empty state
          setRepositories([])
          setStats({ repos: 0, stars: 0, forks: 0, followers: 0 })
        }
        setError(null)
      } catch (err) {
        console.error("Error fetching repositories:", err)
        setRepositories([])
        setStats({ repos: 0, stars: 0, forks: 0, followers: 0 })
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepositories()
  }, [])

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
              Open Source Work
            </span>
          </h2>
          <p className="text-gray-400/70">Featured projects and contributions on GitHub</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Public Repos", value: stats.repos, icon: <Github className="w-5 h-5" /> },
            { label: "Total Stars", value: stats.stars, icon: <Star className="w-5 h-5" /> },
            { label: "Total Forks", value: stats.forks, icon: <GitFork className="w-5 h-5" /> },
            { label: "Followers", value: stats.followers || "—", icon: <MessageCircle className="w-5 h-5" /> },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-ai-slate/50 border border-ai-cyan/10 rounded-lg p-4 text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.1 + index * 0.05,
              }}
              viewport={{ once: true }}
            >
              <div className="text-ai-cyan mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-500/70 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Repositories Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          {isLoading ? (
            <div className="col-span-full text-center py-12 text-gray-400">Loading repositories...</div>
          ) : repositories.length > 0 ? (
            repositories.map((repo, index) => (
            <motion.div
              key={repo._id}
              className="group bg-ai-slate/50 border border-ai-cyan/10 hover:border-ai-cyan/30 rounded-lg p-6 transition-all relative overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredRepo(repo._id)}
              onMouseLeave={() => setHoveredRepo(null)}
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${repo.language_color}`} />

              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Github className="w-5 h-5 text-ai-cyan" />
                  <h3 className="text-lg font-semibold text-white group-hover:text-ai-cyan transition-colors truncate">
                    {repo.name}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-400/70 mb-4 line-clamp-2 min-h-10">
                {repo.description}
              </p>

              {/* Topics */}
              <div className="flex flex-wrap gap-2 mb-4">
                {repo.topics.map((topic) => (
                  <span
                    key={topic}
                    className="text-xs bg-ai-cyan/10 text-ai-cyan px-2 py-1 rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-ai-cyan/10">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400/60">{repo.language}</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-gray-400/60 hover:text-ai-cyan transition-colors">
                      <Star className="w-3.5 h-3.5" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400/60 hover:text-ai-cyan transition-colors">
                      <GitFork className="w-3.5 h-3.5" />
                      <span>{repo.forks}</span>
                    </div>
                  </div>
                </div>

                {/* View Button */}
                <motion.button
                  className="p-2 rounded-lg bg-ai-cyan/10 text-ai-cyan hover:bg-ai-cyan/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400">No repositories found</div>
          )}
        </motion.div>

        {/* View More */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ai-cyan hover:text-ai-purple transition-colors font-medium group"
          >
            View All Repositories on GitHub
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
