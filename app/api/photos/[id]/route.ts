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
    const photosCollection = await getCollection("photos")

    const result = await photosCollection.deleteOne({
      _id: new ObjectId(id)
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Photo not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Photo deleted successfully"
    })
  } catch (error) {
    console.error("Error deleting photo:", error)
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    )
  }
}
