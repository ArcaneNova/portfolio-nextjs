"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "@/lib/framer-exports"
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react"

const quotes = [
  {
    category: "Motivational",
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    icon: "🌱"
  },
  {
    category: "Motivational",
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    icon: "💪"
  },
  {
    category: "Coding",
    text: "Code is poetry. It should be read by humans first, then executed by machines.",
    author: "Steve McConnell",
    icon: "📝"
  },
  {
    category: "Coding",
    text: "Debugging is like being the detective in a crime drama. Except the crime is against you.",
    author: "Hanelman's Law",
    icon: "🔍"
  },
  {
    category: "Engineering",
    text: "Make it work, make it right, make it fast. In that order.",
    author: "Kent Beck",
    icon: "⚡"
  },
  {
    category: "Engineering",
    text: "Simple systems are easier to understand, maintain, and reason about than complex ones.",
    author: "System Design Principle",
    icon: "🎯"
  }
]

const categories = ["All", ...new Set(quotes.map(q => q.category))]

export default function WordsILiveByPremium() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredQuotes, setFilteredQuotes] = useState(quotes)
  const [direction, setDirection] = useState(0)

  // Update filtered quotes
  useEffect(() => {
    const filtered =
      selectedCategory === "All"
        ? quotes
        : quotes.filter(q => q.category === selectedCategory)
    setFilteredQuotes(filtered)
    setCurrentIndex(0)
  }, [selectedCategory])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % filteredQuotes.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + filteredQuotes.length) % filteredQuotes.length)
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const currentQuote = filteredQuotes[currentIndex]

  return (
    <section className="py-24 px-4 relative bg-gradient-to-b from-ai-slate via-ai-zinc to-ai-slate overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-ai-purple/5 rounded-full blur-3xl"
          animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-ai-cyan/5 rounded-full blur-3xl"
          animate={{ x: [0, -50, 50, 0], y: [0, 50, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, delay: 10 }}
        />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ai-purple/30 bg-ai-purple/10 mb-6">
            <Lightbulb className="w-4 h-4 text-ai-purple" />
            <span className="text-sm text-ai-purple font-medium">Philosophy</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Words I <span className="bg-gradient-to-r from-ai-cyan via-ai-purple to-ai-blue bg-clip-text text-transparent">Live By</span>
          </h2>
          <p className="text-gray-300 text-lg">Principles that guide my work and decisions</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 border ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-ai-cyan to-ai-purple text-white border-transparent shadow-lg shadow-ai-cyan/30"
                  : "border-white/20 text-gray-300 hover:border-ai-cyan/50 hover:text-white"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Quote Card */}
        <div className="relative mb-8">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              {currentQuote && (
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="relative p-12 md:p-16 rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-xl overflow-hidden">
                    {/* Animated accent line */}
                    <motion.div
                      className="absolute top-0 left-0 h-1 bg-gradient-to-r from-ai-cyan via-ai-purple to-ai-blue"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />

                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-5xl mb-6"
                    >
                      {currentQuote.icon}
                    </motion.div>

                    {/* Quote text as code comment */}
                    <motion.p
                      className="text-2xl md:text-3xl font-mono text-ai-cyan mb-8 leading-relaxed before:content-['//'] before:mr-3 before:opacity-50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <span className="text-white">{currentQuote.text}</span>
                    </motion.p>

                    {/* Author and category */}
                    <motion.div
                      className="flex items-center justify-between pt-6 border-t border-white/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">— {currentQuote.author}</p>
                        <div className="inline-block px-3 py-1 rounded-full bg-ai-cyan/10 border border-ai-cyan/30">
                          <span className="text-xs font-semibold text-ai-cyan">{currentQuote.category}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.div className="text-sm text-gray-400">
                          {currentIndex + 1} / {filteredQuotes.length}
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4"
        >
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1, x: -3 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full border border-ai-cyan/30 text-ai-cyan hover:bg-ai-cyan/10 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {filteredQuotes.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                animate={{
                  width: currentIndex === index ? 32 : 8,
                  opacity: currentIndex === index ? 1 : 0.4
                }}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-gradient-to-r from-ai-cyan to-ai-purple"
                    : "bg-white/20"
                }`}
                whileHover={{ opacity: 0.8 }}
              />
            ))}
          </div>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1, x: 3 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full border border-ai-cyan/30 text-ai-cyan hover:bg-ai-cyan/10 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Keyboard hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-xs text-gray-500 mt-6"
        >
          Use ← → keys or buttons to navigate
        </motion.p>
      </div>
    </section>
  )
}
