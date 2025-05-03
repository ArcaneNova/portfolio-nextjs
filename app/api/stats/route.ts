import { NextResponse } from "next/server"
import { getCollection } from "@/lib/db"

export async function GET() {
  try {
    const statsCollection = await getCollection("stats")
    const platformsCollection = await getCollection("platforms")

    const codingStats = await statsCollection.find({}).sort({ order: 1 }).toArray()
    const platformStats = await platformsCollection.find({}).sort({ order: 1 }).toArray()

    return NextResponse.json({
      codingStats,
      platformStats,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
