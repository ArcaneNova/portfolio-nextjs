"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "@/lib/framer-exports"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Lightbulb, 
  Brain, 
  Rocket, 
  ArrowRight, 
  GraduationCap, 
  TrendingUp, 
  Target, 
  Users,
  Zap,
  Heart,
  Briefcase,
  User,
  Code2,
  Building2,
  Globe,
  Sparkles,
  Star,
  Award,
  Coffee,
  Clock
} from "lucide-react"

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  
  const [activeTab, setActiveTab] = useState("who-i-am")
  
  const aboutSections = [
    { 
      id: "who-i-am", 
      title: "Who I Am",
      icon: <User className="w-6 h-6" />, 
      content: "I'm Md Arshad Noor, a software engineer and tech innovator from Bihar, India. My journey into programming began in 2016 when I launched my very first website. Since then, I've been captivated by how a few lines of code can change lives — by automating tasks, creating access, and delivering solutions. Today, I work across multiple domains — full-stack web development, mobile apps, artificial intelligence, and cloud-based systems. With every project, I strive for impact — not vanity metrics, but real-world utility.",
      gradient: "from-blue-500 to-cyan-500",
      stats: [
        { number: "9+", label: "Years Coding" },
        { number: "50+", label: "Projects Built" },
        { number: "10K+", label: "Lines of Code" }
      ]
    },
    { 
      id: "passion", 
      title: "My Passion",
      icon: <Rocket className="w-6 h-6" />, 
      content: "What excites me the most is building software that simplifies life and brings real value to people — especially in underserved or grassroots areas. From an AI-powered electricity forecasting system for the Indian power grid to a marketplace connecting farmers and street vendors, every project I build is purpose-driven. I continuously brainstorm, design, and ship SaaS products, AI tools, and mobile apps — each tailored to solve a specific challenge.",
      gradient: "from-purple-500 to-pink-500",
      stats: [
        { number: "5+", label: "SaaS Products" },
        { number: "3+", label: "AI Projects" },
        { number: "100%", label: "Purpose-Driven" }
      ]
    },
    { 
      id: "ai", 
      title: "AI & ML",
      icon: <Brain className="w-6 h-6" />, 
      content: "AI isn't just the future — it's the present, and it's reshaping every industry. I'm actively working with Large Language Models (LLMs), Computer Vision (pose detection, real-time analysis), Time-series forecasting (LSTM for energy prediction), and AI agents for voice automation. I believe AI, when applied thoughtfully, can multiply human capability and build next-generation businesses — fast, smart, and sustainable.",
      gradient: "from-green-500 to-emerald-500",
      stats: [
        { number: "10+", label: "AI Models" },
        { number: "5+", label: "ML Algorithms" },
        { number: "3+", label: "LLM Projects" }
      ]
    },
    { 
      id: "inspiration", 
      title: "What Drives Me",
      icon: <Heart className="w-6 h-6" />, 
      content: "What truly drives me is the desire to build things that matter. I don't just learn for the sake of certificates or resumes — I implement what I learn to solve real problems. Every time I ship a new project or see someone using my platform, I feel a step closer to my vision — to build a billion-dollar company, one product at a time. I draw inspiration from startups like Perplexity, Loveable, and Rewind — companies that show how even small teams with bold ideas can disrupt industries using AI.",
      gradient: "from-orange-500 to-red-500",
      stats: [
        { number: "∞", label: "Dream Big" },
        { number: "24/7", label: "Always Learning" },
        { number: "1B", label: "Dollar Vision" }
      ]
    }
  ]

  const principles = [
    { icon: <Target className="w-8 h-8" />, title: "Impact First", description: "Every project I build aims to solve real problems and create meaningful value" },
    { icon: <Lightbulb className="w-8 h-8" />, title: "Curiosity Driven", description: "Constantly learning new technologies and pushing boundaries of what's possible" },
    { icon: <Zap className="w-8 h-8" />, title: "Fast Execution", description: "Speed matters - I ship quickly, learn fast, and improve continuously" },
    { icon: <Building2 className="w-8 h-8" />, title: "Scale in Mind", description: "Building products that can grow from grassroots to global platforms" }
  ]

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
      {/* Premium background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)
            `,
          }} />
        </div>
      </div>

      <motion.div 
        style={{ opacity, y, scale }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-sm text-gray-300 mb-6"
          >
            <User className="w-4 h-4 mr-2 text-blue-400" />
            About Me — Who I Am
            <Sparkles className="w-4 h-4 ml-2 text-yellow-400" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Building the Future
            </span>
            <br />
            <span className="text-gray-200">One Line at a Time</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            A passionate builder focused on creating impact through innovative technology solutions
          </p>
        </motion.div>

        {/* Core Principles Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {principle.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{principle.title}</h3>
              <p className="text-gray-300 leading-relaxed">{principle.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {aboutSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`group flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === section.id
                  ? `bg-gradient-to-r ${section.gradient} text-white shadow-xl scale-105`
                  : 'bg-white/5 backdrop-blur-md border border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:scale-105'
              }`}
            >
              <span className={`mr-2 transition-transform duration-300 ${activeTab === section.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                {section.icon}
              </span>
              {section.title}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <div className="relative">
          {aboutSections.map((section) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: activeTab === section.id ? 1 : 0,
                y: activeTab === section.id ? 0 : 20
              }}
              transition={{ duration: 0.5 }}
              className={`${activeTab === section.id ? 'relative' : 'absolute inset-0 pointer-events-none'}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                {/* Content */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: activeTab === section.id ? 1 : 0, x: activeTab === section.id ? 0 : -50 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"
                  >
                    <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${section.gradient} text-white font-semibold mb-6`}>
                      {section.icon}
                      <span className="ml-2">{section.title}</span>
                    </div>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                      {section.content}
                    </p>
                    
                    {/* Key Values */}
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold flex items-center">
                        <Star className="w-4 h-4 mr-2 text-yellow-400" />
                        I take pride in:
                      </h4>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3" />
                          Writing clean, maintainable code
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                          Designing products people love to use
                        </li>
                        <li className="flex items-center">
                          <div className="w-2 h-2 bg-pink-400 rounded-full mr-3" />
                          Optimizing systems for speed, scale, and simplicity
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: activeTab === section.id ? 1 : 0, x: activeTab === section.id ? 0 : 50 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-6"
                >
                  {section.stats.map((stat, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center group hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className={`text-4xl font-black bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                        {stat.number}
                      </div>
                      <div className="text-gray-300 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education & Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Education */}
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="flex items-center mb-6">
              <GraduationCap className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-2xl font-bold text-white">Education & Learning</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Currently in the final year of my B.Tech in Computer Science. While my university curriculum revolves around traditional technologies, I chose to go beyond the syllabus, mastering modern stacks like React, Next.js, Node.js, AI/ML tools, and cloud technologies.
            </p>
            <div className="flex items-center text-cyan-400 font-semibold">
              <Clock className="w-4 h-4 mr-2" />
              My goal: Build, launch, and deliver impact in the real world
            </div>
          </div>

          {/* Vision */}
          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-8 h-8 text-purple-400 mr-3" />
              <h3 className="text-2xl font-bold text-white">Market Vision</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              We're living in a time where solo founders are building billion-dollar startups using AI + automation. I stay tuned to market trends, observe what's working, and build accordingly — with speed of execution and problem-first thinking.
            </p>
            <div className="flex items-center text-pink-400 font-semibold">
              <Award className="w-4 h-4 mr-2" />
              Mission: Keep learning, building, and launching until I reach my dream valuation
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="p-12 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md border border-white/10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Let's Build Something 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Amazing Together</span>
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              If you believe in building bold, impactful products — let's connect and create something extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#projects">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-4 text-lg font-semibold rounded-xl shadow-xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                  <Briefcase className="w-5 h-5 mr-2" />
                  View My Projects
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="#contact">
                <Button variant="outline" size="lg" className="border-2 border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/30 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
                  <Users className="w-5 h-5 mr-2" />
                  Let's Collaborate
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
