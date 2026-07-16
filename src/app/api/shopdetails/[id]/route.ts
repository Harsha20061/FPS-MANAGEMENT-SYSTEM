import connectDb from "@/lib/db";
import ShopDetails from "@/models/ShopDetails";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDb();

    const { id } = await params;

    const {
      shopName,
      shopId,
      dealerName,
      address,
      contact,
    } = await req.json();

    if (!shopName || !shopId || !dealerName || !address || !contact) {
      return NextResponse.json(
        {
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    const updatedShopDetails = await ShopDetails.findByIdAndUpdate(
      id,
      {
        shopName,
        shopId,
        dealerName,
        address,
        contact,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedShopDetails) {
      return NextResponse.json(
        {
          message: "Shop details not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(updatedShopDetails, {
      status: 200,
    });
  } catch (error: any) {
    console.error("PUT SHOP DETAILS ERROR:", error);

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