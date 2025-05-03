import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { getCollection } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "12");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    const photosCollection = await getCollection("photos");
    
    let query: any = { published: true };
    if (category && category !== "All") {
      query = { ...query, category };
    }

    const photos = await photosCollection
      .find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await photosCollection.countDocuments(query);

    return NextResponse.json({
      photos,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching photos:", error);
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const caption = formData.get("caption") as string;
    const category = formData.get("category") as string;
    const file = formData.get("file") as File;
    
    if (!title || !caption || !category || !file) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;
    
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        dataURI,
        {
          folder: "portfolio/photos",
          resource_type: "image",
        },
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    const photosCollection = await getCollection("photos");
    
    const newPhoto = {
      title,
      caption,
      category,
      imageUrl: (result as any).secure_url,
      date: new Date(),
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await photosCollection.insertOne(newPhoto);

    return NextResponse.json(newPhoto, { status: 201 });
  } catch (error) {
    console.error("Error uploading photo:", error);
    return NextResponse.json(
      { error: "Failed to upload photo" },
      { status: 500 }
    );
  }
} 