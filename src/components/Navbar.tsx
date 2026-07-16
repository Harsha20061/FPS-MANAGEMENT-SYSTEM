"use client";

import React from "react";
import { Store } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-3 gap-4 sm:gap-0">
          
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="bg-green-600 p-2 rounded-xl">
              <Store className="w-6 h-6 text-white" />
            </div>

            <div>
              <h1 className="font-bold text-lg sm:text-xl text-gray-900">
                Digital Fair Price Shop
              </h1>

              <p className="text-xs sm:text-sm text-gray-500">
                Public Distribution System
              </p>
            </div>
          </div>

          
          <div className="flex w-full sm:w-auto gap-3">
            
            <button
              onClick={() => router.push("/")}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-full transition-all duration-200 ${
                pathname === "/"
                  ? "bg-green-600 text-white shadow"
                  : "bg-white border border-green-600 text-green-700 hover:bg-green-50"
              }`}
            >
              Home
            </button>

          
<Link
  href="/admin/login"
  className={`flex-1 sm:flex-none text-center px-5 py-2 rounded-full transition-all duration-200 ${
    pathname.startsWith("/admin")
      ? "bg-green-600 text-white shadow"
      : "bg-white border border-green-600 text-green-700 hover:bg-green-50"
  }`}
>
  Admin
</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;