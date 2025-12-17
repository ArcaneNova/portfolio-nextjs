# Quick Integration Snippets

Copy and paste these snippets directly into your files.

## 1. Add to Home Page (app/page.tsx)

```typescript
// At the top with other imports
import { ExperienceTimeline } from "@/components/experience-timeline";
import { GitHubDashboard } from "@/components/github-dashboard";
import { workExperienceData } from "@/lib/example-data";

// In your JSX, add these sections:

{/* Experience Section */}
<ExperienceTimeline experiences={workExperienceData} />

{/* GitHub Open Source Section */}
<GitHubDashboard />
```

## 2. Blog Listing Page (app/blog/page.tsx)

```typescript
"use client";

import { useEffect, useState } from "react";
import { BlogPostCard } from "@/components/blog-post-card";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  imageUrl: string;
  readTime: number;
  views: number;
  likes: number;
  date: Date;
  tags: string[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setPosts(data.blogs || []);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">Technical Articles</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <BlogPostCard 
              key={post._id} 
              post={post} 
              featured={index === 0 && posts.length > 1}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
```

## 3. Blog Post Detail Page (app/blog/[slug]/page.tsx)

```typescript
import { NextSeo } from "next-seo";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  category: string;
  imageUrl: string;
  readTime: number;
  views: number;
  seoDescription?: string;
  seoKeywords?: string[];
}

async function getBlogPost(slug: string): Promise<BlogPost> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog?slug=${slug}`);
  if (!res.ok) throw new Error("Post not found");
  const data = await res.json();
  return data.blog;
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  return (
    <>
      <NextSeo
        title={post.title}
        description={post.seoDescription || post.excerpt}
        canonical={`https://arshadnoor.me/blog/${post.slug}`}
        openGraph={{
          url: `https://arshadnoor.me/blog/${post.slug}`,
          title: post.title,
          description: post.excerpt,
          type: "article",
          images: [
            {
              url: post.imageUrl,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: post.seoKeywords?.join(", ") || "",
          },
          {
            name: "author",
            content: "Md Arshad Noor",
          },
          {
            name: "article:published_time",
            content: new Date().toISOString(),
          },
        ]}
      />

      <main className="min-h-screen bg-background py-20">
        <article className="container mx-auto px-4 max-w-3xl">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />

          <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-4 mb-8 text-muted-foreground">
            <span>⏱️ {post.readTime} min read</span>
            <span>👁️ {post.views} views</span>
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>

          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}
```

## 4. Project Case Study Page (app/projects/[slug]/page.tsx)

```typescript
import { ProjectCaseStudyTemplate } from "@/components/project-case-study";
import { exampleCaseStudy } from "@/lib/example-data";

async function getCaseStudy(slug: string) {
  // Replace with your actual data fetching
  return exampleCaseStudy;
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const caseStudy = await getCaseStudy(params.slug);

  return <ProjectCaseStudyTemplate caseStudy={caseStudy} />;
}
```

## 5. Update Layout for SEO (app/layout.tsx)

```typescript
import { DefaultSeo } from "next-seo";
import { seoConfig } from "@/lib/seo-config";

export const metadata = {
  title: "Md Arshad Noor - Full Stack Developer",
  description: "Portfolio of a full-stack developer specializing in modern web technologies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <DefaultSeo {...seoConfig} />
        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Md Arshad Noor",
              url: "https://arshadnoor.me",
              jobTitle: "Full Stack Developer",
              sameAs: [
                "https://github.com/ArcaneNova",
                "https://linkedin.com/in/arshadnoor",
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## 6. API Route for Blog with Read Time (app/api/blog/route.ts)

```typescript
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import BlogModel from "@/lib/models/blog";
import { calculateReadTime } from "@/lib/blog-utils";

export async function GET(req: NextRequest) {
  try {
    await connect();

    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get("slug");
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");

    if (slug) {
      // Get single post
      const post = await BlogModel.findOne({ slug, published: true });
      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }

      // Update read time if not already calculated
      if (!post.readTime) {
        post.readTime = calculateReadTime(post.content);
        await post.save();
      }

      return NextResponse.json({ blog: post });
    } else {
      // Get all posts
      const skip = (page - 1) * limit;
      const posts = await BlogModel.find({ published: true })
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      // Calculate read time for each
      const enrichedPosts = posts.map((post) => ({
        ...post,
        readTime: post.readTime || calculateReadTime(post.content),
      }));

      const total = await BlogModel.countDocuments({ published: true });

      return NextResponse.json({
        blogs: enrichedPosts,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
```

## 7. Update Blog Creation API (app/api/blog/route.ts)

```typescript
export async function POST(req: NextRequest) {
  // ... existing auth check ...

  try {
    // ... existing validation ...

    // Calculate read time automatically
    const readTime = calculateReadTime(content);

    const newBlog = await BlogModel.create({
      title,
      content,
      excerpt: extractExcerpt(content),
      slug: generateSlug(title),
      author,
      category,
      imageUrl,
      readTime, // ← Add this
      published: true,
      views: 0,
      likes: 0,
      tags: tags || [],
      seoDescription: seoDescription || extractExcerpt(content, 160),
      seoKeywords: seoKeywords || [],
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
```

## 8. Update Blog Model (lib/models/blog.ts)

```typescript
import mongoose, { Schema } from "mongoose";

interface BlogPost {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  author: string;
  category: string;
  imageUrl: string;
  date: Date;
  published: boolean;
  tags: string[];
  readTime: number;
  views: number;
  likes: number;
  relatedPosts: string[];
  seoDescription?: string;
  seoKeywords?: string[];
  tableOfContents?: Array<{
    level: number;
    text: string;
    id: string;
  }>;
}

const blogSchema = new Schema<BlogPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    date: { type: Date, default: Date.now },
    published: { type: Boolean, default: false },
    tags: [{ type: String }],
    readTime: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    relatedPosts: [{ type: String }],
    seoDescription: { type: String },
    seoKeywords: [{ type: String }],
    tableOfContents: [
      {
        level: Number,
        text: String,
        id: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.BlogPost ||
  mongoose.model<BlogPost>("BlogPost", blogSchema);
```

---

## Installation Command

```bash
pnpm add next-seo
```

---

That's it! Copy these snippets into your corresponding files and you'll have all 5 features fully integrated.
