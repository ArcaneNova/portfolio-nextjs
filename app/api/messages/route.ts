import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { getCollection, ObjectId } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const read = searchParams.get("read");
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    const messagesCollection = await getCollection("messages");
    
    let query: any = {};
    if (read === "true") {
      query = { read: true };
    } else if (read === "false") {
      query = { read: false };
    }

    const messages = await messagesCollection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await messagesCollection.countDocuments(query);

    return NextResponse.json({
      messages,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const messagesCollection = await getCollection("messages");
    
    const newMessage = {
      name,
      email,
      subject,
      message,
      read: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await messagesCollection.insertOne(newMessage);

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

// API to mark message as read
export async function PATCH(req: NextRequest) {
  try {
    const { id, read } = await req.json();
    
    if (!id) {
      return NextResponse.json(
        { error: "Message ID is required" },
        { status: 400 }
      );
    }

    const messagesCollection = await getCollection("messages");
    
    await messagesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { read, updatedAt: new Date() } }
    );

    return NextResponse.json(
      { success: true, message: "Message updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating message:", error);
    return NextResponse.json(
      { error: "Failed to update message" },
      { status: 500 }
    );
  }
} 