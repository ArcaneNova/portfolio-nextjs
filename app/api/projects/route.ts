import { NextRequest, NextResponse } from "next/server"
import { connect } from "@/lib/db"
import { getCollection, ObjectId } from "@/lib/db"
import ProjectModel from "@/lib/models/project"
import { uploadImage } from "@/lib/cloudinary"
import { requireAuth } from "@/lib/middleware"

export async function GET(req: NextRequest) {
  try {
    await connect()

    const searchParams = req.nextUrl.searchParams
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const limit = parseInt(searchParams.get("limit") || "10")
    const page = parseInt(searchParams.get("page") || "1")
    const skip = (page - 1) * limit

    // Build query
    let query: any = {}
    if (category && category.toLowerCase() !== "all") {
      query.category = category
    }
    if (featured === "true") {
      query.featured = true
    }

    const projects = await ProjectModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await ProjectModel.countDocuments(query)

    return NextResponse.json({
      projects,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
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
    await connect()

    const formData = await req.formData()
    
    const title = formData.get("title")
    const description = formData.get("description")
    const github = formData.get("github")
    const demo = formData.get("demo")
    const category = formData.get("category")
    const details = formData.get("details")
    const featured = formData.get("featured") === "true"
    
    // Validate required fields
    if (
      typeof title !== "string" || !title.trim() ||
      typeof description !== "string" || !description.trim() ||
      typeof category !== "string" || !category.trim()
    ) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      )
    }
    
    const tags = (() => {
      try {
        const tagsStr = formData.get("tags")
        return typeof tagsStr === "string" ? JSON.parse(tagsStr) : []
      } catch {
        return []
      }
    })()
    
    // Handle image upload
    const imageFile = formData.get("image")
    
    if (!(imageFile instanceof File)) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      )
    }

    // Upload image to Cloudinary
    const buffer = Buffer.from(await imageFile.arrayBuffer())
    const uploadResult = await uploadImage({
      buffer,
      filename: imageFile.name,
    })
    
    const newProject = await ProjectModel.create({
      title,
      description,
      image: (uploadResult as any).secure_url,
      tags,
      featured,
      github,
      demo,
      category,
      details,
    })

    return NextResponse.json(newProject, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
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

    const { id, ...updateData } = await req.json()
    
    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      )
    }

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    )

    if (!updatedProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
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

    const { id } = await req.json()
    
    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      )
    }

    const deletedProject = await ProjectModel.findByIdAndDelete(id)

    if (!deletedProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: true, message: "Project deleted successfully" }
    )
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    )
  }
}
