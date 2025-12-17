"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "@/lib/framer-exports"
import { CircuitBoard, Quote, Heart, Star, Sparkles, Lightbulb, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WordsILiveBySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, 60])
  
  const [activeTab, setActiveTab] = useState("motivational")
  
  // Track when user scrolls to the section for animations
  const quoteContentRef = useRef<HTMLDivElement>(null)
  const contentIsInView = useInView(quoteContentRef, { once: false, amount: 0.2 })

  // Categories of quotes
  const quoteCategories = [
    {
      id: "ai-innovation",
      title: "AI & Innovation",
      icon: <CircuitBoard className="w-5 h-5" />,
      color: "cyber-cyan",
      quotes: [
        {
          text: "The future is not something that happens to you. It's something you create. And that creation increasingly depends on AI.",
          author: "Personal Mantra",
          caption: "Build the future now, don't wait for it."
        },
        {
          text: "Artificial Intelligence will be either the best or worst thing ever to happen to humanity. Make sure you're building it right.",
          author: "Elon Musk (Inspired)",
          caption: "Responsibility meets ambition."
        },
        {
          text: "The AI you build today will define the world someone else inherits tomorrow.",
          author: "Personal Mantra",
          caption: "Build with intention. Build with impact."
        },
        {
          text: "Machine learning isn't magic — it's the ability to learn from patterns humans couldn't see alone.",
          author: "Personal Mantra",
          caption: "You're not building algorithms. You're building insight."
        },
        {
          text: "First principles thinking applied to AI: Why do we build what we build? What problem does it truly solve?",
          author: "Elon Musk (Inspired)",
          caption: "Question everything. Build fearlessly."
        },
        {
          text: "The most exciting AI products will come from people insane enough to see possibilities nobody else does.",
          author: "Personal Mantra",
          caption: "Your 'crazy idea' is the next revolution."
        }
      ]
    },
    {
      id: "motivational",
      title: "Motivational",
      icon: <Star className="w-5 h-5" />,
      color: "cyber-orange",
      quotes: [
        {
          text: "The people you work with matter more than the salary you get. Surround yourself with people who push you to be 10x better.",
          author: "Personal Mantra",
          caption: "Excellence is contagious. Choose your circle wisely."
        },
        {
          text: "Dream so big that it terrifies you. Then execute with precision that terrifies your competitors.",
          author: "Personal Mantra",
          caption: "Ambition + Execution = Legacy."
        },
        {
          text: "You're not just building products. You're building a mission. Make it matter.",
          author: "Personal Mantra",
          caption: "Purpose is the fuel that never runs out."
        },
        {
          text: "If you're not uncomfortable, you're not growing. Comfort is the enemy of greatness.",
          author: "Personal Mantra",
          caption: "Embrace the struggle. That's where the magic happens."
        },
        {
          text: "The number of hours you work is irrelevant. What matters is the dent you make in the universe.",
          author: "Elon Musk (Inspired)",
          caption: "Impact over burnout. Always."
        },
        {
          text: "Every 'no' gets you closer to the 'yes' that changes everything.",
          author: "Personal Mantra",
          caption: "Resilience is a skill. Practice it daily."
        }
      ]
    },
    {
      id: "coding",
      title: "Engineering",
      icon: <Zap className="w-5 h-5" />,
      color: "neon-green",
      quotes: [
        {
          text: "Code is a conversation with the future. Write it so that your future self — and better minds — can understand and improve it.",
          author: "Personal Mantra",
          caption: "Clean code is a gift to collaborators."
        },
        {
          text: "Systems thinking > clever code. A simple system that scales beats a genius algorithm nobody understands.",
          author: "Personal Mantra",
          caption: "Build for humans. Build for scale."
        },
        {
          text: "The best engineers aren't the ones who code the most. They're the ones who solve the hardest problems with the least code.",
          author: "Personal Mantra",
          caption: "Simplicity is sophistication."
        },
        {
          text: "Robotics teaches you that code affects the physical world. Respect that power. Test everything. Fail safely.",
          author: "Personal Mantra",
          caption: "Your code might move a machine. Make it count."
        },
        {
          text: "A production-ready system that works beats a perfect prototype that never ships.",
          author: "Personal Mantra",
          caption: "Ship it. Learn from it. Scale it."
        },
        {
          text: "The most valuable code is the code you never have to maintain.",
          author: "Personal Mantra",
          caption: "Elegance through architecture, not complexity."
        }
      ]
    },
    {
      id: "mindfulness",
      title: "Mindset & Growth",
      icon: <Heart className="w-5 h-5" />,
      color: "neon-purple",
      quotes: [
        {
          text: "Your network determines your net worth. Invest in relationships with people who are where you want to be.",
          author: "Personal Mantra",
          caption: "You are the average of the five people you spend the most time with."
        },
        {
          text: "Mediocrity is a choice. Excellence is a standard. Choose wisely, and let your choices define your circle.",
          author: "Personal Mantra",
          caption: "Raise the bar. Attract excellence."
        },
        {
          text: "Learning never stops. The moment you think you know everything is the moment you stop growing.",
          author: "Personal Mantra",
          caption: "Curiosity is your superpower."
        },
        {
          text: "Being around people smarter than you is uncomfortable. That discomfort is proof you're evolving.",
          author: "Personal Mantra",
          caption: "Seek mentors. Become one."
        },
        {
          text: "Patience is not waiting. It's progressing with intention while the world doubts you.",
          author: "Personal Mantra",
          caption: "Overnight success takes 10 years. Build anyway."
        },
        {
          text: "Your perspective is limited by your experiences. Travel. Read. Build. Meet visionaries. Expand.",
          author: "Personal Mantra",
          caption: "The world is your classroom."
        }
      ]
    },
    {
      id: "creativity",
      title: "Vision & Breakthrough",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "cyber-orange",
      quotes: [
        {
          text: "First principles: Why does it exist? Can I rebuild it better? If yes, do it.",
          author: "Elon Musk (Inspired)",
          caption: "Most breakthroughs come from questioning the obvious."
        },
        {
          text: "The best ideas sound crazy until they're not. If it's obviously possible, someone else is already doing it.",
          author: "Personal Mantra",
          caption: "Think differently or don't think at all."
        },
        {
          text: "Innovation isn't about being smarter. It's about connecting dots others haven't seen yet.",
          author: "Personal Mantra",
          caption: "Every genius was once called mad."
        },
        {
          text: "The people solving trillion-dollar problems today were told their ideas were impossible yesterday.",
          author: "Personal Mantra",
          caption: "Impossibility is temporary. Vision is eternal."
        },
        {
          text: "Build like you're competing against the smartest people on Earth. Because you might be.",
          author: "Personal Mantra",
          caption: "Excellence attracts excellence."
        },
        {
          text: "Your unique perspective is your unfair advantage. Don't dilute it to fit in.",
          author: "Personal Mantra",
          caption: "The world doesn't need more copies. It needs your original."
        }
      ]
    }
  ];

  return (
    <section id="words-i-live-by" className="relative py-24 overflow-hidden bg-black border-t border-white/5">
      {/* Enhanced cyberpunk background effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Animated glowing particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${i % 3 === 0 ? 1 : 0.5} h-${i % 3 === 0 ? 1 : 0.5} ${
              i % 3 === 0 ? 'bg-cyber-orange' : i % 3 === 1 ? 'bg-neon-purple' : 'bg-neon-green'
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
                i % 3 === 0 ? 'rgba(249, 115, 22, 0.6)' : 
                i % 3 === 1 ? 'rgba(147, 51, 234, 0.6)' : 
                'rgba(16, 185, 129, 0.6)'
              }`
            }}
          />
        ))}
      </div>
      
      {/* Cyberpunk wireframe elements */}
      <motion.div 
        className="absolute top-1/4 right-0 w-[50%] h-[1px] bg-gradient-to-l from-transparent via-orange-500/20 to-transparent"
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
        className="absolute top-3/4 left-0 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
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
            className="inline-flex items-center gap-3 px-6 py-3 glass rounded-full text-cyber-orange text-sm font-medium mb-8 shadow-glow-orange"
            style={{
              background: 'linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.05) 100%)',
              boxShadow: '0 0 20px rgba(249,115,22,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <Quote className="w-4 h-4" />
            <span>Words I Live By</span>
            <motion.div 
              className="w-2 h-2 bg-orange-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
                boxShadow: [
                  '0 0 0 rgba(249,115,22,0.4)',
                  '0 0 10px rgba(249,115,22,0.8)',
                  '0 0 0 rgba(249,115,22,0.4)'
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
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-amber-400 text-transparent bg-clip-text animate-gradient">
              Fuel For My Journey
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Quotes and mantras that <span className="text-cyber-orange font-semibold">inspire</span>, <span className="text-neon-purple font-semibold">motivate</span>, and <span className="text-neon-green font-semibold">energize</span> me every day
          </motion.p>
        </motion.div>

        {/* Quote Content Section with Enhanced Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Background blur elements */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-orange-500/5 rounded-full blur-3xl"></div>
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
              <Tabs defaultValue="motivational" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="mb-4">
                  <TabsList className="flex flex-wrap justify-center bg-transparent px-0.5 py-1 sm:py-2 gap-1.5 sm:gap-2 w-full">
                    {quoteCategories.map((category) => {
                      const isActive = activeTab === category.id;
                      // Define color classes based on the category color
                      let activeClasses = "";
                      let iconClasses = "";
                      let indicatorClasses = "";
                      
                      if (category.color === "cyber-cyan") {
                        activeClasses = "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]";
                        iconClasses = isActive ? "text-cyan-400" : "text-gray-500 group-hover:text-gray-300";
                        indicatorClasses = "bg-cyan-400";
                      } else if (category.color === "neon-purple") {
                        activeClasses = "bg-purple-500/10 text-purple-400 border-purple-500/30 shadow-[0_0_20px_rgba(147,51,234,0.15)]";
                        iconClasses = isActive ? "text-purple-400" : "text-gray-500 group-hover:text-gray-300";
                        indicatorClasses = "bg-purple-400";
                      } else if (category.color === "neon-green") {
                        activeClasses = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]";
                        iconClasses = isActive ? "text-emerald-400" : "text-gray-500 group-hover:text-gray-300";
                        indicatorClasses = "bg-emerald-400";
                      } else if (category.color === "cyber-orange") {
                        activeClasses = "bg-orange-500/10 text-orange-400 border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.15)]";
                        iconClasses = isActive ? "text-orange-400" : "text-gray-500 group-hover:text-gray-300";
                        indicatorClasses = "bg-orange-400";
                      } else {
                        activeClasses = "bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]";
                        iconClasses = isActive ? "text-blue-400" : "text-gray-500 group-hover:text-gray-300";
                        indicatorClasses = "bg-blue-400";
                      }
                      
                      return (
                        <TabsTrigger 
                          key={category.id} 
                          value={category.id}
                          className={`
                            group flex items-center gap-1 sm:gap-2 py-1.5 sm:py-2.5 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300
                            text-gray-400 hover:text-white font-medium text-xs sm:text-base border border-transparent
                            active:scale-95 focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-opacity-50 mb-2 mx-0.5
                            ${isActive ? activeClasses : 'hover:bg-white/5'}
                            ${isActive ? `focus:ring-${category.color === 'cyber-cyan' ? 'cyan' : 
                                       category.color === 'neon-purple' ? 'purple' : 
                                       category.color === 'cyber-orange' ? 'orange' : 'emerald'}-500/50` : 'focus:ring-white/25'}
                          `}
                        >
                          <div className="relative flex items-center gap-1 sm:gap-2">
                            <div className={`transition-colors ${iconClasses}`}>
                              {category.icon}
                            </div>
                            {/* Always show title but use smaller text on mobile */}
                            <span className="text-2xs xs:text-xs sm:text-sm md:text-base whitespace-nowrap">{category.title}</span>
                            {isActive && (
                              <motion.div
                                layoutId="activeQuoteTabIndicator"
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
                <div ref={quoteContentRef} className="mt-0 pt-4 sm:pt-6 border-t border-white/10">
                  {quoteCategories.map((category) => (
                    <TabsContent key={category.id} value={category.id} className="outline-none">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="px-1 py-3 sm:p-4"
                      >
                        <div className="space-y-6 relative">
                          <div className={`absolute -top-12 ${category.id === 'coding' ? 'left' : 'right'}-1/3 w-28 h-28 bg-${
                            category.color === 'cyber-cyan' ? 'cyan' :
                            category.color === 'neon-purple' ? 'purple' :
                            category.color === 'neon-green' ? 'emerald' : 'orange'
                          }-500/10 rounded-full blur-3xl z-0`}></div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative z-10">
                            {category.quotes.map((quote, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={contentIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                className={`glass p-5 sm:p-6 rounded-xl border border-white/10 hover:border-${
                                  category.color === 'cyber-cyan' ? 'cyan' :
                                  category.color === 'neon-purple' ? 'purple' :
                                  category.color === 'neon-green' ? 'emerald' : 'orange'
                                }-500/30 transition-all duration-300 h-full`}
                                style={{ 
                                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
                                }}
                              >
                                <div className={`text-${
                                  category.color === 'cyber-cyan' ? 'cyan' :
                                  category.color === 'neon-purple' ? 'purple' :
                                  category.color === 'neon-green' ? 'emerald' : 'orange'
                                }-400 mb-3`}>
                                  <Quote className="w-6 h-6" />
                                </div>
                                <p className="text-white text-lg sm:text-xl font-medium leading-relaxed mb-3">"{quote.text}"</p>
                                <div className="flex items-center justify-between mt-4">
                                  <p className="text-gray-400 text-sm">— {quote.author}</p>
                                  {quote.caption && (
                                    <p className={`text-${
                                      category.color === 'cyber-cyan' ? 'cyan' :
                                      category.color === 'neon-purple' ? 'purple' :
                                      category.color === 'neon-green' ? 'emerald' : 'orange'
                                    }-400 text-xs sm:text-sm italic`}>{quote.caption}</p>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </TabsContent>
                  ))}
                </div>
              </Tabs>
            </div>
          </div>
        </motion.div>
        
        {/* Inspirational CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12 relative"
        >
          <div className="glass-strong p-6 sm:p-8 rounded-2xl border border-white/10" 
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
            }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center mb-5"
            >
              <div className="bg-gradient-to-r from-orange-500/20 via-orange-500/30 to-orange-500/20 rounded-full p-3">
                <Sparkles className="w-8 h-8 text-orange-400" />
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
            >
              What's your driving mantra?
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-lg text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Words have power. They can motivate, inspire, and transform. Find the words that move you forward and make them your own.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button 
                size="lg" 
                className="shadow-glow-orange bg-gradient-to-r from-orange-600/80 to-orange-700/80 hover:from-orange-500 hover:to-orange-600 text-white font-medium px-8 py-6 rounded-xl group border-0"
                asChild
              >
                <Link href="#contact" className="flex items-center gap-3">
                  <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
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
