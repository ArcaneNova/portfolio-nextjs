"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Trophy, Award, Medal, Star } from "lucide-react"
import type { Achievement, AchievementsResponse } from "@/lib/models/achievement"
import { Button } from "@/components/ui/button"

// Map string icon names to Lucide components
const iconMap: Record<string, React.ElementType> = {
  Trophy,
  Award,
  Medal,
  Star,
}

export default function AchievementsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/achievements?limit=4") // Limiting to 4 for the homepage

        if (!response.ok) {
          throw new Error("Failed to fetch achievements")
        }

        const data: AchievementsResponse = await response.json()
        setAchievements(data.achievements)
        setError(null)
      } catch (err) {
        console.error("Error fetching achievements:", err)
        setError("Failed to load achievements. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchAchievements()
  }, [])

  // Helper function to get icon component
  const getIconComponent = (iconName: string) => {
    return iconMap[iconName] || Trophy // Default to Trophy if icon not found
  }

  return (
    <section id="achievements" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Achievements</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Recognitions and milestones from my professional journey
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-lg animate-pulse h-48">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-muted h-14 w-14"></div>
                  <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => setAchievements([])}>Retry</Button>
          </div>
        ) : achievements.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No achievements found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = getIconComponent(achievement.icon)

              return (
                <motion.div
                  key={achievement._id}
                  className="bg-card border border-border rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  onMouseEnter={() => setHoveredId(achievement._id || null)}
                  onMouseLeave={() => setHoveredId(null)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full bg-primary/10">
                      <IconComponent
                        className={`h-8 w-8 ${hoveredId === achievement._id ? "text-purple-500" : "text-primary"}`}
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                    <p className="text-muted-foreground">{achievement.description}</p>
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
