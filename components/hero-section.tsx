"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useMotionValue } from "@/lib/framer-exports"
import { Button } from "@/components/ui/button"
import { 
  Github, 
  Linkedin, 
  FileText, 
  ArrowDown, 
  Code, 
  Database, 
  Server,
  Braces, 
  FileType, 
  Atom, 
  Terminal, 
  FileCode, 
  Box, 
  Cloud, 
  GitBranch, 
  Workflow
} from "lucide-react"

const roles = [
  "Full Stack Developer",
  "ML Engineer",
  "DevOps Expert",
  "Problem Solver",
  "Indie Hacker",
  "Systems Architect"
]

// Enhanced tech icons with more properties for animation and using Lucide icons
const techIcons = [
  { 
    icon: <FileType className="w-full h-full text-blue-400" />, 
    name: "typescript", 
    top: "12%", 
    left: "8%", 
    size: 1, 
    delay: 0.2, 
    duration: 8, 
    rotation: 360 
  },
  { 
    icon: <Atom className="w-full h-full text-cyan-400" />, 
    name: "react", 
    top: "18%", 
    left: "78%", 
    size: 1.2, 
    delay: 0.3, 
    duration: 10, 
    rotation: -360 
  },
  { 
    icon: <Terminal className="w-full h-full text-yellow-500" />, 
    name: "python", 
    top: "68%", 
    left: "12%", 
    size: 0.9, 
    delay: 0.4, 
    duration: 9, 
    rotation: 360 
  },
  { 
    icon: <Server className="w-full h-full text-green-500" />, 
    name: "node", 
    top: "62%", 
    left: "82%", 
    size: 1.1, 
    delay: 0.5, 
    duration: 12, 
    rotation: -360 
  },
  { 
    icon: <Box className="w-full h-full text-blue-500" />, 
    name: "docker", 
    top: "82%", 
    left: "42%", 
    size: 0.8, 
    delay: 0.6, 
    duration: 11, 
    rotation: 360 
  },
  { 
    icon: <Cloud className="w-full h-full text-orange-300" />, 
    name: "aws", 
    top: "33%", 
    left: "88%", 
    size: 1, 
    delay: 0.7, 
    duration: 9.5, 
    rotation: -360 
  },
  { 
    icon: <GitBranch className="w-full h-full text-orange-500" />, 
    name: "git", 
    top: "25%", 
    left: "22%", 
    size: 0.9, 
    delay: 0.8, 
    duration: 10.5, 
    rotation: 360 
  },
  { 
    icon: <Workflow className="w-full h-full text-pink-500" />, 
    name: "graphql", 
    top: "72%", 
    left: "28%", 
    size: 0.8, 
    delay: 0.9, 
    duration: 9, 
    rotation: -360 
  },
]

// Binary code animation elements
const binaryElements = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  top: `${5 + Math.random() * 90}%`,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 2,
  duration: 5 + Math.random() * 10,
  opacity: 0.05 + Math.random() * 0.1,
  size: 0.7 + Math.random() * 0.6,
}))

// Floating circuit patterns
const circuitPatterns = Array.from({ length: 4 }, (_, i) => ({
  id: i,
  top: `${15 + i * 20}%`,
  left: i % 2 === 0 ? "10%" : "80%",
  rotation: i % 2 === 0 ? 25 : -25,
  delay: i * 0.3,
}))

