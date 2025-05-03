import { connect } from "@/lib/db"
import mongoose from "mongoose"
import { AchievementsClient } from "@/components/admin/achievements-client"

// Define Achievement interface
interface Achievement {
  _id?: string
  title: string
  description: string
  icon: string
  createdAt?: Date
  updatedAt?: Date
}

async function getAchievements() {
  await connect()
  try {
    // Get the collection directly since we don't have a model imported
    const db = mongoose.connection.db
    if (!db) {
      throw new Error("Database connection not established")
    }
    const collection = db.collection("achievements")
    const achievements = await collection.find({}).sort({ createdAt: -1 }).toArray()
    
    // Convert MongoDB documents to plain objects and format the _id
    return JSON.parse(JSON.stringify(achievements.map(achievement => ({
      ...achievement,
      _id: achievement._id.toString()
    })))) as Achievement[]
  } catch (error) {
    console.error("Error fetching achievements:", error)
    return []
  }
}

export default async function AchievementsPage() {
  const achievements = await getAchievements()
  
  // Pass data to client component
  return <AchievementsClient achievements={achievements} />
} 