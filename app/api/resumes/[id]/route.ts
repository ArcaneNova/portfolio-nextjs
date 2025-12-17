import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import { ObjectId } from "mongodb"
import { requireAuth } from "@/lib/middleware"

interface Params {
  id: string
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const auth = await requireAuth(req)
    if (!auth.valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const resumesCollection = await getCollection("resumes")
    const result = await resumesCollection.deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting resume:", error)
    return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 })
  }
}
