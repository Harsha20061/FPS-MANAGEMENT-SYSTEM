import connectDb from "@/lib/db";
import Stock from "@/models/Stocks";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDb();
    const { id } = await params;
    const { name, quantity, unit, price, available, icon } = await req.json();

    const updatedstock = await Stock.findByIdAndUpdate(
      id,
      { name, quantity, unit, price, available, icon },
      { new: true },
    );

    if (!updatedstock) {
      return NextResponse.json(
        { message: "Stock not found " },
        { status: 404 },
      );
    }
    return NextResponse.json(updatedstock, { status: 200 });
  } catch (error:any) {
    console.error("PUT STOCK ERROR:", error);

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDb();

    const { id } = await params;

    const deletedStock = await Stock.findByIdAndDelete(id);

    if (!deletedStock) {
      return NextResponse.json(
        { message: "Stock not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Stock deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
