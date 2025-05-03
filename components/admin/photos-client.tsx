"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Eye, Trash, CheckCircle, XCircle } from "lucide-react"
import { format } from "date-fns"

interface Photo {
  _id?: string
  title: string
  caption: string
  category: string
  imageUrl: string
  date: Date
  published: boolean
  createdAt?: Date
  updatedAt?: Date
}

interface PhotosClientProps {
  photos: Photo[]
}

export function PhotosClient({ photos }: PhotosClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated in localStorage
    const auth = localStorage.getItem("admin-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // If not authenticated, show nothing (the layout will handle the login screen)
  if (!isAuthenticated) {
    return null;
  }
  
  // Get unique categories
  const categories = [...new Set(photos.map(photo => photo.category))];
  const publishedPhotos = photos.filter(photo => photo.published);
  const hiddenPhotos = photos.filter(photo => !photo.published);
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Photos</h1>
          <p className="text-muted-foreground">
            Manage your photo gallery and showcase your work
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/photos/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add New Photo
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Photo Gallery Overview</CardTitle>
            <CardDescription>
              Quick stats about your photo collection
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-6">
            <div className="bg-primary/10 rounded-lg p-4 min-w-[180px]">
              <div className="text-xl font-bold">{photos.length}</div>
              <div className="text-sm text-muted-foreground">Total Photos</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 min-w-[180px]">
              <div className="text-xl font-bold">{publishedPhotos.length}</div>
              <div className="text-sm text-muted-foreground">Published</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 min-w-[180px]">
              <div className="text-xl font-bold">{hiddenPhotos.length}</div>
              <div className="text-sm text-muted-foreground">Hidden</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 min-w-[180px]">
              <div className="text-xl font-bold">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {photos.length === 0 ? (
        <Card className="text-center py-16">
          <CardContent>
            <h3 className="text-xl font-medium mb-2">No photos yet</h3>
            <p className="text-muted-foreground mb-8">
              Add your first photo to start building your gallery
            </p>
            <Button asChild>
              <Link href="/admin/photos/new">
                <Plus className="h-4 w-4 mr-2" /> Add Your First Photo
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Card key={photo._id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={photo.imageUrl}
                  alt={photo.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  {photo.published ? (
                    <Badge className="bg-green-500 hover:bg-green-600">Published</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-background">Hidden</Badge>
                  )}
                </div>
              </div>
              
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{photo.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline">{photo.category}</Badge>
                      <span>{format(new Date(photo.date), "MMM d, yyyy")}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {photo.caption}
                </p>
                
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <Link href={`/admin/photos/${photo._id}`}>
                      <Pencil className="h-4 w-4 mr-1" /> Edit
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                  >
                    <Trash className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 