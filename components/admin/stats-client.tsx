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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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

interface CodingStat {
  _id?: string
  label: string
  value: string
  icon: string
  color: string
}

interface PlatformStatItem {
  label: string
  value: string
}

interface PlatformStat {
  _id?: string
  platform: string
  icon: string
  stats: PlatformStatItem[]
}

interface StatsClientProps {
  codingStats: CodingStat[]
  platformStats: PlatformStat[]
}

export function StatsClient({ codingStats: initialCoding, platformStats: initialPlatform }: StatsClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [codingStats, setCodingStats] = useState<CodingStat[]>(initialCoding)
  const [platformStats, setPlatformStats] = useState<PlatformStat[]>(initialPlatform)
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

  const handleDeleteCodingStat = async (statId: string | undefined) => {
    if (!statId) return
    if (!confirm("Are you sure you want to delete this stat?")) return

    try {
      setIsDeleting(statId)
      const response = await fetch(`/api/stats/coding/${statId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete stat")
      setCodingStats(codingStats.filter((s) => s._id !== statId))
      toast({
        title: "Success",
        description: "Stat deleted successfully",
      })
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Error",
        description: "Failed to delete stat",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const handleDeletePlatformStat = async (statId: string | undefined) => {
    if (!statId) return
    if (!confirm("Are you sure you want to delete this platform stat?")) return

    try {
      setIsDeleting(statId)
      const response = await fetch(`/api/stats/platform/${statId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete platform stat")
      setPlatformStats(platformStats.filter((s) => s._id !== statId))
      toast({
        title: "Success",
        description: "Platform stat deleted successfully",
      })
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Error",
        description: "Failed to delete platform stat",
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
          <h1 className="text-3xl font-bold mb-2">Statistics</h1>
          <p className="text-muted-foreground">
            Manage your coding and platform statistics
          </p>
        </div>
      </div>

      <Tabs defaultValue="coding" className="w-full">
        <TabsList>
          <TabsTrigger value="coding">Coding Stats</TabsTrigger>
          <TabsTrigger value="platform">Platform Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="coding" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Coding Statistics</h2>
            <Button asChild>
              <Link href="/admin/stats/coding/new" className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add Coding Stat
              </Link>
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              {codingStats.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No coding stats yet. Click "Add Coding Stat" to create your first one.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Label</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Icon</TableHead>
                        <TableHead>Color</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {codingStats.map((stat) => (
                        <TableRow key={stat._id}>
                          <TableCell className="font-medium">{stat.label}</TableCell>
                          <TableCell>{stat.value}</TableCell>
                          <TableCell className="text-2xl">{stat.icon}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-6 h-6 rounded"
                                style={{ backgroundColor: stat.color }}
                              />
                              <code className="text-sm">{stat.color}</code>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                              >
                                <Link href={`/admin/stats/coding/${stat._id}`}>
                                  <Pencil className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteCodingStat(stat._id)}
                                disabled={isDeleting === stat._id}
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
        </TabsContent>

        <TabsContent value="platform" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Platform Statistics</h2>
            <Button asChild>
              <Link href="/admin/stats/platform/new" className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Add Platform Stat
              </Link>
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              {platformStats.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No platform stats yet. Click "Add Platform Stat" to create your first one.
                </div>
              ) : (
                <div className="space-y-4">
                  {platformStats.map((stat) => (
                    <div key={stat._id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{stat.icon}</span>
                          <h3 className="font-semibold">{stat.platform}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <Link href={`/admin/stats/platform/${stat._id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeletePlatformStat(stat._id)}
                            disabled={isDeleting === stat._id}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {stat.stats.map((s, idx) => (
                          <div key={idx} className="bg-muted rounded p-2 text-sm">
                            <p className="text-muted-foreground">{s.label}</p>
                            <p className="font-semibold">{s.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
