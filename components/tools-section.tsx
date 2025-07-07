"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "@/lib/framer-exports"
import { 
  Code2, 
  Database, 
  Cpu, 
  Globe, 
  Smartphone, 
  Cloud, 
  Terminal,
  Zap,
  Layers,
  GitBranch,
  Palette,
  ShieldCheck,
  Sparkles,
  CircuitBoard,
  Monitor,
  Server,
  Bot,
  Atom
} from "lucide-react"

const techCategories = [
  {
    id: "frontend",
    title: "Frontend",
    color: "cyber-cyan",
    icon: <Monitor className="w-6 h-6" />,
    gradient: "from-cyan-500 to-blue-500",
    tools: [
      { name: "React", level: 95, icon: "⚛️", description: "Component-based UI library" },
      { name: "Next.js", level: 92, icon: "▲", description: "Full-stack React framework" },
      { name: "TypeScript", level: 90, icon: "📘", description: "Type-safe JavaScript" },
      { name: "Tailwind CSS", level: 94, icon: "🎨", description: "Utility-first CSS framework" },
      { name: "Framer Motion", level: 88, icon: "🎬", description: "Animation library" },
      { name: "Three.js", level: 75, icon: "🌐", description: "3D graphics library" }
    ]
  },
  {
    id: "backend",
    title: "Backend",
    color: "neon-purple",
    icon: <Server className="w-6 h-6" />,
    gradient: "from-purple-500 to-pink-500",
    tools: [
      { name: "Node.js", level: 93, icon: "💚", description: "JavaScript runtime" },
      { name: "Python", level: 89, icon: "🐍", description: "Versatile programming language" },
      { name: "FastAPI", level: 87, icon: "⚡", description: "Modern Python web framework" },
      { name: "Golang", level: 82, icon: "🔥", description: "High-performance language" },
      { name: "GraphQL", level: 78, icon: "📊", description: "Query language for APIs" },
      { name: "REST APIs", level: 92, icon: "🔗", description: "RESTful web services" }
    ]
  },
  {
    id: "database",
    title: "Database",
    color: "neon-green",
    icon: <Database className="w-6 h-6" />,
    gradient: "from-green-500 to-emerald-500",
    tools: [
      { name: "PostgreSQL", level: 90, icon: "🐘", description: "Advanced SQL database" },
      { name: "MongoDB", level: 88, icon: "🍃", description: "NoSQL document database" },
      { name: "Redis", level: 85, icon: "🔴", description: "In-memory data store" },
      { name: "Supabase", level: 86, icon: "⚡", description: "Firebase alternative" },
      { name: "Prisma", level: 83, icon: "💎", description: "Next-gen ORM" },
      { name: "Firebase", level: 81, icon: "🔥", description: "Google's app platform" }
    ]
  },
  {
    id: "ai",
    title: "AI & ML",
    color: "electric-blue",
    icon: <Bot className="w-6 h-6" />,
    gradient: "from-blue-500 to-indigo-500",
    tools: [
      { name: "OpenAI GPT", level: 92, icon: "🤖", description: "Large language models" },
      { name: "TensorFlow", level: 85, icon: "🧠", description: "Machine learning framework" },
      { name: "PyTorch", level: 82, icon: "🔥", description: "Deep learning framework" },
      { name: "LangChain", level: 88, icon: "⛓️", description: "LLM application framework" },
      { name: "Computer Vision", level: 80, icon: "👁️", description: "Image processing & analysis" },
      { name: "LSTM/RNN", level: 78, icon: "🔄", description: "Time series forecasting" }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    color: "orange",
    icon: <Cloud className="w-6 h-6" />,
    gradient: "from-orange-500 to-red-500",
    tools: [
      { name: "Docker", level: 87, icon: "🐳", description: "Containerization platform" },
      { name: "AWS", level: 84, icon: "☁️", description: "Cloud computing services" },
      { name: "Vercel", level: 92, icon: "▲", description: "Frontend cloud platform" },
      { name: "GitHub Actions", level: 86, icon: "⚙️", description: "CI/CD automation" },
      { name: "Nginx", level: 82, icon: "🌐", description: "Web server & reverse proxy" },
      { name: "Railway", level: 89, icon: "🚄", description: "Infrastructure platform" }
    ]
  },
  {
    id: "mobile",
    title: "Mobile",
    color: "pink",
    icon: <Smartphone className="w-6 h-6" />,
    gradient: "from-pink-500 to-rose-500",
    tools: [
      { name: "React Native", level: 87, icon: "📱", description: "Cross-platform mobile apps" },
      { name: "Expo", level: 90, icon: "🚀", description: "React Native development platform" },
      { name: "Flutter", level: 75, icon: "🦋", description: "Google's UI toolkit" },
      { name: "Progressive PWA", level: 88, icon: "📲", description: "Progressive web apps" },
      { name: "Native iOS", level: 70, icon: "🍎", description: "iOS app development" },
      { name: "Android", level: 72, icon: "🤖", description: "Android app development" }
    ]
  }
]

export default function ToolsSection() {
  const [activeCategory, setActiveCategory] = useState("frontend")
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60])

  const activeTools = techCategories.find(cat => cat.id === activeCategory)?.tools || []

  return (
    <section id="tools" className="relative py-24 overflow-hidden bg-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      {/* Floating tech icons */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[<Code2 />, <Database />, <Cpu />, <Cloud />, <Bot />][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      <motion.div 
        ref={containerRef}
        style={{ opacity, y }}
        className="container mx-auto px-6 relative z-10"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-cyber-cyan text-sm font-medium mb-8 neon-cyan"
          >
            <CircuitBoard className="w-4 h-4" />
            <span>Tech Arsenal</span>
            <Sparkles className="w-4 h-4" />
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold font-space-grotesk mb-6">
            <span className="text-cyber-gradient">
              Tools I Master
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            From frontend magic to AI wizardry — here's my complete 
            <span className="text-cyber-cyan"> technical toolkit</span> for building 
            <span className="text-neon-purple"> next-generation</span> solutions
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {techCategories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group flex items-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all duration-300 relative overflow-hidden ${
                activeCategory === category.id
                  ? `glass neon-${category.color} text-${category.color}`
                  : 'glass-strong text-gray-400 hover:text-white hover:glass'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Holographic effect */}
              <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              
              <div className={`relative ${activeCategory === category.id ? `text-${category.color}` : 'text-gray-400 group-hover:text-white'} transition-colors duration-300`}>
                {category.icon}
              </div>
              
              <span className="relative z-10">{category.title}</span>
              
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className={`absolute inset-0 neon-${category.color} rounded-2xl`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeTools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredTool(tool.name)}
              onHoverEnd={() => setHoveredTool(null)}
              className={`group glass-strong rounded-2xl p-6 relative overflow-hidden hover-glow-${techCategories.find(cat => cat.id === activeCategory)?.color} transition-all duration-300`}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Scanline effect */}
              <div className="absolute inset-0 scanlines opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
              
              {/* Tool header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">{tool.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyber-cyan transition-colors duration-300">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {tool.description}
                  </p>
                </div>
                <div className={`text-2xl font-bold text-${techCategories.find(cat => cat.id === activeCategory)?.color}`}>
                  {tool.level}%
                </div>
              </div>

              {/* Skill bar */}
              <div className="relative">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Proficiency</span>
                  <motion.span 
                    className={`text-sm font-medium text-${techCategories.find(cat => cat.id === activeCategory)?.color}`}
                    animate={{ 
                      scale: hoveredTool === tool.name ? 1.1 : 1,
                      textShadow: hoveredTool === tool.name ? '0 0 10px currentColor' : '0 0 0px currentColor'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {tool.level}%
                  </motion.span>
                </div>
                
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${tool.level}%` } : { width: 0 }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${techCategories.find(cat => cat.id === activeCategory)?.gradient} rounded-full relative overflow-hidden`}
                  >
                    {/* Animated shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Hover effect overlay */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${techCategories.find(cat => cat.id === activeCategory)?.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Technologies", value: "30+", icon: <Code2 className="w-8 h-8" />, color: "cyber-cyan" },
            { label: "Years Experience", value: "8+", icon: <Zap className="w-8 h-8" />, color: "neon-purple" },
            { label: "Projects Built", value: "50+", icon: <Layers className="w-8 h-8" />, color: "neon-green" },
            { label: "AI Models", value: "15+", icon: <Bot className="w-8 h-8" />, color: "electric-blue" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.05 }}
              className={`glass-strong rounded-2xl p-6 text-center group hover-glow-${stat.color} relative overflow-hidden`}
            >
              <div className="absolute inset-0 holographic opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              
              <div className={`text-${stat.color} mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className={`text-3xl font-bold text-${stat.color} mb-2 font-space-grotesk`}>
                {stat.value}
              </div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
