"use client"

import { cn } from "@/lib/utils"
import { motion } from "@/lib/framer-exports"

interface HeaderSectionProps {
  title: string
  subtitle?: string
  className?: string
}

export default function HeaderSection({
  title,
  subtitle,
  className,
}: HeaderSectionProps) {
  return (
    <div className={cn("text-center py-12", className)}>
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      
      {subtitle && (
        <motion.p 
          className="text-muted-foreground max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div 
        className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-6"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 80, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
    </div>
  )
} 