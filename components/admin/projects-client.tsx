"use client"

import { useState, useEffect } from "react"
import type { Project } from "@/lib/models/project"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Pencil,
  Plus,
  Star,
  StarOff,
  ExternalLink,
  Github,
  Trash,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProjectsClientProps {
  projects: Project[]
}

export function ProjectsClient({ projects: initialProjects }: ProjectsClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const { toast } = useToast()
  
  useEffect(() => {
    // Check if user is authenticated in localStorage
    const auth = localStorage.getItem("admin-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // If not authenticated, show nothing (the layout will handle the login screen)
  if (!isAuthenticated) {
    return null;
  }

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return
    }

    try {
      setIsDeleting(projectId)
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete project")
      }

      setProjects(projects.filter((p) => p._id !== projectId))
      toast({
        title: "Success",
        description: "Project deleted successfully",
      })
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }
  
  const featuredProjects = projects.filter((project) => project.featured)
  const categories = [...new Set(projects.map((project) => project.category))]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">
            Manage your projects and showcase your work
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add New Project
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Projects Overview</CardTitle>
            <CardDescription>
              Quick stats about your projects collection
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-6">
            <div className="bg-primary/10 rounded-lg p-4 min-w-[180px]">
              <div className="text-xl font-bold">{projects.length}</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 min-w-[180px]">
              <div className="text-xl font-bold">{featuredProjects.length}</div>
              <div className="text-sm text-muted-foreground">Featured Projects</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 min-w-[180px]">
              <div className="text-xl font-bold">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Projects</CardTitle>
            <CardDescription>
              Manage your projects, edit details, or remove them
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Links</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No projects found. Click "Add New Project" to create your first project.
                    </TableCell>
                  </TableRow>
                ) : (
                  projects.map((project) => (
                    <TableRow key={project._id}>
                      <TableCell>
                        <div className="relative h-12 w-12 rounded-md overflow-hidden">
                          {project.image && (
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{project.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {project.featured ? (
                          <Star className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <StarOff className="h-4 w-4 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            asChild
                          >
                            <Link href={`/admin/projects/${project._id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="icon"
                            onClick={() => handleDelete(project._id as string)}
                            disabled={isDeleting === project._id}
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 