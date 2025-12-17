import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import { ObjectId } from "mongodb"
import { requireAuth } from "@/lib/middleware"

interface Params {
  id: string
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { id } = await params
    const body = await req.json()

    const messagesCollection = await getCollection("messages")
    const result = await messagesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating message:", error)
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const auth = await requireAuth(req)
    if (!auth.valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const messagesCollection = await getCollection("messages")
    const result = await messagesCollection.deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting message:", error)
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  }
}
