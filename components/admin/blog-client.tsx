"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
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
import { Plus, Pencil, Eye, Trash, CheckCircle, XCircle } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

interface BlogPost {
  _id?: string
  title: string
  excerpt: string
  slug: string
  author: string
  category: string
  imageUrl: string
  date: Date
  published: boolean
  tags: string[]
  createdAt?: Date
  updatedAt?: Date
}

interface BlogClientProps {
  posts: BlogPost[]
}

export function BlogClient({ posts: initialPosts }: BlogClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
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

  const handleDelete = async (postId: string | undefined) => {
    if (!postId) return
    if (!confirm("Are you sure you want to delete this blog post?")) {
      return
    }

    try {
      setIsDeleting(postId)
      const response = await fetch(`/api/blog/${postId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete blog post")
      }

      setPosts(posts.filter((p) => p._id !== postId))
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      })
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }
  
  // Get unique categories
  const categories = [...new Set(posts.map(post => post.category))];
  const publishedPosts = posts.filter(post => post.published);
  const draftPosts = posts.filter(post => !post.published);
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>
          <p className="text-muted-foreground">
            Manage your blog content and publications
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Create New Post
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Blog Overview</CardTitle>
            <CardDescription>
              Quick stats about your blog content
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-6">
            <div className="bg-primary/10 rounded-lg p-4 min-w-[180px]">
              <div className="text-xl font-bold">{posts.length}</div>
              <div className="text-sm text-muted-foreground">Total Posts</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 min-w-[180px]">
              <div className="text-xl font-bold">{publishedPosts.length}</div>
              <div className="text-sm text-muted-foreground">Published</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 min-w-[180px]">
              <div className="text-xl font-bold">{draftPosts.length}</div>
              <div className="text-sm text-muted-foreground">Drafts</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-4 min-w-[180px]">
              <div className="text-xl font-bold">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Blog Posts</CardTitle>
            <CardDescription>
              Manage your blog posts, edit content, or adjust publication status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No blog posts found. Click "Create New Post" to write your first blog post.
                    </TableCell>
                  </TableRow>
                ) : (
                  posts.map((post) => (
                    <TableRow key={post._id}>
                      <TableCell>
                        <div className="relative h-12 w-12 rounded-md overflow-hidden">
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium max-w-xs truncate">
                        {post.title}
                        <div className="text-xs text-muted-foreground mt-1 truncate">
                          {post.excerpt}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{post.category}</Badge>
                      </TableCell>
                      <TableCell>
                        {post.published ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-yellow-500" />
                        )}
                      </TableCell>
                      <TableCell>
                        {format(new Date(post.date), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            asChild
                          >
                            <Link href={`/admin/blog/${post._id}`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            asChild
                          >
                            <Link href={`/blog/${post.slug}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="icon"
                            onClick={() => handleDelete(post._id)}
                            disabled={isDeleting === post._id}
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