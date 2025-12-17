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
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Skill {
  name: string
  level: number
}

interface SkillCategory {
  _id?: string
  title: string
  icon: string
  skills: Skill[]
  createdAt?: Date
  updatedAt?: Date
}

interface SkillsClientProps {
  categories: SkillCategory[]
}

export function SkillsClient({ categories: initialCategories }: SkillsClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [categories, setCategories] = useState<SkillCategory[]>(initialCategories)
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

  const handleDelete = async (categoryId: string | undefined) => {
    if (!categoryId) return
    if (!confirm("Are you sure you want to delete this skill category?")) {
      return
    }

    try {
      setIsDeleting(categoryId)
      const response = await fetch(`/api/skills/${categoryId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete skill category")
      }

      setCategories(categories.filter((c) => c._id !== categoryId))
      toast({
        title: "Success",
        description: "Skill category deleted successfully",
      })
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Error",
        description: "Failed to delete skill category",
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
          <h1 className="text-3xl font-bold mb-2">Skills</h1>
          <p className="text-muted-foreground">
            Manage your skills organized by category
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/skills/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Category
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Skills Overview</CardTitle>
            <CardDescription>
              Quick stats about your skills
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-6">
            <div className="bg-primary/10 rounded-lg p-4 min-w-[180px]">
              <div className="text-xl font-bold">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 min-w-[180px]">
              <div className="text-xl font-bold">
                {categories.reduce((sum, cat) => sum + cat.skills.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Skills</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Skill Categories</CardTitle>
            <CardDescription>
              Manage your skill categories and individual skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            {categories.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No skill categories yet. Click "Add Category" to create your first one.
              </div>
            ) : (
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category._id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{category.icon}</span>
                          <h3 className="font-semibold text-lg">{category.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {category.skills.length} skill{category.skills.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link href={`/admin/skills/${category._id}`}>
                            <Pencil className="h-4 w-4 mr-1" /> Edit
                          </Link>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(category._id)}
                          disabled={isDeleting === category._id}
                        >
                          <Trash className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary">
                          {skill.name} - {skill.level}%
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
