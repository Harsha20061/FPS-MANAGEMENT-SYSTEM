"use client";

import axios from "axios";
import { Megaphone } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Announcement {
  _id: string;
  title: string;
  message: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
}

function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncements = async () => {
    try {
      const result = await axios.get("/api/Announcements");

      
      setAnnouncements(
        Array.isArray(result.data) ? result.data : []
      );
    } catch (error) {
      console.error(error);
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return {
          card: "bg-red-50 border-red-500",
          badge: "bg-red-100 text-red-700",
        };

      case "medium":
        return {
          card: "bg-yellow-50 border-yellow-500",
          badge: "bg-yellow-100 text-yellow-700",
        };

      default:
        return {
          card: "bg-green-50 border-green-500",
          badge: "bg-green-100 text-green-700",
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <Megaphone className="w-6 h-6 text-orange-500" />
        <h1 className="text-xl font-bold text-gray-800">
          Announcements
        </h1>
      </div>

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
          Loading announcements...
        </div>
      )}

      {/* Empty State */}
      {!loading && announcements.length === 0 && (
        <div className="bg-gray-100 rounded-xl p-6 text-center text-gray-500">
          No announcements available.
        </div>
      )}

      {/* Announcement List */}
      <div className="space-y-5">
        {announcements.map((announcement) => {
          const styles = getPriorityStyles(announcement.priority);

          return (
            <div
              key={announcement._id}
              className={`border-l-4 rounded-2xl shadow-sm p-5 ${styles.card}`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1">
                  <h2 className="text-lg md:text-xl font-bold text-gray-900">
                    {announcement.title}
                  </h2>

                  <p className="mt-2 text-gray-700 leading-relaxed wrap-break-word">
                    {announcement.message}
                  </p>

                  <p className="mt-4 text-xs text-gray-500">
                    {new Date(
                      announcement.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`self-start px-3 py-1 rounded-full text-xs font-semibold capitalize ${styles.badge}`}
                >
                  {announcement.priority}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Announcements;