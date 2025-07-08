"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "@/lib/framer-exports"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ChevronRight, Award, Sparkles, TrendingUp } from "lucide-react"
import type { Challenge, ChallengesResponse } from "@/lib/models/challenge"

export default function ChallengesSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    // Delay API call slightly to improve hydration
    const timer = setTimeout(() => {
      fetchChallenges()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const fetchChallenges = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/challenges?limit=2") // Limiting to 2 for the homepage

      if (!response.ok) {
        throw new Error("Failed to fetch challenges")
      }

      const data: ChallengesResponse = await response.json()
      setChallenges(data.challenges)
      setError(null)
    } catch (err) {
      console.error("Error fetching challenges:", err)
      setError("Failed to load challenges. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  // Decorative elements for background
  const decorativeElements = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    top: `${10 + i * 20}%`,
    left: i % 2 === 0 ? `${5 + (i * 5)}%` : `${85 - (i * 5)}%`,
    size: 100 + (i * 30),
    delay: i * 0.2,
    duration: 15 + (i * 3),
    opacity: 0.03 + (i * 0.01)
  }))

  return (
    <section id="challenges" className="py-20 relative bg-muted/30 overflow-hidden">
      {/* Decorative background elements */}
      {decorativeElements.map((el) => (
        <motion.div
          key={`decor-${el.id}`}
          className="absolute rounded-full border border-primary/10 z-0"
          style={{
            top: el.top,
            left: el.left,
            width: el.size,
            height: el.size,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: el.opacity, 
            scale: [1, 1.1, 1],
            rotate: el.id % 2 === 0 ? 360 : -360
          }}
          transition={{
            opacity: { duration: 1 },
            scale: { 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse" 
            },
            rotate: { 
              duration: el.duration, 
              repeat: Infinity,
              ease: "linear"
            }
          }}
        />
      ))}

      {/* Floating icons */}
      {[
        { Icon: Award, top: "15%", left: "5%", delay: 0.2 },
        { Icon: Sparkles, top: "75%", left: "10%", delay: 0.5 }, 
        { Icon: TrendingUp, top: "25%", left: "92%", delay: 0.8 }
      ].map((item, i) => (
        <motion.div
          key={`float-${i}`}
          className="absolute text-primary/10 hidden md:block"
          style={{ 
            top: item.top, 
            left: item.left,
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.2,
            y: [0, -15, 0, 15, 0]
          }}
          transition={{
            opacity: { duration: 1 },
            y: { 
              duration: 10,
              repeat: Infinity,
              repeatType: "loop"
            }
          }}
        >
          <item.Icon size={40} />
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block mb-2"
          >
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-3 w-3 mr-1" />
              Learning Journey
            </span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            My Challenges
          </motion.h2>

          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Tracking my progress through various coding and learning challenges
          </motion.p>

          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
          />
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(2)].map((_, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border rounded-lg overflow-hidden shadow-lg h-96 animate-pulse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="h-48 bg-muted"></div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full mb-6"></div>
                  <div className="h-5 bg-muted rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-full mb-4"></div>
                  <div className="h-10 bg-muted rounded w-1/3"></div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : error ? (
          <motion.div 
            className="text-center py-12 bg-red-500/5 rounded-lg border border-red-200 max-w-lg mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image 
              src="/error-illustration.svg" 
              alt="Error" 
              width={120} 
              height={120} 
              className="mx-auto mb-4 opacity-70"
            />
            <p className="text-red-500 mb-4 font-medium">{error}</p>
            <Button 
              onClick={() => setChallenges([])}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600"
            >
              Retry
            </Button>
          </motion.div>
        ) : challenges.length === 0 ? (
          <motion.div 
            className="text-center py-12 bg-primary/5 rounded-lg border border-primary/20 max-w-lg mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image 
              src="/empty-illustration.svg" 
              alt="No challenges" 
              width={150} 
              height={150} 
              className="mx-auto mb-4 opacity-70"
            />
            <p className="text-muted-foreground mb-4">No challenges found.</p>
            <Link href="/challenges">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600">
                View All Challenges
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge._id}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-lg group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredCard(challenge._id || null)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                {/* Background gradient overlay with improved contrast */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-indigo-500/10 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                />
                
                {/* Card media top section */}
                <div className="relative h-52 overflow-hidden">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="h-full"
                  >
                    <Image
                      src={challenge.image || "/placeholder.svg?height=300&width=500"}
                      alt={challenge.title}
                      fill
                      className="object-cover transition-transform duration-500"
                    />
                  </motion.div>
                  
                  {/* Text overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/20 flex items-end">
                    <div className="p-6">
                      <motion.div 
                        initial={{ opacity: 0.9, y: 0 }}
                        whileHover={{ opacity: 1, y: -2 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-xl font-bold text-white mb-1.5 flex items-center">
                          <Award className="h-5 w-5 mr-2 text-purple-400" />
                          {challenge.title}
                        </h3>
                      </motion.div>
                      <p className="text-white/80 line-clamp-2 text-sm md:text-base">{challenge.description}</p>
                    </div>
                  </div>
                  
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -5 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-md"
                  >
                    <div className="flex items-center">
                      <Sparkles className="h-3 w-3 mr-1" />
                      {challenge.totalDays}-Day Challenge
                    </div>
                  </motion.div>
                </div>

                {/* Card content */}
                <div className="p-6 relative z-10">
                  {/* Meta section */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                      <span className="truncate">Started: {new Date(challenge.startDate).toLocaleDateString()}</span>
                    </div>
                    <motion.div 
                      className="flex items-center text-xs md:text-sm font-medium px-2 py-1 rounded-full bg-primary/10 text-primary"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span>Day {challenge.currentDay} of {challenge.totalDays}</span>
                    </motion.div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2.5 bg-muted rounded-full mb-5 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      style={{ width: "0%" }}
                      animate={{ width: `${(challenge.currentDay / challenge.totalDays) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>

                  {/* Latest update section with improved spacing and readability */}
                  {challenge.latestUpdate ? (
                    <motion.div 
                      className="mb-5"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <div className="border-l-2 border-primary/30 pl-3 py-1">
                        <h4 className="font-medium mb-1.5 flex items-center text-sm md:text-base">
                          <TrendingUp className="h-4 w-4 mr-1.5 text-primary" />
                          Latest Update: Day {challenge.latestUpdate.day}
                        </h4>
                        
                        <div className="flex items-center text-xs text-muted-foreground mb-2">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {new Date(challenge.latestUpdate.date).toLocaleDateString()}
                        </div>
                        
                        <p className="font-medium text-primary mb-1.5 text-sm">{challenge.latestUpdate.topic}</p>
                        
                        <AnimatePresence mode="wait">
                          <motion.div 
                            key={expandedId === challenge._id ? 'expanded' : 'collapsed'}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs md:text-sm text-muted-foreground">
                              {expandedId === challenge._id
                                ? challenge.latestUpdate.description
                                : `${challenge.latestUpdate.description.substring(0, 100)}...`}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                        
                        {challenge.latestUpdate.description.length > 100 && (
                          <motion.button
                            onClick={(e) => {
                              e.preventDefault(); // Prevent link navigation
                              setExpandedId(expandedId === challenge._id ? null : challenge._id || null);
                            }}
                            className="text-xs md:text-sm text-primary hover:underline mt-2 flex items-center"
                            whileHover={{ x: expandedId === challenge._id ? -2 : 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            {expandedId === challenge._id ? (
                              <>Show less</>
                            ) : (
                              <>Read more<ChevronRight className="h-3 w-3 ml-0.5" /></>
                            )}
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="mb-5">
                      <p className="text-sm text-muted-foreground">No updates yet</p>
                    </div>
                  )}

                  {/* Action button with improved hover state */}
                  <Link href={`/journey/challenges/${challenge._id ? challenge._id.toString() : ''}/`} passHref>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="block w-full"
                    >
                      <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 w-full">
                        <span className="flex items-center justify-center">
                          View Full Challenge
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ 
                              duration: 1,
                              repeat: Infinity,
                              repeatType: "loop",
                              repeatDelay: 1
                            }}
                          >
                            <ChevronRight className="h-4 w-4 ml-1.5" />
                          </motion.div>
                        </span>
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!isLoading && !error && challenges.length > 0 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                asChild 
                variant="outline" 
                className="border-purple-500/30 hover:bg-purple-500/5"
              >
                <Link href="/journey/challenges" className="flex items-center">
                  View All Challenges
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      repeatType: "loop",
                      repeatDelay: 0.5
                    }}
                  >
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}