import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import BlogPost from "@/lib/models/blog";
import { requireAuth } from "@/lib/middleware";

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
  // Check authentication first
  const auth = await requireAuth(req)
  if (!auth.valid) {
    return NextResponse.json(
      { error: auth.error || "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    await connect();

    const body = await req.json();
    const { title, content, excerpt, slug, category, imageUrl, author, tags, published, date } = body;

    // Validate required fields
    if (
      typeof title !== "string" || !title.trim() ||
      typeof content !== "string" || !content.trim() ||
      typeof excerpt !== "string" || !excerpt.trim() ||
      typeof slug !== "string" || !slug.trim() ||
      typeof category !== "string" || !category.trim() ||
      typeof imageUrl !== "string" || !imageUrl.trim()
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPost = await BlogPost.findOne({ slug });
    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    const newPost = await BlogPost.create({
      title,
      content,
      excerpt,
      slug,
      category,
      imageUrl,
      author,
      tags: Array.isArray(tags) ? tags : [],
      published: typeof published === "boolean" ? published : false,
      date: date ? new Date(date) : new Date(),
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