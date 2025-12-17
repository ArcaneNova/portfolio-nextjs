"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationFrameId = useRef<number>(0)
  const timeRef = useRef(0)

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const { width, height } = canvasRef.current.parentElement.getBoundingClientRect()
        setDimensions({ width, height })
        canvasRef.current.width = width
        canvasRef.current.height = height
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Create static particles
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const particles: Particle[] = []
    const particleCount = Math.min(30, Math.max(15, Math.floor((dimensions.width * dimensions.height) / 50000)))

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.1
      })
    }

    particlesRef.current = particles
  }, [dimensions])

  // Minimal static render with subtle pulse only
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      timeRef.current += 0.01
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Draw subtle connecting lines only
      const connectionDistance = 200
      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.08
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles with subtle pulse
      const pulse = Math.abs(Math.sin(timeRef.current * 0.5)) * 0.5 + 0.5
      particles.forEach((particle) => {
        const size = particle.size * pulse

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(6, 182, 212, ${particle.opacity})`
        ctx.fill()

        // Tiny glow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size + 1, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(6, 182, 212, ${particle.opacity * 0.3})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      })

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId.current)
    }
  }, [dimensions])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-[-1]" 
      style={{ pointerEvents: 'none' }}
    />
  )
}
