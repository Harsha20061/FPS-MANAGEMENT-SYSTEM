"use client";

import Info from "@/components/Info";
import Navbar from "@/components/Navbar";
import Notice from "@/components/Notice";
import Stock from "@/components/Stock";
import { LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

function Dashboard() {
  const session = useSession();
  const [activeTab, setActiveTab] = useState("stock");

  return (
    <div>
      <Navbar />

      {/* Admin Header */}
      <div className="max-w-7xl mx-auto mt-32 sm:mt-28 px-4">
        <div className="bg-blue-950 rounded-2xl p-5 flex flex-col md:flex-row md:justify-between md:items-center gap-5">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-2xl">
              <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>

            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Admin Dashboard
              </h1>

              <p className="text-sm text-gray-300 mt-1">
                Manage shop data
              </p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <div className="grid grid-cols-3 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab("stock")}
            className={`py-3 rounded-lg transition-all duration-200 text-sm md:text-base
            ${
              activeTab === "stock"
                ? "bg-white shadow font-semibold text-black"
                : "text-gray-600 hover:bg-white/50"
            }`}
          >
            Stock
          </button>

          <button
            onClick={() => setActiveTab("notice")}
            className={`py-3 rounded-lg transition-all duration-200 text-sm md:text-base
            ${
              activeTab === "notice"
                ? "bg-white shadow font-semibold text-black"
                : "text-gray-600 hover:bg-white/50"
            }`}
          >
            Notices
          </button>

          <button
            onClick={() => setActiveTab("shop")}
            className={`py-3 rounded-lg transition-all duration-200 text-sm md:text-base
            ${
              activeTab === "shop"
                ? "bg-white shadow font-semibold text-black"
                : "text-gray-600 hover:bg-white/50"
            }`}
          >
            Shop Info
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto mt-8 px-4">
        {activeTab === "stock" && <Stock />}
        {activeTab === "notice" && <Notice />}
        {activeTab === "shop" && <Info />}
      </div>
    </div>
  );
}

export default Dashboard;