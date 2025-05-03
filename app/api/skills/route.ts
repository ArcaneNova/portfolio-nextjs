import { NextResponse } from "next/server"
import { getCollection } from "@/lib/db"

export async function GET() {
  try {
    const skillsCollection = await getCollection("skills")

    const skillCategories = await skillsCollection.find({}).sort({ order: 1 }).toArray()

    return NextResponse.json({
      skillCategories,
    })
  } catch (error) {
    console.error("Error fetching skills:", error)
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
  }
}
