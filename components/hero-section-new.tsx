"use client"

import React, { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { motion } from "@/lib/framer-exports"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ArrowRight, Sparkles, ChevronDown } from "lucide-react"

const roles = [
  "Full Stack Developer",
  "AI/ML Engineer",
  "Blockchain / Web 3.O Developer",
  "App Developer",
  "System Designer",
  "SaaS Builder",
  "Founder"
]

const stats = [
  { number: "50+", label: "Projects", icon: "📦", sparkline: [20, 35, 28, 42, 45, 50] },
  { number: "100K+", label: "Users", icon: "👥", sparkline: [10, 30, 45, 65, 85, 100] },
  { number: "5", label: "Products", icon: "🚀", sparkline: [1, 2, 2, 3, 4, 5] }
]

// Neural Network Node
interface NeuralNode {
  id: string
  x: number
  y: number
  layer: number
  connections: string[]
  isActive: boolean
}

// Generate neural network nodes
const generateNeuralNetwork = () => {
  const nodes: NeuralNode[] = []
  const layers = 4
  const nodesPerLayer = 6
  
  // Create nodes
  for (let layer = 0; layer < layers; layer++) {
    for (let node = 0; node < nodesPerLayer; node++) {
      const id = `node-${layer}-${node}`
      nodes.push({
        id,
        x: (layer / (layers - 1)) * 100,
        y: ((node + 1) / (nodesPerLayer + 1)) * 100,
        layer,
        connections: [],
        isActive: Math.random() > 0.6
      })
    }
  }
  
  // Create connections between adjacent layers
  for (let layer = 0; layer < layers - 1; layer++) {
    for (let node = 0; node < nodesPerLayer; node++) {
      const currentId = `node-${layer}-${node}`
      const nextNode = Math.floor(Math.random() * nodesPerLayer)
      const nextId = `node-${layer + 1}-${nextNode}`
      const currentNode = nodes.find(n => n.id === currentId)
      if (currentNode) {
        currentNode.connections.push(nextId)
      }
    }
  }
  
  return nodes
}

