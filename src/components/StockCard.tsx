"use client";

import { iconMap } from "@/lib/iconMap";
import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Package } from "lucide-react";
import AddStockModel from "./AddStockModel";
import axios from "axios";

function StockCard({
  stock,
  onSuccess,
}: {
  stock: any;
  onSuccess: () => void;
}) {
  const Icon = iconMap[stock.icon] || Package;

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteStock = async () => {
    const confirmDelete = window.confirm(`Delete ${stock.name} from stock?`);

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await axios.delete(`/api/stocks/${stock._id}`);

      onSuccess();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full bg-gray-100 rounded-xl m-2 p-3 flex justify-between items-center border border-gray-400">
        <div className="flex gap-3 items-center">
          <div className="h-9 w-9 bg-white flex justify-center items-center rounded-xl">
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <h1 className="font-bold mb-1">{stock.name}</h1>

            <p className="text-xs text-gray-600">
              {stock.quantity} {stock.unit} • ₹{stock.price}/{stock.unit}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEdit(true)}
            className="h-8 w-8 rounded-lg flex justify-center items-center hover:bg-white"
          >
            <Pencil className="h-5 w-5" />
          </button>

          <button
            disabled={loading}
            onClick={deleteStock}
            className="h-8 w-8 rounded-lg flex justify-center items-center text-red-600 hover:bg-white"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {edit && (
        <AddStockModel
          mode="edit"
          stock={stock}
          onClose={() => setEdit(false)}
          onSuccess={() => {
            onSuccess();
            setEdit(false);
          }}
        />
      )}
    </>
  );
}

export default StockCard;
