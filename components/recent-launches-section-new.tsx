"use client"

import { useState, useEffect } from "react"
import { motion } from "@/lib/framer-exports"
import { ExternalLink, Rocket, TrendingUp } from "lucide-react"

interface Launch {
  _id: string
  name: string
  description: string
  status: "active" | "beta" | "archived"
  category: string
  launchDate: string
  users?: number
  impact: string
}

interface LaunchesResponse {
  launches: Launch[]
}

const statusConfig = {
  active: {
    label: "Active",
    color: "text-ai-cyan",
    bg: "bg-ai-cyan/10",
    border: "border-ai-cyan/30",
  },
  beta: {
    label: "Beta",
    color: "text-ai-purple",
    bg: "bg-ai-purple/10",
    border: "border-ai-purple/30",
  },
  archived: {
    label: "Archived",
    color: "text-gray-400",
    bg: "bg-gray-400/10",
    border: "border-gray-400/20",
  },
}

export default function RecentLaunchesSection() {
  const [selectedStatus, setSelectedStatus] = useState<"all" | "active" | "beta" | "archived">("all")
  const [launches, setLaunches] = useState<Launch[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/launches")

        if (!response.ok) {
          throw new Error("Failed to fetch launches")
        }

        const data: LaunchesResponse = await response.json()
        setLaunches(data.launches || [])
        setError(null)
      } catch (err) {
        console.error("Error fetching launches:", err)
        setError("Failed to load launches")
        setLaunches([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchLaunches()
  }, [])

  const filtered =
    selectedStatus === "all"
      ? launches
      : launches.filter((l) => l.status === selectedStatus)

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
              Recent Launches
            </span>
          </h2>
          <p className="text-gray-400/70">Products and projects shipped this year</p>
        </motion.div>

        {/* Status Filter */}
        <motion.div
          className="flex justify-center gap-2 mb-12 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {["all", "active", "beta", "archived"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status as any)}
              className={`px-4 py-2 rounded-lg transition-all capitalize ${
                selectedStatus === status
                  ? "bg-ai-cyan text-ai-zinc font-medium"
                  : "bg-ai-slate/50 text-gray-300 border border-ai-cyan/10 hover:border-ai-cyan/30"
              }`}
            >
              {status === "all" ? "All Launches" : status}
            </button>
          ))}
        </motion.div>

        {/* Launches Timeline */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12 text-gray-400">Loading launches...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-400">{error}</div>
          ) : filtered.length > 0 ? (
            filtered.map((launch, index) => {
              const config = statusConfig[launch.status]
              return (
                <motion.div
                  key={launch._id}
                  className={`group bg-ai-slate/50 border ${config.border} rounded-lg p-6 hover:border-ai-cyan/30 transition-all`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Rocket className="w-5 h-5 text-ai-cyan flex-shrink-0" />
                        <h3 className="text-lg font-semibold text-white group-hover:text-ai-cyan transition-colors">
                          {launch.name}
                        </h3>
                      </div>

                      <p className="text-sm text-gray-400/70 mb-4">
                        {launch.description}
                      </p>

                      {/* Metrics Row */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500/70">
                        <span className="bg-ai-cyan/10 text-ai-cyan px-2 py-1 rounded capitalize">
                          {launch.category}
                        </span>
                        <span>{launch.launchDate}</span>
                        {launch.users && (
                          <div className="flex items-center gap-1 text-ai-purple">
                            <TrendingUp className="w-3 h-3" />
                            <span>{launch.users.toLocaleString()} users</span>
                          </div>
                        )}
                      </div>

                      {/* Impact Badge */}
                      <div className="mt-3 pt-3 border-t border-ai-cyan/10">
                        <p className="text-xs text-ai-cyan font-medium">
                          💡 {launch.impact}
                        </p>
                      </div>
                    </div>

                    {/* Right Side - Status */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
                        {config.label}
                      </span>
                      <button className="p-2 rounded-lg hover:bg-ai-cyan/10 transition-colors">
                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-ai-cyan" />
                      </button>
                    </div>
                  </div>

                  {/* Top Accent Line */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${
                    launch.status === "active"
                      ? "from-ai-cyan to-ai-purple"
                      : launch.status === "beta"
                      ? "from-ai-purple to-ai-blue"
                      : "from-gray-400 to-gray-600"
                  } rounded-t-lg`} />
                </motion.div>
              )
            })
          ) : (
            <div className="text-center py-12 text-gray-400/60">
              No launches found in this category
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            {
              label: "Active Products",
              value: launches.filter((l) => l.status === "active").length,
            },
            {
              label: "Total Users",
              value: (launches.reduce((a, l) => a + (l.users || 0), 0) / 1000).toFixed(1) + "K",
            },
            {
              label: "Products Launched",
              value: launches.length,
            },
          ].map((stat, i) => (
            <div key={i} className="bg-ai-slate/50 border border-ai-cyan/10 rounded-lg p-6 text-center">
              <p className="text-3xl font-bold text-ai-cyan mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400/70">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
