"use client"

import { useEffect, useState } from "react"
import { motion } from "@/lib/framer-exports"

// This would normally be fetched from the GitHub API
const generateMockContributions = () => {
  const contributions = []
  const now = new Date()
  const startDate = new Date(now)
  startDate.setDate(startDate.getDate() - 364)

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    // Generate random contribution count (more likely to be higher for recent dates)
    const recency = i / 364 // 0 to 1, higher for more recent dates
    const baseCount = Math.floor(Math.random() * 5) // 0-4 base contributions
    const recencyBonus = Math.floor(Math.random() * 10 * recency) // More bonus for recent dates
    const count = baseCount + recencyBonus

    contributions.push({
      date: date.toISOString().split("T")[0],
      count,
    })
  }

  return contributions
}

const getContributionColor = (count: number) => {
  if (count === 0) return "bg-muted"
  if (count < 3) return "bg-green-200 dark:bg-green-900"
  if (count < 6) return "bg-green-300 dark:bg-green-700"
  if (count < 9) return "bg-green-400 dark:bg-green-600"
  return "bg-green-500 dark:bg-green-500"
}

export default function GithubSection() {
  const [contributions, setContributions] = useState<{ date: string; count: number }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setContributions(generateMockContributions())
      setIsLoading(false)
    }, 1000)
  }, [])

  // Group contributions by week
  const weeks = []
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7))
  }

  return (
    <section id="github" className="py-20 relative bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">GitHub Contributions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A visual representation of my GitHub activity over the past year
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div
            className="bg-card border border-border rounded-lg p-6 shadow-lg overflow-x-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="github-contribution-graph grid grid-cols-[repeat(52,1fr)] gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-3 h-3 rounded-sm ${getContributionColor(day.count)}`}
                      title={`${day.date}: ${day.count} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center mt-6 text-sm">
              <div className="flex items-center space-x-2">
                <span>Less</span>
                <div className="w-3 h-3 rounded-sm bg-muted"></div>
                <div className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-900"></div>
                <div className="w-3 h-3 rounded-sm bg-green-300 dark:bg-green-700"></div>
                <div className="w-3 h-3 rounded-sm bg-green-400 dark:bg-green-600"></div>
                <div className="w-3 h-3 rounded-sm bg-green-500 dark:bg-green-500"></div>
                <span>More</span>
              </div>
            </div>
          </motion.div>
        )}

        <div className="text-center mt-8">
          <a
            href="https://github.com/ArcaneNova"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline inline-flex items-center"
          >
            View my GitHub profile
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
