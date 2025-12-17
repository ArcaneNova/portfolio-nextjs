import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, ChevronRight } from "lucide-react"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { connect } from "@/lib/db"
import BlogPost from "@/lib/models/blog"

// Blog content styles - injected into the page
const blogContentStyles = `
  .blog-content article > * + * {
    margin-top: 1.5rem;
  }
  
  .blog-content h1 {
    font-size: 2.25rem;
    font-weight: 900;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }
  
  .blog-content h2 {
    font-size: 1.875rem;
    font-weight: 800;
    margin-top: 2rem;
    margin-bottom: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 255, 255, 0.1);
    line-height: 1.25;
  }
  
  .blog-content h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    line-height: 1.3;
    color: #00ffff;
  }
  
  .blog-content h4 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
    line-height: 1.35;
  }
  
  .blog-content h5 {
    font-size: 1.125rem;
    font-weight: 700;
    margin-top: 1rem;
    margin-bottom: 0.75rem;
    line-height: 1.4;
  }
  
  .blog-content h6 {
    font-size: 1rem;
    font-weight: 700;
    margin-top: 0.75rem;
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
  
  .blog-content p {
    font-size: 1.125rem;
    line-height: 1.875;
    margin: 1rem 0;
    color: rgba(255, 255, 255, 0.85);
  }
  
  .blog-content ul,
  .blog-content ol {
    margin: 1.5rem 0;
    padding-left: 2rem;
  }
  
  .blog-content li {
    font-size: 1.125rem;
    line-height: 1.875;
    margin: 0.75rem 0;
  }
  
  .blog-content li > p {
    margin: 0.25rem 0;
  }
  
  .blog-content blockquote {
    border-left: 4px solid #00ffff;
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    line-height: 1.875;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .blog-content code {
    background-color: rgba(100, 116, 139, 0.6);
    color: #00ffff;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-family: "Monaco", "Courier New", monospace;
    border: 1px solid rgba(0, 255, 255, 0.2);
  }
  
  .blog-content pre {
    background-color: rgba(24, 24, 24, 0.8);
    border: 1px solid rgba(0, 255, 255, 0.2);
    border-radius: 0.75rem;
    padding: 1.5rem;
    overflow-x: auto;
    margin: 2rem 0;
  }
  
  .blog-content pre code {
    background-color: transparent;
    color: #e0e0e0;
    padding: 0;
    border: none;
    font-size: 0.875rem;
  }
  
  .blog-content img {
    max-width: 100%;
    height: auto;
    margin: 2rem 0;
    border-radius: 0.75rem;
    border: 1px solid rgba(0, 255, 255, 0.1);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
  
  .blog-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
  }
  
  .blog-content thead {
    background-color: rgba(24, 24, 24, 0.4);
    border-bottom: 1px solid rgba(0, 255, 255, 0.2);
  }
  
  .blog-content th {
    padding: 1rem 1.5rem;
    text-align: left;
    font-weight: 700;
    color: #00ffff;
  }
  
  .blog-content td {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid rgba(0, 255, 255, 0.1);
  }
  
  .blog-content a {
    color: #00ffff;
    font-weight: 600;
    text-decoration: none;
  }
  
  .blog-content a:hover {
    text-decoration: underline;
    text-decoration-offset: 2px;
  }
  
  .blog-content strong {
    font-weight: 700;
    color: #ffffff;
  }
  
  .blog-content em {
    font-style: italic;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .blog-content hr {
    margin: 3rem 0;
    border: none;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(0, 255, 255, 0.2), transparent);
  }
`

interface BlogPostParams {
  params: Promise<{
    slug: string
  }>
}

interface BlogPostType {
  _id: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  imageUrl?: string
  slug: string
  published: boolean
  author: string
  tags?: string[]
}

async function getBlogPost(slug: string): Promise<BlogPostType | null> {
  try {
    await connect()
    const post = await BlogPost.findOne({ slug, published: true })
      .lean()
      .exec()

    if (!post) return null
    return JSON.parse(JSON.stringify(post))
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

async function getRelatedPosts(category: string, currentSlug: string, limit: number = 3): Promise<BlogPostType[]> {
  try {
    await connect()
    const posts = await BlogPost.find({
      category,
      published: true,
      slug: { $ne: currentSlug },
    })
      .sort({ date: -1 })
      .limit(limit)
      .lean()
      .exec()

    return JSON.parse(JSON.stringify(posts))
  } catch (error) {
    console.error("Error fetching related posts:", error)
    return []
  }
}

function extractHeadings(html: string): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /<h([1-3])>(.*?)<\/h\1>/g
  const headings: Array<{ id: string; text: string; level: number }> = []
  let match

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1])
    const text = match[2].replace(/<[^>]*>/g, "")
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")

    headings.push({ id, text, level })
  }

  return headings
}

