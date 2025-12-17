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
import { Plus, Pencil, Trash, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Resume {
  _id?: string
  title: string
  url: string
  isPrimary?: boolean
  createdAt?: Date
}

interface ResumesClientProps {
  resumes: Resume[]
}

export function ResumesClient({ resumes: initialResumes }: ResumesClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [resumes, setResumes] = useState<Resume[]>(initialResumes)
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

  const handleDelete = async (resumeId: string | undefined) => {
    if (!resumeId) return
    if (!confirm("Are you sure you want to delete this resume?")) return

    try {
      setIsDeleting(resumeId)
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete resume")
      setResumes(resumes.filter((r) => r._id !== resumeId))
      toast({
        title: "Success",
        description: "Resume deleted successfully",
      })
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Error",
        description: "Failed to delete resume",
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
          <h1 className="text-3xl font-bold mb-2">Resumes</h1>
          <p className="text-muted-foreground">
            Manage your resume documents
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/resumes/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Resume
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Resumes</CardTitle>
          <CardDescription>
            Your available resume documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          {resumes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No resumes yet. Click "Add Resume" to create your first one.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Primary</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resumes.map((resume) => (
                    <TableRow key={resume._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {resume.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <a
                          href={resume.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          View
                        </a>
                      </TableCell>
                      <TableCell>
                        {resume.isPrimary ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Primary
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <Link href={`/admin/resumes/${resume._id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(resume._id)}
                            disabled={isDeleting === resume._id}
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
