import { connect } from "@/lib/db"
import { PhotosClient } from "@/components/admin/photos-client"

// Define Photo interface to match the schema
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

async function getPhotos() {
  await connect()
  try {
    // Note: Implement your MongoDB query here
    // For now, returning empty array
    return []
  } catch (error) {
    console.error("Error fetching photos:", error)
    return []
  }
}

export default async function PhotosPage() {
  const photos = await getPhotos()
  
  // Pass data to client component
  return <PhotosClient photos={photos} />
} 