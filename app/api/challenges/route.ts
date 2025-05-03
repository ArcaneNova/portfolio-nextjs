import { NextRequest, NextResponse } from "next/server"
import { connect } from "@/lib/db"
import ChallengeModel from "@/lib/models/challenge"
import { uploadImage } from "@/lib/cloudinary"

export async function GET(req: NextRequest) {
  try {
    await connect()

    const searchParams = req.nextUrl.searchParams
    const limit = parseInt(searchParams.get("limit") || "10")
    const page = parseInt(searchParams.get("page") || "1")
    const skip = (page - 1) * limit

    const challenges = await ChallengeModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await ChallengeModel.countDocuments()

    return NextResponse.json({
      challenges,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching challenges:", error)
    return NextResponse.json({ error: "Failed to fetch challenges" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connect()

    const formData = await req.formData()
    
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const startDate = formData.get("startDate") as string
    const totalDays = parseInt(formData.get("totalDays") as string)
    
    // Handle image upload
    const imageFile = formData.get("image") as File
    
    if (!title || !description || !startDate || !totalDays || !imageFile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Upload image to Cloudinary
    const buffer = Buffer.from(await imageFile.arrayBuffer())
    const uploadResult = await uploadImage({
      buffer,
      filename: imageFile.name,
    })
    
    const newChallenge = await ChallengeModel.create({
      title,
      description,
      image: (uploadResult as any).secure_url,
      startDate,
      currentDay: 0,
      totalDays,
      updates: [],
    })

    return NextResponse.json(newChallenge, { status: 201 })
  } catch (error) {
    console.error("Error creating challenge:", error)
    return NextResponse.json(
      { error: "Failed to create challenge" },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connect()

    const { id, ...updateData } = await req.json()
    
    if (!id) {
      return NextResponse.json(
        { error: "Challenge ID is required" },
        { status: 400 }
      )
    }

    const updatedChallenge = await ChallengeModel.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true }
    )

    if (!updatedChallenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedChallenge)
  } catch (error) {
    console.error("Error updating challenge:", error)
    return NextResponse.json(
      { error: "Failed to update challenge" },
      { status: 500 }
    )
  }
}
