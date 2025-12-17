"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Pencil, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Tool {
  _id?: string
  name: string
  icon: string
  color: string
  createdAt?: Date
  updatedAt?: Date
}

interface ToolsClientProps {
  tools: Tool[]
}

export function ToolsClient({ tools: initialTools }: ToolsClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [tools, setTools] = useState<Tool[]>(initialTools)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const auth = localStorage.getItem("admin-auth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  if (!isAuthenticated) {
    return null
  }

  const handleDelete = async (toolId: string | undefined) => {
    if (!toolId) return
    if (!confirm("Are you sure you want to delete this tool?")) {
      return
    }

    try {
      setIsDeleting(toolId)
      const response = await fetch(`/api/tools/${toolId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete tool")
      }

      setTools(tools.filter((t) => t._id !== toolId))
      toast({
        title: "Success",
        description: "Tool deleted successfully",
      })
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Error",
        description: "Failed to delete tool",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tools</h1>
          <p className="text-muted-foreground">
            Manage your development tools and tech stack
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/tools/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Tool
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tools</CardTitle>
          <CardDescription>
            A list of all your development tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          {tools.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No tools yet. Click "Add Tool" to create your first one.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Icon</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tools.map((tool) => (
                    <TableRow key={tool._id}>
                      <TableCell className="font-medium">{tool.name}</TableCell>
                      <TableCell>
                        <span className="text-2xl">{tool.icon}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded border"
                            style={{ backgroundColor: tool.color }}
                          />
                          <code className="text-sm">{tool.color}</code>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <Link href={`/admin/tools/${tool._id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(tool._id)}
                            disabled={isDeleting === tool._id}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
