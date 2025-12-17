"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "@/lib/framer-exports";

interface Photo {
  _id: string;
  title: string;
  caption: string;
  category: string;
  date: string;
  imageUrl: string;
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/photos?limit=100");
        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }
        const data = await response.json();
        setPhotos(data.photos || []);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.photos?.map((p: Photo) => p.category) || [])
        ) as string[];
        setCategories(["All", ...uniqueCategories]);
        setError(null);
      } catch (err) {
        console.error("Error fetching photos:", err);
        setError("Failed to load photos. Please try again later.");
        setPhotos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (isLoading) {
    return (
      <main className="container mx-auto py-24 px-4">
        <div className="text-center py-20">
          <p className="text-muted-foreground">Loading photos...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto py-24 px-4">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      </main>
    );
  }

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
      
      {photos.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">No photos available yet.</p>
        </div>
      ) : (
        <Tabs defaultValue="All" className="w-full max-w-6xl mx-auto mb-12">
          <TabsList className={`grid grid-cols-${Math.min(categories.length, 6)} mb-8`}>
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
                    key={photo._id}
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
                        <span className="text-xs">{new Date(photo.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </TabsContent>
          ))}
        </Tabs>
      )}
      
      <div className="text-center mt-16">
        <p className="text-muted-foreground mb-4">
          Want to see more photos or collaborate on a photography project?
        </p>
        <Button asChild size="lg">
          <Link href="/#contact">Get in Touch</Link>
        </Button>
      </div>
    </main>
  );
} 