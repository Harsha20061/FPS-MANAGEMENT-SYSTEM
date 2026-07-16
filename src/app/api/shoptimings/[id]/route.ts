import connectDb from "@/lib/db";
import ShopTimings from "@/models/ShopTimings";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDb();

    const { id } = await params;

    const {
      opening,
      closing,
      breakStart,
      breakEnd,
      holidays,
    } = await req.json();

    if (
      !opening ||
      !closing ||
      !breakStart ||
      !breakEnd ||
      !holidays
    ) {
      return NextResponse.json(
        {
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    const updatedTimings =
      await ShopTimings.findByIdAndUpdate(
        id,
        {
          opening,
          closing,
          breakStart,
          breakEnd,
          holidays,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedTimings) {
      return NextResponse.json(
        {
          message: "Shop timings not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(updatedTimings, {
      status: 200,
    });
  } catch (error: any) {
    console.error("PUT SHOP TIMINGS ERROR:", error);

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}