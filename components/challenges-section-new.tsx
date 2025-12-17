"use client"

import { useState, useEffect } from "react"
import { motion } from "@/lib/framer-exports"
import { Trophy, Calendar, Users, TrendingUp } from "lucide-react"

interface Challenge {
  _id: string
  name: string
  description: string
  type: "hackathon" | "competition" | "expedition"
  date: string
  participants: number
  result: string
  award?: string
  technologies: string[]
  url?: string
}

interface ChallengesResponse {
  challenges: Challenge[]
}

const typeConfig = {
  hackathon: {
    label: "Hackathon",
    color: "text-ai-cyan",
    bg: "bg-ai-cyan/10",
    border: "border-ai-cyan/30",
    icon: "🚀",
  },
  competition: {
    label: "Competition",
    color: "text-ai-purple",
    bg: "bg-ai-purple/10",
    border: "border-ai-purple/30",
    icon: "⚡",
  },
  expedition: {
    label: "Challenge",
    color: "text-ai-blue",
    bg: "bg-ai-blue/10",
    border: "border-ai-blue/30",
    icon: "🎯",
  },
}

export default function ChallengesSection() {
  const [selectedType, setSelectedType] = useState("all")
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/challenges")

        if (!response.ok) {
          throw new Error("Failed to fetch challenges")
        }

        const data: ChallengesResponse = await response.json()
        setChallenges(data.challenges || [])
        setError(null)
      } catch (err) {
        console.error("Error fetching challenges:", err)
        setError("Failed to load challenges")
        setChallenges([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchChallenges()
  }, [])

  const filtered =
    selectedType === "all"
      ? challenges
      : challenges.filter((c) => c.type === selectedType)

  return (
    <section className="py-20 px-6 sm:px-12 bg-gradient-to-b from-ai-slate to-ai-zinc">
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
              Competitions & Challenges
            </span>
          </h2>
          <p className="text-gray-400/70">Achievements in hackathons, competitions, and coding challenges</p>
        </motion.div>

        {/* Type Filter */}
        <motion.div
          className="flex justify-center gap-2 mb-12 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {["all", "hackathon", "competition", "expedition"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg transition-all capitalize ${
                selectedType === type
                  ? "bg-ai-cyan text-ai-zinc font-medium"
                  : "bg-ai-slate/50 text-gray-300 border border-ai-cyan/10 hover:border-ai-cyan/30"
              }`}
            >
              {type === "all" ? "All Challenges" : type}
            </button>
          ))}
        </motion.div>

        {/* Challenges Timeline */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12 text-gray-400">Loading challenges...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-400">{error}</div>
          ) : filtered.length > 0 ? (
            filtered.map((challenge, index) => {
              const config = typeConfig[challenge.type as keyof typeof typeConfig] || {
                label: "Challenge",
                color: "text-ai-cyan",
                bg: "bg-ai-cyan/10",
                border: "border-ai-cyan/30",
                icon: "🎯",
              }
              return (
                <motion.div
                  key={challenge._id}
                  className={`group bg-ai-slate/50 border rounded-lg p-6 hover:border-ai-cyan/30 transition-all relative overflow-hidden`}
                  style={{
                    borderColor: challenge.type === "hackathon"
                      ? "rgba(6, 182, 212, 0.1)"
                      : challenge.type === "competition"
                      ? "rgba(167, 139, 250, 0.1)"
                      : "rgba(59, 130, 246, 0.1)",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                  viewport={{ once: true }}
                >
                  {/* Top Accent Line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{
                      background:
                        challenge.type === "hackathon"
                          ? "linear-gradient(to right, #06B6D4, #A78BFA)"
                          : challenge.type === "competition"
                          ? "linear-gradient(to right, #A78BFA, #3B82F6)"
                          : "linear-gradient(to right, #3B82F6, #06B6D4)",
                    }}
                  />

                  <div className="flex items-start justify-between gap-4">
                    {/* Left Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{config.icon}</span>
                        <h3 className="text-lg font-semibold text-white group-hover:text-ai-cyan transition-colors">
                          {challenge.name}
                        </h3>
                      </div>

                      <p className="text-sm text-gray-400/70 mb-4">
                        {challenge.description}
                      </p>

                      {/* Metrics Row */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500/70 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-ai-cyan" />
                          <span>{challenge.date}</span>
                        </div>
                        {challenge.participants && (
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-ai-cyan" />
                            <span>{challenge.participants.toLocaleString()} participants</span>
                          </div>
                        )}
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {challenge.technologies && challenge.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs bg-ai-cyan/10 text-ai-cyan px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Award Badge */}
                      {challenge.award && (
                        <div className="flex items-center gap-2 pt-2 border-t border-ai-cyan/10">
                          <Trophy className="w-4 h-4 text-ai-cyan" />
                          <p className="text-xs text-ai-cyan font-medium">
                            {challenge.award}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Right Side - Result Badge */}
                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${config.bg} ${config.color}`}>
                        {config.label}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500/70">Result</p>
                        <p className="text-lg font-bold text-white group-hover:text-ai-cyan transition-colors">
                          {challenge.result}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })
          ) : (
            <div className="text-center py-12 text-gray-400/60">
              No challenges found in this category
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            {
              label: "Hackathons Won",
              value: challenges.filter((c) => c.type === "hackathon" && c.result.includes("Place")).length,
              icon: "🏆",
            },
            {
              label: "Top Placements",
              value: challenges.filter(
                (c) => c.result && (c.result === "1st Place" || c.result === "2nd Place" || c.result.includes("Top"))
              ).length,
              icon: "🎯",
            },
            {
              label: "Total Participants",
              value: Math.round(challenges.reduce((a, c) => a + c.participants, 0) / 1000) + "K",
              icon: "👥",
            },
            {
              label: "Challenges Completed",
              value: challenges.length,
              icon: "⚡",
            },
          ].map((stat, i) => (
            <div key={i} className="bg-ai-slate/50 border border-ai-cyan/10 rounded-lg p-6 text-center">
              <p className="text-2xl mb-2">{stat.icon}</p>
              <p className="text-2xl font-bold text-ai-cyan mb-1">{stat.value}</p>
              <p className="text-xs text-gray-400/70">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
