"use client";

import { ToggleLeft, ToggleRight, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface AddStockModelProps {
  onClose: () => void;
  onSuccess: () => void;
  mode: "add" | "edit";
  stock?: any;
}

function AddStockModel({
  onClose,
  onSuccess,
  mode,
  stock,
}: AddStockModelProps) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [available, setAvailable] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (mode === "edit" && stock) {
      setName(stock.name);
      setIcon(stock.icon);
      setQuantity(stock.quantity.toString());
      setPrice(stock.price.toString());
      setUnit(stock.unit);
      setAvailable(stock.available);
    }
  }, [mode, stock]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");


    if (!name || !icon || !quantity || !price || !unit) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name,
        quantity: Number(quantity),
        price: Number(price),
        unit,
        available,
        icon,
      };

      if (mode === "add") {
        await axios.post("/api/stocks", payload);
      } else {
        await axios.put(`/api/stocks/${stock._id}`, payload);
      }

      onSuccess();
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Failed to save stock. Please try again."
        );
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl">

        
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold">
            {mode === "add" ? "Add New Item" : "Edit Stock"}
          </h1>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">

         
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

       
          <div>
            <label className="block text-sm font-semibold mb-2">
              Item Name
            </label>

            <input
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Icon
            </label>

            <select
              className="w-full border rounded-lg px-3 py-2"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            >
              <option value="">Select Icon</option>
              <option value="package">Package</option>
              <option value="candy">Candy</option>
              <option value="wheat">Wheat</option>
              <option value="droplets">Droplets</option>
            </select>
          </div>

          
          <div>
            <label className="block text-sm font-semibold mb-2">
              Quantity
            </label>

            <input
              type="number"
              className="w-full border rounded-lg px-3 py-2"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Price (₹)
            </label>

            <input
              type="number"
              className="w-full border rounded-lg px-3 py-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Unit
            </label>

            <input
              className="w-full border rounded-lg px-3 py-2"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
          </div>

     
          <div className="border rounded-xl p-4 flex justify-between items-center">
            <div>
              <h2 className="font-semibold">Available</h2>
              <p className="text-sm text-gray-500">
                Toggle stock availability
              </p>
            </div>

            <button
              type="button"
              onClick={() => setAvailable(!available)}
            >
              {available ? (
                <ToggleRight className="w-10 h-10 text-green-600" />
              ) : (
                <ToggleLeft className="w-10 h-10 text-gray-400" />
              )}
            </button>
          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-400"
            >
              {loading
                ? mode === "add"
                  ? "Saving..."
                  : "Updating..."
                : mode === "add"
                ? "Save"
                : "Update"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default AddStockModel;