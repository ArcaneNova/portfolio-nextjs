"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useInView } from "@/lib/framer-exports"
import {
  Trophy,
  Award,
  Medal,
  Brain,
  Rocket,
  Code,
  BarChart,
  Globe,
  Layers,
  BookOpen,
  Users,
  GraduationCap,
  CircuitBoard,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AchievementsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60])
  
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [animateBorders, setAnimateBorders] = useState(false)

  // Enable border animations after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateBorders(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Predefined achievements with cyberpunk styling
  const achievements = [
    {
      id: "sih2024",
      icon: <Trophy className="w-6 h-6" />,
      title: "Smart India Hackathon 2024",
      subtitle: "Grand Finale Finalist",
      description: "Built PowerIQ, an AI-powered electricity demand forecasting platform using LSTM + weather APIs. Recognized by national innovation bodies for solving real-world energy challenges.",
      gradientFrom: "from-amber-400",
      gradientTo: "to-orange-500",
      hoverGlow: "hover-glow-orange",
      borderColor: "amber-400",
      glowColor: "rgb(245, 158, 11)"
    },
    {
      id: "saas",
      icon: <Globe className="w-6 h-6" />,
      title: "SaaS Builder",
      subtitle: "5 Products Launched, 100K+ Users Impacted",
      description: "Successfully launched full-scale platforms like ImagUpscaler.io, AIFaceSwaper.io, and DelhiMetroRails.com, solving real problems with AI + scale-first architecture.",
      gradientFrom: "from-cyan-400",
      gradientTo: "to-blue-500",
      hoverGlow: "hover-glow-cyan",
      borderColor: "cyan-400",
      glowColor: "rgb(34, 211, 238)"
    },
    {
      id: "research",
      icon: <Brain className="w-6 h-6" />,
      title: "AI + ML Research Publication",
      subtitle: "Peer-Reviewed Journal",
      description: "Published research on Machine Learning time-series forecasting models for electricity consumption in a reputed journal. Bridging theory with real-world deployment.",
      gradientFrom: "from-purple-400",
      gradientTo: "to-pink-500",
      hoverGlow: "hover-glow-purple",
      borderColor: "purple-400",
      glowColor: "rgb(192, 132, 252)"
    },
    {
      id: "projects",
      icon: <Rocket className="w-6 h-6" />,
      title: "50+ Real-World Projects Shipped",
      subtitle: "Production-Grade Solutions",
      description: "From AI trainers to developer tools, I've built and shipped 50+ impactful projects — all production-grade, full-stack, and open to real users.",
      gradientFrom: "from-emerald-400",
      gradientTo: "to-teal-500",
      hoverGlow: "hover-glow-green",
      borderColor: "emerald-400",
      glowColor: "rgb(52, 211, 153)"
    },
    {
      id: "opensource",
      icon: <Code className="w-6 h-6" />,
      title: "Open Source Contributor & Indie Hacker",
      subtitle: "Community Contributions",
      description: "Active contributor to open-source initiatives and tech-for-good projects. Built several tools that are freely used and forked by the developer community.",
      gradientFrom: "from-blue-400",
      gradientTo: "to-indigo-500",
      hoverGlow: "hover-glow-blue",
      borderColor: "blue-400",
      glowColor: "rgb(96, 165, 250)"
    },
    {
      id: "dsa",
      icon: <BarChart className="w-6 h-6" />,
      title: "200+ DSA Problems Solved",
      subtitle: "Advanced Problem-Solving",
      description: "Consistently sharpened my problem-solving mindset across platforms like LeetCode, Codeforces, and CodeChef. Strong foundation in algorithms, data structures, and optimization.",
      gradientFrom: "from-red-400",
      gradientTo: "to-orange-500",
      hoverGlow: "hover-glow-orange",
      borderColor: "red-400",
      glowColor: "rgb(248, 113, 113)"
    },
    {
      id: "selftaught",
      icon: <BookOpen className="w-6 h-6" />,
      title: "Self-Taught in Modern Tech Stacks",
      subtitle: "Web3, Blockchain, DevOps, TypeScript",
      description: "Mastered multiple modern stacks outside of academics. Built blockchain-integrated apps and complex TypeScript backends for SaaS tools.",
      gradientFrom: "from-cyan-400",
      gradientTo: "to-emerald-500",
      hoverGlow: "hover-glow-cyan",
      borderColor: "cyan-400",
      glowColor: "rgb(34, 211, 238)"
    },
    {
      id: "mentor",
      icon: <Users className="w-6 h-6" />,
      title: "Mentor & Guide to Emerging Builders",
      subtitle: "Knowledge Sharing",
      description: "Helped peers with project architecture, startup mindset, and ML guidance — sharing back what I've learned from my journey.",
      gradientFrom: "from-violet-400",
      gradientTo: "to-purple-500",
      hoverGlow: "hover-glow-purple",
      borderColor: "violet-400",
      glowColor: "rgb(167, 139, 250)"
    }
  ]

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-black">
      {/* Enhanced cyberpunk background effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Digital circuit patterns */}
      <div className="absolute inset-0 opacity-5" 
        style={{ 
          backgroundImage: `url('/circuit-pattern.svg')`,
          backgroundSize: '600px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      {/* Animated glowing particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${i % 3 === 0 ? 1.5 : 0.5} h-${i % 3 === 0 ? 1.5 : 0.5} ${
              i % 3 === 0 ? 'bg-purple-500' : i % 3 === 1 ? 'bg-cyan-500' : 'bg-amber-500'
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
              boxShadow: `0 0 ${i % 3 === 0 ? 10 : 5}px ${
                i % 3 === 0 ? 'rgba(147, 51, 234, 0.8)' : 
                i % 3 === 1 ? 'rgba(6, 182, 212, 0.8)' : 
                'rgba(245, 158, 11, 0.8)'
              }`
            }}
          />
        ))}
      </div>
      
      {/* Cyberpunk wireframe elements */}
      <motion.div 
        className="absolute top-1/4 left-0 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          width: ['40%', '60%', '40%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-0 w-[50%] h-[1px] bg-gradient-to-l from-transparent via-cyan-500/30 to-transparent"
        animate={{
          opacity: [0.3, 0.8, 0.3],
          width: ['40%', '70%', '40%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Horizontal cyberpunk lines */}
      <motion.div 
        className="absolute top-1/2 right-0 w-full h-[1px] bg-gradient-to-l from-orange-500/20 via-transparent to-transparent"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          width: ['60%', '40%', '60%'],
        }}
        transition={{
          duration: 12,
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
            className="inline-flex items-center gap-3 px-6 py-3 glass rounded-full text-amber-400 text-sm font-medium mb-8 shadow-glow-orange"
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(245,158,11,0.05) 100%)',
              boxShadow: '0 0 25px rgba(245,158,11,0.4), inset 0 1px 0 rgba(255,255,255,0.15)'
            }}
          >
            <Trophy className="w-4 h-4" />
            <span>Achievements & Milestones</span>
            <motion.div 
              className="w-2 h-2 bg-amber-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
                boxShadow: [
                  '0 0 0 rgba(245,158,11,0.4)',
                  '0 0 15px rgba(245,158,11,0.9)',
                  '0 0 0 rgba(245,158,11,0.4)'
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
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
              Building With Purpose
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="text-amber-400 font-semibold">Winning</span> with persistence. <span className="text-cyan-400 font-semibold">Growing</span> with passion.
          </motion.p>
        </motion.div>

        {/* Achievement Grid with Neon Animated Gradient Borders */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(achievement.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative group neon-card ${achievement.hoverGlow}`}
            >
              {/* Animated neon border frame - visible on hover but NOT covering the entire card */}
              <div className="absolute inset-0 rounded-xl border-4 border-transparent overflow-hidden pointer-events-none">
                <div 
                  className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r ${achievement.gradientFrom} ${achievement.gradientTo} transition-all duration-500`}
                  style={{
                    opacity: hoveredId === achievement.id ? 0.9 : 0,
                    animation: hoveredId === achievement.id ? 'neon-pulse 2s ease-in-out infinite' : 'none',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '4px'
                  }}
                />
              </div>
              
              {/* Animated border gradient that moves around the card - only affecting the border */}
              <div className="absolute -inset-[1px] rounded-xl overflow-hidden pointer-events-none">
                <div
                  className={`absolute -inset-[1px] rounded-xl transition-opacity duration-300`}
                  style={{
                    background: `linear-gradient(90deg, transparent, ${achievement.glowColor}, transparent)`,
                    width: '200%',
                    height: '100%',
                    transform: 'translateX(-50%)',
                    opacity: hoveredId === achievement.id ? 1 : 0,
                    animation: hoveredId === achievement.id ? 'shimmer 2s linear infinite' : 'none',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                    padding: '2px'
                  }}
                />
              </div>
              
              {/* Static border that's always visible */}
              <div 
                className={`absolute inset-0 rounded-xl border ${animateBorders ? 'border-white/15' : 'border-white/5'} transition-colors duration-500`}
              />
              
              {/* Inner content container with glass effect */}
              <div 
                className="glass-strong p-6 sm:p-8 rounded-xl h-full relative z-10 transition-all duration-300 overflow-hidden border border-white/10"
                style={{ 
                  background: hoveredId === achievement.id 
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)' 
                    : 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                  transition: 'all 0.5s ease',
                }}
              >
                {/* Scanline effect */}
                <div className="absolute inset-0 scanlines opacity-10"></div>
                
                {/* Icon with glowing effect */}
                <div 
                  className={`flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${
                    hoveredId === achievement.id ? `bg-gradient-to-r ${achievement.gradientFrom} ${achievement.gradientTo} text-white` : 'bg-black/40 text-gray-300 border border-white/10'
                  } transition-all duration-500`}
                  style={{
                    boxShadow: hoveredId === achievement.id ? `0 0 25px ${achievement.glowColor}` : 'none',
                    transform: hoveredId === achievement.id ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {achievement.icon}
                  
                  {/* Pulsing effect on hover */}
                  {hoveredId === achievement.id && (
                    <motion.div 
                      className="absolute inset-0 rounded-xl"
                      animate={{
                        opacity: [0, 0.5, 0],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        background: `linear-gradient(135deg, ${achievement.glowColor}, ${achievement.glowColor}88)`,
                      }}
                    />
                  )}
                </div>
                
                {/* Achievement content with enhanced reveal effects */}
                <div className="space-y-4">
                  {/* Title - always visible with a touch of color on hover */}
                  <h3 className="text-xl sm:text-2xl font-bold transition-colors duration-500 relative">
                    <span 
                      className={`text-white ${hoveredId === achievement.id ? 'drop-shadow-glow' : ''}`}
                      style={{
                        textShadow: hoveredId === achievement.id ? `0 0 10px ${achievement.glowColor}40` : 'none'
                      }}
                    >
                      {achievement.title}
                    </span>
                    
                    {/* Small decorative element */}
                    {hoveredId === achievement.id && (
                      <motion.span 
                        className="absolute -left-4 top-1/2 transform -translate-y-1/2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Zap className={`w-3 h-3 text-${achievement.borderColor}`} />
                      </motion.span>
                    )}
                  </h3>
                  
                  {/* Subtitle with color change on hover */}
                  <p 
                    className="font-medium transition-all duration-500 text-gray-400"
                    style={{
                      color: hoveredId === achievement.id ? achievement.glowColor : ''
                    }}
                  >
                    {achievement.subtitle}
                  </p>
                  
                  {/* Description with subtle animation */}
                  <motion.p 
                    className="text-gray-300 leading-relaxed"
                    animate={hoveredId === achievement.id ? { opacity: [0.8, 1] } : {}}
                    transition={{ duration: 1 }}
                  >
                    {achievement.description}
                  </motion.p>
                </div>
                
                {/* Animated highlight line on hover */}
                <motion.div 
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${achievement.gradientFrom} ${achievement.gradientTo}`}
                  initial={{ width: 0 }}
                  animate={{ width: hoveredId === achievement.id ? '100%' : '0%' }}
                  transition={{ duration: 0.6 }}
                  style={{
                    boxShadow: `0 0 15px ${achievement.glowColor}`
                  }}
                />
                
                {/* Corner accents - cyberpunk style with animation */}
                <div 
                  className="absolute top-0 left-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    borderTop: hoveredId === achievement.id ? `2px solid ${achievement.glowColor}` : '2px solid transparent',
                    borderLeft: hoveredId === achievement.id ? `2px solid ${achievement.glowColor}` : '2px solid transparent',
                    boxShadow: hoveredId === achievement.id ? `0 0 8px ${achievement.glowColor}` : 'none',
                    animation: hoveredId === achievement.id ? 'neon-pulse 2s ease-in-out infinite' : 'none'
                  }}
                ></div>
                <div 
                  className="absolute top-0 right-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    borderTop: hoveredId === achievement.id ? `2px solid ${achievement.glowColor}` : '2px solid transparent',
                    borderRight: hoveredId === achievement.id ? `2px solid ${achievement.glowColor}` : '2px solid transparent',
                    boxShadow: hoveredId === achievement.id ? `0 0 8px ${achievement.glowColor}` : 'none',
                    animation: hoveredId === achievement.id ? 'neon-pulse 2s ease-in-out infinite' : 'none'
                  }}
                ></div>
                <div 
                  className="absolute bottom-0 left-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    borderBottom: hoveredId === achievement.id ? `2px solid ${achievement.glowColor}` : '2px solid transparent',
                    borderLeft: hoveredId === achievement.id ? `2px solid ${achievement.glowColor}` : '2px solid transparent',
                    boxShadow: hoveredId === achievement.id ? `0 0 8px ${achievement.glowColor}` : 'none',
                    animation: hoveredId === achievement.id ? 'neon-pulse 2s ease-in-out infinite 0.5s' : 'none'
                  }}
                ></div>
                <div 
                  className="absolute bottom-0 right-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{
                    borderBottom: hoveredId === achievement.id ? `2px solid ${achievement.glowColor}` : '2px solid transparent',
                    borderRight: hoveredId === achievement.id ? `2px solid ${achievement.glowColor}` : '2px solid transparent',
                    boxShadow: hoveredId === achievement.id ? `0 0 8px ${achievement.glowColor}` : 'none',
                    animation: hoveredId === achievement.id ? 'neon-pulse 2s ease-in-out infinite 0.5s' : 'none'
                  }}
                ></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 relative"
        >
          {/* Intensified background glow effect */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-gradient-to-r from-amber-500/10 via-orange-500/15 to-purple-500/10 rounded-full blur-3xl"></div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-white mb-8"
          >
            Want to see the{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text animate-gradient">
              complete journey
            </span>?
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block relative"
          >
            {/* Button glow effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            
            <Button 
              size="lg" 
              className="shadow-glow-orange bg-gradient-to-r from-amber-600/80 to-orange-700/80 hover:from-amber-500 hover:to-orange-600 text-white font-medium px-8 py-6 rounded-xl group border-0 relative z-10"
              asChild
            >
              <Link href="/journey" className="flex items-center gap-3">
                <CircuitBoard className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-bold">Explore My Timeline</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Custom CSS for shimmering border animation */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
        
        .drop-shadow-glow {
          filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.6));
        }
        
        .neon-card:hover {
          transform: translateY(-3px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
      `}</style>
    </section>
  )
}
