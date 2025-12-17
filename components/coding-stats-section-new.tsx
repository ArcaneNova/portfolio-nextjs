"use client"

import { motion } from "@/lib/framer-exports"
import { TrendingUp, Zap } from "lucide-react"
import { useState, useEffect } from "react"

interface Stat {
  _id?: string
  label: string
  value: string
  change?: string
  subtext: string
  icon: React.ReactNode
}

interface CodingStat {
  _id: string
  title: string
  value: number | string
  unit?: string
  description: string
  change?: number
  order?: number
}

interface StatsResponse {
  codingStats: CodingStat[]
  platformStats: any[]
}

const languages = [
  { name: "TypeScript", percentage: 42, color: "from-ai-blue to-ai-cyan" },
  { name: "Python", percentage: 28, color: "from-ai-cyan to-ai-purple" },
  { name: "JavaScript", percentage: 15, color: "from-ai-purple to-ai-blue" },
  { name: "SQL", percentage: 10, color: "from-ai-blue to-ai-cyan" },
  { name: "Other", percentage: 5, color: "from-gray-600 to-gray-700" },
]

export default function CodingStatsSection() {
  const [displayStats, setDisplayStats] = useState<Stat[]>([])
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
        
        // Map real database stats to display format
        if (data.codingStats && data.codingStats.length > 0) {
          const mapped: Stat[] = data.codingStats.map((stat: CodingStat) => ({
            _id: stat._id,
            label: stat.title,
            value: `${stat.value}${stat.unit ? stat.unit : ''}`,
            change: stat.change ? `${stat.change > 0 ? '+' : ''}${stat.change}%` : undefined,
            subtext: stat.description,
            icon: <Zap className="w-5 h-5" />,
          }))
          setDisplayStats(mapped)
        } else {
          setDisplayStats([])
        }
        setError(null)
      } catch (err) {
        console.error("Error fetching stats:", err)
        setDisplayStats([])
        setError("Failed to load stats")
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <section className="py-20 px-6 sm:px-12 bg-gradient-to-b from-ai-slate to-ai-zinc">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-ai-cyan via-ai-purple to-ai-blue bg-clip-text text-transparent">
              Coding Activity & Stats
            </span>
          </h2>
          <p className="text-gray-400/70">2024 development metrics and contributions</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          {isLoading ? (
            <div className="col-span-full text-center py-12 text-gray-400">Loading stats...</div>
          ) : (
            displayStats.map((stat, index) => (
            <motion.div
              key={stat._id || `stat-${index}`}
              className="group bg-ai-slate/50 border border-ai-cyan/10 hover:border-ai-cyan/30 rounded-lg p-6 transition-all relative overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
              viewport={{ once: true }}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-ai-cyan to-ai-purple" />

              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-ai-cyan/10 rounded-lg text-ai-cyan">
                  {stat.icon}
                </div>
                {stat.change && (
                  <span className="text-xs font-semibold text-ai-cyan bg-ai-cyan/10 px-2 py-1 rounded">
                    {stat.change}
                  </span>
                )}
              </div>

              <h3 className="text-sm text-gray-400/70 mb-2">{stat.label}</h3>
              <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-xs text-gray-500/70">{stat.subtext}</p>
            </motion.div>
            ))
          )}
        </motion.div>

        {/* Language Distribution */}
        <motion.div
          className="bg-ai-slate/50 border border-ai-cyan/10 rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ai-cyan via-ai-purple to-ai-blue rounded-t-lg" />

          <h3 className="text-lg font-semibold text-white mb-8">Language Distribution</h3>

          <div className="space-y-6">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.25 + index * 0.05,
                }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">{lang.name}</span>
                  <span className="text-xs font-semibold text-ai-cyan">{lang.percentage}%</span>
                </div>
                <div className="h-2 bg-ai-slate/70 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${lang.color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.25 + index * 0.05 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total LOC */}
          <div className="mt-8 pt-8 border-t border-ai-cyan/10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400/70">Total Lines of Code (2024)</span>
              <span className="text-2xl font-bold text-ai-cyan">42.5K</span>
            </div>
            <p className="text-xs text-gray-500/70 mt-2">~118 lines per day average</p>
          </div>
        </motion.div>

        {/* Activity Heatmap Info */}
        <motion.div
          className="mt-12 bg-ai-cyan/5 border border-ai-cyan/20 rounded-lg p-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex gap-4">
            <Zap className="w-5 h-5 text-ai-cyan flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-semibold text-white mb-1">Most Active Period</h4>
              <p className="text-sm text-gray-400/70">
                Evenings (8-11 PM) and weekends are peak coding times. Most productive during Q4 2024 with consistent daily commits.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
