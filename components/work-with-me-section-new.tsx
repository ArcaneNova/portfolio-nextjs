"use client"

import { motion } from "@/lib/framer-exports"
import { Mail, MessageSquare, Linkedin, Github, ArrowRight, CheckCircle } from "lucide-react"
import { useState } from "react"

interface Service {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
}

const services: Service[] = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Consulting",
    description: "Strategic advice on AI/ML architecture, system design, and technical decisions",
    features: [
      "System architecture design",
      "AI/ML pipeline optimization",
      "Technical due diligence",
      "Performance audits",
    ],
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Development",
    description: "Building production-grade systems and custom solutions from concept to deployment",
    features: [
      "Full-stack development",
      "AI integration projects",
      "API & backend systems",
      "Real-time applications",
    ],
  },
  {
    icon: <Github className="w-6 h-6" />,
    title: "Open Source",
    description: "Contributing to and maintaining high-impact open source projects and libraries",
    features: [
      "Active maintenance",
      "Feature development",
      "Performance optimization",
      "Documentation & guides",
    ],
  },
]

const contact_methods = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email",
    value: "arshadnoor585@gmail.com",
    href: "mailto:arshadnoor585@gmail.com",
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    label: "LinkedIn",
    value: "ArcaneNova",
    href: "https://linkedin.com/in/mdarshadnoor",
  },
  {
    icon: <Github className="w-5 h-5" />,
    label: "GitHub",
    value: "@ArcaneNova",
    href: "https://github.com/ArcaneNova",
  },
]

export default function WorkWithMeSection() {
  const [selectedService, setSelectedService] = useState(0)

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
              Let's Work Together
            </span>
          </h2>
          <p className="text-gray-400/70 text-lg">Interested in collaborating? Here's how we can work together</p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`group rounded-lg p-6 border cursor-pointer transition-all relative overflow-hidden ${
                selectedService === index
                  ? "bg-ai-slate/70 border-ai-cyan/40"
                  : "bg-ai-slate/50 border-ai-cyan/10 hover:border-ai-cyan/30"
              }`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              onClick={() => setSelectedService(index)}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ai-cyan to-ai-purple" />

              <div className="text-ai-cyan mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
              <p className="text-sm text-gray-400/70 mb-6">{service.description}</p>

              {/* Features - Show when selected */}
              {selectedService === index && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle className="w-3.5 h-3.5 text-ai-cyan flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA */}
        <motion.div
          className="mb-16 bg-gradient-to-r from-ai-cyan/5 to-ai-purple/5 border border-ai-cyan/20 rounded-lg p-10 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ai-cyan to-ai-purple" />

          <h3 className="text-2xl font-bold text-white mb-3">Ready to start a project?</h3>
          <p className="text-gray-400/70 mb-6 text-lg">
            I'm available for freelance work, consulting, and exciting collaborations.
          </p>

          <motion.button
            className="inline-flex items-center gap-2 px-8 py-3 bg-ai-cyan text-ai-zinc font-semibold rounded-lg hover:bg-ai-cyan/90 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {contact_methods.map((method, index) => (
            <motion.a
              key={index}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-ai-slate/50 border border-ai-cyan/10 hover:border-ai-cyan/30 rounded-lg p-6 transition-all relative overflow-hidden"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.4 + index * 0.05,
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-ai-cyan to-ai-purple" />

              <div className="flex items-center gap-3">
                <div className="p-2 bg-ai-cyan/10 rounded-lg text-ai-cyan group-hover:text-ai-purple transition-colors">
                  {method.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500/70 mb-1">{method.label}</p>
                  <p className="text-sm font-medium text-white truncate group-hover:text-ai-cyan transition-colors">
                    {method.value}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Response Time Info */}
        <motion.div
          className="mt-12 text-center bg-ai-cyan/5 border border-ai-cyan/20 rounded-lg p-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-400/70">
            <span className="text-ai-cyan font-semibold">💬 Quick response time:</span> I typically reply to inquiries within 24-48 hours. For urgent matters, reach out via email with [URGENT] prefix.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
