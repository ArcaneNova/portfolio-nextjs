"use client"

import { useState } from "react"
import { motion } from "@/lib/framer-exports"
import { 
  BrainCircuit, 
  Server, 
  Laptop, 
  Wrench,
  Braces,
  LayoutTemplate,
  FileCode,
  Database,
  Cloud,
  GitBranch,
  Terminal,
  CircuitBoard,
  PanelLeft,
  Container
} from "lucide-react"

interface SkillCategory {
  name: string
  icon: React.ReactNode
  skills: {
    name: string
    level: number
    color?: string
  }[]
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    icon: <LayoutTemplate className="w-5 h-5" />,
    skills: [
      { name: "React", level: 95, color: "#61DAFB" },
      { name: "Next.js", level: 90, color: "#000000" },
      { name: "TypeScript", level: 85, color: "#3178C6" },
      { name: "Tailwind CSS", level: 90, color: "#38B2AC" },
      { name: "HTML/CSS", level: 95, color: "#E34F26" },
    ],
  },
  {
    name: "Backend",
    icon: <Server className="w-5 h-5" />,
    skills: [
      { name: "Node.js", level: 90, color: "#339933" },
      { name: "Express", level: 85, color: "#000000" },
      { name: "MongoDB", level: 80, color: "#47A248" },
      { name: "PostgreSQL", level: 75, color: "#336791" },
      { name: "Docker", level: 70, color: "#2496ED" },
    ],
  },
  {
    name: "Machine Learning",
    icon: <BrainCircuit className="w-5 h-5" />,
    skills: [
      { name: "Python", level: 90, color: "#3776AB" },
      { name: "TensorFlow", level: 80, color: "#FF6F00" },
      { name: "PyTorch", level: 75, color: "#EE4C2C" },
      { name: "Scikit-learn", level: 85, color: "#F7931E" },
      { name: "Data Analysis", level: 80, color: "#4B8BBE" },
    ],
  },
  {
    name: "DevOps & Tools",
    icon: <Wrench className="w-5 h-5" />,
    skills: [
      { name: "Git", level: 90, color: "#F05032" },
      { name: "AWS", level: 75, color: "#FF9900" },
      { name: "CI/CD", level: 80, color: "#40AF63" },
      { name: "Kubernetes", level: 65, color: "#326CE5" },
      { name: "Testing", level: 85, color: "#9B4DCA" },
    ],
  },
]

// Tech stack with icons from Lucide
const techStack = [
  { name: "JavaScript", icon: <FileCode className="w-7 h-7 text-yellow-400" />, color: "text-yellow-400/20" },
  { name: "TypeScript", icon: <FileCode className="w-7 h-7 text-blue-400" />, color: "text-blue-400/20" },
  { name: "React", icon: <CircuitBoard className="w-7 h-7 text-sky-400" />, color: "text-sky-400/20" },
  { name: "Next.js", icon: <PanelLeft className="w-7 h-7 text-neutral-100" />, color: "text-neutral-100/20" },
  { name: "Node.js", icon: <Server className="w-7 h-7 text-green-500" />, color: "text-green-500/20" },
  { name: "Python", icon: <Terminal className="w-7 h-7 text-blue-500" />, color: "text-blue-500/20" },
  { name: "MongoDB", icon: <Database className="w-7 h-7 text-green-600" />, color: "text-green-600/20" },
  { name: "PostgreSQL", icon: <Database className="w-7 h-7 text-blue-600" />, color: "text-blue-600/20" },
  { name: "AWS", icon: <Cloud className="w-7 h-7 text-amber-400" />, color: "text-amber-400/20" },
  { name: "Docker", icon: <Container className="w-7 h-7 text-blue-400" />, color: "text-blue-400/20" },
  { name: "Git", icon: <GitBranch className="w-7 h-7 text-orange-500" />, color: "text-orange-500/20" },
  { name: "Tailwind", icon: <Braces className="w-7 h-7 text-cyan-400" />, color: "text-cyan-400/20" },
]

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const barVariants = {
  hidden: { width: 0 },
  visible: (percent: number) => ({
    width: `${percent}%`,
    transition: { 
      duration: 1,
      ease: "easeInOut" 
    }
  })
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name)

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full tech-grid-bg"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      {/* Binary code background decoration */}
      <div className="absolute top-20 left-10 text-4xl text-purple-500/5 font-mono font-bold tracking-tight hidden lg:block">
        01010111 <br />
        10101010 <br />
        01010011 <br />
        11001100
      </div>
      <div className="absolute bottom-20 right-10 text-4xl text-blue-500/5 font-mono font-bold tracking-tight hidden lg:block">
        10101110 <br />
        01010101 <br />
        10100101 <br />
        00110011
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Technical Skills</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My arsenal of technologies and tools that I use to build innovative solutions
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {skillCategories.map((category) => (
            <motion.button
              key={category.name}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.name
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "bg-background/50 backdrop-blur-sm hover:bg-primary/10 border border-border"
              }`}
              onClick={() => setActiveCategory(category.name)}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon}
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills display */}
        <div className="max-w-4xl mx-auto">
          {skillCategories
            .filter((category) => category.name === activeCategory)
            .map((category) => (
              <motion.div
                key={category.name}
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-6"
              >
                {category.skills.map((skill) => (
                  <motion.div key={skill.name} variants={fadeInUp} className="mb-6">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center">
                        <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: skill.color || '#6366f1' }}></span>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ 
                          background: `linear-gradient(90deg, ${skill.color || '#6366f1'} 0%, ${skill.color || '#6366f1'}99 100%)`,
                          boxShadow: `0 0 10px ${skill.color || '#6366f1'}50`
                        }}
                        variants={barVariants}
                        custom={skill.level}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ))}
        </div>

        {/* Tech icons grid */}
        <motion.div 
          className="mt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="flex flex-col items-center"
              variants={fadeInUp}
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            >
              <div className={`w-16 h-16 bg-background/50 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-border mb-2 flex items-center justify-center hover:bg-${tech.color} transition-colors duration-300`}>
                {tech.icon}
              </div>
              <span className="text-xs text-muted-foreground">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
