"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "@/lib/framer-exports"
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react"

interface BlogPost {
  _id: string
  title: string
  excerpt: string
  category: string
  readTime: number
  date: string
  views?: number
  featured?: boolean
  slug?: string
}

interface BlogResponse {
  posts: BlogPost[]
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "AI/ML": { bg: "bg-ai-cyan/10", text: "text-ai-cyan", border: "border-ai-cyan/30" },
  Frontend: { bg: "bg-ai-purple/10", text: "text-ai-purple", border: "border-ai-purple/30" },
  Backend: { bg: "bg-ai-blue/10", text: "text-ai-blue", border: "border-ai-blue/30" },
  Database: { bg: "bg-ai-cyan/10", text: "text-ai-cyan", border: "border-ai-cyan/30" },
  Blockchain: { bg: "bg-ai-purple/10", text: "text-ai-purple", border: "border-ai-purple/30" },
}

export default function RecentBlogSection() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/blog?limit=6&published=true")

        if (!response.ok) {
          throw new Error("Failed to fetch blog posts")
        }

        const data: BlogResponse = await response.json()
        setPosts(data.posts || [])
        setError(null)
      } catch (err) {
        console.error("Error fetching blog posts:", err)
        setError("Failed to load blog posts")
        setPosts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const featured = posts.find((p) => p.featured)
  const others = posts.filter((p) => !p.featured)

  const filteredOthers =
    selectedCategory === "all"
      ? others
      : others.filter((p) => p.category === selectedCategory)

  const categories = ["all", ...Array.from(new Set(posts.map((p) => p.category)))]

  return (
    <section className="py-20 px-6 sm:px-12 bg-gradient-to-b from-ai-zinc to-ai-slate">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-ai-cyan via-ai-purple to-ai-blue bg-clip-text text-transparent">
              Latest Articles
            </span>
          </h2>
          <p className="text-gray-400/70">Insights on AI, backend systems, and modern web development</p>
        </motion.div>

        {/* Featured Post */}
        {featured && (
          <Link href={`/blog/${featured.slug}`}>
            <motion.div
              className="mb-12 bg-gradient-to-r from-ai-cyan/5 to-ai-purple/5 border border-ai-cyan/20 rounded-lg p-8 hover:border-ai-cyan/40 transition-all group cursor-pointer relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              {/* Featured Badge */}
              <div className="absolute top-4 right-4">
                <span className="text-xs font-bold text-ai-cyan bg-ai-cyan/10 px-3 py-1 rounded-full">
                  FEATURED
                </span>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-ai-cyan transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-gray-400/80 text-lg mb-6 line-clamp-3">
                    {featured.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400/60 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-ai-cyan" />
                      <span>{new Date(featured.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-ai-cyan" />
                      <span>{featured.readTime} min read</span>
                    </div>
                    {featured.views && (
                      <div className="flex items-center gap-2 text-ai-purple">
                        <span>👁️ {featured.views.toLocaleString()} views</span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-ai-cyan hover:gap-3 transition-all font-medium">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ai-cyan to-ai-purple rounded-t-lg" />
              </div>
            </motion.div>
          </Link>
        )}

        {/* Category Filter */}
        <motion.div
          className="flex justify-center gap-2 mb-8 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg transition-all capitalize ${
                selectedCategory === cat
                  ? "bg-ai-cyan text-ai-zinc font-medium"
                  : "bg-ai-slate/50 text-gray-300 border border-ai-cyan/10 hover:border-ai-cyan/30"
              }`}
            >
              {cat === "all" ? "All Articles" : cat}
            </button>
          ))}
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          {isLoading ? (
            <div className="col-span-full text-center py-12 text-gray-400">Loading articles...</div>
          ) : error ? (
            <div className="col-span-full text-center py-12 text-red-400">{error}</div>
          ) : filteredOthers.length > 0 ? (
            filteredOthers.map((post, index) => {
              const catConfig = categoryColors[post.category] || categoryColors["AI/ML"]
              return (
                <Link key={post._id} href={`/blog/${post.slug}`}>
                  <motion.div
                    className={`group bg-ai-slate/50 border border-ai-cyan/10 hover:border-ai-cyan/30 rounded-lg p-6 transition-all cursor-pointer flex flex-col relative h-full`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                    }}
                    viewport={{ once: true }}
                  >
                    {/* Top Accent Line */}
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${catConfig.border} group-hover:${catConfig.border} rounded-t-lg`} />

                    {/* Category Badge */}
                    <div className="mb-4">
                      <span className={`text-xs font-medium px-3 py-1 rounded ${catConfig.bg} ${catConfig.text}`}>
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-ai-cyan transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-400/70 mb-4 flex-1 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500/70 mb-4 pt-4 border-t border-ai-cyan/10">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-ai-cyan" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-ai-cyan" />
                        <span>{post.readTime} min</span>
                      </div>
                      {post.views && (
                        <div className="flex items-center gap-1 text-ai-cyan">
                          <span>👁️ {post.views.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-ai-cyan hover:gap-3 transition-all text-sm font-medium">
                      Read <ArrowRight className="w-3 h-3" />
                    </div>
                  </motion.div>
                </Link>
              )
            })
          ) : (
            <div className="col-span-full text-center py-8 text-gray-400/60">
              No articles found in this category
            </div>
          )}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link href="/blog" className="inline-flex items-center gap-2 text-ai-cyan hover:text-ai-purple transition-colors font-medium">
            View All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
