"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "@/lib/framer-exports"
import { Button } from "@/components/ui/button"
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowRight, 
  Code2, 
  Sparkles,
  ChevronDown,
  Star,
  Rocket,
  Zap,
  Coffee,
  Heart
} from "lucide-react"

const roles = [
  "Full Stack Developer",
  "AI Engineer", 
  "SaaS Architect",
  "System Designer",
  "Digital Innovator"
]

export default function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  // Smooth typewriter effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex]
    const isCompleted = displayText === currentRole
    const isEmpty = displayText === ""
    
    if (!isDeleting && isCompleted) {
      setTimeout(() => setIsDeleting(true), 2000)
      return
    }
    
    if (isDeleting && isEmpty) {
      setIsDeleting(false)
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
      return
    }
    
    const timeout = setTimeout(() => {
      setDisplayText(prev => {
        if (isDeleting) {
          return currentRole.substring(0, prev.length - 1)
        } else {
          return currentRole.substring(0, prev.length + 1)
        }
      })
    }, isDeleting ? 50 : 100)
    
    return () => clearTimeout(timeout)
  }, [currentRoleIndex, displayText, isDeleting])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ultimate Cyberpunk Background with Perfect Bottom-to-Top Light Source */}
      <div className="absolute inset-0 bg-black">
        {/* Dark gradient overlay for pure black top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/80 to-black/100" />
        
        {/* CENTRAL LIGHT SOURCE - Single point at bottom center */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          {/* Core Light Source - The Central Point */}
          <motion.div 
            className="absolute bottom-0 left-0 w-6 h-6 rounded-full bg-white"
            style={{
              boxShadow: '0 0 40px 20px rgba(255,255,255,1), 0 0 80px 30px rgba(147, 51, 234, 0.8), 0 0 120px 40px rgba(6, 182, 212, 0.6)'
            }}
            animate={{
              opacity: [0.9, 1, 0.9],
              scale: [0.9, 1.1, 0.9]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* PRIMARY LIGHT CONE - Sharper V-shaped Light Beams */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-full">
          {/* Left White Beam */}
          <motion.div 
            className="absolute bottom-0 left-1/2 origin-bottom-right h-full"
            style={{
              width: '2px',
              height: '140%',
              background: 'linear-gradient(to top, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0) 100%)',
              filter: 'blur(4px)',
              transform: 'translate(-50%, 0) rotate(-30deg)'
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
              width: ['2px', '3px', '2px']
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Right White Beam */}
          <motion.div 
            className="absolute bottom-0 left-1/2 origin-bottom-left h-full"
            style={{
              width: '2px',
              height: '140%',
              background: 'linear-gradient(to top, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0) 100%)',
              filter: 'blur(4px)',
              transform: 'translate(-50%, 0) rotate(30deg)'
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
              width: ['2px', '3px', '2px']
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Left Purple Beam */}
          <motion.div 
            className="absolute bottom-0 left-1/2 origin-bottom-right h-full"
            style={{
              width: '3px',
              height: '130%',
              background: 'linear-gradient(to top, rgba(147, 51, 234, 0.6) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(147, 51, 234, 0) 100%)',
              filter: 'blur(6px)',
              transform: 'translate(-50%, 0) rotate(-35deg)'
            }}
            animate={{
              opacity: [0.6, 0.9, 0.6],
              width: ['3px', '4px', '3px']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />

          {/* Right Purple Beam */}
          <motion.div 
            className="absolute bottom-0 left-1/2 origin-bottom-left h-full"
            style={{
              width: '3px',
              height: '130%',
              background: 'linear-gradient(to top, rgba(147, 51, 234, 0.6) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(147, 51, 234, 0) 100%)',
              filter: 'blur(6px)',
              transform: 'translate(-50%, 0) rotate(35deg)'
            }}
            animate={{
              opacity: [0.6, 0.9, 0.6],
              width: ['3px', '4px', '3px']
            }}
            transition={{
              duration: 5.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8
            }}
          />
          
          {/* Left Cyan Beam */}
          <motion.div 
            className="absolute bottom-0 left-1/2 origin-bottom-right h-full"
            style={{
              width: '2px',
              height: '120%',
              background: 'linear-gradient(to top, rgba(6, 182, 212, 0.7) 0%, rgba(6, 182, 212, 0.3) 50%, rgba(6, 182, 212, 0) 100%)',
              filter: 'blur(5px)',
              transform: 'translate(-50%, 0) rotate(-25deg)'
            }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
              width: ['2px', '4px', '2px']
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2
            }}
          />

          {/* Right Cyan Beam */}
          <motion.div 
            className="absolute bottom-0 left-1/2 origin-bottom-left h-full"
            style={{
              width: '2px',
              height: '120%',
              background: 'linear-gradient(to top, rgba(6, 182, 212, 0.7) 0%, rgba(6, 182, 212, 0.3) 50%, rgba(6, 182, 212, 0) 100%)',
              filter: 'blur(5px)',
              transform: 'translate(-50%, 0) rotate(25deg)'
            }}
            animate={{
              opacity: [0.5, 0.8, 0.5],
              width: ['2px', '4px', '2px']
            }}
            transition={{
              duration: 6.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          />
          
          {/* Central Vertical Pillar - Brighter than the rest */}
          <motion.div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
            style={{
              width: '4px',
              height: '70%',
              background: 'linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 60%, rgba(255,255,255,0) 100%)',
              filter: 'blur(4px)'
            }}
            animate={{
              opacity: [0.8, 1, 0.8],
              height: ['65%', '75%', '65%'],
              width: ['4px', '5px', '4px']
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* V-shaped Light Filled Triangle - Left */}
          <motion.div
            className="absolute bottom-0 left-1/2 origin-bottom-right"
            style={{
              width: '120%',
              height: '140%',
              background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0.06) 70%, rgba(255,255,255,0.1) 100%)',
              transform: 'translate(-100%, 0) rotate(-30deg)',
              opacity: 0.6
            }}
            animate={{
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* V-shaped Light Filled Triangle - Right */}
          <motion.div
            className="absolute bottom-0 left-1/2 origin-bottom-left"
            style={{
              width: '120%',
              height: '140%',
              background: 'linear-gradient(225deg, transparent 0%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0.06) 70%, rgba(255,255,255,0.1) 100%)',
              transform: 'translate(0%, 0) rotate(30deg)',
              opacity: 0.6
            }}
            animate={{
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>

        {/* LIGHT RAYS - Sharper V-shape from bottom center */}
        {[...Array(30)].map((_, i) => {
          // Calculate ray position to create two distinct V-shape clusters
          // Concentrate rays in two main directions: -30 to -15 degrees and +15 to +30 degrees
          // for a more defined V shape with more rays in the V arms than center
          let angle;
          if (i < 15) {
            // Left arm of the V: Concentrate rays between -45 and -10 degrees
            angle = -45 + (i * 2.5); // Creates rays between -45 and -7.5 degrees
          } else {
            // Right arm of the V: Concentrate rays between +10 and +45 degrees
            angle = 10 + ((i - 15) * 2.5); // Creates rays between +10 and +47.5 degrees
          }
          
          // Vary length but make central rays longer to emphasize the V shape
          const baseLengthFactor = Math.abs(angle) < 20 ? 1.2 : 1.0; // Make rays closer to center slightly longer
          const length = (600 + Math.random() * 600) * baseLengthFactor;
          
          // Make rays near the center of each arm brighter
          const centralityFactor = Math.min(1, Math.max(0, (45 - Math.abs(angle)) / 45));
          const baseOpacity = 0.1 + (Math.random() * 0.2) + (centralityFactor * 0.3);
          
          return (
            <motion.div
              key={`ray-${i}`}
              className="absolute bottom-0 left-1/2 origin-bottom"
              style={{
                width: '1px',
                height: `${length}px`,
                background: i % 3 === 0 
                  ? `linear-gradient(to top, rgba(255,255,255,${0.5 * centralityFactor + 0.2}) 0%, rgba(255,255,255,0) 100%)` 
                  : i % 3 === 1 
                    ? `linear-gradient(to top, rgba(147,51,234,${0.4 * centralityFactor + 0.2}) 0%, rgba(147,51,234,0) 100%)`
                    : `linear-gradient(to top, rgba(6,182,212,${0.4 * centralityFactor + 0.2}) 0%, rgba(6,182,212,0) 100%)`,
                transform: `translate(-50%, 0) rotate(${angle}deg)`,
                opacity: baseOpacity,
                filter: 'blur(1px)'
              }}
              animate={{
                height: [`${length * 0.9}px`, `${length}px`, `${length * 0.9}px`],
                opacity: [baseOpacity * 0.8, baseOpacity, baseOpacity * 0.8]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2
              }}
            />
          );
        })}

        {/* PARTICLE SYSTEM - Emanating from Light Source spreading upward */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Rising Light Particles - Enhanced V-pattern */}
          {[...Array(80)].map((_, i) => {
            // Create two distinct clusters of particles in a V pattern
            // 70% of particles in the V arms, 30% more scattered
            let startAngle;
            
            if (i < 28) {
              // Left arm of V: between -45 and -15 degrees
              startAngle = -45 + (Math.random() * 30);
            } else if (i < 56) {
              // Right arm of V: between 15 and 45 degrees
              startAngle = 15 + (Math.random() * 30);
            } else {
              // Some scattered particles with wider angles for natural look
              startAngle = Math.random() * 180 - 90; // -90 to +90 degrees
            }
            
            // Make particles in the defined V pattern travel further
            const inVPattern = (i < 56);
            const distance = inVPattern 
              ? 400 + Math.random() * 1000 // Longer distance for particles in V pattern
              : 200 + Math.random() * 400;  // Shorter for scattered particles
            
            // Size based on position - larger particles in the V arms
            const sizeFactor = inVPattern ? 1.2 : 0.8;
            const size = (0.5 + Math.random() * 1.8) * sizeFactor;
            
            // Brighter particles in the V pattern
            const brightnessFactor = inVPattern ? 1.2 : 0.8;
            
            return (
              <motion.div
                key={`rising-particle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: i % 4 === 0 
                    ? `rgba(255,255,255,${0.9 * brightnessFactor})` 
                    : i % 4 === 1 
                      ? `rgba(147,51,234,${0.7 * brightnessFactor})`
                      : i % 4 === 2
                        ? `rgba(6,182,212,${0.7 * brightnessFactor})`
                        : `rgba(255,255,255,${0.5 * brightnessFactor})`,
                  left: '50%',
                  bottom: '0%',
                  boxShadow: i % 4 === 0 
                    ? `0 0 ${4 * brightnessFactor}px rgba(255,255,255,${0.8 * brightnessFactor})` 
                    : i % 4 === 1 
                      ? `0 0 ${4 * brightnessFactor}px rgba(147,51,234,${0.6 * brightnessFactor})`
                      : i % 4 === 2
                        ? `0 0 ${4 * brightnessFactor}px rgba(6,182,212,${0.6 * brightnessFactor})`
                        : 'none'
                }}
                animate={{
                  x: [`0px`, `${Math.sin(startAngle * Math.PI / 180) * distance}px`],
                  y: [`0px`, `-${Math.cos(startAngle * Math.PI / 180) * distance}px`],
                  opacity: [0, inVPattern ? 0.95 : 0.7, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: inVPattern ? "easeOut" : "easeInOut"
                }}
              />
            );
          })}
          
          {/* Light Sparkles - Enhanced V-pattern Fast Particles */}
          {[...Array(60)].map((_, i) => {
            // Again create two distinct V arms with sparkles
            let angle;
            let isInVPattern = true;
            
            if (i < 24) {
              // Left arm of V: concentrate between -40 and -20 degrees
              angle = -40 + (Math.random() * 20);
            } else if (i < 48) {
              // Right arm of V: concentrate between 20 and 40 degrees
              angle = 20 + (Math.random() * 20);
            } else {
              // Some scattered sparkles
              angle = Math.random() * 170 - 85; // -85 to +85 degrees
              isInVPattern = false;
            }
            
            // Make sparkles in V pattern travel further and be brighter
            const distance = isInVPattern 
              ? 150 + Math.random() * 350
              : 80 + Math.random() * 220;
            
            // Size variation - slightly larger in V arms
            const size = isInVPattern ? 0.6 : 0.4;
            
            return (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: isInVPattern ? 'white' : 'rgba(255,255,255,0.8)',
                  left: '50%',
                  bottom: '0%',
                  boxShadow: isInVPattern 
                    ? '0 0 4px rgba(255,255,255,0.9)'
                    : '0 0 2px rgba(255,255,255,0.7)'
                }}
                animate={{
                  x: [`0px`, `${Math.sin(angle * Math.PI / 180) * distance}px`],
                  y: [`0px`, `-${Math.cos(angle * Math.PI / 180) * distance}px`],
                  opacity: [0, isInVPattern ? 1 : 0.7, 0]
                }}
                transition={{
                  duration: 0.8 + Math.random() * 1.6,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeOut"
                }}
              />
            );
          })}
          
          {/* Energy Pulse Waves - Expanding circles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`pulse-${i}`}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rounded-full border border-white/30"
              animate={{
                width: ['0px', '600px'],
                height: ['0px', '600px'],
                opacity: [0.6, 0],
                y: [0, -300]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Energy Floating Orbs - Enhanced V-pattern */}
          {[...Array(30)].map((_, i) => {
            // Position orbs in the V shape
            let angle;
            let isInVPattern = true;
            
            if (i < 12) {
              // Left arm of V: concentrate between -45 and -20 degrees
              angle = -45 + (Math.random() * 25);
            } else if (i < 24) {
              // Right arm of V: concentrate between 20 and 45 degrees
              angle = 20 + (Math.random() * 25);
            } else {
              // Some scattered orbs
              angle = Math.random() * 160 - 80; // -80 to +80 degrees
              isInVPattern = false;
            }
            
            // Make orbs in V pattern larger and travel further
            const distance = isInVPattern 
              ? 300 + Math.random() * 500
              : 150 + Math.random() * 300;
            
            // Orbs in V pattern are larger and brighter
            const sizeFactor = isInVPattern ? 1.3 : 0.9;
            const size = (2 + Math.random() * 4) * sizeFactor;
            
            // More intensity/opacity for orbs in the V
            const intensity = isInVPattern ? 1.2 : 0.8;
            
            return (
              <motion.div
                key={`energy-orb-${i}`}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  background: i % 3 === 0
                    ? `radial-gradient(circle, rgba(255,255,255,${0.8 * intensity}) 0%, rgba(255,255,255,0) 70%)`
                    : i % 3 === 1
                      ? `radial-gradient(circle, rgba(147,51,234,${0.6 * intensity}) 0%, rgba(147,51,234,0) 70%)`
                      : `radial-gradient(circle, rgba(6,182,212,${0.6 * intensity}) 0%, rgba(6,182,212,0) 70%)`,
                  left: '50%',
                  bottom: '0%',
                  filter: `blur(${isInVPattern ? 1.5 : 1}px)`
                }}
                animate={{
                  x: [`0px`, `${Math.sin(angle * Math.PI / 180) * distance}px`],
                  y: [`0px`, `-${Math.cos(angle * Math.PI / 180) * distance}px`],
                  opacity: [0, isInVPattern ? 0.9 : 0.7, 0],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 4 + Math.random() * 6,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut"
                }}
              />
            );
          })}
          
          {/* Enhanced V-shaped Energy Lines */}
          {[...Array(4)].map((_, i) => {
            // Create intense beams at specific angles to further emphasize the V
            const leftAngles = [-40, -30, -20, -35];
            const rightAngles = [40, 30, 20, 35];
            const leftAngle = leftAngles[i];
            const rightAngle = rightAngles[i];
            
            const width = 2 + (i === 1 ? 2 : 0); // Make one beam on each side thicker
            const color = i === 0 
              ? 'rgba(255,255,255,0.7)'
              : i === 1 
                ? 'rgba(147,51,234,0.6)'
                : i === 2
                  ? 'rgba(6,182,212,0.6)'
                  : 'rgba(255,255,255,0.5)';
              
            const length = 800 + (i * 100);
            const blurAmount = 2 + (i * 1.5);
            
            return (
              <React.Fragment key={`enhanced-v-beams-${i}`}>
                {/* Left beam */}
                <motion.div 
                  className="absolute bottom-0 left-1/2 origin-bottom"
                  style={{
                    width: `${width}px`,
                    height: length,
                    background: `linear-gradient(to top, ${color} 0%, transparent 100%)`,
                    transform: `translate(-50%, 0) rotate(${leftAngle}deg)`,
                    filter: `blur(${blurAmount}px)`
                  }}
                  animate={{
                    opacity: [0.6, 0.9, 0.6],
                    height: [length * 0.9, length, length * 0.9]
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Right beam */}
                <motion.div 
                  className="absolute bottom-0 left-1/2 origin-bottom"
                  style={{
                    width: `${width}px`,
                    height: length,
                    background: `linear-gradient(to top, ${color} 0%, transparent 100%)`,
                    transform: `translate(-50%, 0) rotate(${rightAngle}deg)`,
                    filter: `blur(${blurAmount}px)`
                  }}
                  animate={{
                    opacity: [0.6, 0.9, 0.6],
                    height: [length * 0.9, length, length * 0.9]
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </React.Fragment>
            );
          })}
        </div>
        
        {/* Light Dust - Tiny slow floating particles in dark areas */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={`dust-${i}`}
              className="absolute w-0.5 h-0.5 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
              }}
              animate={{
                y: [-10, 10],
                x: [-10, 10],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {/* DARK TOP AREA ENHANCEMENT - Ensure the top is very dark */}
        <div className="absolute top-0 left-0 right-0 h-[60%] bg-gradient-to-b from-black via-black/95 to-transparent pointer-events-none z-10" />
        
        {/* GRID SYSTEM - Subtle grid in dark areas */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              animation: 'grid-move 25s linear infinite'
            }}
          />
        </div>
        
        {/* SCANLINES EFFECT - Subtle CRT effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="h-full w-full"
            style={{
              backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.5) 50%)',
              backgroundSize: '100% 4px',
            }}
          />
        </div>
        
        {/* Extra Cyberpunk Geometry Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Diagonal Light Lines */}
          <motion.div 
            className="absolute top-1/4 right-[10%] w-[400px] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent transform -rotate-45"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              width: ['350px', '450px', '350px'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ filter: 'blur(1px)' }}
          />
          
          <motion.div 
            className="absolute top-1/3 left-[15%] w-[300px] h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent transform rotate-30"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              width: ['250px', '350px', '250px'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            style={{ filter: 'blur(1px)' }}
          />
          
          {/* Cyber Hexagons */}
          <motion.div 
            className="absolute bottom-[40%] right-[20%] w-24 h-24 border-2 border-cyan-500/20 transform rotate-45"
            animate={{
              rotate: [45, 90, 45],
              scale: [0.9, 1.1, 0.9],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.div 
            className="absolute top-[30%] left-[25%] w-16 h-16 border border-purple-500/20 rounded-full"
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/20 rounded-full text-gray-200 text-xs md:text-sm backdrop-blur-xl mb-10 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 20px rgba(147, 51, 234, 0.3)'
            }}
          >
            <motion.div 
              className="w-3 h-3 rounded-full"
              style={{
                background: 'radial-gradient(circle, #10b981 0%, #059669 100%)',
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.6)'
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
                boxShadow: [
                  '0 0 15px rgba(16, 185, 129, 0.6)',
                  '0 0 25px rgba(16, 185, 129, 0.9)',
                  '0 0 15px rgba(16, 185, 129, 0.6)'
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="font-semibold tracking-wide">Open to Elite Projects</span>
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
            </motion.div>
          </motion.div>

          {/* Main Heading with Enhanced Effects */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-12"
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-10"
              style={{
                textShadow: '0 0 50px rgba(147, 51, 234, 0.6), 0 0 100px rgba(6, 182, 212, 0.4)'
              }}
            >
              <motion.span 
                className="text-white block mb-4"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(255,255,255,0.5)',
                    '0 0 40px rgba(255,255,255,0.9)',
                    '0 0 60px rgba(255,255,255,0.7)',
                    '0 0 40px rgba(255,255,255,0.9)',
                    '0 0 20px rgba(255,255,255,0.5)'
                  ]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Hi, I'm{" "}
              </motion.span>
              <motion.span 
                className="bg-gradient-to-r from-purple-400 via-pink-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '200% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundSize: '300% 100%',
                  filter: 'drop-shadow(0 0 40px rgba(147, 51, 234, 0.8)) drop-shadow(0 0 20px rgba(6, 182, 212, 0.6))'
                }}
              >
                Arshad Noor
              </motion.span>
            </motion.h1>
            
            <div className="text-xl md:text-3xl lg:text-4xl font-semibold text-gray-200 mb-8">
              <span className="inline-block">A passionate </span>
              <motion.span 
                className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent min-h-[1.2em] inline-block"
                style={{
                  filter: 'drop-shadow(0 0 25px rgba(6, 182, 212, 0.6)) drop-shadow(0 0 15px rgba(147, 51, 234, 0.4))',
                  backgroundSize: '200% 100%'
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {displayText}
                <motion.span 
                  className="animate-pulse text-cyan-400 ml-1"
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                  }}
                  style={{
                    textShadow: '0 0 15px rgba(6, 182, 212, 0.8)'
                  }}
                >
                  |
                </motion.span>
              </motion.span>
            </div>
          </motion.div>

          {/* Enhanced Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
              style={{
                textShadow: '0 0 25px rgba(255,255,255,0.1)'
              }}
              animate={{
                textShadow: [
                  '0 0 25px rgba(255,255,255,0.1)',
                  '0 0 35px rgba(255,255,255,0.15)',
                  '0 0 25px rgba(255,255,255,0.1)'
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              I transform{" "}
              <motion.span 
                className="text-purple-300 font-medium"
                animate={{
                  textShadow: [
                    '0 0 15px rgba(147, 51, 234, 0.6)',
                    '0 0 25px rgba(147, 51, 234, 0.9)',
                    '0 0 15px rgba(147, 51, 234, 0.6)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ambitious visions
              </motion.span>{" "}
              into powerful digital experiences. Specializing in{" "}
              <motion.span 
                className="text-cyan-300 font-medium"
                animate={{
                  textShadow: [
                    '0 0 15px rgba(6, 182, 212, 0.6)',
                    '0 0 25px rgba(6, 182, 212, 0.9)',
                    '0 0 15px rgba(6, 182, 212, 0.6)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              >
                AI integration
              </motion.span>{" "}
              and cutting-edge{" "}
              <motion.span 
                className="text-pink-300 font-medium"
                animate={{
                  textShadow: [
                    '0 0 15px rgba(236, 72, 153, 0.6)',
                    '0 0 25px rgba(236, 72, 153, 0.9)',
                    '0 0 15px rgba(236, 72, 153, 0.6)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3,
                }}
              >
                SaaS architecture
              </motion.span>. Where code meets creativity, I build the future.
            </motion.p>
          </motion.div>

          {/* Enhanced Stats with Maximum Impact */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-16 max-w-6xl mx-auto"
          >
            {[
              { number: "50+", label: "Projects Built", icon: <Code2 className="w-10 h-10" />, color: "purple", gradient: "from-purple-500 to-purple-700" },
              { number: "3+", label: "Years Experience", icon: <Coffee className="w-10 h-10" />, color: "cyan", gradient: "from-cyan-500 to-cyan-700" },
              { number: "100K+", label: "Users Impacted", icon: <Star className="w-10 h-10" />, color: "pink", gradient: "from-pink-500 to-pink-700" },
              { number: "5", label: "SaaS Products", icon: <Rocket className="w-10 h-10" />, color: "emerald", gradient: "from-emerald-500 to-emerald-700" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                whileHover={{ 
                  scale: 1.08,
                  y: -10,
                  rotateY: 5,
                }}
                className="relative group cursor-pointer"
              >
                <div 
                  className="bg-white/5 border border-white/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl transition-all duration-700 group-hover:bg-white/12 group-hover:border-white/40 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)'
                  }}
                >
                  {/* Enhanced Glow Effect */}
                  <motion.div 
                    className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-r ${stat.gradient} blur-2xl`}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  />
                  
                  {/* Cyber Border Effect */}
                  <div className={`absolute inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${stat.gradient}`} 
                       style={{ padding: '1px' }}>
                    <div className="w-full h-full rounded-3xl bg-black/80 backdrop-blur-xl" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div 
                      className={`mb-6 flex justify-center group-hover:scale-125 transition-all duration-500 ${
                        stat.color === 'purple' ? 'text-purple-400' :
                        stat.color === 'cyan' ? 'text-cyan-400' :
                        stat.color === 'pink' ? 'text-pink-400' :
                        'text-emerald-400'
                      }`}
                      whileHover={{
                        rotate: [0, -15, 15, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 0.6,
                      }}
                    >
                      {stat.icon}
                    </motion.div>
                    <motion.div 
                      className="text-3xl md:text-4xl font-bold text-white mb-2"
                      style={{
                        textShadow: `0 0 25px ${
                          stat.color === 'purple' ? 'rgba(147, 51, 234, 0.7)' :
                          stat.color === 'cyan' ? 'rgba(6, 182, 212, 0.7)' :
                          stat.color === 'pink' ? 'rgba(236, 72, 153, 0.7)' :
                          'rgba(16, 185, 129, 0.7)'
                        }`
                      }}
                      animate={{
                        textShadow: [
                          `0 0 25px ${
                            stat.color === 'purple' ? 'rgba(147, 51, 234, 0.7)' :
                            stat.color === 'cyan' ? 'rgba(6, 182, 212, 0.7)' :
                            stat.color === 'pink' ? 'rgba(236, 72, 153, 0.7)' :
                            'rgba(16, 185, 129, 0.7)'
                          }`,
                          `0 0 35px ${
                            stat.color === 'purple' ? 'rgba(147, 51, 234, 1)' :
                            stat.color === 'cyan' ? 'rgba(6, 182, 212, 1)' :
                            stat.color === 'pink' ? 'rgba(236, 72, 153, 1)' :
                            'rgba(16, 185, 129, 1)'
                          }`,
                          `0 0 25px ${
                            stat.color === 'purple' ? 'rgba(147, 51, 234, 0.7)' :
                            stat.color === 'cyan' ? 'rgba(6, 182, 212, 0.7)' :
                            stat.color === 'pink' ? 'rgba(236, 72, 153, 0.7)' :
                            'rgba(16, 185, 129, 0.7)'
                          }`
                        ]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3,
                      }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-gray-300 text-sm md:text-base font-medium tracking-wide">{stat.label}</div>
                  </div>
                  
                  {/* Floating Particles in Stats */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full ${
                          stat.color === 'purple' ? 'bg-purple-400' :
                          stat.color === 'cyan' ? 'bg-cyan-400' :
                          stat.color === 'pink' ? 'bg-pink-400' :
                          'bg-emerald-400'
                        }`}
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          y: [-10, 10],
                          opacity: [0.3, 0.8, 0.3],
                          scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2 + Math.random(),
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Ultra-Premium Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0 }}
            className="flex flex-wrap items-center justify-center gap-5 md:gap-8 mb-16 max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Button
                asChild
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 md:px-10 py-6 md:py-7 text-base md:text-lg rounded-full group border-0 shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #9333ea 0%, #06b6d4 50%, #9333ea 100%)',
                  backgroundSize: '200% 100%',
                  boxShadow: '0 0 50px rgba(147, 51, 234, 0.6), 0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                }}
              >
                <Link href="#projects">
                  {/* Multiple Glow Layers */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0, 0.3, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-cyan-300 opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-xl" />
                  
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      backgroundSize: '200% 100%',
                    }}
                  />
                  
                  <motion.div
                    className="flex items-center relative z-10"
                    whileHover={{
                      x: 8,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="w-7 h-7 mr-4 group-hover:scale-125 transition-transform duration-300" />
                    </motion.div>
                    <span className="font-bold tracking-wide">Explore My Universe</span>
                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight className="w-7 h-7 ml-4 group-hover:translate-x-3 transition-transform duration-300" />
                    </motion.div>
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.08, rotateX: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="relative overflow-hidden border-2 border-white/30 text-white hover:bg-white/15 px-8 md:px-10 py-6 md:py-7 text-base md:text-lg rounded-full group backdrop-blur-xl shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 30px rgba(255,255,255,0.1)'
                }}
              >
                <Link href="#contact">
                  {/* Prismatic Border Effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(45deg, #ff0080, #00ffff, #ff0080)',
                      backgroundSize: '400% 400%',
                      padding: '2px',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-black/90 backdrop-blur-xl" />
                  </motion.div>
                  
                  {/* Holographic Shimmer */}
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'loop',
                    }}
                  />
                  
                  <motion.div
                    className="flex items-center relative z-10"
                    whileHover={{
                      x: 8,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Heart className="w-7 h-7 mr-4 group-hover:scale-125 transition-transform duration-300 text-pink-400" />
                    </motion.div>
                    <span className="font-bold tracking-wide">Start Collaborating</span>
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
