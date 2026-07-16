" use client ";
import { Candy, Package, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import StockCard from "./StockCard";
import AddStockModel from "./AddStockModel";
import axios from "axios";
import { IStock } from "@/models/Stocks";

function Stock() {
  const [stocks, setStocks] = useState<IStock[]>([]);
  const [open, setOpen] = useState(false);
  const fetchStocks = async () => {
      try {
        const result = axios.get("/api/stocks");
        setStocks((await result).data);
      } catch (error) {
        console.log(error);
      }
    }
  useEffect(() => {
  
    fetchStocks();
  }, []);

  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="w-7 h-7 text-green-600" />

          <h1 className="text-xl font-semibold">Manage Stock</h1>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <Plus className="w-5 h-5" />
          Add Item
        </button>
      </div>
      {open && <AddStockModel onClose={() => setOpen(false)} onSuccess={fetchStocks} mode="add" />}
      <div className="p-5">
        {stocks.map((stock) => {
          return <StockCard key={String(stock._id)} stock={stock} onSuccess={fetchStocks} />;
        })}
      </div>
    </div>
  );
}

export default Stock;
