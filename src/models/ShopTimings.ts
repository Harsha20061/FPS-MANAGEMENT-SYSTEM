import mongoose, { model, models } from "mongoose";

export interface IShopTimings {
  _id: mongoose.Types.ObjectId;
  opening: string;
  closing: string;
  breakStart: string;
  breakEnd: string;
  holidays: string;
}

const shopTimingsSchema = new mongoose.Schema<IShopTimings>(
  {
    opening: {
      type: String,
      required: true,
      trim: true,
    },
    closing: {
      type: String,
      required: true,
      trim: true,
    },
    breakStart: {
      type: String,
      required: true,
      trim: true,
    },
    breakEnd: {
      type: String,
      required: true,
      trim: true,
    },
    holidays: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ShopTimings =
  models.ShopTimings ||
  model<IShopTimings>("ShopTimings", shopTimingsSchema);

export default ShopTimings;