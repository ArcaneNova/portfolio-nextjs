import { getCollection } from "@/lib/db"
import { MessagesClient } from "@/components/admin/messages-client"

interface Message {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: Date
}

async function getMessages() {
  try {
    const messagesCollection = await getCollection("messages")
    const messages = await messagesCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return JSON.parse(JSON.stringify(messages)) as Message[]
  } catch (error) {
    console.error("Failed to fetch messages:", error)
    return []
  }
}

export default async function MessagesPage() {
  const messages = await getMessages()

  return <MessagesClient messages={messages} />
} 