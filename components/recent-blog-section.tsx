import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { connect } from "@/lib/db";
import BlogPost from "@/lib/models/blog";

interface BlogPostType {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  slug: string;
  published: boolean;
  author: string;
}

async function getRecentBlogPosts(): Promise<BlogPostType[]> {
  try {
    await connect();
    
    const posts = await BlogPost.find({ published: true })
      .sort({ date: -1 })
      .limit(3)
      .lean()
      .exec();
    
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error("Error fetching recent blog posts:", error);
    return [];
  }
}

export default async function RecentBlogSection() {
  const posts = await getRecentBlogPosts();

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Latest Blog Posts</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read my latest articles about web development, machine learning, and technology insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`}>
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
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
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })} · By {post.author || "Admin"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="p-0">
                    Read More →
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/blog">View All Blog Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
