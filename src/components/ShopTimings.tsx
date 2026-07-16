"use client";

import axios from "axios";
import { Clock } from "lucide-react";
import React, { useEffect, useState } from "react";

function ShopTimings() {
  const [id, setId] = useState("");

  const [opening, setOpening] = useState("");
  const [closing, setClosing] = useState("");
  const [breakStart, setBreakStart] = useState("");
  const [breakEnd, setBreakEnd] = useState("");
  const [holidays, setHolidays] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTimings = async () => {
    try {
      const result = await axios.get("/api/shoptimings");

      if (result.data) {
        setId(result.data._id);
        setOpening(result.data.opening);
        setClosing(result.data.closing);
        setBreakStart(result.data.breakStart);
        setBreakEnd(result.data.breakEnd);
        setHolidays(result.data.holidays);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTimings();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (
      !opening ||
      !closing ||
      !breakStart ||
      !breakEnd ||
      !holidays
    ) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        opening,
        closing,
        breakStart,
        breakEnd,
        holidays,
      };

      if (id) {
        await axios.put(`/api/shoptimings/${id}`, payload);
      } else {
        const result = await axios.post(
          "/api/shoptimings",
          payload
        );

        setId(result.data._id);
      }

      alert("Timings updated successfully.");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Failed to save timings."
        );
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 border border-gray-300 rounded-2xl mt-5 mb-10 shadow-sm">

      <div className="flex items-center gap-3 mb-8">
        <Clock className="w-6 h-6 text-green-600" />
        <h1 className="text-xl font-bold">
          Shop Timings
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {error && (
          <div className="bg-red-100 border border-red-300 rounded-lg p-3 text-red-700">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="block font-semibold mb-2">
              Opening Time
            </label>

            <input
              type="time"
              value={opening}
              onChange={(e) => setOpening(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Closing Time
            </label>

            <input
              type="time"
              value={closing}
              onChange={(e) => setClosing(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="block font-semibold mb-2">
              Break Start
            </label>

            <input
              type="time"
              value={breakStart}
              onChange={(e) => setBreakStart(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Break End
            </label>

            <input
              type="time"
              value={breakEnd}
              onChange={(e) => setBreakEnd(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

        </div>

        <div>
          <label className="block font-semibold mb-2">
            Holidays
          </label>

          <input
            type="text"
            value={holidays}
            onChange={(e) => setHolidays(e.target.value)}
            placeholder="Sundays & Public Holidays"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold px-6 py-3 rounded-xl transition"
        >
          {loading ? "Saving..." : "Save Timings"}
        </button>

      </form>
    </div>
  );
}

export default ShopTimings;