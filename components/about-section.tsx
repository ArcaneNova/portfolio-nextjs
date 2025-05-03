"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "@/lib/framer-exports"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Code, BookOpen, Server, Lightbulb, Brain, Rocket, Coffee, ArrowRight, GraduationCap, TrendingUp, Target, Quote, Sparkles } from "lucide-react"

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], [0.9, 1, 1, 0.95])
  
  const [tab, setTab] = useState("passion")
  
  // Add state for managing text animations
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  
  // Custom typing effect
  useEffect(() => {
    let content = "";
    switch(tab) {
      case "passion":
        content = interests[0].content;
        break;
      case "ai":
        content = interests[1].content;
        break;
      case "personal":
        content = interests[2].content;
        break;
      case "inspiration":
        content = interests[3].content;
        break;
    }
    
    setIsTyping(true);
    setDisplayedText("");
    
    // Calculate how many characters to add in each step to complete in ~5 seconds
    const totalChars = content.length;
    const steps = Math.min(totalChars, 50); // Max 50 steps
    const charsPerStep = Math.ceil(totalChars / steps);
    const intervalTime = 5000 / steps; // Distribute over 5 seconds
    
    let currentPosition = 0;
    const interval = setInterval(() => {
      currentPosition += charsPerStep;
      
      if (currentPosition >= totalChars) {
        setDisplayedText(content);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setDisplayedText(content.substring(0, currentPosition));
      }
    }, intervalTime);
    
    return () => clearInterval(interval);
  }, [tab]);
  
  const interests = [
    { 
      id: "passion", 
      title: "My Passion",
      icon: <Lightbulb className="w-5 h-5" />, 
      content: "I'm especially passionate about building applications and platforms that have a positive impact on society and make everyday life easier. I continuously build and launch SaaS websites and mobile apps, always thinking about how technology can simplify complex problems."
    },
    { 
      id: "ai", 
      title: "AI & ML",
      icon: <Brain className="w-5 h-5" />, 
      content: "AI fascinates me, and it's my college minor. I'm actively learning machine learning and artificial intelligence, and I have a long list of project ideas that combine web, mobile, and AI. I truly believe that merging these three domains can lead to billion-dollar companies—and more importantly, solutions that create real value."
    },
    { 
      id: "personal", 
      title: "Personal",
      icon: <Coffee className="w-5 h-5" />,
      content: "I'm not someone who socializes much—I don't smoke or drink, and I prefer quiet, focused work over distractions. In my free time, I enjoy reading thought-provoking books, participating in hackathons, and contributing to open-source communities."
    },
    { 
      id: "inspiration", 
      title: "Inspiration",
      icon: <Rocket className="w-5 h-5" />, 
      content: "Some of the rare but inspiring movies I've enjoyed include The Social Network, The Pursuit of Happyness, and Bhaag Milkha Bhaag—stories that fuel my drive. These narratives of determination and vision continue to shape my approach to challenges."
    }
  ]
  
  return (
    <section id="about" className="py-20 md:py-24 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-40 -left-20 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full animate-pulse-slower" />
        <div className="hidden md:block absolute top-40 left-1/3 w-32 h-32 bg-cyan-500/20 blur-[50px] rounded-full animate-float" />
        
        {/* Animated particles */}
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary/30 blur-sm"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 8 + 3}px`,
                height: `${Math.random() * 8 + 3}px`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`
              }}
            />
          ))}
        </div>
        
        {/* Code Pattern Background */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('/code-pattern.svg')] bg-repeat bg-center" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6" ref={containerRef}>
        <motion.div 
          className="text-center mb-12 md:mb-16"
          style={{ opacity, y, scale }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 text-sm rounded-full bg-primary/10 text-primary mb-4 backdrop-blur-sm border border-primary/10">
              ABOUT ME
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-500" />
              Who I Am
              <Sparkles className="w-6 h-6 text-blue-500" />
            </span>
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        {/* Main content container */}
        <div className="max-w-5xl mx-auto">
          {/* Introduction card */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-card/60 backdrop-blur-sm border border-border p-8 md:p-10 rounded-xl shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto"
              >
                <p className="text-lg md:text-xl font-medium leading-relaxed text-center relative z-10 mb-8">
                  I'm a software engineer driven by a passion for building meaningful, real-world solutions through technology. My journey began in 2016 when I created my first website—and since then, I've been captivated by the power of programming to transform ideas into impactful applications.
                </p>
                
                <p className="text-base md:text-lg leading-relaxed text-center relative z-10">
                  With hands-on experience in web development, machine learning, and app development, I bring a versatile skill set and a strong commitment to writing clean, efficient code. I take pride in creating intuitive user experiences and products that people love using.
                </p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Interest Categories with typing effect */}
          <motion.div
            className="mb-12" 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="bg-card/60 backdrop-blur-sm border border-border p-8 rounded-xl shadow-xl relative overflow-hidden group">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-500/10 blur-[60px] rounded-full" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 blur-[60px] rounded-full" />
              
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6 inline-flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-primary" />
                  What Drives Me
                </h3>
                
                <motion.div 
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {interests.map((interest, index) => (
                    <motion.button
                      key={interest.id}
                      onClick={() => setTab(interest.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        tab === interest.id 
                          ? 'bg-primary text-primary-foreground shadow-lg' 
                          : 'bg-muted hover:bg-muted/80 text-foreground/70'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                    >
                      {interest.icon}
                      {interest.title}
                    </motion.button>
                  ))}
                </motion.div>
                
                <motion.div 
                  className="bg-background/40 backdrop-blur-md rounded-xl p-6 border border-border relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  
                  <AnimatePresence mode="wait">
                    {tab === "passion" && (
                      <motion.div
                        key="passion"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="leading-relaxed relative z-10 min-h-[150px] md:min-h-[120px]"
                      >
                        <span className="text-primary font-medium">My Passion:</span>{" "}
                        {displayedText}
                        {isTyping && <span className="text-primary animate-pulse">|</span>}
                      </motion.div>
                    )}
                    
                    {tab === "ai" && (
                      <motion.div
                        key="ai"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="leading-relaxed relative z-10 min-h-[150px] md:min-h-[120px]"
                      >
                        <span className="text-primary font-medium">AI & ML:</span>{" "}
                        {displayedText}
                        {isTyping && <span className="text-primary animate-pulse">|</span>}
                      </motion.div>
                    )}
                    
                    {tab === "personal" && (
                      <motion.div
                        key="personal"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="leading-relaxed relative z-10 min-h-[150px] md:min-h-[120px]"
                      >
                        <span className="text-primary font-medium">Personal:</span>{" "}
                        {displayedText}
                        {isTyping && <span className="text-primary animate-pulse">|</span>}
                      </motion.div>
                    )}
                    
                    {tab === "inspiration" && (
                      <motion.div
                        key="inspiration"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="leading-relaxed relative z-10 min-h-[150px] md:min-h-[120px]"
                      >
                        <span className="text-primary font-medium">Inspiration:</span>{" "}
                        {displayedText}
                        {isTyping && <span className="text-primary animate-pulse">|</span>}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Call to action buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-md px-6 py-2">
                <Link href="/contact" className="flex items-center gap-2">
                  Let's Connect <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button asChild variant="outline" className="border-primary/20 hover:border-primary/40 px-6 py-2">
                <Link href="/projects">View My Projects</Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Quote */}
          <motion.div 
            className="mb-16 text-center px-6 py-8 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-indigo-500/5 backdrop-blur-sm rounded-2xl border border-primary/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Quote className="w-8 h-8 mx-auto mb-3 text-primary/30" />
            <p className="text-base md:text-lg italic text-foreground/80 max-w-2xl mx-auto">
              "If you're someone who's passionate about building, innovating, and making a difference—I'd love to connect. Whether you're a developer, founder, or dreamer, let's collaborate and create something magical together."
            </p>
          </motion.div>
          
          {/* Education & Market Insights Section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Education Card */}
            <div className="bg-card/60 backdrop-blur-sm border border-border p-6 md:p-8 rounded-xl shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-bl-full" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2.5 rounded-full">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Education</h3>
              </div>
              
              <p className="relative z-10 mb-4">
                Currently, I am in the final year of my B.Tech in Computer Science. While the academic curriculum follows older technologies like Laravel and PHP, I prefer to focus on cutting-edge skills that align with today's market demands.
              </p>
              
              <div className="relative z-10 flex items-center gap-2 text-sm text-primary font-medium mt-4">
                <div className="p-1 rounded-full bg-primary/10">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>B.Tech in Computer Science (Final Year)</span>
              </div>
            </div>
            
            {/* Market Insights Card */}
            <div className="bg-card/60 backdrop-blur-sm border border-border p-6 md:p-8 rounded-xl shadow-lg relative overflow-hidden group md:col-span-2">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-600/5 rounded-tr-full" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary/10 p-2.5 rounded-full">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Market Insights</h3>
              </div>
              
              <p className="relative z-10 mb-4">
                I try to observe what's trending in the current market. Right now, AI is the hottest technology, with people building AI-powered websites and mobile apps that automate and simplify countless tasks. Recently, we've seen several billion-dollar startups built around simple Large Language Model (LLM) applications.
              </p>
              
              <p className="relative z-10 mb-4">
                Companies like Perplexity and Loveable are perfect examples—with Loveable becoming the fastest company to reach a billion-dollar valuation. These success stories inspire me to learn and implement cutting-edge technologies into real-world products.
              </p>
              
              <div className="relative z-10 flex items-center gap-2 text-sm text-primary font-medium mt-4">
                <div className="p-1 rounded-full bg-primary/10">
                  <Target className="w-4 h-4" />
                </div>
                <span>I will keep building and launching until I reach my dream valuation</span>
              </div>
            </div>
          </motion.div>
          
          {/* Vision Statement */}
          <motion.div 
            className="mt-8 text-center px-4 py-8 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 backdrop-blur-sm rounded-2xl border border-primary/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="text-lg font-medium text-foreground/90 max-w-3xl mx-auto">
              I personally try to learn things and implement them in the real world. I make products for people to use. I will keep building things and launching until I reach my dream valuation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
