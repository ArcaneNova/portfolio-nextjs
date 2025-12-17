import { NextRequest, NextResponse } from "next/server"
import { connect } from "@/lib/db"
import { ObjectId } from "mongodb"
import ProjectModel from "@/lib/models/project"
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

    const result = await ProjectModel.findByIdAndDelete(id)

    if (!result) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully"
    })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    )
  }
}
