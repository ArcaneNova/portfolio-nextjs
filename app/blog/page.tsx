import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { connect } from "@/lib/db"
import BlogPost from "@/lib/models/blog"

export const metadata: Metadata = {
  title: "Blog | Md Arshad Noor",
  description: "Read articles about web development, app development, machine learning, and more.",
}

interface BlogPostType {
  _id: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  imageUrl: string
  slug: string
  published: boolean
  author: string
  tags?: string[]
}

async function getBlogPosts(): Promise<BlogPostType[]> {
  try {
    await connect()

    const posts = await BlogPost.find({ published: true })
      .sort({ date: -1 })
      .lean()
      .exec()

    return JSON.parse(JSON.stringify(posts))
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

async function getCategories(): Promise<string[]> {
  try {
    await connect()

    const posts = await BlogPost.find({ published: true })
      .select("category")
      .lean()
      .exec()

    const categories = Array.from(new Set(posts.map((post) => post.category)))
    return categories.filter(Boolean) as string[]
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  const categories = await getCategories()
  const allCategories = ["All", ...categories]

  if (posts.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-muted-foreground mb-8">No blog posts yet. Check back soon!</p>
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="border-b py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Thoughts, ideas, and knowledge sharing on web development, machine learning, and technology.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="All" className="w-full">
            {/* Category Tabs */}
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-8">
              {allCategories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-sm">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Category Content */}
            {allCategories.map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {posts
                    .filter((post) => (category === "All" ? true : post.category === category))
                    .map((post) => (
                      <Link key={post._id} href={`/blog/${post.slug}`}>
                        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
                          {post.imageUrl && (
                            <div className="relative h-48 w-full overflow-hidden bg-muted">
                              <Image
                                src={post.imageUrl}
                                alt={post.title}
                                fill
                                className="object-cover hover:scale-105 transition-transform"
                              />
                            </div>
                          )}
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="secondary" className="text-xs">
                                {post.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(post.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
                            <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                          </CardHeader>
                          {post.tags && post.tags.length > 0 && (
                            <CardContent className="pt-0">
                              <div className="flex flex-wrap gap-2">
                                {post.tags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          )}
                          <CardFooter className="mt-auto">
                            <Button variant="ghost" className="w-full justify-start p-0">
                              Read More →
                            </Button>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </main>
  )
}
