import { connect } from "@/lib/db"
import mongoose from "mongoose"
import { BlogClient } from "@/components/admin/blog-client"

// Define BlogPost interface to match the schema
interface BlogPost {
  _id?: string
  title: string
  content: string
  excerpt: string
  slug: string
  author: string
  category: string
  imageUrl: string
  date: Date
  published: boolean
  tags: string[]
  createdAt?: Date
  updatedAt?: Date
}

async function getBlogPosts() {
  await connect()
  try {
    // Get the collection directly since we don't have the model imported
    const db = mongoose.connection.db
    if (!db) {
      throw new Error("Database connection not established")
    }
    const collection = db.collection("blogposts")
    const posts = await collection.find({}).sort({ date: -1 }).toArray()
    
    // Convert MongoDB documents to plain objects and format the _id
    return JSON.parse(JSON.stringify(posts.map(post => ({
      ...post,
      _id: post._id.toString()
    })))) as BlogPost[]
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  
  // Pass data to client component
  return <BlogClient posts={posts} />
} 