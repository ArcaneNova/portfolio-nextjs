"use client"

import { useEffect, useRef, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  speedX: number
  speedY: number
  type: string // 'circle', 'square', 'triangle', 'code', 'star', 'hexagon'
  rotation: number
  rotationSpeed: number
  opacity: number
  hue: number
  pulseSpeed: number
  targetSize: number
  originalSize: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationFrameId = useRef<number>(0)
  const mousePosition = useRef({ x: -1000, y: -1000 })
  const hoverParticle = useRef<Particle | null>(null)
  const isHovering = useRef(false)
  const pulseRef = useRef(0)
  const colorShiftRef = useRef(0)

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
    // Initial sizing
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle mouse move
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        mousePosition.current = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        }
        isHovering.current = true
      }
    }

    const handleMouseLeave = () => {
      mousePosition.current = { x: -1000, y: -1000 }
      isHovering.current = false
      hoverParticle.current = null
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Create particles
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const colors = [
      'hsl(240, 80%, 60%)', // Indigo
      'hsl(260, 80%, 65%)',  // Violet
      'hsl(210, 80%, 60%)', // Blue
      'hsl(170, 80%, 40%)', // Emerald
      'hsl(280, 80%, 65%)'  // Purple
    ]
    
    const types = ['circle', 'square', 'triangle', 'code', 'star', 'hexagon']
    const particles: Particle[] = []

    // Calculate optimal number of particles based on screen size
    const particleCount = Math.min(
      100, 
      Math.max(40, Math.floor(dimensions.width * dimensions.height / 18000))
    )

    for (let i = 0; i < particleCount; i++) {
      const type = types[Math.floor(Math.random() * types.length)]
      const isCode = type === 'code'
      const size = isCode ? 16 + Math.random() * 12 : Math.random() * 6 + 2
      const colorIndex = Math.floor(Math.random() * colors.length)
      // Extract hue from HSL color string
      const hue = parseInt(colors[colorIndex].split(',')[0].split('(')[1])
      
      particles.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size,
        originalSize: size,
        targetSize: size,
        color: colors[colorIndex],
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        type,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.5 + 0.2,
        hue,
        pulseSpeed: 0.02 + Math.random() * 0.04
      })
    }

    particlesRef.current = particles

    // Clean up
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [dimensions])

  // Draw particles
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const techSymbols = ['</>', '{  }', '()=>', '[]', '==', '++', '&&', '{}', '<>', '!=', '::']
    let time = 0

    const drawParticle = (particle: Particle) => {
      ctx.save()
      ctx.globalAlpha = particle.opacity
      
      // Color shifting effect for active particles
      if (particle === hoverParticle.current) {
        const shiftedHue = (particle.hue + colorShiftRef.current) % 360
        ctx.fillStyle = `hsla(${shiftedHue}, 100%, 65%, ${particle.opacity + 0.3})`
        ctx.shadowColor = `hsla(${shiftedHue}, 100%, 70%, 0.8)`
        ctx.shadowBlur = 15
      } else {
        ctx.fillStyle = particle.color
      }
      
      ctx.translate(particle.x, particle.y)
      ctx.rotate((particle.rotation * Math.PI) / 180)
      
      switch (particle.type) {
        case 'circle':
          ctx.beginPath()
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
          ctx.fill()
          break
        case 'square':
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
          break
        case 'triangle':
          ctx.beginPath()
          ctx.moveTo(0, -particle.size)
          ctx.lineTo(particle.size, particle.size)
          ctx.lineTo(-particle.size, particle.size)
          ctx.closePath()
          ctx.fill()
          break
        case 'code':
          const symbolIndex = Math.floor(particle.id % techSymbols.length)
          ctx.font = `${particle.size}px monospace`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(techSymbols[symbolIndex], 0, 0)
          break
        case 'star':
          drawStar(ctx, 0, 0, 5, particle.size / 2, particle.size)
          ctx.fill()
          break
        case 'hexagon':
          drawHexagon(ctx, 0, 0, particle.size)
          ctx.fill()
          break
      }
      
      ctx.restore()
    }

    const drawStar = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      points: number,
      innerRadius: number,
      outerRadius: number
    ) => {
      ctx.beginPath()
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        const angle = (i * Math.PI) / points
        ctx.lineTo(x + radius * Math.sin(angle), y + radius * Math.cos(angle))
      }
      ctx.closePath()
    }
    
    const drawHexagon = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number
    ) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        ctx.lineTo(x + size * Math.cos(angle), y + size * Math.sin(angle))
      }
      ctx.closePath()
    }

    const drawLines = () => {
      // Base connection distance is dependent on screen size
      const connectionDistance = Math.min(180, dimensions.width * 0.14)
      const particles = particlesRef.current
      
      // Particle-to-particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance
            const hue1 = particles[i].hue
            const hue2 = particles[j].hue
            // Average the hues for a color blend
            const avgHue = (hue1 + hue2) / 2
            
            ctx.strokeStyle = `hsla(${avgHue}, 80%, 60%, ${opacity * 0.15})`
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      
      // Mouse connections with a web effect
      const { x: mouseX, y: mouseY } = mousePosition.current
      const mouseConnectionDistance = connectionDistance * 1.8
      
      if (isHovering.current) {
        let nearestParticle: Particle | null = null
        let nearestDistance = Infinity
        
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          const dx = p.x - mouseX
          const dy = p.y - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // Mouse-to-particle connections
          if (distance < mouseConnectionDistance) {
            // Stronger connections for nearer particles
            const opacity = 0.2 + (1 - distance / mouseConnectionDistance) * 0.6
            const lineWidth = 0.5 + (1 - distance / mouseConnectionDistance) * 2
            
            ctx.strokeStyle = `hsla(${p.hue}, 90%, 70%, ${opacity})`
            ctx.lineWidth = lineWidth
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouseX, mouseY)
            ctx.stroke()
            
            // Track nearest particle for special effects
            if (distance < nearestDistance) {
              nearestDistance = distance
              nearestParticle = p
            }
            
            // Apply repulsion/attraction effect
            if (distance < 100) {
              p.targetSize = p.originalSize * 2.5
              // Apply force away from mouse (repulsion)
              const force = 0.2 * (1 - distance / 100)
              p.speedX += (dx / distance) * force
              p.speedY += (dy / distance) * force
            } else {
              p.targetSize = p.originalSize
            }
          }
        }
        
        // Update hover particle
        hoverParticle.current = nearestParticle
      }
      
      // Draw mouse cursor effect if hovering
      if (isHovering.current) {
        // Draw pulsing circle
        const pulseSize = 10 + Math.sin(pulseRef.current) * 5
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${(time * 50) % 360}, 100%, 70%, 0.2)`
        ctx.fill()
        
        // Draw outer glow
        const gradient = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, mouseConnectionDistance * 0.3
        )
        gradient.addColorStop(0, `hsla(${(time * 50) % 360}, 100%, 70%, 0.2)`)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, mouseConnectionDistance * 0.3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }
    }

    const updateParticleEffects = (time: number) => {
      const particles = particlesRef.current
      
      // Update global effect values
      pulseRef.current += 0.05
      colorShiftRef.current = (colorShiftRef.current + 0.5) % 360
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        
        // Smooth size transitions
        if (p.size !== p.targetSize) {
          if (p.size < p.targetSize) {
            p.size = Math.min(p.targetSize, p.size + 0.2)
          } else {
            p.size = Math.max(p.targetSize, p.size - 0.1)
          }
        }
        
        // Add subtle breathing effect
        const breathEffect = Math.sin(time * p.pulseSpeed) * 0.2
        p.size += breathEffect
        
        // Update position with natural friction
        p.speedX *= 0.99
        p.speedY *= 0.99
        p.x += p.speedX
        p.y += p.speedY
        
        // Bounce off edges with slight speed reduction
        if (p.x <= 0 || p.x >= dimensions.width) {
          p.speedX *= -0.85
          p.x = p.x <= 0 ? 1 : dimensions.width - 1
        }
        
        if (p.y <= 0 || p.y >= dimensions.height) {
          p.speedY *= -0.85
          p.y = p.y <= 0 ? 1 : dimensions.height - 1
        }
        
        // Update rotation
        p.rotation = (p.rotation + p.rotationSpeed) % 360
        
        // Subtle opacity variation for visual interest
        p.opacity = Math.max(0.1, Math.min(0.8, p.opacity + Math.sin(time * 0.5) * 0.01))
      }
    }

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)
      
      // Update particle positions and effects
      updateParticleEffects(time)
      
      // Draw connection lines
      drawLines()
      
      // Draw particles
      particlesRef.current.forEach(drawParticle)
      
      animationFrameId.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    // Clean up
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
