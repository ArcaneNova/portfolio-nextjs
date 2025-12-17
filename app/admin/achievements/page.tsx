import { connect } from "@/lib/db"
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
    // Note: You'll need to implement proper MongoDB access here
    // For now, returning empty array - update with your database query
    return []
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