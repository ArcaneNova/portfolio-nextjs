import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import { requireAuth } from "@/lib/middleware"

export async function GET() {
  try {
    const toolsCollection = await getCollection("tools")

    const tools = await toolsCollection.find({}).sort({ order: 1 }).toArray()

    return NextResponse.json({
      tools,
    })
  } catch (error) {
    console.error("Error fetching tools:", error)
    return NextResponse.json({ error: "Failed to fetch tools" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAuth(req)
    if (!auth.valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { name, icon, color } = body

    if (!name || !icon || !color) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const toolsCollection = await getCollection("tools")
    const result = await toolsCollection.insertOne({
      name,
      icon,
      color,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      id: result.insertedId,
    })
  } catch (error) {
    console.error("Error creating tool:", error)
    return NextResponse.json(
      { error: "Failed to create tool" },
      { status: 500 }
    )
  }
}

