"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "@/lib/framer-exports"
import { 
  Code, 
  Database, 
  Server, 
  Brain,
  Cloud,
  Smartphone,
  GitBranch,
  Terminal,
  Globe,
  Cpu,
  Zap,
  Shield,
  Rocket,
  Layers,
  Settings,
  Sparkles
} from "lucide-react"

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend & Design",
    icon: <Globe className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "Next.js", level: 92, icon: "▲" },
      { name: "TypeScript", level: 88, icon: "🔷" },
      { name: "Tailwind CSS", level: 90, icon: "🎨" },
      { name: "Framer Motion", level: 85, icon: "🎭" },
      { name: "Figma", level: 80, icon: "🎯" }
    ]
  },
  {
    id: "backend",
    title: "Backend & API",
    icon: <Server className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "Node.js", level: 93, icon: "💚" },
      { name: "Python", level: 90, icon: "🐍" },
      { name: "FastAPI", level: 87, icon: "⚡" },
      { name: "Express.js", level: 88, icon: "🌐" },
      { name: "GraphQL", level: 82, icon: "🔗" },
      { name: "REST APIs", level: 95, icon: "🔄" }
    ]
  },
  {
    id: "database",
    title: "Database & Storage",
    icon: <Database className="w-6 h-6" />,
    color: "from-green-500 to-teal-500",
    skills: [
      { name: "MongoDB", level: 90, icon: "🍃" },
      { name: "PostgreSQL", level: 85, icon: "🐘" },
      { name: "Redis", level: 80, icon: "🔴" },
      { name: "Supabase", level: 83, icon: "⚡" },
      { name: "Prisma", level: 87, icon: "🔺" },
      { name: "Firebase", level: 78, icon: "🔥" }
    ]
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    icon: <Brain className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "OpenAI API", level: 92, icon: "🤖" },
      { name: "TensorFlow", level: 85, icon: "🧠" },
      { name: "LSTM Networks", level: 82, icon: "🔄" },
      { name: "Computer Vision", level: 80, icon: "👁️" },
      { name: "LangChain", level: 88, icon: "⛓️" },
      { name: "Hugging Face", level: 83, icon: "🤗" }
    ]
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: <Cloud className="w-6 h-6" />,
    color: "from-indigo-500 to-purple-500",
    skills: [
      { name: "AWS", level: 87, icon: "☁️" },
      { name: "Docker", level: 85, icon: "🐳" },
      { name: "Vercel", level: 92, icon: "▲" },
      { name: "Git/GitHub", level: 95, icon: "🔧" },
      { name: "CI/CD", level: 80, icon: "🔄" },
      { name: "Linux", level: 83, icon: "🐧" }
    ]
  },
  {
    id: "mobile",
    title: "Mobile & Cross-Platform",
    icon: <Smartphone className="w-6 h-6" />,
    color: "from-pink-500 to-rose-500",
    skills: [
      { name: "React Native", level: 85, icon: "📱" },
      { name: "Expo", level: 88, icon: "🚀" },
      { name: "Flutter", level: 75, icon: "💙" },
      { name: "PWA", level: 90, icon: "📲" },
      { name: "Tauri", level: 70, icon: "🦀" },
      { name: "Electron", level: 78, icon: "⚛️" }
    ]
  }
]

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("frontend")
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60])

  const activeSkills = skillCategories.find(cat => cat.id === activeCategory)?.skills || []
  const activeCategoryInfo = skillCategories.find(cat => cat.id === activeCategory)

  const SkillBar = ({ skill, index }: { skill: any, index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="text-white font-medium">{skill.name}</span>
        </div>
        <span className="text-gray-400 text-sm font-mono">{skill.level}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${activeCategoryInfo?.color} rounded-full relative`}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  )

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <motion.div 
        ref={containerRef}
        style={{ opacity, y }}
        className="container mx-auto px-6"
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm backdrop-blur-sm mb-6"
          >
            <Code className="w-4 h-4" />
            <span>Tech Stack</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Tools I Master
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            I write clean, maintainable code and design products people love to use. 
            Optimizing systems for speed, scale, and simplicity.
          </p>
        </motion.div>

        {/* Skill Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {skillCategories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`p-4 rounded-2xl transition-all duration-300 border backdrop-blur-sm group ${
                activeCategory === category.id
                  ? `bg-gradient-to-r ${category.color} border-white/20 shadow-lg`
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`mb-2 flex justify-center ${
                activeCategory === category.id ? 'text-white' : 'text-purple-400 group-hover:text-purple-300'
              }`}>
                {category.icon}
              </div>
              <h3 className={`text-sm font-medium text-center ${
                activeCategory === category.id ? 'text-white' : 'text-gray-400 group-hover:text-white'
              }`}>
                {category.title}
              </h3>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
        >
          {/* Category Header */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className={`p-3 rounded-xl bg-gradient-to-r ${activeCategoryInfo?.color}`}>
              {activeCategoryInfo?.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{activeCategoryInfo?.title}</h3>
              <p className="text-gray-400">Professional proficiency levels</p>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeSkills.map((skill, index) => (
              <SkillBar key={`${activeCategory}-${skill.name}`} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {[
            {
              icon: <Rocket className="w-8 h-8" />,
              title: "Fast Learner",
              description: "I quickly adapt to new technologies and frameworks, staying ahead of industry trends.",
              gradient: "from-purple-500 to-pink-500"
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Performance Focused",
              description: "I optimize code for speed and efficiency, ensuring seamless user experiences.",
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Best Practices",
              description: "I follow industry standards and write maintainable, scalable, and secure code.",
              gradient: "from-green-500 to-teal-500"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} text-white mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Learning Journey */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-3xl backdrop-blur-sm"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h3 className="text-2xl font-bold text-white">Always Learning</h3>
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Technology evolves rapidly, and so do I. I'm constantly exploring new tools, 
            frameworks, and methodologies to stay at the forefront of innovation. 
            Currently diving deep into advanced AI/ML techniques and exploring Web3 technologies.
          </p>
        </motion.div>
      </motion.div>

      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
    </section>
  )
}
