"use client"

import { motion } from "@/lib/framer-exports"
import { BookOpen, GraduationCap, Rocket, Brain } from "lucide-react"

const milestones = [
  {
    year: "2019",
    title: "10th Grade",
    description: "Passed with 81% marks. Started my coding journey.",
    icon: BookOpen,
  },
  {
    year: "2021",
    title: "12th Grade",
    description: "Completed with 73% marks. Built first projects.",
    icon: GraduationCap,
  },
  {
    year: "2022",
    title: "Bachelor's Degree",
    description: "Started Computer Science, focused on algorithms and programming.",
    icon: Rocket,
  },
  {
    year: "2024",
    title: "AI/ML Specialization",
    description: "Shifted focus to Machine Learning and Artificial Intelligence.",
    icon: Brain,
  },
]

export default function JourneySection() {
  return (
    <section className="py-20 px-6 sm:px-12 bg-gradient-to-b from-ai-slate to-ai-zinc">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-ai-cyan via-ai-purple to-ai-blue bg-clip-text text-transparent">
              My Journey
            </span>
          </h2>
          <p className="text-gray-400/70 text-lg">
            Key milestones in my education and career path
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-blue-500 transform -translate-x-1/2" />

          {/* Timeline items */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon

              return (
                <motion.div
                  key={milestone.year}
                  className={`flex gap-8 sm:gap-12 ${
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  {/* Icon circle (on timeline) */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white z-10 relative"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                  </div>

                  {/* Content - left side on desktop for even indices */}
                  <div className="flex-1 sm:w-1/2">
                    <motion.div
                      className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-500 transition-colors"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold text-ai-cyan">
                          {milestone.year}
                        </span>
                        <div className="flex-1 h-0.5 bg-gradient-to-r from-ai-cyan to-transparent" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-400/70 text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Empty space on right side for desktop alignment */}
                  <div className="hidden sm:block w-1/2" />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { label: "Years Learning", value: "5+" },
            { label: "Projects Built", value: "50+" },
            { label: "Technologies", value: "20+" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-ai-slate/50 border border-ai-cyan/20 rounded-lg p-4 text-center hover:border-ai-cyan/50 transition-colors"
            >
              <p className="text-2xl sm:text-3xl font-bold text-ai-cyan mb-1">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-gray-400/70">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
