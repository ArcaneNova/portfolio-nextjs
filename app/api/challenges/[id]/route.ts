import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import ChallengeModel from "@/lib/models/challenge";
import { uploadImage } from "@/lib/cloudinary";
import { requireAuth } from "@/lib/middleware";

interface Params {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    await connect();
    
    const { id } = await params;
    console.log(`API: Attempting to fetch challenge with ID: ${id}`);
    
    let challenge;
    try {
      challenge = await ChallengeModel.findById(id).lean();
    } catch (idError) {
      console.error("API: MongoDB ID validation error:", idError);
      // Try alternate fetch method if ID format is an issue
      challenge = await ChallengeModel.findOne({ _id: id }).lean();
    }
    
    if (!challenge) {
      console.log("API: Challenge not found in database");
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }
    
    console.log("API: Challenge found:", challenge.title);
    return NextResponse.json(challenge);
  } catch (error) {
    console.error("API: Error fetching challenge:", error);
    return NextResponse.json(
      { error: "Failed to fetch challenge", details: String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    await connect();
    
    const { id } = await params;
    const formData = await req.formData();
    
    const challenge = await ChallengeModel.findById(id);
    
    if (!challenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }
    
    // Process fields
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const startDate = formData.get("startDate") as string;
    const totalDays = parseInt(formData.get("totalDays") as string);
    const imageFile = formData.get("image") as File | null;
    
    if (title) challenge.title = title;
    if (description) challenge.description = description;
    if (startDate) challenge.startDate = startDate;
    if (totalDays) challenge.totalDays = totalDays;
    
    // Handle image upload if a new one is provided
    if (imageFile) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadResult = await uploadImage({
        buffer,
        filename: imageFile.name,
      });
      
      challenge.image = (uploadResult as any).secure_url;
    }
    
    await challenge.save();
    
    return NextResponse.json({
      success: true,
      challenge,
      message: "Challenge updated successfully"
    });
  } catch (error) {
    console.error("Error updating challenge:", error);
    return NextResponse.json(
      { error: "Failed to update challenge" },
      { status: 500 }
    );
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
    await connect();
    
    const { id } = await params;
    
    const result = await ChallengeModel.findByIdAndDelete(id);
    
    if (!result) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Challenge deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting challenge:", error);
    return NextResponse.json(
      { error: "Failed to delete challenge" },
      { status: 500 }
    );
  }
}
