import connectDb from "@/lib/db";
import Announcement from "@/models/Announcement";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDb();
    const { id } = await params;
    const { title, message, priority } = await req.json();
    if (!title || !message || !priority) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }
    if (!["low", "medium", "high"].includes(priority)) {
      return NextResponse.json(
        { message: "Invalid priority." },
        { status: 400 },
      );
    }
    const updatedAnnouncment = await Announcement.findByIdAndUpdate(
      id,
      { title, message, priority },
      { new: true, runValidators: true },
    );

    if (!updatedAnnouncment) {
      return NextResponse.json(
        { message: "Announcement not found " },
        { status: 404 },
      );
    }
    return NextResponse.json(updatedAnnouncment, { status: 200 });
  } catch (error: any) {
    console.error("PUT ANNOUNCEMENT ERROR:", error);

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDb();
    const { id } = await params;
    const deletedannouncement = await Announcement.findByIdAndDelete(id);
    if (!deletedannouncement) {
      return NextResponse.json(
        { message: "Announcement not found " },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Announcement deleted succesfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("PUT ANNOUNCEMENT ERROR:", error);

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
