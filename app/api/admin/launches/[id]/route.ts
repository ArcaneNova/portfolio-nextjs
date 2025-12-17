import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Launch from "@/lib/models/launch";
import { uploadImage } from "@/lib/cloudinary";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await connectToDB();
    const launch = await Launch.findById(id);
    
    if (!launch) {
      return NextResponse.json({ error: "Launch not found" }, { status: 404 });
    }
    
    return NextResponse.json(launch);
  } catch (error) {
    console.error("Error fetching launch:", error);
    return NextResponse.json({ error: "Failed to fetch launch" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication - uncomment and adjust based on your auth setup
    // const session = await auth();
    // if (!session?.user || session.user.role !== "admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    
    const { id } = await params;
    await connectToDB();
    
    // Check if the launch exists
    const existingLaunch = await Launch.findById(id);
    if (!existingLaunch) {
      return NextResponse.json({ error: "Launch not found" }, { status: 404 });
    }

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
      
      let imageUrl = existingLaunch.imageUrl;
      
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
      
      const launchDate = launchDateStr ? new Date(launchDateStr) : existingLaunch.launchDate;
      
      const updatedLaunch = await Launch.findByIdAndUpdate(
        id,
        {
          title: title || existingLaunch.title,
          description: description || existingLaunch.description,
          imageUrl,
          launchDate,
          projectUrl: projectUrl || existingLaunch.projectUrl,
          tags: tags || existingLaunch.tags,
          featured: featured !== undefined ? featured : existingLaunch.featured,
          status: status || existingLaunch.status,
        },
        { new: true }
      );
      
      return NextResponse.json(updatedLaunch);
      
    } else {
      // Handle JSON request
      const body = await request.json();
      const updatedLaunch = await Launch.findByIdAndUpdate(id, body, { new: true });
      
      if (!updatedLaunch) {
        return NextResponse.json({ error: "Launch not found" }, { status: 404 });
      }
      
      return NextResponse.json(updatedLaunch);
    }
  } catch (error) {
    console.error("Error updating launch:", error);
    return NextResponse.json({ error: "Failed to update launch" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication - uncomment and adjust based on your auth setup
    // const session = await auth();
    // if (!session?.user || session.user.role !== "admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    
    const { id } = await params;
    await connectToDB();
    
    const deletedLaunch = await Launch.findByIdAndDelete(id);
    
    if (!deletedLaunch) {
      return NextResponse.json({ error: "Launch not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Launch deleted successfully" });
  } catch (error) {
    console.error("Error deleting launch:", error);
    return NextResponse.json({ error: "Failed to delete launch" }, { status: 500 });
  }
}
