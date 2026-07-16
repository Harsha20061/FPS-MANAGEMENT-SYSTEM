import connectDb from "@/lib/db";
import Admin from "@/models/Admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const admin = await Admin.find({});
    return NextResponse.json(admin, { status: 200 });
  } catch (error: any) {
    console.log("ERROR:", error);

    return NextResponse.json(
      {
        message: error.message,
        stack: error.stack,
      },
      {
        status: 500,
      },
    );
  }
}
