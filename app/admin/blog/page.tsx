import { connect } from "@/lib/db"
import BlogPost from "@/lib/models/blog"
import { BlogClient } from "@/components/admin/blog-client"

interface BlogPost {
  _id?: string
  title: string
  content: string
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

async function getBlogPosts() {
  try {
    await connect()
    const posts = await BlogPost.find({}).sort({ date: -1 }).lean()
    return JSON.parse(JSON.stringify(posts))
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return <BlogClient posts={posts} />
} 