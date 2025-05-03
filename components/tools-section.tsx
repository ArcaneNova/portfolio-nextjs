"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Code, GitBranch, Box, Cloud, Github, Layers, Figma, Terminal } from "lucide-react"
import type { Tool, ToolsResponse } from "@/lib/models/tool"
import { Button } from "@/components/ui/button"

// Map string icon names to Lucide components
const iconMap: Record<string, React.ElementType> = {
  Code,
  GitBranch,
  Box,
  Cloud,
  Github,
  Layers,
  Figma,
  Terminal,
}

export default function ToolsSection() {
  const [tools, setTools] = useState<Tool[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/tools")

        if (!response.ok) {
          throw new Error("Failed to fetch tools")
        }

        const data: ToolsResponse = await response.json()
        setTools(data.tools)
        setError(null)
      } catch (err) {
        console.error("Error fetching tools:", err)
        setError("Failed to load tools. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTools()
  }, [])

  // Helper function to get icon component
  const getIconComponent = (iconName: string) => {
    return iconMap[iconName] || Code // Default to Code if icon not found
  }

  // Fallback data if no tools are found
  const fallbackTools: Tool[] = [
    { name: "VS Code", icon: "Code", color: "text-blue-500" },
    { name: "Git", icon: "GitBranch", color: "text-orange-500" },
    { name: "Docker", icon: "Box", color: "text-blue-400" },
    { name: "AWS", icon: "Cloud", color: "text-yellow-500" },
    { name: "GitHub", icon: "Github", color: "text-gray-500" },
    { name: "Kubernetes", icon: "Layers", color: "text-blue-600" },
    { name: "Figma", icon: "Figma", color: "text-purple-500" },
    { name: "Jupyter", icon: "Terminal", color: "text-orange-600" },
  ]

  return (
    <section id="tools" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tools & Technologies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The essential tools and technologies I use in my development workflow
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-lg animate-pulse h-32">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-4 rounded-full bg-muted h-16 w-16"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => setTools([])}>Retry</Button>
          </div>
        ) : tools.length === 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {fallbackTools.map((tool, index) => {
              const IconComponent = getIconComponent(tool.icon)

              return (
                <motion.div
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-4 p-4 rounded-full bg-primary/10">
                    <IconComponent className={`h-8 w-8 ${tool.color}`} />
                  </div>
                  <h3 className="text-lg font-medium">{tool.name}</h3>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {tools.map((tool, index) => {
              const IconComponent = getIconComponent(tool.icon)

              return (
                <motion.div
                  key={tool._id}
                  className="bg-card border border-border rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-4 p-4 rounded-full bg-primary/10">
                    <IconComponent className={`h-8 w-8 ${tool.color}`} />
                  </div>
                  <h3 className="text-lg font-medium">{tool.name}</h3>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
