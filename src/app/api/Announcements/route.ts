import connectDb from "@/lib/db";
import Announcement from "@/models/Announcement";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const result = await Announcement.find({}).sort({
      createdAt: -1,
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.log(error);
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

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { title, message, priority } = await req.json();
    if (!title || !message || !priority) {
  return NextResponse.json(
    { message: "All fields are required." },
    { status: 400 }
  );
}
if (!["low", "medium", "high"].includes(priority)) {
      return NextResponse.json(
        {
          message: "Invalid priority.",
        },
        {
          status: 400,
        }
      );
    }
    const newAnnouncement = await Announcement.create({
      title,
      message,
      priority,
    });
    
    return NextResponse.json(newAnnouncement, { status: 200 });
  } catch (error:any) {
    console.error("FULL ERROR:", error);

    return NextResponse.json(
      { message: error.message, stack: error.stack },
      { status: 500 },
    );
  }
}
