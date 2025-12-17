import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db";

interface JourneyItem {
  _id?: string;
  year: string;
  title: string;
  description: string;
  achievement: string;
  color: string;
  icon: string;
  image: string;
  order: number;
}

export async function GET(req: NextRequest) {
  try {
    const journeyCollection = await getCollection("journey");
    
    const journeyItems = await journeyCollection
      .find({})
      .sort({ order: 1, year: 1 })
      .toArray();

    return NextResponse.json({
      journey: journeyItems,
    });
  } catch (error) {
    console.error("Error fetching journey:", error);
    return NextResponse.json(
      { error: "Failed to fetch journey" },
      { status: 500 }
    );
  }
}
