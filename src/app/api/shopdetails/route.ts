import connectDb from "@/lib/db";
import ShopDetails from "@/models/ShopDetails";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();

    const result = await ShopDetails.findOne();

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

    const { shopName, shopId, dealerName, address, contact } =
      await req.json();

    if (!shopName || !shopId || !dealerName || !address || !contact) {
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
    const existingShop = await ShopDetails.findOne();

    if (existingShop) {
      return NextResponse.json(
        {
          message: "Shop details already exist.",
        },
        {
          status: 400,
        },
      );
    }

    const newShop = await ShopDetails.create({
      shopName,
      shopId,
      dealerName,
      address,
      contact,
    });

    return NextResponse.json(newShop, {
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