// Sparkline chart component
const SparklineChart: React.FC<{ data: number[] }> = ({ data }) => {
  const max = Math.max(...data)
  const width = 40
  const height = 20
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - (value / max) * height
    return `${x},${y}`
  }).join(' ')
  
  return (
    <svg width={width} height={height} className="w-full h-5">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export default function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [neuralNodes, setNeuralNodes] = useState<NeuralNode[]>([])
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set())

  // Initialize neural network
  useEffect(() => {
    setNeuralNodes(generateNeuralNetwork())
  }, [])

  // Animate active nodes
  useEffect(() => {
    if (neuralNodes.length === 0) return
    
    const interval = setInterval(() => {
      const newActiveNodes = new Set<string>()
      neuralNodes.forEach(node => {
        if (Math.random() > 0.7) {
          newActiveNodes.add(node.id)
        }
      })
      setActiveNodes(newActiveNodes)
    }, 800)
    
    return () => clearInterval(interval)
  }, [neuralNodes])

  useEffect(() => {
    const currentRole = roles[currentRoleIndex]
    const isCompleted = displayText === currentRole
    const isEmpty = displayText === ""
    
    if (!isDeleting && isCompleted) {
      setTimeout(() => setIsDeleting(true), 2000)
      return
    }
    
    if (isDeleting && isEmpty) {
      setIsDeleting(false)
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
      return
    }
    
    const timeout = setTimeout(() => {
      setDisplayText(prev => {
        if (isDeleting) {
          return currentRole.substring(0, prev.length - 1)
        } else {
          return currentRole.substring(0, prev.length + 1)
        }
      })
    }, isDeleting ? 50 : 100)
    
    return () => clearTimeout(timeout)
  }, [currentRoleIndex, displayText, isDeleting])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20 bg-gradient-to-b from-ai-slate to-ai-zinc">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 -z-10 opacity-5" style={{
        backgroundImage: 'linear-gradient(90deg, var(--color-ai-cyan) 1px, transparent 1px), linear-gradient(var(--color-ai-cyan) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Neural Network Background - Desktop Only */}
      <div className="hidden lg:block absolute inset-0 -z-10 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 800">
          {/* Draw connections */}
          {neuralNodes.map(node => (
            <g key={`connections-${node.id}`}>
              {node.connections.map(connId => {
                const targetNode = neuralNodes.find(n => n.id === connId)
                if (!targetNode) return null
                return (
                  <motion.line
                    key={`line-${node.id}-${connId}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${targetNode.x}%`}
                    y2={`${targetNode.y}%`}
                    stroke="url(#gradient)"
                    strokeWidth="1"
                    opacity={activeNodes.has(node.id) ? 0.6 : 0.2}
                    animate={{ opacity: activeNodes.has(node.id) ? 0.6 : 0.2 }}
                    transition={{ duration: 0.3 }}
                  />
                )
              })}
            </g>
          ))}
          {/* Draw nodes */}
          {neuralNodes.map(node => (
            <motion.g key={node.id}>
              <motion.circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="6"
                fill={activeNodes.has(node.id) ? '#06B6D4' : '#1e293b'}
                animate={{
                  r: activeNodes.has(node.id) ? 8 : 6,
                  fill: activeNodes.has(node.id) ? '#06B6D4' : '#1e293b'
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.g>
          ))}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Greeting Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ai-cyan/20 bg-ai-cyan/5 mb-8"
          >
            <Sparkles className="w-4 h-4 text-ai-cyan" />
            <span className="text-sm text-ai-cyan font-medium">Welcome to my digital ecosystem</span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-ai-cyan via-ai-purple to-ai-blue bg-clip-text text-transparent mb-4">
            Md Arshad Noor
          </h1>

          {/* Typewriter Role with Glow */}
          <div className="h-16 flex items-center justify-center mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-ai-cyan/20 to-ai-blue/20 blur-lg" />
              <p className="relative text-2xl md:text-3xl font-semibold text-white">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-ai-cyan ml-1"
                >
                  |
                </motion.span>
              </p>
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Building AI-powered solutions, scalable systems, and products that matter.
            <br className="hidden sm:block" />
            Specializing in machine learning, full-stack development, and SaaS architecture.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-ai-cyan to-ai-blue text-white hover:shadow-glow-md transition-all"
            >
              <Link href="/#projects">
                Explore My Work
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-ai-cyan/30 hover:border-ai-cyan/60 text-ai-cyan"
            >
              <Link href="/#contact">Get In Touch</Link>
            </Button>
          </motion.div>

          {/* Stats with Sparklines */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-5 rounded-lg border border-white/10 bg-gradient-to-br from-white/8 to-white/2 hover:border-ai-cyan/30 hover:from-white/12 hover:to-white/4 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-ai-cyan/0 via-ai-cyan/50 to-ai-cyan/0 rounded-t-lg group-hover:via-ai-cyan/80 transition-all duration-300" />
                
                <div className="text-2xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-black bg-gradient-to-r from-ai-cyan to-ai-purple bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-xs text-gray-400 mb-3">{stat.label}</p>
                
                {/* Sparkline */}
                <div className="h-6 flex items-center justify-center text-ai-cyan opacity-60 group-hover:opacity-100 transition-opacity">
                  <SparklineChart data={stat.sparkline} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-6 justify-center mb-16"
          >
            <motion.a
              href="https://github.com/ArcaneNova"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-3 rounded-full border border-ai-cyan/30 text-ai-cyan hover:bg-ai-cyan/10 transition-all"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/mdarshadnoor"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="p-3 rounded-full border border-ai-purple/30 text-ai-purple hover:bg-ai-purple/10 transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="mailto:arshadnoor585@gmail.com"
              whileHover={{ scale: 1.1 }}
              className="p-3 rounded-full border border-ai-blue/30 text-ai-blue hover:bg-ai-blue/10 transition-all"
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-ai-cyan" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
