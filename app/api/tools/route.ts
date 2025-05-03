import { NextResponse } from "next/server"
import { getCollection } from "@/lib/db"

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
