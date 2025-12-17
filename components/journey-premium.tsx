"use client"

import React, { useState } from "react"
import { motion } from "@/lib/framer-exports"
import { Code2, BookOpen, Rocket, Award, Target, Star } from "lucide-react"

const milestones = [
  {
    year: "2019",
    title: "10th Grade",
    description: "Passed with 81% marks. Started my coding journey.",
    icon: BookOpen,
    color: "from-ai-blue to-ai-cyan",
    isCurrent: false
  },
  {
    year: "2021",
    title: "12th Grade",
    description: "Completed with 73% marks. Built first projects.",
    icon: Award,
    color: "from-ai-cyan to-ai-purple",
    isCurrent: false
  },
  {
    year: "2022",
    title: "Bachelor's Degree",
    description: "Started Computer Science, focused on algorithms and programming.",
    icon: Rocket,
    color: "from-ai-purple to-ai-blue",
    isCurrent: false
  },
  {
    year: "2024",
    title: "AI/ML Specialization",
    description: "Shifted focus to Machine Learning and Artificial Intelligence.",
    icon: Target,
    color: "from-ai-cyan to-ai-purple",
    isCurrent: true
  }
]

export default function JourneyPremium() {
  const [expandedIndex, setExpandedIndex] = useState(0)

  return (
    <section className="py-24 px-4 relative bg-gradient-to-b from-ai-zinc to-ai-slate overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-ai-cyan/5 rounded-full blur-3xl"
          animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-ai-purple/5 rounded-full blur-3xl"
          animate={{ y: [0, -100, 0], x: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, delay: 5 }}
        />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-1 bg-gradient-to-b from-ai-cyan to-ai-purple rounded-full" />
            <h2 className="text-base font-semibold text-ai-cyan uppercase tracking-wider">Journey</h2>
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
            Learning Trajectory <span className="bg-gradient-to-r from-ai-cyan to-ai-blue bg-clip-text text-transparent">Graph</span>
          </h3>
          <p className="text-gray-300 text-lg max-w-2xl">
            My evolution as a software engineer and specialist in AI/ML and scalable systems
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* SVG Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ai-cyan via-ai-purple to-ai-blue md:transform md:-translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-ai-cyan to-transparent"
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </div>

          {/* Milestones */}
          <div className="space-y-8 md:space-y-12">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-start gap-4 md:gap-0 ${
                    isLeft ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Content */}
                  <motion.div
                    className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-8 text-right md:text-left" : "md:pl-8"}`}
                    onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                    role="button"
                    tabIndex={0}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="relative p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/8 to-white/2 hover:border-ai-cyan/30 transition-all duration-300 cursor-pointer group"
                    >
                      {/* Top accent */}
                      <motion.div
                        className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${milestone.color} rounded-t-lg`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                        viewport={{ once: true }}
                      />

                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-br ${milestone.color} text-white group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-widest">Year</p>
                          <p className="text-lg font-bold text-white">{milestone.year}</p>
                        </div>
                      </div>

                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-ai-cyan transition-colors">
                        {milestone.title}
                      </h4>

                      <motion.p
                        initial={{ opacity: expandedIndex !== index ? 0.6 : 1 }}
                        animate={{ opacity: expandedIndex === index ? 1 : 0.6 }}
                        className="text-sm text-gray-300 leading-relaxed"
                      >
                        {milestone.description}
                      </motion.p>

                      {milestone.isCurrent && (
                        <motion.div
                          className="mt-4 px-3 py-1 inline-block rounded-full bg-gradient-to-r from-ai-cyan/20 to-ai-purple/20 border border-ai-cyan/50"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <span className="text-xs font-bold text-ai-cyan">Currently Here</span>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Timeline Dot */}
                  <motion.div
                    className="flex justify-center items-start pt-2 md:pt-0"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className={`w-6 h-6 rounded-full border-4 border-ai-slate bg-gradient-to-br ${milestone.color} relative z-10`}
                      whileHover={{ scale: 1.4 }}
                      animate={expandedIndex === index ? { scale: 1.3 } : { scale: 1 }}
                    >
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${milestone.color} blur-lg opacity-50`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Legend/Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          {[
            { label: "Years Experience", value: "5+" },
            { label: "Milestones", value: "6" },
            { label: "Technologies", value: "30+" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-lg border border-white/10 bg-white/5 hover:border-ai-cyan/30 transition-all"
            >
              <motion.p
                className="text-4xl font-black bg-gradient-to-r from-ai-cyan to-ai-purple bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
