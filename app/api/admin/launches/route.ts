import { NextResponse, NextRequest } from "next/server";
import { connectToDB } from "@/lib/db";
import Launch from "@/lib/models/launch";
import { requireAuth } from "@/lib/middleware";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(request: Request) {
  // Convert to NextRequest for auth checking
  const req = request as unknown as NextRequest;
  
  // Check authentication
  const auth = await requireAuth(req);
  if (!auth.valid) {
    return NextResponse.json(
      { error: auth.error || "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await connectToDB();
    
    // Check if the request is multipart/form-data
    const contentType = request.headers.get("content-type") || "";
    
    if (contentType.includes("multipart/form-data")) {
      // Handle form data with file upload
      const formData = await request.formData();
      
      const title = formData.get("title")
      const description = formData.get("description")
      const projectUrl = formData.get("projectUrl")
      const launchDateStr = formData.get("launchDate")
      const featured = formData.get("featured") === "true";
      const status = formData.get("status")
      const tags = (() => {
        try {
          const tagsStr = formData.get("tags")
          return typeof tagsStr === "string" ? JSON.parse(tagsStr) : []
        } catch {
          return []
        }
      })()
      const imageFile = formData.get("image")
      
      // Validate required fields
      if (
        typeof title !== "string" || !title.trim() ||
        typeof description !== "string" || !description.trim() ||
        typeof projectUrl !== "string" || !projectUrl.trim()
      ) {
        return NextResponse.json(
          { error: "Missing or invalid required fields" },
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
      
      const launchDate = (launchDateStr && typeof launchDateStr === "string") ? new Date(launchDateStr) : new Date();
      
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
