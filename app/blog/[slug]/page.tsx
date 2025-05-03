import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";

import { Button } from "@/components/ui/button";

interface BlogPostParams {
  params: {
    slug: string;
  };
}

async function getBlogPost(slug: string) {
  // This would be replaced with a MongoDB query
  const posts = [
    {
      id: "1",
      title: "Getting Started with Next.js",
      content: `
        <p>Next.js is a powerful React framework that makes building web applications simple and efficient. In this article, we'll explore the fundamentals of Next.js and how to get started with it.</p>
        
        <h2>What is Next.js?</h2>
        <p>Next.js is a React framework that enables functionality such as server-side rendering, static site generation, and API routes. It's designed to enhance your development experience and optimize your application's performance.</p>
        
        <h2>Setting Up a Next.js Project</h2>
        <p>To create a new Next.js project, you can use the create-next-app command:</p>
        <pre><code>npx create-next-app my-next-app</code></pre>
        
        <h2>Key Features</h2>
        <ul>
          <li><strong>Server-side Rendering (SSR)</strong>: Renders pages on the server, improving SEO and initial load performance.</li>
          <li><strong>Static Site Generation (SSG)</strong>: Pre-renders pages at build time for blazing fast loading.</li>
          <li><strong>API Routes</strong>: Create API endpoints right within your Next.js application.</li>
          <li><strong>File-based Routing</strong>: Create routes based on your file structure in the pages directory.</li>
        </ul>
      `,
      category: "Web Development",
      date: "2023-05-15",
      author: "Md Arshad Noor",
      imageUrl: "/placeholder.jpg",
      slug: "getting-started-with-nextjs",
    },
    {
      id: "2",
      title: "Introduction to Machine Learning",
      content: `
        <p>Machine Learning is transforming industries across the globe. This introductory guide will help you understand the basics of machine learning and its applications.</p>
        
        <h2>What is Machine Learning?</h2>
        <p>Machine Learning is a subset of artificial intelligence that gives systems the ability to learn and improve from experience without being explicitly programmed.</p>
        
        <h2>Types of Machine Learning</h2>
        <ul>
          <li><strong>Supervised Learning</strong>: The algorithm learns from labeled training data.</li>
          <li><strong>Unsupervised Learning</strong>: The algorithm finds patterns in unlabeled data.</li>
          <li><strong>Reinforcement Learning</strong>: The algorithm learns by interacting with an environment.</li>
        </ul>
        
        <h2>Common Machine Learning Algorithms</h2>
        <ul>
          <li>Linear Regression</li>
          <li>Logistic Regression</li>
          <li>Decision Trees</li>
          <li>Random Forest</li>
          <li>Support Vector Machines</li>
          <li>Neural Networks</li>
        </ul>
      `,
      category: "Machine Learning",
      date: "2023-06-22",
      author: "Md Arshad Noor",
      imageUrl: "/placeholder.jpg",
      slug: "introduction-to-machine-learning",
    },
  ];
  
  const post = posts.find(post => post.slug === slug);
  
  if (!post) {
    return null;
  }
  
  return post;
}

export async function generateMetadata({ params }: BlogPostParams) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: "Not Found",
      description: "The page you're looking for doesn't exist.",
    };
  }
  
  return {
    title: `${post.title} | Md Arshad Noor's Blog`,
    description: post.content.substring(0, 160).replace(/<[^>]*>/g, ''),
  };
}

export default async function BlogPostPage({ params }: BlogPostParams) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <main className="container mx-auto py-24 px-4">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/blog" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </Button>
      
      <article className="prose prose-lg dark:prose-invert mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        
        <div className="flex items-center gap-6 mb-8 text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            {post.category}
          </span>
        </div>
        
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image 
            src={post.imageUrl} 
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </main>
  );
} 