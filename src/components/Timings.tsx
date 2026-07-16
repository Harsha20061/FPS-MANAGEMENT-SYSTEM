"use client";

import axios from "axios";
import { Calendar, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ShopTimings {
  _id: string;
  opening: string;
  closing: string;
  breakStart: string;
  breakEnd: string;
  holidays: string;
}

function Timings() {
  const [timings, setTimings] = useState<ShopTimings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTimings = async () => {
    try {
      const result = await axios.get("/api/shoptimings");
      setTimings(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimings();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto mt-8 px-4 text-center">
        Loading shop timings...
      </div>
    );
  }

  if (!timings) {
    return (
      <div className="max-w-7xl mx-auto mt-8 px-4 text-center text-gray-500">
        Shop timings not available.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      {/* Heading */}
      <div className="flex items-center gap-3">
        <Clock className="w-6 h-6 text-green-500" />
        <h1 className="text-lg md:text-xl font-bold">
          Shop Timings
        </h1>
      </div>

      {/* Opening & Closing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        <div className="p-5 rounded-xl bg-gradient-to-r from-green-100 to-green-200 shadow-sm">
          <p className="text-xs font-semibold text-green-900 mb-2">
            OPENS
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-green-900">
            {timings.opening}
          </h2>
        </div>

        <div className="p-5 rounded-xl bg-gradient-to-r from-red-100 to-red-200 shadow-sm">
          <p className="text-xs font-semibold text-red-900 mb-2">
            CLOSES
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-red-900">
            {timings.closing}
          </h2>
        </div>
      </div>

      {/* Lunch Break */}

      <div className="mt-5 p-5 rounded-xl bg-gradient-to-r from-yellow-100 to-yellow-200 shadow-sm">
        <p className="text-xs font-semibold text-yellow-900 mb-2">
          LUNCH BREAK
        </p>

        <h2 className="text-lg md:text-2xl font-bold text-yellow-900">
          {timings.breakStart} - {timings.breakEnd}
        </h2>
      </div>

      {/* Holidays */}

      <div className="mt-5 flex items-start gap-3 p-5 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 shadow-sm">
        <Calendar className="w-5 h-5 text-gray-700 mt-1 shrink-0" />

        <p className="text-sm md:text-base font-medium text-gray-700 break-words">
          Closed: {timings.holidays}
        </p>
      </div>

      {/* Footer */}

      <div className="flex justify-center items-center py-10">
        <p className="text-xs md:text-sm text-center text-gray-400">
          Part of the Public Distribution System (PDS) • Government of India
        </p>
      </div>
    </div>
  );
}

export default Timings;