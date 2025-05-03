"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Code, Award, Trophy } from "lucide-react"
import type { PlatformStat, StatsResponse } from "@/lib/models/stats"
import { Button } from "@/components/ui/button"

// Map string icon names to Lucide components
const iconMap: Record<string, React.ElementType> = {
  Github,
  Code,
  Award,
  Trophy,
}

export default function CodingPlatformsSection() {
  const [platformStats, setPlatformStats] = useState<PlatformStat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlatformStats = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/stats")

        if (!response.ok) {
          throw new Error("Failed to fetch platform stats")
        }

        const data: StatsResponse = await response.json()
        setPlatformStats(data.platformStats)
        setError(null)
      } catch (err) {
        console.error("Error fetching platform stats:", err)
        setError("Failed to load platform stats. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlatformStats()
  }, [])

  // Helper function to get icon component
  const getIconComponent = (iconName: string) => {
    return iconMap[iconName] || Code // Default to Code if icon not found
  }

  // Fallback data if no platform stats are found
  const fallbackPlatformStats: PlatformStat[] = [
    {
      platform: "GitHub",
      icon: "Github",
      stats: [
        { label: "Stars", value: "250+" },
        { label: "Repositories", value: "45" },
        { label: "Followers", value: "120" },
        { label: "Contributions", value: "2,500+" },
      ],
    },
    {
      platform: "LeetCode",
      icon: "Code",
      stats: [
        { label: "Problems Solved", value: "450+" },
        { label: "Contest Rating", value: "1850" },
        { label: "Global Rank", value: "Top 5%" },
        { label: "Badges", value: "15" },
      ],
    },
    {
      platform: "GeeksforGeeks",
      icon: "Award",
      stats: [
        { label: "Problems Solved", value: "350+" },
        { label: "Articles Published", value: "12" },
        { label: "Institution Rank", value: "#3" },
        { label: "Total Score", value: "2200" },
      ],
    },
    {
      platform: "Codeforces",
      icon: "Trophy",
      stats: [
        { label: "Rating", value: "1750" },
        { label: "Rank", value: "Expert" },
        { label: "Contests", value: "35" },
        { label: "Problems Solved", value: "320+" },
      ],
    },
  ]

  return (
    <section id="coding-platforms" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Coding Platforms</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My performance and achievements across various coding platforms
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-lg animate-pulse">
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-full bg-muted mr-4 h-12 w-12"></div>
                  <div className="h-6 bg-muted rounded w-1/3"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, statIndex) => (
                    <div key={statIndex} className="p-4 bg-muted/50 rounded-lg">
                      <div className="h-4 bg-muted rounded w-2/3 mb-1"></div>
                      <div className="h-5 bg-muted rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => setPlatformStats([])}>Retry</Button>
          </div>
        ) : platformStats.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fallbackPlatformStats.map((platform, index) => {
              const IconComponent = getIconComponent(platform.icon)

              return (
                <motion.div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-primary/10 mr-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{platform.platform}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {platform.stats.map((stat, statIndex) => (
                      <motion.div
                        key={statIndex}
                        className="p-4 bg-muted/50 rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 + statIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                        <p className="text-xl font-bold">{stat.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {platformStats.map((platform, index) => {
              const IconComponent = getIconComponent(platform.icon)

              return (
                <motion.div
                  key={platform._id}
                  className="bg-card border border-border rounded-lg p-6 shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-primary/10 mr-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{platform.platform}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {platform.stats.map((stat, statIndex) => (
                      <motion.div
                        key={statIndex}
                        className="p-4 bg-muted/50 rounded-lg"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 + statIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                        <p className="text-xl font-bold">{stat.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
