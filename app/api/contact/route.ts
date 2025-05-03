import { NextResponse } from "next/server"
import { getCollection } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Simple spam check (can be enhanced)
    if (message.includes("http") || message.toLowerCase().includes("viagra")) {
      return NextResponse.json({ error: "Message appears to be spam" }, { status: 400 })
    }

    const messagesCollection = await getCollection("messages")

    const result = await messagesCollection.insertOne({
      name,
      email,
      subject: subject || "No Subject",
      message,
      read: false,
      createdAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      messageId: result.insertedId,
    })
  } catch (error) {
    console.error("Error saving contact message:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
