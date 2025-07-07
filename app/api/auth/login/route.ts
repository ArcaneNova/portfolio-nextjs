import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Get admin collection
    const adminsCollection = await getCollection("admins")
    
    // Find admin by email
    const admin = await adminsCollection.findOne({ email: email.toLowerCase() })
    
    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Check if admin is active
    if (!admin.isActive) {
      return NextResponse.json(
        { error: "Account is deactivated" },
        { status: 401 }
      )
    }

    // Update last login
    await adminsCollection.updateOne(
      { _id: admin._id },
      { $set: { lastLogin: new Date(), updatedAt: new Date() } }
    )

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Login successful",
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    })

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
