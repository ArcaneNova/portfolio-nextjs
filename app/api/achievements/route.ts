import { NextResponse } from "next/server"
import { getCollection } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const skip = (page - 1) * limit

    const achievementsCollection = await getCollection("achievements")

    const achievements = await achievementsCollection.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()

    const total = await achievementsCollection.countDocuments({})

    return NextResponse.json({
      achievements,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching achievements:", error)
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 })
  }
}
