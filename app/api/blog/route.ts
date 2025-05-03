import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import BlogPost from "@/lib/models/blog";

export async function GET(req: NextRequest) {
  try {
    await connect();

    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    let query: any = { published: true };
    if (category && category !== "All") {
      query = { ...query, category };
    }

    const posts = await BlogPost.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await BlogPost.countDocuments(query);

    return NextResponse.json({
      posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connect();

    const body = await req.json();
    const { title, content, excerpt, category, imageUrl, author, tags } = body;

    // Create a slug from the title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");

    // Check if slug already exists
    const existingPost = await BlogPost.findOne({ slug });
    
    // If slug exists, append a unique identifier
    const finalSlug = existingPost
      ? `${slug}-${Date.now().toString().slice(-4)}`
      : slug;

    const newPost = await BlogPost.create({
      title,
      content,
      excerpt,
      slug: finalSlug,
      category,
      imageUrl,
      author,
      tags: tags || [],
      published: true,
      date: new Date(),
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
} 