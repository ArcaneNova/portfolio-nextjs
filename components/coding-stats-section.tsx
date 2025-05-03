"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Code, FileCode, GitPullRequest, Award } from "lucide-react"
import type { CodingStat, StatsResponse } from "@/lib/models/stats"
import { Button } from "@/components/ui/button"

// Map string icon names to Lucide components
const iconMap: Record<string, React.ElementType> = {
  Code,
  FileCode,
  GitPullRequest,
  Award,
}

export default function CodingStatsSection() {
  const [stats, setStats] = useState<CodingStat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/stats")

        if (!response.ok) {
          throw new Error("Failed to fetch stats")
        }

        const data: StatsResponse = await response.json()
        setStats(data.codingStats)
        setError(null)
      } catch (err) {
        console.error("Error fetching stats:", err)
        setError("Failed to load stats. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Helper function to get icon component
  const getIconComponent = (iconName: string) => {
    return iconMap[iconName] || Code // Default to Code if icon not found
  }

  // Fallback data if no stats are found
  const fallbackStats: CodingStat[] = [
    {
      label: "Lines of Code",
      value: "500,000+",
      icon: "Code",
      color: "from-purple-500 to-blue-500",
    },
    {
      label: "Total Projects",
      value: "75+",
      icon: "FileCode",
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "GitHub Contributions",
      value: "2,500+",
      icon: "GitPullRequest",
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Coding Awards",
      value: "12",
      icon: "Award",
      color: "from-yellow-500 to-orange-500",
    },
  ]

  return (
    <section id="coding-stats" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Coding Stats</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A numerical overview of my coding journey and achievements
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-lg animate-pulse h-40">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-4 rounded-full bg-muted h-16 w-16"></div>
                  <div className="h-6 bg-muted rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => setStats([])}>Retry</Button>
          </div>
        ) : stats.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fallbackStats.map((stat, index) => {
              const IconComponent = getIconComponent(stat.icon)

              return (
                <motion.div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 shadow-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${stat.color} mb-4`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <motion.h3
                    className="text-3xl font-bold mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = getIconComponent(stat.icon)

              return (
                <motion.div
                  key={stat._id}
                  className="bg-card border border-border rounded-lg p-6 shadow-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${stat.color} mb-4`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <motion.h3
                    className="text-3xl font-bold mb-2"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
