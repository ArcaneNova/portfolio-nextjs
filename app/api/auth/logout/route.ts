import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: "Logout successful",
    })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
