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
    
    const challenge = await ChallengeModel.findById(id).lean();
    
    if (!challenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ updates: challenge.updates || [] });
  } catch (error) {
    console.error("Error fetching challenge updates:", error);
    return NextResponse.json(
      { error: "Failed to fetch challenge updates" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
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
    
    const challenge = await ChallengeModel.findById(id);
    
    if (!challenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }
    
    const formData = await req.formData();
    
    const day = parseInt(formData.get("day") as string);
    const topic = formData.get("topic") as string;
    const description = formData.get("description") as string;
    const date = formData.get("date") as string;
    const imageFile = formData.get("image") as File | null;
    
    if (!day || !topic || !description || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    let imageUrl;
    
    if (imageFile) {
      // Upload image to Cloudinary
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadResult = await uploadImage({
        buffer,
        filename: imageFile.name,
      });
      
      imageUrl = (uploadResult as any).secure_url;
    }
    
    const newUpdate = {
      day,
      topic,
      description,
      date,
      imageUrl,
    };
    
    // Add new update to the updates array
    challenge.updates = [...(challenge.updates || []), newUpdate];
    
    // Check if this is the latest update
    if (day > challenge.currentDay) {
      challenge.currentDay = day;
      challenge.latestUpdate = newUpdate;
    }
    
    await challenge.save();
    
    return NextResponse.json({
      success: true,
      update: newUpdate,
      message: "Challenge update added successfully"
    }, { status: 201 });
  } catch (error) {
    console.error("Error adding challenge update:", error);
    return NextResponse.json(
      { error: "Failed to add challenge update" },
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
    const { updateDay } = await req.json();
    
    if (!updateDay) {
      return NextResponse.json(
        { error: "Update day is required" },
        { status: 400 }
      );
    }
    
    const challenge = await ChallengeModel.findById(id);
    
    if (!challenge) {
      return NextResponse.json(
        { error: "Challenge not found" },
        { status: 404 }
      );
    }
    
    // Filter out the update with the given day
    const updatedUpdates = challenge.updates?.filter((update: any) => update.day !== updateDay) || [];
    challenge.updates = updatedUpdates;
    
    // If we removed the latest update, find new latest update
    if (challenge.currentDay === updateDay) {
      if (updatedUpdates.length > 0) {
        const newLatest = updatedUpdates.reduce((prev: any, current: any) => 
          (prev.day > current.day) ? prev : current
        );
        challenge.currentDay = newLatest.day;
        challenge.latestUpdate = newLatest;
      } else {
        challenge.currentDay = 0;
        challenge.latestUpdate = undefined;
      }
    }
    
    await challenge.save();
    
    return NextResponse.json({
      success: true,
      message: "Challenge update deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting challenge update:", error);
    return NextResponse.json(
      { error: "Failed to delete challenge update" },
      { status: 500 }
    );
  }
} 