import { connect } from "@/lib/db"
import mongoose from "mongoose"
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
    // Get the collection directly since we don't have the model imported
    const db = mongoose.connection.db
    if (!db) {
      throw new Error("Database connection not established")
    }
    const collection = db.collection("photos")
    const photos = await collection.find({}).sort({ date: -1 }).toArray()
    
    // Convert MongoDB documents to plain objects and format the _id
    return JSON.parse(JSON.stringify(photos.map(photo => ({
      ...photo,
      _id: photo._id.toString()
    })))) as Photo[]
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