export default function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const typingSpeedRef = useRef(80)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Track mouse movement for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      }
      
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Animation on component mount
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Typing effect logic
  const performTypingEffect = useCallback(() => {
    const currentRole = roles[currentRoleIndex]

      if (!isDeleting) {
      // Adding characters
      if (displayText.length < currentRole.length) {
        setDisplayText(currentRole.substring(0, displayText.length + 1))
        typingSpeedRef.current = 80
      } else {
        // Finished typing, pause before deleting
        typingSpeedRef.current = 2000
          setIsDeleting(true)
        }
      } else {
      // Removing characters
      if (displayText.length > 0) {
        setDisplayText(currentRole.substring(0, displayText.length - 1))
        typingSpeedRef.current = 30
      } else {
        // Finished deleting, move to next role
          setIsDeleting(false)
          setCurrentRoleIndex((currentRoleIndex + 1) % roles.length)
        }
      }
    
    // Schedule the next update
    timeoutRef.current = setTimeout(performTypingEffect, typingSpeedRef.current)
  }, [currentRoleIndex, displayText, isDeleting]);

  useEffect(() => {
    // Start the typing effect
    timeoutRef.current = setTimeout(performTypingEffect, typingSpeedRef.current)
    
    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [performTypingEffect])

  return (
    <section className="relative min-h-screen pt-20 flex items-center overflow-hidden">
      {/* Enhanced background animation */}
      <div className="absolute inset-0 bg-grid-pattern z-0 opacity-5"></div>
      
      {/* Binary code animation */}
      {binaryElements.map((el) => (
        <motion.div
          key={`binary-${el.id}`}
          className="absolute font-mono text-xs opacity-10 z-0 text-primary pointer-events-none"
          style={{ 
            top: el.top, 
            left: el.left, 
            fontSize: `${el.size}rem`,
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: el.opacity,
            y: [0, 100],
            x: [0, el.id % 2 === 0 ? 20 : -20]
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            repeatType: "loop",
            delay: el.delay,
            ease: "linear"
          }}
        >
          {Array.from({ length: 8 }, () => Math.round(Math.random())).join('')}
        </motion.div>
      ))}

      {/* Circuit pattern elements */}
      {circuitPatterns.map((pattern) => (
        <motion.div
          key={`circuit-${pattern.id}`}
          className="absolute w-64 h-64 opacity-5 pointer-events-none"
          style={{ 
            top: pattern.top, 
            left: pattern.left,
            rotate: `${pattern.rotation}deg`,
            background: `url('/circuit-pattern.svg')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }}
          animate={{
            x: mouseX.get() * -15,
            y: mouseY.get() * -15,
          }}
          transition={{
            type: "spring",
            damping: 50,
            stiffness: 100,
          }}
        />
      ))}

      {/* Improved tech icons with parallax */}
      {techIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute z-10 hidden md:block"
          style={{ 
            top: item.top, 
            left: item.left,
            width: `${item.size * 4}rem`,
            height: `${item.size * 4}rem`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 0.2, 
            scale: 1,
            x: mouseX.get() * -20 * (index % 2 === 0 ? 1 : -1),
            y: mouseY.get() * -20 * (index % 3 === 0 ? 1 : -1),
            rotate: item.rotation 
          }}
          transition={{ 
            opacity: { duration: 1, delay: item.delay },
            scale: { duration: 1, delay: item.delay },
            rotate: { 
              duration: item.duration, 
            repeat: Infinity,
              ease: "linear" 
            },
            x: { type: "spring", damping: 25, stiffness: 100 },
            y: { type: "spring", damping: 25, stiffness: 100 }
          }}
        >
          {item.icon}
          <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl -z-10 animate-pulse"></div>
        </motion.div>
      ))}

      {/* Improved decorative elements with dynamic motion */}
      <motion.div 
        className="absolute top-40 -left-16 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/10 blur-3xl z-0"
        animate={{
          scale: [1, 1.1, 1],
          x: mouseX.get() * -30,
          y: mouseY.get() * -30,
        }}
        transition={{
          scale: {
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          },
          x: { type: "spring", damping: 25, stiffness: 100 },
          y: { type: "spring", damping: 25, stiffness: 100 }
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute bottom-40 -right-16 w-96 h-96 rounded-full bg-gradient-to-l from-blue-500/20 to-cyan-500/10 blur-3xl z-0"
        animate={{
          scale: [1, 1.2, 1],
          x: mouseX.get() * 30,
          y: mouseY.get() * 30,
        }}
        transition={{
          scale: {
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          },
          x: { type: "spring", damping: 25, stiffness: 100 },
          y: { type: "spring", damping: 25, stiffness: 100 }
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-green-500/10 to-teal-500/5 blur-3xl z-0"
        animate={{
          scale: [1, 1.3, 1],
          x: mouseX.get() * 20,
          y: mouseY.get() * 20,
        }}
        transition={{
          scale: {
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          },
          x: { type: "spring", damping: 25, stiffness: 100 },
          y: { type: "spring", damping: 25, stiffness: 100 }
        }}
      ></motion.div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced text content with better animations */}
          <motion.div
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="block">Hi, I'm</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-400 animate-gradient relative">
                Md Arshad Noor
                <motion.span 
                  className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-500/20 via-blue-500/10 to-indigo-500/20 blur-sm -z-10"
                  animate={{ 
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </span>
            </motion.h1>
            
            <motion.div 
              className="h-14 flex justify-center lg:justify-start items-center text-xl md:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="mr-2">I'm a</span>
              <div className="relative h-full overflow-hidden flex items-center">
                <span className="text-purple-500 typing-effect font-bold min-w-[180px] relative">
                  {displayText}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </span>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Building innovative solutions with cutting-edge technologies.
              Transforming ideas into elegant, scalable, and user-friendly applications.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white relative overflow-hidden group"
              >
                <Link href="#projects">
                  <span className="relative z-10">View My Work</span>
                  <motion.span 
                    className="absolute inset-0 bg-white/20 -z-0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.7 }}
                  />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="overflow-hidden group relative">
                <Link href="#contact">
                  <span className="relative z-10">Get In Touch</span>
                  <motion.span 
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 -z-0"
                    initial={{ y: "-100%" }}
                    whileHover={{ y: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="flex gap-5 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {[
                { Icon: Github, href: "https://github.com/ArcaneNova" },
                { Icon: Linkedin, href: "https://linkedin.com/" },
                { Icon: FileText, href: "/resume" }
              ].map((item, i) => (
              <motion.a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="p-2 rounded-full bg-background/80 border border-border hover:bg-muted transition-colors relative group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                  <item.Icon className="h-5 w-5 relative z-10" />
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
              </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced profile image with better 3D effects and animations */}
          <motion.div 
            className="flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div 
              className="relative w-72 h-72 md:w-[400px] md:h-[400px]"
              animate={{
                x: mouseX.get() * -20,
                y: mouseY.get() * -20,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 100,
              }}
            >
              {/* Enhanced backdrop glows */}
              <motion.div 
                className="absolute -inset-5 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-indigo-500/30 rounded-full blur-3xl opacity-40"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 15,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <motion.div 
                className="absolute inset-[5%] bg-gradient-to-r from-blue-400/30 to-indigo-400/20 rounded-full blur-2xl opacity-40"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, -360],
                  opacity: [0.4, 0.6, 0.4]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
              />
              
              {/* Orbital rings */}
              <motion.div 
                className="absolute inset-0 border-[2px] border-blue-500/20 rounded-full"
                style={{ margin: "-10%" }}
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 30, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
              
              <motion.div 
                className="absolute inset-0 border-[1px] border-purple-500/15 rounded-full"
                style={{ margin: "-5%" }}
                animate={{ rotate: -360 }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
              
              {/* Image container with enhanced 3D effect */}
              <motion.div 
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-2xl"
                animate={{ 
                  rotateY: [0, 15, 0, -15, 0],
                  rotateX: [0, -10, 0, 10, 0]
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: "easeInOut"
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px" 
                }}
              >
                <Image
                  src="/profile.png"
                  alt="Md Arshad Noor"
                  width={400}
                  height={400}
                  className="object-cover"
                  priority
                />
                
                {/* Enhanced lighting effects */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/20 mix-blend-overlay"
                  animate={{
                    background: [
                      "linear-gradient(to top right, rgba(0,0,0,0.3), transparent, rgba(255,255,255,0.2))",
                      "linear-gradient(to bottom right, rgba(0,0,0,0.3), transparent, rgba(255,255,255,0.2))",
                      "linear-gradient(to top left, rgba(0,0,0,0.3), transparent, rgba(255,255,255,0.2))",
                      "linear-gradient(to bottom left, rgba(0,0,0,0.3), transparent, rgba(255,255,255,0.2))",
                      "linear-gradient(to top right, rgba(0,0,0,0.3), transparent, rgba(255,255,255,0.2))"
                    ]
                  }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity, 
                    ease: "easeInOut"
                  }}
                />
                
                {/* Subtle holographic effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-transparent mix-blend-overlay"
                  animate={{ 
                    opacity: [0, 0.3, 0],
                    x: ['-100%', '100%']
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    repeatDelay: 5
                  }}
                />
              </motion.div>
              
              {/* Enhanced particle elements */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${i % 3 === 0 ? 'rgb(168, 85, 247)' : i % 3 === 1 ? 'rgb(59, 130, 246)' : 'rgb(99, 102, 241)'}, transparent)`,
                    boxShadow: `0 0 8px 2px ${i % 3 === 0 ? 'rgba(168, 85, 247, 0.3)' : i % 3 === 1 ? 'rgba(59, 130, 246, 0.3)' : 'rgba(99, 102, 241, 0.3)'}`,
                    top: `${10 + i * 10}%`,
                    left: i % 2 === 0 ? '-5%' : '105%',
                    scale: 0.6 + (i * 0.1)
                  }}
                  animate={{
                    y: [0, 20, 0, -20, 0],
                    x: i % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3 + i,
                    delay: i * 0.2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              ))}
              
              {/* Tech symbols orbiting */}
              {[
                { Icon: Code, delay: 0, distance: 120, duration: 15, size: 20 },
                { Icon: Database, delay: 5, distance: 120, duration: 20, size: 20 },
                { Icon: Server, delay: 10, distance: 120, duration: 25, size: 20 }
              ].map((item, i) => (
                <motion.div
                  key={`orbit-${i}`}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary/30"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: 0.6,
                    rotate: 360
                  }}
                  transition={{
                    opacity: { duration: 1 },
                    rotate: { 
                      duration: item.duration, 
                      repeat: Infinity, 
                      ease: "linear",
                      delay: item.delay
                    }
                  }}
                >
                  <motion.div
                    style={{ 
                      x: item.distance,
                      transformOrigin: `${-item.distance}px 0`,
                    }}
                  >
                    <item.Icon size={item.size} />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: 1.5
          }}
        >
          <motion.span 
            className="text-sm text-muted-foreground mb-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            Scroll Down
          </motion.span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
          >
            <motion.div 
              className="w-1 h-1.5 rounded-full bg-muted-foreground"
              animate={{ y: [0, 10, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
