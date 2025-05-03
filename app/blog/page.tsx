import { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Blog | Md Arshad Noor",
  description: "Read articles about web development, app development, machine learning, and more.",
};

async function getBlogPosts() {
  // This is just placeholder data - will be replaced with MongoDB data
  return [
    {
      id: "1",
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build modern web applications with Next.js",
      category: "Web Development",
      date: "2023-05-15",
      imageUrl: "/placeholder.jpg",
      slug: "getting-started-with-nextjs",
    },
    {
      id: "2",
      title: "Introduction to Machine Learning",
      excerpt: "A beginner's guide to understanding machine learning concepts",
      category: "Machine Learning",
      date: "2023-06-22",
      imageUrl: "/placeholder.jpg",
      slug: "introduction-to-machine-learning",
    },
    {
      id: "3",
      title: "Building Mobile Apps with React Native",
      excerpt: "Create cross-platform mobile applications easily",
      category: "App Development",
      date: "2023-07-10",
      imageUrl: "/placeholder.jpg",
      slug: "building-apps-with-react-native",
    },
  ];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();
  
  const categories = ["All", "Web Development", "Machine Learning", "App Development"];

  return (
    <main className="container mx-auto py-24 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">My Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Thoughts, ideas, and knowledge sharing on web development, machine learning, and more.
        </p>
      </div>

      <Tabs defaultValue="All" className="w-full max-w-4xl mx-auto mb-12">
        <TabsList className="grid grid-cols-4 mb-8">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts
              .filter(post => category === "All" || post.category === category)
              .map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/blog/${post.slug}`}>Read More</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
} 