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

interface Journey {
  _id?: string
  title: string
  description?: string
  icon?: string
  order?: number
}

interface JourneysClientProps {
  journeys: Journey[]
}

export function JourneysClient({ journeys: initialJourneys }: JourneysClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [journeys, setJourneys] = useState<Journey[]>(initialJourneys)
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

  const handleDelete = async (journeyId: string | undefined) => {
    if (!journeyId) return
    if (!confirm("Are you sure you want to delete this journey?")) return

    try {
      setIsDeleting(journeyId)
      const response = await fetch(`/api/journeys/${journeyId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete journey")
      setJourneys(journeys.filter((j) => j._id !== journeyId))
      toast({
        title: "Success",
        description: "Journey deleted successfully",
      })
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Error",
        description: "Failed to delete journey",
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
          <h1 className="text-3xl font-bold mb-2">Journeys</h1>
          <p className="text-muted-foreground">
            Manage your career journey milestones
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/journeys/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Journey
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Journeys</CardTitle>
          <CardDescription>
            Your career journey milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          {journeys.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No journeys yet. Click "Add Journey" to create your first one.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {journeys.map((journey) => (
                    <TableRow key={journey._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {journey.icon && <span className="text-xl">{journey.icon}</span>}
                          {journey.title}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {journey.description || "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <Link href={`/admin/journeys/${journey._id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(journey._id)}
                            disabled={isDeleting === journey._id}
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
