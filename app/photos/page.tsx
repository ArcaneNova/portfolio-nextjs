"use client"

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "@/lib/framer-exports";

// This would come from MongoDB in production
const photos = [
  {
    id: "1",
    title: "Mountain Sunrise",
    caption: "Capturing the beautiful sunrise from Mount Rainier",
    category: "Nature",
    date: "2023-07-15",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: "2",
    title: "City Lights",
    caption: "Night photography of the bustling city life",
    category: "Urban",
    date: "2023-08-22",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: "3",
    title: "Beach Sunset",
    caption: "Golden hour at the Pacific coast",
    category: "Nature",
    date: "2023-09-05",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: "4",
    title: "Tech Conference",
    caption: "Speaking at the annual developer conference",
    category: "Events",
    date: "2023-10-15",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: "5",
    title: "Old Architecture",
    caption: "Historical buildings with intricate designs",
    category: "Architecture",
    date: "2023-11-03",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: "6",
    title: "Hiking Adventure",
    caption: "Exploring the trails in the national park",
    category: "Nature",
    date: "2023-12-12",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: "7",
    title: "Coding Setup",
    caption: "My productive workspace setup",
    category: "Tech",
    date: "2024-01-20",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: "8",
    title: "Street Photography",
    caption: "Capturing everyday life in the streets",
    category: "Urban",
    date: "2024-02-14",
    imageUrl: "/placeholder.jpg",
  },
  {
    id: "9",
    title: "Wildlife",
    caption: "Rare glimpse of wildlife in their natural habitat",
    category: "Nature",
    date: "2024-03-07",
    imageUrl: "/placeholder.jpg",
  },
];

export default function PhotosPage() {
  const categories = ["All", "Nature", "Urban", "Architecture", "Tech", "Events"];

  return (
    <main className="container mx-auto py-24 px-4">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Photo Gallery</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A collection of my favorite moments captured through the lens.
        </p>
      </div>
      
      <Tabs defaultValue="All" className="w-full max-w-6xl mx-auto mb-12">
        <TabsList className="grid grid-cols-6 mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos
              .filter(photo => category === "All" || photo.category === category)
              .map((photo, index) => (
                <motion.div
                  key={photo.id}
                  className="relative group overflow-hidden rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="aspect-square relative">
                    <img 
                      src={photo.imageUrl} 
                      alt={photo.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    <h3 className="text-xl font-bold">{photo.title}</h3>
                    <p className="text-sm opacity-90 mb-2">{photo.caption}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                        {photo.category}
                      </span>
                      <span className="text-xs">{photo.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="text-center mt-16">
        <p className="text-muted-foreground mb-4">
          Want to see more photos or collaborate on a photography project?
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </div>
    </main>
  );
} 