"use client"

import { useState } from "react"
import { motion } from "@/lib/framer-exports"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, GraduationCap, BookOpen, Rocket, Brain } from "lucide-react"
import ParticleBackground from "@/components/particle-background"

// Educational journey milestones data
const educationMilestones = [
  {
    year: "2019",
    title: "Passed 10th",
    description: "Passed my 10th examination and got 81% marks.",
    icon: BookOpen,
    color: "bg-gradient-to-r from-blue-400 to-indigo-600"
  },
  {
    year: "2021",
    title: "Passed 12th",
    description: "Passed my 12th examination and got 73% marks.",
    icon: GraduationCap,
    color: "bg-gradient-to-r from-purple-500 to-indigo-600"
  },
  {
    year: "2022",
    title: "Started My Bachelor's Degree",
    description: "Started my Bachelor's degree in Computer Science, focusing on algorithms and programming fundamentals.",
    icon: Rocket,
    color: "bg-gradient-to-r from-indigo-500 to-blue-600"
  },
  {
    year: "2024",
    title: "ML/AI Focus",
    description: "Shifted focus to Machine Learning and Artificial Intelligence, by taking machine learning as minor subject.",
    icon: Brain,
    color: "bg-gradient-to-r from-cyan-500 to-purple-600"
  }
]

export default function JourneySection() {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-muted/30">
      {/* Background particle decorations */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <ParticleBackground />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
              My Journey
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The path I've traveled through education and technology, constantly learning and growing
          </motion.p>
          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </div>

        {/* Timeline for desktop */}
        <div className="hidden md:block relative">
          {/* Central line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-indigo-500 rounded-full"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />

          {/* Timeline items */}
          {educationMilestones.map((milestone, index) => (
            <motion.div
              key={milestone.year} 
              className={`mb-24 flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className={`w-1/2 p-6 ${index % 2 === 0 ? "text-right pr-12" : "text-left pl-12"}`}>
                <motion.div
                  initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <span className="text-sm font-semibold inline-block px-3 py-1 rounded-full bg-primary/10 text-primary mb-3">
                    {milestone.year}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </motion.div>
              </div>
              
              {/* Center point */}
              <motion.div 
                className="absolute z-10 left-1/2 transform -translate-x-1/2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15, 
                  delay: 0.5 + index * 0.1 
                }}
              >
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${milestone.color} text-white`}
                >
                  <milestone.icon className="h-6 w-6" />
                </div>
              </motion.div>

              <div className="w-1/2"></div>
            </motion.div>
          ))}
                  </div>
                  
        {/* Timeline for mobile */}
        <div className="md:hidden space-y-12">
          {/* Vertical line */}
          <motion.div 
            className="absolute left-4 top-32 w-1 h-[calc(100%-200px)] bg-gradient-to-b from-purple-500 via-blue-500 to-indigo-500 rounded-full"
            initial={{ height: 0 }}
            whileInView={{ height: "calc(100% - 200px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
          
          {educationMilestones.map((milestone, index) => (
            <motion.div 
              key={milestone.year}
              className="relative pl-12"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline dot */}
              <motion.div 
                className="absolute left-0 top-0 z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15, 
                  delay: 0.2 
                }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${milestone.color} text-white`}>
                  <milestone.icon className="h-4 w-4" />
                </div>
              </motion.div>
              
              <div className="bg-card border border-border rounded-lg p-5 shadow-md">
                <span className="text-sm font-semibold inline-block px-2 py-1 rounded-full bg-primary/10 text-primary mb-2">
                  {milestone.year}
                </span>
                <h3 className="text-lg font-bold mb-2">{milestone.title}</h3>
                <p className="text-sm text-muted-foreground">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-muted-foreground mb-6">Want to know more about my journey?</p>
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white relative z-10"
          >
            <Link href="/journey" className="flex items-center gap-2">
              View Full Journey <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
