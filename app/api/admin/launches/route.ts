import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Launch from "@/lib/models/launch";
import { auth } from "@/lib/auth"; // Assuming you have auth setup
import { uploadImage } from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    // Check authentication - uncomment and adjust based on your auth setup
    // const session = await auth();
    // if (!session?.user || session.user.role !== "admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    await connectToDB();
    
    // Check if the request is multipart/form-data
    const contentType = request.headers.get("content-type") || "";
    
    if (contentType.includes("multipart/form-data")) {
      // Handle form data with file upload
      const formData = await request.formData();
      
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const projectUrl = formData.get("projectUrl") as string;
      const launchDateStr = formData.get("launchDate") as string;
      const featured = formData.get("featured") === "true";
      const status = formData.get("status") as "Launched" | "Launching Soon";
      const tags = JSON.parse(formData.get("tags") as string || "[]");
      const imageFile = formData.get("image") as File | null;
      
      if (!title || !description || !projectUrl) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }
      
      let imageUrl = "/placeholder.jpg";
      
      // Upload image to Cloudinary if provided
      if (imageFile && imageFile instanceof File) {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const uploadResult = await uploadImage({
          buffer,
          filename: imageFile.name,
          folder: "launches",
        });
        
        imageUrl = (uploadResult as any).secure_url;
      }
      
      const launchDate = launchDateStr ? new Date(launchDateStr) : new Date();
      
      const newLaunch = new Launch({
        title,
        description,
        imageUrl,
        launchDate,
        projectUrl,
        tags,
        featured,
        status,
      });
      
      await newLaunch.save();
      
      return NextResponse.json(newLaunch, { status: 201 });
    } else {
      // Handle JSON request
      const body = await request.json();
      
      const { title, description, imageUrl, launchDate, projectUrl, tags, featured, status } = body;
      
      if (!title || !description || !projectUrl) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }
      
      const newLaunch = new Launch({
        title,
        description,
        imageUrl: imageUrl || "/placeholder.jpg",
        launchDate: launchDate || new Date(),
        projectUrl,
        tags: tags || [],
        featured: featured || false,
        status: status || "Launching Soon",
      });
      
      await newLaunch.save();
      
      return NextResponse.json(newLaunch, { status: 201 });
    }
  } catch (error) {
    console.error("Error creating launch:", error);
    return NextResponse.json({ error: "Failed to create launch" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Check authentication - uncomment and adjust based on your auth setup
    // const session = await auth();
    // if (!session?.user || session.user.role !== "admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    await connectToDB();
    const launches = await Launch.find({}).sort({ launchDate: -1 });
    
    return NextResponse.json(launches);
  } catch (error) {
    console.error("Error fetching all launches:", error);
    return NextResponse.json({ error: "Failed to fetch launches" }, { status: 500 });
  }
}
