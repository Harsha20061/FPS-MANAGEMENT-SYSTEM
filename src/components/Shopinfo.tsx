"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Store, MapPin, Phone } from "lucide-react";

interface ShopDetails {
  _id: string;
  shopName: string;
  shopId: string;
  dealerName: string;
  address: string;
  contact: string;
}

function Shopinfo() {
  const [shop, setShop] = useState<ShopDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchShopDetails = async () => {
    try {
      const result = await axios.get("/api/shopdetails");
      setShop(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShopDetails();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 mt-28 sm:mt-24 md:mt-28">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          Loading shop information...
        </div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="max-w-7xl mx-auto px-4 mt-28 sm:mt-24 md:mt-28">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-500">
          Shop details not available.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 mt-28 sm:mt-24 md:mt-28">
      <div className="bg-linear-to-r from-green-600 to-green-700 rounded-2xl shadow-lg p-6 md:p-10">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Shop Icon */}
          <div className="bg-white/20 p-4 rounded-2xl self-center md:self-start">
            <Store className="w-10 h-10 text-white" />
          </div>

          {/* Shop Details */}
          <div className="flex-1 space-y-4">
            {/* Shop Name + ID */}
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h1 className="text-2xl md:text-4xl font-bold text-white wrap-break-word">
                {shop.shopName}
              </h1>

              <span className="w-fit bg-white/20 text-white text-xs md:text-sm font-semibold px-3 py-1 rounded-lg">
                {shop.shopId}
              </span>
            </div>

            {/* Dealer */}
            <p className="text-green-100 text-base md:text-lg">
              <span className="font-semibold">Dealer:</span> {shop.dealerName}
            </p>

            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-white mt-1 shrink-0" />

              <p className="text-white text-sm md:text-lg leading-relaxed wrap-break-word">
                {shop.address}
              </p>
            </div>

            {/* Contact */}
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-white shrink-0" />

              <p className="text-white text-sm md:text-lg">
                {shop.contact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shopinfo;