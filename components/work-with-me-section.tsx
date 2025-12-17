"use client"

import { motion } from "@/lib/framer-exports"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, CheckCircle } from "lucide-react"

interface ServiceItem {
  title: string
  description: string
}

const services: ServiceItem[] = [
  {
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies and best practices.",
  },
  {
    title: "Mobile App Development",
    description: "Cross-platform mobile applications that work seamlessly on iOS and Android.",
  },
  {
    title: "Machine Learning Solutions",
    description: "Custom AI and machine learning models to solve complex business problems.",
  },
  {
    title: "Technical Consultation",
    description: "Expert advice on technology stack, architecture, and development practices.",
  },
]

export default function WorkWithMeSection() {
  return (
    <section id="work-with-me" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Work With Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm available for freelance projects, consulting, and full-time opportunities
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold">Why Work With Me?</h3>
            <p className="text-muted-foreground">
              I bring a unique combination of technical expertise, creative problem-solving, and a commitment to
              delivering high-quality solutions that meet your specific needs. My approach is collaborative,
              transparent, and focused on achieving your goals.
            </p>

            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">{service.title}</h4>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-4">
              <Button asChild size="lg">
                <Link href="/resume">
                  <FileText className="h-4 w-4 mr-2" />
                  View My Resume
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="bg-card border border-border rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Availability</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-2">Current Status</h4>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <p className="text-green-500 font-medium">Available for new projects</p>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-2">Project Types</h4>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Short-term consulting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Long-term development projects</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Technical advisory roles</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Full-time opportunities</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-2">Response Time</h4>
                <p className="text-muted-foreground">I typically respond to inquiries within 24 hours.</p>
              </div>

              <div className="pt-4">
                <Button asChild className="w-full">
                  <Link href="/#contact">Get In Touch</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
