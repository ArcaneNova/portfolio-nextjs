import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Launch from "@/lib/models/launch";

export async function GET() {
  try {
    await connectToDB();
    const launches = await Launch.find({})
      .sort({ featured: -1, launchDate: -1 }) // Sort by featured first, then by most recent
      .limit(6); // Limit to 6 recent launches
    
    // Transform the data to include all fields including status
    const transformedLaunches = launches.map((launch: any) => ({
      id: launch._id.toString(),
      title: launch.title,
      description: launch.description,
      imageUrl: launch.imageUrl,
      launchDate: launch.launchDate,
      projectUrl: launch.projectUrl,
      tags: launch.tags,
      featured: launch.featured,
      status: launch.status || "Launching Soon",
      createdAt: launch.createdAt,
      updatedAt: launch.updatedAt
    }));
    
    return NextResponse.json(transformedLaunches);
  } catch (error) {
    console.error("Error fetching launches:", error);
    return NextResponse.json({ error: "Failed to fetch launches" }, { status: 500 });
  }
}
