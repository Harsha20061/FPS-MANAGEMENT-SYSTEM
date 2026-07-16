import connectDb from "@/lib/db";
import ShopTimings from "@/models/ShopTimings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();

    const result = await ShopTimings.findOne();

    return NextResponse.json(result, { status: 200 });
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
export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const { opening,closing,breakStart,breakEnd,holidays } =
      await req.json();

    if (!opening || !closing || !breakStart || !breakEnd || !holidays) {
      return NextResponse.json(
        {
          message: "All fields are required.",
        },
        {
          status: 400,
        },
      );
    }

    // Check if shop details already exist
    const existingTime = await ShopTimings.findOne();

    if (existingTime) {
      return NextResponse.json(
        {
          message: "Shop Timings already exist.",
        },
        {
          status: 400,
        },
      );
    }

    const newTime = await ShopTimings.create({
      opening,closing,breakStart,breakEnd,holidays 
    });

    return NextResponse.json(newTime, {
      status: 201,
    });
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
