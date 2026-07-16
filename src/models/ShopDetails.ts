import mongoose, { model, models } from "mongoose";

export interface IShopDetails {
  _id: mongoose.Types.ObjectId;
  shopName: string;
  shopId: string;
  dealerName: string;
  address: string;
  contact: string;
}

const shopDetailsSchema = new mongoose.Schema<IShopDetails>(
  {
    shopName: {
      type: String,
      required: true,
      trim: true,
    },

    shopId: {
      type: String,
      required: true,
      trim: true,
    },

    dealerName: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    contact: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ShopDetails =
  models.ShopDetails ||
  model<IShopDetails>("ShopDetails", shopDetailsSchema);

export default ShopDetails;