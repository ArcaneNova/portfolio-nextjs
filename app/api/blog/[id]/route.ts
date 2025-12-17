import { NextRequest, NextResponse } from "next/server"
import { connect } from "@/lib/db"
import BlogPost from "@/lib/models/blog"
import { requireAuth } from "@/lib/middleware"

interface Params {
  id: string
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    await connect()
    const { id } = await params

    const post = await BlogPost.findById(id).lean()

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
  const auth = await requireAuth(req)
  if (!auth.valid) {
    return NextResponse.json(
      { error: auth.error || "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    await connect()
    const { id } = await params
    const body = await req.json()

    // Prevent slug changes to avoid breaking URLs
    if (body.slug) {
      delete body.slug
    }

    const post = await BlogPost.findByIdAndUpdate(id, body, { new: true }).lean()

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  // Check authentication first
  const auth = await requireAuth(req)
  if (!auth.valid) {
    return NextResponse.json(
      { error: auth.error || "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    await connect()
    
    const { id } = await params

    const result = await BlogPost.findByIdAndDelete(id)

    if (!result) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully"
    })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    )
  }
}
