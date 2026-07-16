"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BoxIcon,
  CircleCheck,
  CircleX,
  Package,
  RefreshCcw,
} from "lucide-react";
import { iconMap } from "@/lib/iconMap";

interface Stock {
  _id: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  available: boolean;
  icon: string;
}

function Status() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStocks = async () => {
    try {
      setLoading(true);

      const result = await axios.get("/api/stocks");



setStocks(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const getCardColor = (name: string) => {
    switch (name.toLowerCase()) {
      case "rice":
        return "from-orange-100 to-orange-300";

      case "wheat":
        return "from-yellow-100 to-yellow-200";

      case "sugar":
        return "from-red-100 to-red-200";

      case "kerosene":
        return "from-blue-100 to-blue-200";

      default:
        return "from-gray-100 to-gray-200";
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BoxIcon className="w-6 h-6 text-green-600" />

          <h1 className="text-lg md:text-xl font-semibold">
            Today's Stock Status
          </h1>
        </div>

        <button
          onClick={fetchStocks}
          className="p-2 rounded-lg hover:bg-gray-200 transition"
        >
          <RefreshCcw
            className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stocks.map((stock) => {
          const Icon = iconMap[stock.icon] || Package;

          return (
            <div
              key={stock._id}
              className={`bg-gradient-to-r ${getCardColor(
                stock.name
              )} rounded-2xl shadow-md`}
            >
              <div className="flex items-start justify-between p-4 md:p-5">
                <div className="bg-white/40 rounded-xl p-3">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-gray-800" />
                </div>

                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl ${
                    stock.available
                      ? "bg-green-300/50"
                      : "bg-red-300/60"
                  }`}
                >
                  {stock.available ? (
                    <CircleCheck className="w-4 h-4 md:w-5 md:h-5 text-green-800" />
                  ) : (
                    <CircleX className="w-4 h-4 md:w-5 md:h-5 text-red-800" />
                  )}

                  <span className="text-xs md:text-sm font-medium">
                    {stock.available
                      ? "Available"
                      : "Out of Stock"}
                  </span>
                </div>
              </div>

              <div className="px-4 md:px-5 pb-5">
                <h2 className="text-lg md:text-xl font-bold capitalize mb-2">
                  {stock.name}
                </h2>

                <p className="text-sm text-gray-700">
                  Qty: {stock.quantity} {stock.unit}
                </p>

                <p className="text-sm text-gray-700">
                  ₹ {stock.price}/{stock.unit}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {!loading && stocks.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No Stock Available
        </div>
      )}
    </div>
  );
}

export default Status;
