"use client"

import { useState } from "react"
import { motion } from "@/lib/framer-exports"
import { ChevronLeft, ChevronRight } from "lucide-react"

const quoteCategories = [
  {
    id: "motivational",
    title: "Motivational",
    quotes: [
      {
        text: "Trust the process. Outcomes are noisy. Growth is real.",
        author: "Personal Mantra",
        insight: "You may not win today, but if you're learning, you're not losing."
      },
      {
        text: "Dream so big that it scares you — and stay humble enough to build from zero every time.",
        author: "Personal Mantra",
        insight: "If your dreams don't sound crazy, dream bigger."
      },
      {
        text: "You don't need permission to start. Start messy. Learn fast. Fix later.",
        author: "Personal Mantra",
        insight: "This is how solo founders win."
      },
    ],
  },
  {
    id: "coding",
    title: "Coding Philosophy",
    quotes: [
      {
        text: "Code is read more often than it's written.",
        author: "Best Practice",
        insight: "Write for the next developer, not for the compiler."
      },
      {
        text: "Simple is better than complex.",
        author: "Python Zen",
        insight: "Complexity is the enemy of correctness."
      },
      {
        text: "Optimize for readability first, performance second.",
        author: "Engineering Wisdom",
        insight: "Premature optimization is the root of all evil."
      },
    ],
  },
  {
    id: "engineering",
    title: "Engineering Principles",
    quotes: [
      {
        text: "Build for scale, but start simple.",
        author: "System Design",
        insight: "Scalability comes from understanding bottlenecks."
      },
      {
        text: "Test what matters. Ignore what doesn't.",
        author: "QA Philosophy",
        insight: "100% coverage with 0% understanding is worthless."
      },
      {
        text: "Deploy fast, iterate faster.",
        author: "Agile Mindset",
        insight: "The best feedback comes from real users."
      },
    ],
  },
]

export default function WordsILiveBySection() {
  const [selectedCategory, setSelectedCategory] = useState("motivational")
  const [quoteIndex, setQuoteIndex] = useState(0)

  const currentCategory = quoteCategories.find((cat) => cat.id === selectedCategory)!
  const currentQuote = currentCategory.quotes[quoteIndex]

  const goToNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % currentCategory.quotes.length)
  }

  const goToPrevQuote = () => {
    setQuoteIndex((prev) => (prev - 1 + currentCategory.quotes.length) % currentCategory.quotes.length)
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setQuoteIndex(0)
  }

  return (
    <section className="py-20 px-6 sm:px-12 bg-gradient-to-b from-ai-zinc to-ai-slate">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-ai-cyan to-ai-purple bg-clip-text text-transparent">
              Philosophy & Principles
            </span>
          </h2>
          <p className="text-gray-400/70">Words that guide my journey as an engineer</p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex justify-center gap-2 mb-12 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
        >
          {quoteCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedCategory === category.id
                  ? "bg-ai-cyan text-ai-zinc font-medium"
                  : "bg-ai-slate/50 text-gray-300 border border-ai-cyan/10 hover:border-ai-cyan/30"
              }`}
            >
              {category.title}
            </button>
          ))}
        </motion.div>

        {/* Quote Card - Styled as Code Comment */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          key={`${selectedCategory}-${quoteIndex}`}
        >
          <motion.div
            className="bg-ai-slate/60 border border-ai-cyan/20 rounded-lg p-8 md:p-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Code-style comment opening */}
            <div className="text-ai-cyan/60 text-sm font-mono mb-4">
              {'/* '}
            </div>

            {/* Quote Text */}
            <blockquote className="mb-6">
              <p className="text-2xl md:text-3xl font-bold text-white mb-2 font-mono leading-relaxed">
                "{currentQuote.text}"
              </p>
              <p className="text-sm text-ai-cyan font-mono">— {currentQuote.author}</p>
            </blockquote>

            {/* Insight */}
            <div className="bg-ai-cyan/5 border-l-2 border-ai-cyan/30 pl-4 py-3 rounded mb-6">
              <p className="text-sm text-gray-300 italic">
                💡 {currentQuote.insight}
              </p>
            </div>

            {/* Code-style comment closing */}
            <div className="text-ai-cyan/60 text-sm font-mono">
              {' */'}
            </div>
          </motion.div>
        </motion.div>

        {/* Navigation Controls */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Quote Counter */}
          <div className="text-sm text-gray-400/70">
            {quoteIndex + 1} / {currentCategory.quotes.length}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <button
              onClick={goToPrevQuote}
              className="p-2 rounded-lg border border-ai-cyan/20 text-ai-cyan hover:bg-ai-cyan/10 hover:border-ai-cyan/40 transition-all"
              aria-label="Previous quote"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNextQuote}
              className="p-2 rounded-lg border border-ai-cyan/20 text-ai-cyan hover:bg-ai-cyan/10 hover:border-ai-cyan/40 transition-all"
              aria-label="Next quote"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex gap-1.5">
            {currentCategory.quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setQuoteIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === quoteIndex
                    ? "bg-ai-cyan w-6"
                    : "bg-ai-cyan/30 hover:bg-ai-cyan/50"
                }`}
                aria-label={`Go to quote ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
