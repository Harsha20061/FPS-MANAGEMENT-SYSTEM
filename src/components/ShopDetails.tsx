"use client";

import axios from "axios";
import { Store } from "lucide-react";
import React, { useEffect, useState } from "react";

function ShopDetails() {
  const [id, setId] = useState("");

  const [shopName, setShopName] = useState("");
  const [shopId, setShopId] = useState("");
  const [dealerName, setDealerName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchShopDetails = async () => {
    try {
      const result = await axios.get("/api/shopdetails");

      if (result.data) {
        setId(result.data._id);
        setShopName(result.data.shopName);
        setShopId(result.data.shopId);
        setDealerName(result.data.dealerName);
        setAddress(result.data.address);
        setContact(result.data.contact);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchShopDetails();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (
      !shopName ||
      !shopId ||
      !dealerName ||
      !address ||
      !contact
    ) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        shopName,
        shopId,
        dealerName,
        address,
        contact,
      };

      if (id) {
        await axios.put(`/api/shopdetails/${id}`, payload);
      } else {
        const result = await axios.post(
          "/api/shopdetails",
          payload
        );

        setId(result.data._id);
      }

      alert("Shop details saved successfully.");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Failed to save shop details."
        );
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Store className="w-6 h-6 text-green-600" />

        <h1 className="text-xl md:text-2xl font-bold">
          Shop Details
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Shop Name */}
        <div>
          <label className="block font-semibold mb-2">
            Shop Name
          </label>

          <input
            type="text"
            value={shopName}
            onChange={(e) =>
              setShopName(e.target.value)
            }
            placeholder="Enter Shop Name"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Shop ID & Dealer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-semibold mb-2">
              Shop ID
            </label>

            <input
              type="text"
              value={shopId}
              onChange={(e) =>
                setShopId(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Dealer Name
            </label>

            <input
              type="text"
              value={dealerName}
              onChange={(e) =>
                setDealerName(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block font-semibold mb-2">
            Address
          </label>

          <textarea
            rows={4}
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block font-semibold mb-2">
            Contact Number
          </label>

          <input
            type="tel"
            value={contact}
            onChange={(e) =>
              setContact(e.target.value)
            }
            placeholder="9876543210"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold px-8 py-3 rounded-xl transition"
        >
          {loading ? "Saving..." : "Save Details"}
        </button>
      </form>
    </div>
  );
}

export default ShopDetails;