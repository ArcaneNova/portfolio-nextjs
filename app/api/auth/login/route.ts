import { NextRequest, NextResponse } from "next/server"
import { getCollection } from "@/lib/db"
import { generateToken } from "@/lib/auth"
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
    if (admin.isActive === false) {
      return NextResponse.json(
        { error: "Account is deactivated" },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = generateToken({
      id: admin._id.toString(),
      email: admin.email,
      name: admin.name,
      role: admin.role,
    })

    // Update last login
    await adminsCollection.updateOne(
      { _id: admin._id },
      { $set: { lastLogin: new Date(), updatedAt: new Date() } }
    )

    // Create response with secure cookie
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id.toString(),
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    })

    // Set secure HTTP-only cookie
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    return response

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
