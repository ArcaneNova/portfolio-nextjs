"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Particle component for the background
function Particle({ 
  color = "cyan", 
  size = 2, 
  duration = 10, 
  delay = 0,
  left = "50%",
  bottom = "0%"
}: { 
  color?: string; 
  size?: number; 
  duration?: number; 
  delay?: number;
  left?: string;
  bottom?: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left,
        bottom,
        backgroundColor: color === "cyan" ? "#22d3ee" : 
                         color === "blue" ? "#3b82f6" : 
                         color === "purple" ? "#a855f7" :
                         color === "green" ? "#22c55e" :
                         color === "amber" ? "#f59e0b" : "#22d3ee"
      }}
      initial={{ opacity: 0.6, y: 0 }}
      animate={{ 
        opacity: 0,
        y: -Math.random() * 300 - 100,
        x: (Math.random() - 0.5) * 100
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeOut"
      }}
    />
  );
}

interface Launch {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  launchDate: string;
  projectUrl: string;
  tags: string[];
  status: "Launched" | "Launching Soon";
}

export default function RecentLaunchesSection() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const res = await fetch(`/api/launches`, {
          method: "GET",
          cache: "no-store",
        });
        
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error("API Error:", errorData);
          throw new Error(`Failed to fetch launches: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        setLaunches(data);
      } catch (error) {
        console.error("Error fetching launches:", error);
        // Set empty array to avoid showing loading spinner indefinitely
        setLaunches([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLaunches();
  }, []);

  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Cyberpunk Grid */}
        <div className="absolute inset-0 bg-grid-small-black/[0.2] bg-[length:20px_20px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        {/* Ambient Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[70%] bg-gradient-to-t from-cyan-500/10 via-purple-500/5 to-transparent" />
        
        {/* V-shaped Light Source */}
        <div className="absolute bottom-0 left-1/2 w-[40vw] h-[60vh] -translate-x-1/2 bg-gradient-conic from-cyan-500 via-blue-500 to-purple-600 blur-[120px] opacity-20" />
        
        {/* Light Rays */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="w-[1px] h-[40vh] bg-gradient-to-t from-cyan-400 to-transparent opacity-30 animate-glow-pulse"></div>
        </div>
        
        {/* Rising Particles */}
        <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <Particle
              key={`particle-${i}`}
              color={i % 3 === 0 ? "cyan" : i % 3 === 1 ? "blue" : "purple"}
              size={Math.random() * 4 + 1}
              duration={Math.random() * 10 + 5}
              delay={Math.random() * 5}
              left={`${Math.random() * 100}%`}
              bottom={`${Math.random() * 10}%`}
            />
          ))}
        </div>
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0">
          <div className="h-full w-full border-t border-slate-700/20" style={{ top: "10%", position: "absolute" }}></div>
          <div className="h-full w-full border-t border-slate-700/20" style={{ top: "20%", position: "absolute" }}></div>
          <div className="h-full w-full border-t border-slate-700/20" style={{ top: "30%", position: "absolute" }}></div>
          <div className="h-full w-full border-t border-slate-700/20" style={{ top: "40%", position: "absolute" }}></div>
          <div className="h-full w-full border-t border-slate-700/20" style={{ top: "50%", position: "absolute" }}></div>
          <div className="h-full w-full border-t border-slate-700/20" style={{ top: "60%", position: "absolute" }}></div>
          <div className="h-full w-full border-t border-slate-700/20" style={{ top: "70%", position: "absolute" }}></div>
          <div className="h-full w-full border-t border-slate-700/20" style={{ top: "80%", position: "absolute" }}></div>
          <div className="h-full w-full border-t border-slate-700/20" style={{ top: "90%", position: "absolute" }}></div>
        </div>
        
        {/* Accent Corners - Cyberpunk style */}
        <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-cyan-500/30"></div>
        <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-purple-500/30"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-blue-500/30"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-cyan-500/30"></div>
      </div>

      {/* Particles Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Randomly generated particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <Particle 
            key={i} 
            size={Math.random() * 4 + 2} 
            duration={Math.random() * 5 + 5} 
            delay={Math.random() * 5} 
            color={i % 2 === 0 ? "cyan" : "purple"}
            left={`${Math.random() * 100}%`}
            bottom={`${Math.random() * 100}%`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          {/* Section Title with Animation */}
          <motion.div 
            className="relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold tracking-tighter mb-2">
              Recent <span className="text-gradient-primary relative">
                Launches
                <span className="absolute -top-1 -right-2 w-2 h-2 bg-cyan-500 rounded-full animate-ping"></span>
              </span>
            </h2>
            
            <div className="absolute -top-4 -right-8">
              <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
            
            {/* Animated Underline */}
            <div className="h-1 w-32 mx-auto mt-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full" />
          </motion.div>
          
          <motion.p 
            className="text-muted-foreground mt-4 max-w-2xl relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Check out my latest projects and app launches that are making waves
            <span className="absolute -left-6 top-1/2 h-[1px] w-5 bg-gradient-to-r from-transparent to-cyan-500"></span>
            <span className="absolute -right-6 top-1/2 h-[1px] w-5 bg-gradient-to-l from-transparent to-cyan-500"></span>
          </motion.p>
        </div>

        {/* Launches Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {launches.length > 0 ? (
              launches.map((launch) => (
                <LaunchCard key={launch.id} launch={launch} />
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground py-12">
                <p>No recent launches available at the moment.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function LaunchCard({ launch }: { launch: Launch }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <motion.div
        className={cn(
          "absolute -inset-0.5 rounded-xl opacity-0 blur-xl transition duration-300",
          launch.status === "Launched" 
            ? "bg-gradient-to-br from-green-400 via-cyan-500 to-blue-600" 
            : "bg-gradient-to-br from-amber-400 via-orange-500 to-red-600"
        )}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.3 }}
        transition={{ duration: 0.2 }}
      ></motion.div>
      <Card 
        className={cn(
          "overflow-hidden border border-slate-800 bg-slate-950/50 backdrop-blur-sm transition-all duration-300",
          launch.status === "Launched" 
            ? "hover:border-green-700" 
            : "hover:border-amber-700"
        )}
      >
        <div className="relative h-48 overflow-hidden">
          {/* Image */}
          <img 
            src={launch.imageUrl || "/placeholder.jpg"} 
            alt={launch.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-70" />
          
          {/* Launch Date & Status Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Badge 
              className={cn(
                "backdrop-blur-md",
                launch.status === "Launched" 
                  ? "bg-green-900/70 text-green-200 border-green-700" 
                  : "bg-amber-900/70 text-amber-200 border-amber-700"
              )}
            >
              {launch.status === "Launched" 
                ? "🚀 Launched" 
                : "⏳ Launching Soon"}
            </Badge>
            <Badge className="bg-cyan-900/70 text-cyan-200 border-cyan-700 backdrop-blur-md">
              {new Date(launch.launchDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
              })}
            </Badge>
          </div>
        </div>
        
        <CardHeader>
          <CardTitle className="font-bold text-xl group-hover:text-gradient-primary transition-all duration-300">
            {launch.title}
          </CardTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {launch.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="border-slate-700 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        
        <CardContent>
          <CardDescription className="text-muted-foreground">
            {launch.description}
          </CardDescription>
        </CardContent>
        
        <CardFooter>
          <a href={launch.projectUrl} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button 
              variant="outline" 
              className={cn(
                "w-full border-slate-700 transition-all duration-300",
                launch.status === "Launched" 
                  ? "hover:border-green-500 hover:text-green-400 group-hover:border-green-500" 
                  : "hover:border-amber-500 hover:text-amber-400 group-hover:border-amber-500"
              )}
            >
              <span>Visit Project</span>
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
