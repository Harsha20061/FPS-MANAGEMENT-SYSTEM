import connectDb from "@/lib/db";
import Stock from "@/models/Stocks";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const result = await Stock.find({});
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

    const { name, quantity, unit, price, available, icon } = await req.json();
    if (!name || !quantity || !price || !icon || !unit) {
      return NextResponse.json(
        { message: "all fields required " },
        { status: 400 },
      );
    }
    const newStock = await Stock.create({
      name,
      quantity,
      unit,
      price,
      available,
      icon,
    });
    return NextResponse.json(newStock, { status: 200 });
  } catch (error: any) {
    console.error("FULL ERROR:", error);

    return NextResponse.json(
      { message: error.message, stack: error.stack },
      { status: 500 },
    );
  }
}
