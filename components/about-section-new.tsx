"use client"

import { useState } from "react"
import { motion } from "@/lib/framer-exports"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Brain, Rocket, Target, Code, Zap, ArrowRight } from "lucide-react"

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState("who")

  const tabs = [
    { id: "who", label: "Who I Am", icon: <Brain className="w-4 h-4" /> },
    { id: "expertise", label: "Expertise", icon: <Rocket className="w-4 h-4" /> },
    { id: "passion", label: "My Vision", icon: <Target className="w-4 h-4" /> }
  ]

  const stats = [
    { icon: "🧠", value: "3+", label: "Years Coding" },
    { icon: "📦", value: "50+", label: "Projects" },
    { icon: "🚀", value: "5", label: "SaaS Products" },
    { icon: "👥", value: "100K+", label: "Users Impacted" }
  ]

  const expertiseAreas = [
    { title: "Frontend", skills: "React, Next.js, TypeScript, Tailwind", color: "from-ai-cyan to-ai-blue" },
    { title: "Backend", skills: "Node.js, Python, FastAPI, GraphQL", color: "from-ai-purple to-ai-cyan" },
    { title: "AI/ML", skills: "LLMs, TensorFlow, LangChain, Computer Vision", color: "from-ai-blue to-ai-purple" },
    { title: "Full Stack", skills: "SaaS, Scalable Systems, Database Design", color: "from-ai-cyan to-ai-purple" }
  ]

  return (
    <section id="about" className="py-20 px-6 sm:px-12 relative bg-gradient-to-b from-ai-slate/50 to-ai-zinc overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-gray-400/70 max-w-2xl mx-auto mb-6">
            Software engineer with deep passion for AI/ML, building scalable systems that solve real problems
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-ai-cyan to-ai-purple mx-auto" />
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-ai-cyan to-ai-purple text-white shadow-glow-md"
                  : "bg-ai-slate/20 border border-ai-cyan/10 text-gray-300 hover:border-ai-cyan/30"
              }`}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {activeTab === "who" && (
              <>
                <div className="space-y-4">
                  <p className="text-lg text-gray-300/80 leading-relaxed">
                    <span className="text-ai-cyan font-semibold">Md Arshad Noor</span> — A self-made technologist from Bihar, India, passionate about building intelligent systems.
                  </p>
                  <p className="text-gray-400/70 leading-relaxed">
                    My journey started in 2016 with HTML. Today, I've built 50+ projects, 5 SaaS products, and impacted 100K+ users worldwide. Every line of code is a step toward creating products that matter.
                  </p>
                  <p className="text-gray-400/70 leading-relaxed">
                    Not backed by VCs or massive teams. Powered by ambition, belief, and an obsession with shipping value.
                  </p>
                </div>
              </>
            )}

            {activeTab === "expertise" && (
              <div className="grid grid-cols-2 gap-4">
                {expertiseAreas.map((area, idx) => (
                  <motion.div
                    key={area.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className={`p-4 rounded-lg border border-ai-cyan/10 bg-ai-cyan/5 hover:border-ai-cyan/20 transition-all group`}
                  >
                    <h4 className={`font-bold mb-2 bg-gradient-to-r ${area.color} bg-clip-text text-transparent`}>
                      {area.title}
                    </h4>
                    <p className="text-sm text-gray-400/70 group-hover:text-gray-300 transition-colors">
                      {area.skills}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "passion" && (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Zap className="w-5 h-5 text-ai-cyan flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white mb-1">Build Fast, Think Big</p>
                    <p className="text-sm text-gray-400/70">Ship without permission. Iterate based on user feedback.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Code className="w-5 h-5 text-ai-purple flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white mb-1">AI-Powered Future</p>
                    <p className="text-sm text-gray-400/70">Create tools that leverage machine learning to solve complex problems.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Rocket className="w-5 h-5 text-ai-blue flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-white mb-1">Scale with Impact</p>
                    <p className="text-sm text-gray-400/70">Build systems that serve millions while maintaining quality and simplicity.</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg border border-ai-cyan/10 bg-ai-cyan/5 hover:border-ai-cyan/30 hover:bg-ai-cyan/10 transition-all group"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-black bg-gradient-to-r from-ai-cyan to-ai-purple bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="text-sm text-gray-400/70 group-hover:text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-ai-cyan to-ai-blue text-white hover:shadow-glow-md"
          >
            <Link href="/#projects">
              Explore My Work
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
