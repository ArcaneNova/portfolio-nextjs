"use client"

import { useState, useEffect } from "react"
import { motion } from "@/lib/framer-exports"
import { Trophy, TrendingUp, Award } from "lucide-react"

interface Platform {
  _id: string
  name: string
  username: string
  rating: number
  maxRating: number
  problems: number
  contests: number
  bestRank: number
  badge: string
  color: string
}

interface PlatformsResponse {
  platforms: Platform[]
}

export default function CodingPlatformsSection() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/platforms")

        if (!response.ok) {
          // API endpoint may not have data, use empty state gracefully
          setPlatforms([])
          setIsLoading(false)
          return
        }

        const data: PlatformsResponse = await response.json()
        setPlatforms(data.platforms || [])
        setError(null)
      } catch (err) {
        console.error("Error fetching platforms:", err)
        setError("Failed to load platforms")
        setPlatforms([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlatforms()
  }, [])

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
              Competitive Programming
            </span>
          </h2>
          <p className="text-gray-400/70">Problem-solving skills across top platforms</p>
        </motion.div>

        {/* Platforms Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          {isLoading ? (
            <div className="col-span-full text-center py-12 text-gray-400">Loading platforms...</div>
          ) : error ? (
            <div className="col-span-full text-center py-12 text-red-400">{error}</div>
          ) : platforms.length > 0 ? (
            platforms.map((platform, index) => {
            const ratingPercentage = (platform.rating / platform.maxRating) * 100
            const isSelected = selectedPlatform === platform._id

            return (
              <motion.div
                key={platform._id}
                className={`group bg-ai-slate/50 border rounded-lg p-6 transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? "border-ai-cyan/40 bg-ai-slate/70"
                    : "border-ai-cyan/10 hover:border-ai-cyan/30"
                }`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                viewport={{ once: true }}
                onClick={() => setSelectedPlatform(platform._id)}
              >
                {/* Top Accent Line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${platform.color}`} />

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-2xl mb-2">{platform.badge}</div>
                    <h3 className="text-xl font-semibold text-white mb-1">{platform.name}</h3>
                    <p className="text-xs text-gray-400/60">@{platform.username}</p>
                  </div>
                  <Trophy className="w-6 h-6 text-ai-cyan opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Rating Section */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-ai-cyan">{platform.rating}</span>
                    <span className="text-sm text-gray-400/60">/ {platform.maxRating}</span>
                  </div>
                  <div className="h-2 bg-ai-slate/70 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${platform.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${ratingPercentage}%` }}
                      transition={{ duration: 0.8, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4 pt-4 border-t border-ai-cyan/10">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{platform.problems}</p>
                    <p className="text-xs text-gray-500/70">Problems</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-ai-cyan">{platform.contests}</p>
                    <p className="text-xs text-gray-500/70">Contests</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-ai-purple">#{platform.bestRank}</p>
                    <p className="text-xs text-gray-500/70">Best Rank</p>
                  </div>
                </div>

                {/* View Profile Button */}
                <motion.button
                  className="w-full mt-4 py-2 rounded-lg bg-ai-cyan/10 text-ai-cyan hover:bg-ai-cyan/20 transition-all text-sm font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Profile →
                </motion.button>
              </motion.div>
            )
            })
          ) : (
            <div className="col-span-full text-center py-12 text-gray-400">No platforms found</div>
          )}
        </motion.div>

        {/* Global Stats */}
        <motion.div
          className="mt-16 bg-ai-slate/50 border border-ai-cyan/10 rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ai-cyan via-ai-purple to-ai-blue rounded-t-lg" />

          <h3 className="text-lg font-semibold text-white mb-8">Overall Statistics</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Total Problems",
                value: "1,431",
                icon: <Trophy className="w-5 h-5" />,
              },
              {
                label: "Total Contests",
                value: "357",
                icon: <TrendingUp className="w-5 h-5" />,
              },
              {
                label: "Avg Rating",
                value: "2,062",
                icon: <Award className="w-5 h-5" />,
              },
              {
                label: "Best Overall Rank",
                value: "#847",
                icon: <Trophy className="w-5 h-5" />,
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.25 + i * 0.05,
                }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-2 text-ai-cyan">
                  {stat.icon}
                  <span className="text-xs text-gray-400/60">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievement Info */}
        <motion.div
          className="mt-8 bg-ai-cyan/5 border border-ai-cyan/20 rounded-lg p-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-4">
            <Award className="w-5 h-5 text-ai-cyan flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Consistent Problem Solver</h4>
              <p className="text-sm text-gray-400/70">
                Maintaining a 5-year streak across competitive programming platforms with consistent performance improvement and active participation in contests.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
