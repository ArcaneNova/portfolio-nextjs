"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "@/lib/framer-exports"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { 
  Brain, 
  Rocket, 
  ArrowRight, 
  Target, 
  Zap,
  Heart,
  Code,
  Database,
  Cpu,
  Globe,
  Sparkles,
  Terminal,
  User,
  CircuitBoard,
  Atom,
  BookOpen,
  Home,
  AlignLeft,
  Lightbulb,
  GraduationCap,
  CalendarRange,
  Timer,
  Mountain,
  Medal,
  Briefcase,
  Coffee,
  Users,
  Image,
  MapPin,
  Eye,
  Bot,
  MessageSquare,
  LineChart,
  Moon,
  Dumbbell
} from "lucide-react"

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60])
  
  const [activeTab, setActiveTab] = useState("who-i-am")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Track when user scrolls to the section for animations
  const tabContentRef = useRef<HTMLDivElement>(null)
  const tabContentIsInView = useInView(tabContentRef, { once: false, amount: 0.2 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Enhanced tabs with more detailed content from your provided info
  const tabSections = [
    {
      id: "who-i-am",
      title: "Who I Am",
      icon: <User className="w-5 h-5" />,
      emoji: "🔹",
      color: "cyber-cyan",
      content: (
        <div className="space-y-6 relative">
          <div className="absolute -top-12 -left-4 w-28 h-28 bg-cyber-cyan/10 rounded-full blur-3xl z-0"></div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-lg leading-relaxed text-gray-300 relative z-10"
          >
            <span className="text-cyber-cyan font-semibold">Md Arshad Noor</span> — a builder, dreamer, and self-made technologist from a small town in Bihar, India. My journey began in <span className="text-neon-purple">2016</span>, when I stumbled upon HTML and launched my first ever website. What began as curiosity has grown into an obsession — with code, creation, and solving problems that matter.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg leading-relaxed text-gray-300"
          >
            I've spent the last <span className="text-cyber-cyan font-semibold">3+ years</span> mastering the art of software — not just as a career, but as a medium to express ideas, drive impact, and create leverage. With <span className="text-neon-green font-semibold">50+ projects</span> and <span className="text-neon-purple font-semibold">5 SaaS products</span> behind me, I now build full-scale platforms — used by over <span className="text-cyber-cyan font-semibold">100K+ people</span> worldwide.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed text-gray-300"
          >
            I'm not backed by a VC fund or massive team. I'm powered by ambition, belief, and long nights of shipping things that matter.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-10"
          >
            <motion.div 
              key="years-coding"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={tabContentIsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="glass p-3 sm:p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-cyan-500/30 border border-white/5 transition-all duration-300"
              style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2), 0 0 10px rgba(6,182,212,0.1)'
              }}
            >
              <div className="text-cyan-400 mb-2 sm:mb-3"><Code className="w-5 h-5 sm:w-6 sm:h-6" /></div>
              <div className="text-xl sm:text-2xl font-bold text-cyan-400 mb-0.5 sm:mb-1">3+</div>
              <div className="text-xs sm:text-sm text-gray-400">Years Coding</div>
            </motion.div>
            
            <motion.div 
              key="projects-built"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={tabContentIsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="glass p-3 sm:p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-purple-500/30 border border-white/5 transition-all duration-300"
              style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2), 0 0 10px rgba(147,51,234,0.1)'
              }}
            >
              <div className="text-purple-400 mb-2 sm:mb-3"><Rocket className="w-5 h-5 sm:w-6 sm:h-6" /></div>
              <div className="text-xl sm:text-2xl font-bold text-purple-400 mb-0.5 sm:mb-1">50+</div>
              <div className="text-xs sm:text-sm text-gray-400">Projects Built</div>
            </motion.div>
            
            <motion.div 
              key="saas-products"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={tabContentIsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="glass p-3 sm:p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-emerald-500/30 border border-white/5 transition-all duration-300"
              style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2), 0 0 10px rgba(16,185,129,0.1)'
              }}
            >
              <div className="text-emerald-400 mb-2 sm:mb-3"><Globe className="w-5 h-5 sm:w-6 sm:h-6" /></div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-400 mb-0.5 sm:mb-1">5</div>
              <div className="text-xs sm:text-sm text-gray-400">SaaS Products</div>
            </motion.div>
            
            <motion.div 
              key="users-worldwide"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={tabContentIsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="glass p-3 sm:p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-blue-500/30 border border-white/5 transition-all duration-300"
              style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2), 0 0 10px rgba(59,130,246,0.1)'
              }}
            >
              <div className="text-blue-400 mb-2 sm:mb-3"><Users className="w-5 h-5 sm:w-6 sm:h-6" /></div>
              <div className="text-xl sm:text-2xl font-bold text-blue-400 mb-0.5 sm:mb-1">100K+</div>
              <div className="text-xs sm:text-sm text-gray-400">Users Worldwide</div>
            </motion.div>
          </motion.div>
        </div>
      )
    },
    {
      id: "passion",
      title: "My Passion",
      icon: <Rocket className="w-5 h-5" />,
      emoji: "🔹",
      color: "neon-purple",
      content: (
        <div className="space-y-6 relative">
          <div className="absolute -top-12 -right-4 w-28 h-28 bg-neon-purple/10 rounded-full blur-3xl z-0"></div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-lg leading-relaxed text-gray-300 relative z-10"
          >
            My biggest passion? <span className="text-neon-purple font-semibold">Projects</span>. I love taking an idea from thought → code → product → people. Nothing excites me more than launching something I believe in and watching real users benefit from it.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-10"
          >
            <div className="text-gray-300 text-lg mb-4">Whether it's:</div>
            <div className="space-y-4">
              {[
                { title: "an AI platform that scales images with one click", icon: <Image className="w-5 h-5" /> },
                { title: "a metro route planner for millions of Indian travelers", icon: <MapPin className="w-5 h-5" /> },
                { title: "or a village directory to connect rural India", icon: <Home className="w-5 h-5" /> }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={tabContentIsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full glass text-neon-purple">
                    {project.icon}
                  </div>
                  <span className="text-white">{project.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl font-semibold leading-relaxed text-gray-100 pt-4"
          >
            I build because <span className="text-neon-purple">I care</span>.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg leading-relaxed text-gray-300"
          >
            Every project I create is rooted in real-world impact — especially for people in underserved areas. I want to make access to information, technology, and opportunities more equitable through code.
          </motion.p>
        </div>
      )
    },
    {
      id: "ai-ml",
      title: "AI & ML",
      icon: <Brain className="w-5 h-5" />,
      emoji: "🔹",
      color: "cyber-cyan",
      content: (
        <div className="space-y-6 relative">
          <div className="absolute -top-20 left-1/4 w-36 h-36 bg-cyber-cyan/10 rounded-full blur-3xl z-0"></div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-lg leading-relaxed text-gray-300 relative z-10"
          >
            For me, AI isn't hype — it's <span className="text-cyber-cyan font-semibold">home</span>. I work extensively with modern AI systems including:
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10"
          >
            {[
              { name: "Large Language Models (LLMs) like GPT", icon: <MessageSquare className="w-5 h-5" /> },
              { name: "Computer Vision with OpenCV/MoveNet", icon: <Eye className="w-5 h-5" /> },
              { name: "AI Agents for autonomous workflows", icon: <Bot className="w-5 h-5" /> },
              { name: "Time-Series Forecasting for energy demand", icon: <LineChart className="w-5 h-5" /> }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={tabContentIsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 flex items-center gap-3"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400">
                  {tech.icon}
                </div>
                <span className="text-white text-sm md:text-base">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg leading-relaxed text-gray-300 pt-2"
          >
            I'm not just experimenting. I'm deploying real-world ML models into production-ready SaaS tools — whether it's an AI trainer for gym workouts, or a voice agent that can talk to customers in real time.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4"
          >
            {[
              { tech: "LLMs", level: 90, color: "cyber-cyan" },
              { tech: "Computer Vision", level: 85, color: "neon-purple" },
              { tech: "Forecasting Models", level: 80, color: "neon-green" },
              { tech: "AI Agents", level: 75, color: "cyber-blue" }
            ].map((skill, index) => (
              <motion.div
                key={skill.tech}
                initial={{ opacity: 0, y: 20 }}
                animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="glass p-4 rounded-lg"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white text-sm md:text-base font-medium">{skill.tech}</span>
                  <span className={`${
                    skill.color === 'cyber-cyan' ? 'text-cyan-400' :
                    skill.color === 'neon-purple' ? 'text-purple-400' :
                    skill.color === 'neon-green' ? 'text-emerald-400' :
                    'text-blue-400'
                  } text-sm md:text-base`}>{skill.level}%</span>
                </div>
                <div className="w-full bg-black/50 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={tabContentIsInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 1 + index * 0.1 }}
                    className={`h-2 rounded-full ${
                      skill.color === 'cyber-cyan' 
                        ? 'bg-gradient-to-r from-cyan-500 to-cyan-600/60' 
                        : skill.color === 'neon-purple' 
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600/60'
                          : skill.color === 'neon-green'
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600/60'
                            : 'bg-gradient-to-r from-blue-500 to-blue-600/60'
                    }`}
                    style={{ boxShadow: `0 0 10px ${
                      skill.color === 'cyber-cyan' ? 'rgba(6,182,212,0.5)' : 
                      skill.color === 'neon-purple' ? 'rgba(147,51,234,0.5)' : 
                      skill.color === 'neon-green' ? 'rgba(16,185,129,0.5)' :
                      'rgba(59,130,246,0.5)'
                    }` }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )
    },
    {
      id: "vision",
      title: "Vision",
      icon: <Target className="w-5 h-5" />,
      emoji: "🔹",
      color: "neon-green",
      content: (
        <div className="space-y-6 relative">
          <div className="absolute -top-12 right-1/4 w-36 h-36 bg-neon-green/10 rounded-full blur-3xl z-0"></div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-lg leading-relaxed text-gray-300 relative z-10"
          >
            I believe we're living in a <span className="text-neon-green font-semibold">golden age of solo founders</span>. AI, automation, and APIs have leveled the playing field — and you no longer need millions in funding or 100 engineers to build something world-changing.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg leading-relaxed text-gray-300 pt-2"
          >
            My vision is to be at the frontier of this shift:
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              { vision: "To build fast, think big, and launch without permission", icon: <Zap className="w-5 h-5" /> },
              { vision: "To craft tools that serve millions while being solo or in a small, smart team", icon: <Users className="w-5 h-5" /> },
              { vision: "To build things that outlive me — systems that scale, educate, and empower", icon: <Mountain className="w-5 h-5" /> }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={tabContentIsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                className="flex items-center gap-4 glass p-4 rounded-lg hover:border-neon-green/30 border border-white/5 transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2), 0 0 10px rgba(16,185,129,0.1)'
                }}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neon-green/10 text-neon-green">
                  {item.icon}
                </div>
                <span className="text-white text-sm md:text-base">{item.vision}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="glass-strong p-6 rounded-2xl border border-neon-green/10 mt-8"
            style={{ 
              background: 'linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(16,185,129,0.02) 100%)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-neon-green" />
              <h3 className="text-xl font-semibold text-white">Future Plans</h3>
            </div>
            <p className="text-gray-300">
              One of my goals is to eventually shift to San Francisco or a global tech capital — not just to network, but to be at the heart of innovation. But no matter where I go, my heart stays rooted in India — and I want to keep giving back to the ecosystem that shaped me.
            </p>
          </motion.div>
        </div>
      )
    },
    {
      id: "books",
      title: "Books",
      icon: <BookOpen className="w-5 h-5" />,
      emoji: "🔹",
      color: "cyber-blue",
      content: (
        <div className="space-y-6 relative">
          <div className="absolute -top-12 left-1/3 w-28 h-28 bg-blue-500/10 rounded-full blur-3xl z-0"></div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-lg leading-relaxed text-gray-300 relative z-10"
          >
            I deeply believe in reading to level up, not just in tech, but in life. Here are some books that shaped me:
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2 sm:pt-4"
          >
            {[
              {
                category: "📘 Life & Mindset",
                books: [
                  { title: "Atomic Habits", author: "James Clear", desc: "systems > goals" },
                  { title: "Deep Work", author: "Cal Newport", desc: "focus is a superpower" },
                  { title: "Can't Hurt Me", author: "David Goggins", desc: "mental toughness" }
                ]
              },
              {
                category: "💻 Computer Science & Tech",
                books: [
                  { title: "Clean Code", author: "Robert C. Martin", desc: "write like a craftsman" },
                  { title: "Designing Data-Intensive Applications", author: "", desc: "for building systems that scale" },
                  { title: "The Pragmatic Programmer", author: "", desc: "timeless principles of good development" }
                ]
              }
            ].map((category, catIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 + catIndex * 0.2 }}
                className="relative"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4">{category.category}</h3>
                <div className="space-y-2 sm:space-y-3">
                  {category.books.map((book, bookIndex) => (
                    <motion.div
                      key={book.title}
                      initial={{ opacity: 0, x: catIndex % 2 === 0 ? -20 : 20 }}
                      animate={tabContentIsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: catIndex % 2 === 0 ? -20 : 20 }}
                      transition={{ duration: 0.5, delay: 0.5 + bookIndex * 0.1 }}
                      className="glass p-3 sm:p-4 rounded-xl border border-white/5 hover:border-cyan-500/20 transition-all duration-300"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                      }}
                    >
                      <div className="flex flex-col gap-2">
                        <div>
                          <h4 className="font-semibold text-white text-sm sm:text-base md:text-lg">{book.title}</h4>
                          {book.author && <p className="text-gray-400 text-xs sm:text-sm">{book.author}</p>}
                        </div>
                        <span className="text-cyan-400 text-xs sm:text-sm bg-cyan-500/10 px-2 py-1 rounded-md w-fit">{book.desc}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )
    },
    {
      id: "values",
      title: "Core Values",
      icon: <Heart className="w-5 h-5" />,
      emoji: "🔹",
      color: "cyber-pink",
      content: (
        <div className="space-y-6 relative">
          <div className="absolute -top-12 right-1/4 w-28 h-28 bg-pink-500/10 rounded-full blur-3xl z-0"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10"
          >
            {[
              { value: "Impact over Hype", desc: "I don't chase trends. I build for change.", icon: <Target className="w-5 h-5" /> },
              { value: "Speed with Quality", desc: "I move fast — but never break things that matter.", icon: <Zap className="w-5 h-5" /> },
              { value: "Self-Made, Never Alone", desc: "I believe in self-learning, but also in the power of community.", icon: <Users className="w-5 h-5" /> },
              { value: "Code with Soul", desc: "My code isn't just logic. It's love, detail, and purpose.", icon: <Heart className="w-5 h-5" /> }
            ].map((value, index) => (
              <motion.div
                key={value.value}
                initial={{ opacity: 0, y: 20 }}
                animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="glass p-5 rounded-xl border border-white/10 hover:border-pink-500/20 transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-500/10 text-pink-400">
                    {value.icon}
                  </div>
                  <h4 className="font-semibold text-white text-lg">{value.value}</h4>
                </div>
                <p className="text-gray-300 pl-13">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="glass-strong p-6 rounded-2xl border border-pink-500/10 mt-6"
            style={{ 
              background: 'linear-gradient(135deg, rgba(236,72,153,0.05) 0%, rgba(236,72,153,0.02) 100%)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Medal className="w-6 h-6 text-pink-400" />
              <h3 className="text-xl font-semibold text-white">I Believe In:</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                <span>Extreme Ownership — if it's in my hands, I'll give it my all.</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                <span>Work As Worship — it's not about balance; it's about meaning.</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                <span>Luck Favors the Relentless — massive success isn't guaranteed, but I'll be ready when luck visits.</span>
              </li>
            </ul>
            <p className="text-white font-medium mt-4">
              I may not control outcomes. But I control effort — and mine is limitless.
            </p>
          </motion.div>
        </div>
      )
    },
    {
      id: "daily-life",
      title: "Daily Life",
      icon: <CalendarRange className="w-5 h-5" />,
      emoji: "🔹",
      color: "cyber-orange",
      content: (
        <div className="space-y-6 relative">
          <div className="absolute -top-12 left-1/4 w-28 h-28 bg-orange-500/10 rounded-full blur-3xl z-0"></div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-lg leading-relaxed text-gray-300 relative z-10"
          >
            Right now, I'm in a phase where I care less about outcomes and more about inputs — about putting in the work, every single day, and letting compounding do its magic.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-strong p-5 rounded-2xl border border-orange-500/10"
            style={{ 
              background: 'linear-gradient(135deg, rgba(249,115,22,0.05) 0%, rgba(249,115,22,0.02) 100%)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-orange-500" />
              <h3 className="text-xl font-semibold text-white">My Focus</h3>
            </div>
            <p className="text-gray-300">
              To gain real-world experience, absorb knowledge like a sponge, and keep sharpening my skills — whether through conversations with industry folks, deep dives into books, or getting my hands dirty building real products. I'm focused on long-term leverage — and building a strong foundation that'll make me unstoppable in the next 5 years.
            </p>
          </motion.div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl font-semibold text-white pt-2 flex items-center gap-2"
          >
            <Timer className="w-5 h-5 text-orange-500" /> A Day in My Life
          </motion.h3>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="space-y-4 pt-2"
          >
            {[
              { 
                time: "Morning", 
                title: "Classes & Learning", 
                desc: "I start with academic or self-paced learning sessions — attending classes or going through tech resources.", 
                icon: <GraduationCap className="w-5 h-5" />, 
                color: "amber"
              },
              { 
                time: "Midday", 
                title: "Building & Coding Time", 
                desc: "My high-productivity window for building SaaS products, experimenting with new tech, and writing clean code.", 
                icon: <Code className="w-5 h-5" />, 
                color: "cyan" 
              },
              { 
                time: "Evening", 
                title: "DSA + System Mastery", 
                desc: "Time for solving DSA problems, cracking LeetCode, and deep diving into database design and system knowledge.", 
                icon: <Database className="w-5 h-5" />, 
                color: "purple" 
              },
              { 
                time: "Break", 
                title: "1 Hour of Gym", 
                desc: "No matter how packed the day, I make time for gym — to refresh both body and mind.", 
                icon: <Dumbbell className="w-5 h-5" />, 
                color: "green" 
              },
              { 
                time: "Night", 
                title: "Sleep & Recovery", 
                desc: "I love sleep. It's my recovery system, dream space, and where I subconsciously connect ideas.", 
                icon: <Moon className="w-5 h-5" />, 
                color: "indigo" 
              }
            ].map((schedule, index) => (
              <motion.div
                key={schedule.time}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={tabContentIsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className={`glass p-4 rounded-xl border border-white/5 hover:border-${schedule.color}-500/20 transition-all duration-300`}
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-${schedule.color}-500/10 text-${schedule.color}-400`}>
                    {schedule.icon}
                  </div>
                  <div>
                    <span className={`text-${schedule.color}-400 text-sm font-medium`}>{schedule.time}</span>
                    <h4 className="font-semibold text-white text-lg">{schedule.title}</h4>
                  </div>
                </div>
                <p className="text-gray-300 text-sm md:text-base pl-13">{schedule.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-lg text-center italic text-gray-300 pt-4"
          >
            Every day isn't perfect. But I show up. I iterate. I learn. <br/>
            <span className="text-orange-400 font-medium">No matter how big the dream is — I'm building brick by brick.</span>
          </motion.p>
        </div>
      )
    },
    {
      id: "gratitude",
      title: "My Why",
      icon: <Mountain className="w-5 h-5" />,
      emoji: "🔹",
      color: "neon-purple",
      content: (
        <div className="space-y-6 relative">
          <div className="absolute -top-12 left-1/3 w-36 h-36 bg-purple-500/10 rounded-full blur-3xl z-0"></div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-xl font-semibold text-white relative z-10"
          >
            Gratitude & Grit
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg leading-relaxed text-gray-300"
          >
            Every line of code I write, every product I launch — is built with deep gratitude. I know I come from a background where many people don't even get the chance to dream, let alone build.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg leading-relaxed text-gray-300"
          >
            I fully understand the opportunity life has given me, and I never take it for granted. There are millions of others who wish for the resources, skills, or environment I now have — and this humbles me every single day.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-strong p-6 rounded-2xl border border-purple-500/10 mt-2"
            style={{ 
              background: 'linear-gradient(135deg, rgba(147,51,234,0.05) 0%, rgba(147,51,234,0.02) 100%)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">Startup Since 12th Grade</h3>
            </div>
            <p className="text-gray-300">
              I've been in the zone of building startups since finishing high school. While most people were exploring what to do next, I was already knee-deep in code, shipping MVPs, testing ideas, and dreaming bigger than my bandwidth.
            </p>
            <p className="text-gray-300 mt-3">
              Over the years, this turned into a lifestyle — and now, working 15-20 hours a day feels normal when I'm building something I care about.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="glass-strong p-6 rounded-2xl border border-purple-500/10 mt-2"
            style={{ 
              background: 'linear-gradient(135deg, rgba(147,51,234,0.05) 0%, rgba(147,51,234,0.02) 100%)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Home className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-semibold text-white">My Family</h3>
            </div>
            <p className="text-gray-300">
              My family has always been my emotional anchor. Growing up in Bihar, they supported me unconditionally, even when they didn't fully understand what I was building on the screen for 12+ hours a day.
            </p>
            <p className="text-gray-300 mt-3">
              I love being connected to them — hearing their stories, sharing meals, and laughing over chai. But I also carry a small guilt... The guilt of not always giving them enough time, being lost in my projects, or missing moments because I'm chasing my dreams.
            </p>
            <p className="text-gray-300 mt-3">
              It's something I'm learning to balance — because I want success, but not at the cost of losing the people I love.
            </p>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-xl font-semibold text-center text-white pt-5"
          >
            That's why I choose to be work-obsessed. <br/>
            <span className="text-purple-400">Not for the hustle culture. But because I know the value of what I've been allowed to do.</span>
          </motion.p>
        </div>
      )
    },
    {
      id: "quotes",
      title: "Words I Live By",
      icon: <Lightbulb className="w-5 h-5" />,
      emoji: "✨",
      color: "cyber-orange",
      content: (
        <div className="space-y-6 relative">
          <div className="absolute -top-12 right-1/3 w-28 h-28 bg-orange-500/10 rounded-full blur-3xl z-0"></div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-lg leading-relaxed text-gray-300 relative z-10"
          >
            These are the quotes and mantras that guide me through both the darkest and brightest days of building. They've become my personal compass:
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10"
          >
            {[
              { 
                quote: "Trust the process. Outcomes are noisy. Growth is real.", 
                caption: "You may not win today, but if you're learning, you're not losing." 
              },
              { 
                quote: "Dream so big that it scares you — and stay humble enough to build from zero every time.", 
                caption: "If your dreams don't sound crazy, dream bigger." 
              },
              { 
                quote: "We're all human — emotional, imperfect, learning. What matters is that we grow, not that we're perfect.", 
                caption: "" 
              },
              { 
                quote: "Some people won't choose you. That's okay. Everyone has their own journey, timing, and truth.", 
                caption: "" 
              },
              { 
                quote: "Every SaaS, every product, every tool I build — is a quiet thank you to the life I've been given.", 
                caption: "I code with gratitude." 
              },
              { 
                quote: "Being kind is never wasted. Be gentle with people, animals, and life itself.", 
                caption: "" 
              },
              { 
                quote: "You don't need permission to start. Start messy. Learn fast. Fix later.", 
                caption: "This is how solo founders win." 
              },
              { 
                quote: "Luck exists. But it visits the ones who are always working.", 
                caption: "" 
              },
              { 
                quote: "Build in silence. Let the product speak. Let the value scream.", 
                caption: "" 
              },
              { 
                quote: "If you keep showing up — you'll either win or be too good to ignore.", 
                caption: "" 
              },
              { 
                quote: "Start with impact, stay with discipline, scale with patience.", 
                caption: "" 
              },
              { 
                quote: "The best time to plant a tree was 20 years ago. The second best time is now.", 
                caption: "Never too late to begin." 
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="glass p-4 sm:p-5 rounded-xl border border-white/5 hover:border-orange-500/20 transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2), 0 0 10px rgba(249,115,22,0.1)'
                }}
              >
                <p className="text-white text-sm sm:text-base font-medium leading-relaxed">"{item.quote}"</p>
                {item.caption && (
                  <p className="text-orange-400 text-xs sm:text-sm mt-2 italic">— {item.caption}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={tabContentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center text-gray-400 text-sm italic pt-2"
          >
            Words are powerful. Choose the ones you live by carefully.
          </motion.p>
        </div>
      )
    }
  ]

  // Core values for the top section
  const coreValues = [
    { 
      icon: <Target className="w-8 h-8" />, 
      title: "Impact", 
      desc: "Building solutions that matter",
      color: "cyber-cyan"
    },
    { 
      icon: <Brain className="w-8 h-8" />, 
      title: "Innovation", 
      desc: "Embracing new technologies",
      color: "neon-purple"
    },
    { 
      icon: <Zap className="w-8 h-8" />, 
      title: "Speed", 
      desc: "Executing with precision",
      color: "neon-green"
    }
  ]

  return (
    <section id="about" className="relative py-24 overflow-hidden bg-black">
      {/* Enhanced cyberpunk background effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Animated glowing particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${i % 3 === 0 ? 1 : 0.5} h-${i % 3 === 0 ? 1 : 0.5} ${
              i % 3 === 0 ? 'bg-cyber-cyan' : i % 3 === 1 ? 'bg-neon-purple' : 'bg-neon-green'
            } rounded-full opacity-80`}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            transition={{
              duration: Math.random() * 15 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              boxShadow: `0 0 ${i % 3 === 0 ? 8 : 5}px ${
                i % 3 === 0 ? 'rgba(6, 182, 212, 0.6)' : 
                i % 3 === 1 ? 'rgba(147, 51, 234, 0.6)' : 
                'rgba(16, 185, 129, 0.6)'
              }`
            }}
          />
        ))}
      </div>
      
      {/* Cyberpunk wireframe elements */}
      <motion.div 
        className="absolute top-1/4 left-0 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          width: ['40%', '60%', '40%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div 
        className="absolute top-3/4 right-0 w-[50%] h-[1px] bg-gradient-to-l from-transparent via-purple-500/20 to-transparent"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          width: ['40%', '60%', '40%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-32 h-32 border border-neon-green/20 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div 
        ref={containerRef}
        style={{ opacity, y }}
        className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10"
      >
        {/* Section Header - Enhanced with cyberpunk aesthetics */}
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
            className="inline-flex items-center gap-3 px-6 py-3 glass rounded-full text-cyber-cyan text-sm font-medium mb-8 shadow-glow-cyan"
            style={{
              background: 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0.05) 100%)',
              boxShadow: '0 0 20px rgba(6,182,212,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <CircuitBoard className="w-4 h-4" />
            <span>About Me</span>
            <motion.div 
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
                boxShadow: [
                  '0 0 0 rgba(6,182,212,0.4)',
                  '0 0 10px rgba(6,182,212,0.8)',
                  '0 0 0 rgba(6,182,212,0.4)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-space-grotesk"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 text-transparent bg-clip-text animate-gradient">
              Building the Future
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            From <span className="text-neon-purple font-semibold">2016</span> to now — my journey of turning 
            <span className="text-cyber-cyan font-semibold"> ambitious ideas</span> into 
            <span className="text-neon-green font-semibold"> impactful reality</span>
          </motion.p>
        </motion.div>

        {/* Core Values - Enhanced with more modern styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {coreValues.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative group"
            >
              <div 
                className={`glass-strong rounded-2xl p-8 text-center group hover-glow-${value.color} relative overflow-hidden border border-white/5 hover:border-${value.color}/30 transition-all duration-500`}
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)'
                }}
              >
                {/* Radial glow effect on hover */}
                <motion.div 
                  className={`absolute inset-0 bg-${value.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              
                <div className={`text-${value.color} mb-6 flex justify-center`}>
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {value.icon}
                  </motion.div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{value.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dynamic Content Section with Enhanced Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Background blur elements */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl"></div>
          
          <div className="glass-strong rounded-2xl sm:rounded-3xl p-3 sm:p-8 md:p-10 relative overflow-hidden border border-white/5"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            {/* Scanline effect */}
            <div className="absolute inset-0 scanlines opacity-10"></div>
            
            {/* Tabs Navigation - Modern Cyberpunk Style - Optimized for all devices */}
            <div>
              <Tabs defaultValue="who-i-am" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="mb-4">
                  <TabsList className="flex flex-wrap justify-center bg-transparent px-0.5 py-1 sm:py-2 gap-1.5 sm:gap-2 w-full">
                    {tabSections.map((section) => {
                      const isActive = activeTab === section.id;
                      // Define color classes based on the section color
                      let activeClasses = "";
                      let iconClasses = "";
                      let indicatorClasses = "";
                      
                      if (section.color === "cyber-cyan") {
                        activeClasses = "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]";
                        iconClasses = isActive ? "text-cyan-400" : "text-gray-500 group-hover:text-gray-300";
                        indicatorClasses = "bg-cyan-400";
                      } else if (section.color === "neon-purple") {
                        activeClasses = "bg-purple-500/10 text-purple-400 border-purple-500/30 shadow-[0_0_20px_rgba(147,51,234,0.15)]";
                        iconClasses = isActive ? "text-purple-400" : "text-gray-500 group-hover:text-gray-300";
                        indicatorClasses = "bg-purple-400";
                      } else if (section.color === "neon-green") {
                        activeClasses = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]";
                        iconClasses = isActive ? "text-emerald-400" : "text-gray-500 group-hover:text-gray-300";
                        indicatorClasses = "bg-emerald-400";
                      } else {
                        activeClasses = "bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]";
                        iconClasses = isActive ? "text-blue-400" : "text-gray-500 group-hover:text-gray-300";
                        indicatorClasses = "bg-blue-400";
                      }
                      
                      return (
                        <TabsTrigger 
                          key={section.id} 
                          value={section.id}
                          className={`
                            group flex items-center gap-1 sm:gap-2 py-1.5 sm:py-2.5 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300
                            text-gray-400 hover:text-white font-medium text-xs sm:text-base border border-transparent
                            active:scale-95 focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-opacity-50 mb-2 mx-0.5
                            ${isActive ? activeClasses : 'hover:bg-white/5'}
                            ${isActive ? `focus:ring-${section.color === 'cyber-cyan' ? 'cyan' : section.color === 'neon-purple' ? 'purple' : 'emerald'}-500/50` : 'focus:ring-white/25'}
                          `}
                        >                              <span className="text-base sm:text-xl mr-0.5 sm:mr-1 hidden xs:inline">{section.emoji}</span>
                              <div className="relative flex items-center gap-1 sm:gap-2">
                                <div className={`transition-colors ${iconClasses}`}>
                                  {section.icon}
                                </div>
                                {/* Always show title but use smaller text on mobile */}
                                <span className="text-2xs xs:text-xs sm:text-sm md:text-base whitespace-nowrap">{section.title}</span>
                            {isActive && (
                              <motion.div
                                layoutId="activeTabIndicator"
                                className={`absolute -bottom-1 left-0 right-0 h-0.5 ${indicatorClasses} rounded-full`}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                              />
                            )}
                          </div>
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </div>
                
                {/* Enhanced Tab Content with Animations */}
                <div ref={tabContentRef} className="mt-0 pt-4 sm:pt-6 border-t border-white/10">
                  <AnimatePresence mode="wait">
                    {tabSections.map((section) => (
                      <TabsContent key={section.id} value={section.id} className="outline-none">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                          className="px-1 py-3 sm:p-4"
                        >
                          {section.content}
                        </motion.div>
                      </TabsContent>
                    ))}
                  </AnimatePresence>
                </div>
              </Tabs>
            </div>
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 relative"
        >
          {/* Background glow effect */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-32 bg-gradient-to-r from-purple-500/5 via-cyan-500/10 to-emerald-500/5 rounded-full blur-3xl"></div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-8"
          >
            Ready to build something{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 text-transparent bg-clip-text animate-gradient">
              extraordinary
            </span>{" "}
            together?
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="shadow-glow-cyan bg-gradient-to-r from-cyan-600/80 to-cyan-700/80 hover:from-cyan-500 hover:to-cyan-600 text-white font-medium px-8 py-6 rounded-xl group border-0"
                asChild
              >
                <Link href="#projects" className="flex items-center gap-3">
                  <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-bold">View My Projects</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline"
                className="glass-strong hover-glow-purple border border-purple-500/30 text-purple-400 hover:text-purple-300 font-medium px-8 py-6 rounded-xl group"
                asChild
              >
                <Link href="#contact" className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-bold">Let's Connect</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}