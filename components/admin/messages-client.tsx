"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Eye, Trash, Mail } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: Date
}

interface MessagesClientProps {
  messages: Message[]
}

export function MessagesClient({ messages: initialMessages }: MessagesClientProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const { toast } = useToast()

  const unreadMessages = messages.filter((msg) => !msg.read)
  const readMessages = messages.filter((msg) => msg.read)

  const handleViewMessage = async (msg: Message) => {
    setSelectedMessage(msg)
    
    // Mark as read if not already read
    if (!msg.read) {
      try {
        const response = await fetch(`/api/messages/${msg._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ read: true }),
        })

        if (response.ok) {
          setMessages(
            messages.map((m) =>
              m._id === msg._id ? { ...m, read: true } : m
            )
          )
          setSelectedMessage({ ...msg, read: true })
        }
      } catch (error) {
        console.error("Error marking message as read:", error)
      }
    }
  }

  const handleDelete = async (messageId: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return

    try {
      setIsDeleting(messageId)
      const response = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete message")

      setMessages(messages.filter((m) => m._id !== messageId))
      setSelectedMessage(null)
      
      toast({
        title: "Success",
        description: "Message deleted successfully",
      })
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">
          Manage messages from your contact form.
        </p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Badge variant="outline" className="px-3 py-1">
          Total: {messages.length}
        </Badge>
        <Badge variant="secondary" className="px-3 py-1">
          Unread: {unreadMessages.length}
        </Badge>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Messages ({messages.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadMessages.length})</TabsTrigger>
          <TabsTrigger value="read">Read ({readMessages.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <MessagesTable 
            messages={messages} 
            onView={handleViewMessage}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        </TabsContent>

        <TabsContent value="unread">
          <MessagesTable 
            messages={unreadMessages} 
            onView={handleViewMessage}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        </TabsContent>

        <TabsContent value="read">
          <MessagesTable 
            messages={readMessages} 
            onView={handleViewMessage}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        </TabsContent>
      </Tabs>

      {/* Message Detail Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  {selectedMessage.subject}
                </DialogTitle>
                <DialogDescription>
                  From {selectedMessage.name} ({selectedMessage.email})
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">From</p>
                    <p className="font-medium">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedMessage.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Subject</p>
                    <p className="font-medium">{selectedMessage.subject}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">
                      {format(new Date(selectedMessage.createdAt), "MMM dd, yyyy HH:mm")}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground text-sm mb-2">Message</p>
                  <div className="bg-muted p-4 rounded-lg whitespace-pre-wrap break-words">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-4 border-t">
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(selectedMessage._id)}
                    disabled={isDeleting === selectedMessage._id}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete Message
                  </Button>
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface MessagesTableProps {
  messages: Message[]
  onView: (message: Message) => void
  onDelete: (messageId: string) => void
  isDeleting: string | null
}

function MessagesTable({ messages, onView, onDelete, isDeleting }: MessagesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <CardDescription>
          {messages.length} message{messages.length !== 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No messages found
                  </TableCell>
                </TableRow>
              ) : (
                messages.map((message) => (
                  <TableRow key={message._id} className={!message.read ? "bg-blue-50/50" : ""}>
                    <TableCell>
                      <Badge variant={message.read ? "secondary" : "default"}>
                        {message.read ? "Read" : "Unread"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{message.name}</TableCell>
                    <TableCell className="text-sm">{message.email}</TableCell>
                    <TableCell className="truncate max-w-xs">{message.subject}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(message.createdAt), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onView(message)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => onDelete(message._id)}
                          disabled={isDeleting === message._id}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
