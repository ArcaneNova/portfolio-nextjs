"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "@/lib/framer-exports"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactSection() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to send message")

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })

      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-6 sm:px-12 bg-gradient-to-b from-ai-slate to-ai-zinc">
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
            <span className="bg-gradient-to-r from-ai-cyan via-ai-purple to-ai-blue bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-gray-400/70 text-lg">
            Have a question or want to collaborate? Send me a message.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          {[
            {
              icon: Mail,
              title: "Email",
              value: "arshadnoor585[at]gmail.com",
            },
            {
              icon: MessageSquare,
              title: "Available for working opportunities",
              value: "Freelance",
            },
            {
              icon: Send,
              title: "Quick Response",
              value: "24-48 hours",
            },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                className="text-center p-4 rounded-lg border border-ai-cyan/20 bg-ai-slate/30 hover:border-ai-cyan/50 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex p-3 rounded-lg bg-ai-cyan/10 mb-3">
                  <Icon className="w-6 h-6 text-ai-cyan" />
                </div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400/70">{item.value}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-ai-slate/50 border border-ai-cyan/20 rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="bg-ai-slate/50 border-ai-cyan/20 text-white placeholder:text-gray-500 focus:border-ai-cyan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="bg-ai-slate/50 border-ai-cyan/20 text-white placeholder:text-gray-500 focus:border-ai-cyan"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Subject
            </label>
            <Input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              required
              className="bg-ai-slate/50 border-ai-cyan/20 text-white placeholder:text-gray-500 focus:border-ai-cyan"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Message
            </label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
              required
              rows={5}
              className="bg-ai-slate/50 border-ai-cyan/20 text-white placeholder:text-gray-500 focus:border-ai-cyan"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-ai-cyan to-ai-purple hover:from-ai-cyan hover:to-ai-purple disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}
