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
import { Plus, Pencil, Trash, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Platform {
  _id?: string
  name: string
  icon: string
  url: string
  username?: string
  followers?: number
}

interface PlatformsClientProps {
  platforms: Platform[]
}

export function PlatformsClient({ platforms: initialPlatforms }: PlatformsClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [platforms, setPlatforms] = useState<Platform[]>(initialPlatforms)
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

  const handleDelete = async (platformId: string | undefined) => {
    if (!platformId) return
    if (!confirm("Are you sure you want to delete this platform?")) return

    try {
      setIsDeleting(platformId)
      const response = await fetch(`/api/platforms/${platformId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete platform")
      setPlatforms(platforms.filter((p) => p._id !== platformId))
      toast({
        title: "Success",
        description: "Platform deleted successfully",
      })
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Error",
        description: "Failed to delete platform",
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
          <h1 className="text-3xl font-bold mb-2">Platforms</h1>
          <p className="text-muted-foreground">
            Manage your social and coding platforms
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/platforms/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Platform
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Platforms</CardTitle>
          <CardDescription>
            Your connected social and coding platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          {platforms.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No platforms yet. Click "Add Platform" to create your first one.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {platforms.map((platform) => (
                    <TableRow key={platform._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{platform.icon}</span>
                          {platform.name}
                        </div>
                      </TableCell>
                      <TableCell>{platform.username || "-"}</TableCell>
                      <TableCell>
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          Visit <ExternalLink className="h-3 w-3" />
                        </a>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <Link href={`/admin/platforms/${platform._id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(platform._id)}
                            disabled={isDeleting === platform._id}
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
