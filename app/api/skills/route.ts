import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import { requireAuth } from "@/lib/middleware"

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

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req)
    if (!auth.valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { title, icon, skills } = body

    if (!title || !icon || !skills || skills.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const skillsCollection = await getCollection("skills")
    const count = await skillsCollection.countDocuments({})
    
    const result = await skillsCollection.insertOne({
      title,
      icon,
      skills,
      order: count + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      id: result.insertedId,
    })
  } catch (error) {
    console.error("Error creating skill:", error)
    return NextResponse.json(
      { error: "Failed to create skill category" },
      { status: 500 }
    )
  }
}


