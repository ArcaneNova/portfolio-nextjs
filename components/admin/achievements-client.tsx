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

interface Achievement {
  _id?: string
  title: string
  description: string
  icon: string
  createdAt?: Date
  updatedAt?: Date
}

interface AchievementsClientProps {
  achievements: Achievement[]
}

export function AchievementsClient({ achievements }: AchievementsClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
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
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Achievements</h1>
          <p className="text-muted-foreground">
            Manage your professional achievements and milestones
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/achievements/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add New Achievement
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Achievements Overview</CardTitle>
            <CardDescription>
              Quick stats about your achievements collection
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-6">
            <div className="bg-primary/10 rounded-lg p-4 min-w-[180px]">
              <div className="text-xl font-bold">{achievements.length}</div>
              <div className="text-sm text-muted-foreground">Total Achievements</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Achievements</CardTitle>
            <CardDescription>
              Manage your achievements, edit details, or remove them
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Icon</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {achievements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No achievements found. Click "Add New Achievement" to create your first achievement.
                    </TableCell>
                  </TableRow>
                ) : (
                  achievements.map((achievement) => (
                    <TableRow key={achievement._id}>
                      <TableCell>
                        <div className="bg-primary/10 h-10 w-10 rounded-md flex items-center justify-center text-xl">
                          {achievement.icon}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{achievement.title}</TableCell>
                      <TableCell>{achievement.description}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            asChild
                          >
                            <Link href={`/admin/achievements/${achievement._id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="destructive" size="icon">
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