export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return { title: "Blog Post Not Found" }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [{ url: post.imageUrl }] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostParams) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.category, slug)
  const headings = extractHeadings(post.content)

  return (
    <>
      <style>{blogContentStyles}</style>
      <main className="min-h-screen bg-gradient-to-b from-background via-ai-slate/5 to-background">
      {/* Navigation Header */}
      <div className="sticky top-0 z-40 border-b border-ai-cyan/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ai-cyan transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-6">
            {/* Category & Tags */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-ai-cyan/10 text-ai-cyan border border-ai-cyan/30 hover:bg-ai-cyan/20">
                {post.category}
              </Badge>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-ai-cyan/20 text-foreground/70">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-ai-cyan via-ai-purple to-ai-blue bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-ai-cyan/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ai-cyan/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-ai-cyan" />
                </div>
                <div>
                  <p className="text-sm font-medium">{post.author || "Admin"}</p>
                  <p className="text-xs text-muted-foreground">Author</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-ai-cyan" />
                <div>
                  <p className="text-sm font-medium">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">Published</p>
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-xl text-foreground/80 leading-relaxed font-light">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.imageUrl && (
        <section className="relative mb-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden border border-ai-cyan/10 shadow-2xl">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <article
            className="blog-content prose prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:leading-tight
              prose-h1:text-6xl prose-h1:mt-20 prose-h1:mb-10 prose-h1:leading-tight prose-h1:font-black
              prose-h2:text-5xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:pt-12 prose-h2:border-t prose-h2:border-ai-cyan/20 prose-h2:leading-tight
              prose-h3:text-4xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-ai-cyan prose-h3:leading-tight
              prose-h4:text-3xl prose-h4:mt-10 prose-h4:mb-5 prose-h4:leading-snug
              prose-h5:text-2xl prose-h5:mt-8 prose-h5:mb-4
              prose-h6:text-xl prose-h6:mt-6 prose-h6:mb-3
              prose-p:text-lg prose-p:leading-8 prose-p:mb-6 prose-p:text-foreground/85
              prose-a:text-ai-cyan prose-a:font-semibold prose-a:no-underline hover:prose-a:underline hover:prose-a:underline-offset-2
              prose-strong:font-bold prose-strong:text-foreground
              prose-em:italic prose-em:text-foreground/90
              prose-code:bg-ai-slate/60 prose-code:text-ai-cyan prose-code:px-3 prose-code:py-1.5 prose-code:rounded-lg prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-ai-cyan/20
              prose-pre:bg-ai-slate/40 prose-pre:border prose-pre:border-ai-cyan/20 prose-pre:rounded-xl prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:text-sm prose-pre:my-8
              prose-pre:code:bg-transparent prose-pre:code:text-inherit prose-pre:code:px-0 prose-pre:code:py-0 prose-pre:code:border-0
              prose-blockquote:border-l-4 prose-blockquote:border-ai-cyan prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:my-10 prose-blockquote:text-lg prose-blockquote:text-foreground/80 prose-blockquote:leading-8
              prose-ul:space-y-4 prose-ul:my-8 prose-ul:pl-4
              prose-ol:space-y-4 prose-ol:my-8 prose-ol:pl-4
              prose-li:text-lg prose-li:leading-8 prose-li:marker:text-ai-cyan prose-li:py-1
              prose-img:rounded-xl prose-img:my-12 prose-img:shadow-2xl prose-img:border prose-img:border-ai-cyan/10
              prose-table:my-10 prose-table:border-collapse prose-table:w-full
              prose-thead:bg-ai-slate/40 prose-thead:border-b prose-thead:border-ai-cyan/20
              prose-th:text-left prose-th:py-4 prose-th:px-6 prose-th:font-bold prose-th:text-ai-cyan
              prose-td:py-4 prose-td:px-6 prose-td:border-b prose-td:border-ai-cyan/10
              prose-hr:my-14 prose-hr:border-ai-cyan/20
              [&>*+*]:mt-6
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="h-px bg-gradient-to-r from-transparent via-ai-cyan/20 to-transparent my-16" />
      </div>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="bg-gradient-to-br from-ai-slate/30 to-ai-zinc/30 border border-ai-cyan/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Enjoyed this article?</h3>
            <p className="text-lg text-foreground/70 mb-8">
              Share your thoughts or explore more articles on the blog. I'm always interested in discussing ideas and experiences!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-ai-cyan hover:bg-ai-cyan/90 text-black font-semibold">
                <Link href="/blog" className="inline-flex items-center gap-2">
                  Read More Articles
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-ai-cyan/30 hover:bg-ai-cyan/10">
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-ai-cyan via-ai-purple to-ai-blue bg-clip-text text-transparent">
                  Related Articles
                </span>
              </h2>
              <p className="text-lg text-foreground/60">Explore more stories and insights</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost._id}>
                  <Link href={`/blog/${relatedPost.slug}`} className="group">
                    <div className="bg-gradient-to-br from-ai-slate/50 to-ai-zinc/50 border border-ai-cyan/10 hover:border-ai-cyan/30 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                      {relatedPost.imageUrl && (
                        <div className="relative h-48 overflow-hidden bg-ai-slate/30">
                          <Image
                            src={relatedPost.imageUrl}
                            alt={relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6 flex-1 flex flex-col">
                        <Badge className="w-fit bg-ai-cyan/10 text-ai-cyan border-ai-cyan/30 mb-3">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-ai-cyan transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-foreground/60 mb-4 flex-1 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-foreground/50">
                          <Calendar className="w-3 h-3" />
                          {new Date(relatedPost.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="py-16 md:py-20 border-t border-ai-cyan/10">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-lg text-foreground/70 mb-8">
            Get notified when I publish new articles and insights
          </p>
          <Button asChild className="bg-gradient-to-r from-ai-cyan to-ai-purple hover:opacity-90">
            <Link href="/">Explore More</Link>
          </Button>
        </div>
      </section>
      </main>
    </>
  )
}