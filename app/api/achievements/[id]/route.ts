import { NextRequest, NextResponse } from "next/server"
import { connect, getCollection } from "@/lib/db"
import { ObjectId } from "mongodb"
import { requireAuth } from "@/lib/middleware"

interface Params {
  id: string
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  // Check authentication first
  const auth = await requireAuth(req)
  if (!auth.valid) {
    return NextResponse.json(
      { error: auth.error || "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    await connect()
    
    const { id } = await params
    const achievementsCollection = await getCollection("achievements")

    const result = await achievementsCollection.deleteOne({
      _id: new ObjectId(id)
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Achievement not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Achievement deleted successfully"
    })
  } catch (error) {
    console.error("Error deleting achievement:", error)
    return NextResponse.json(
      { error: "Failed to delete achievement" },
      { status: 500 }
    )
  }
}
