"use client";
import axios from "axios";
import { Megaphone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

function Notice() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const fetchAnnouncements = async () => {
    try {
      const result = await axios.get("/api/Announcements");
      setAnnouncements(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!title || !message || !priority) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        await axios.put(`/api/Announcements/${editId}`, {
          title,
          message,
          priority,
        });
      } else {
        await axios.post("/api/Announcements", {
          title,
          message,
          priority,
        });
      }

      setTitle("");
      setMessage("");
      setPriority("medium");
      setEditId(null);

      fetchAnnouncements();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Failed to post announcement.",
        );
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (announcement: any) => {
    setTitle(announcement.title);
    setMessage(announcement.message);
    setPriority(announcement.priority);
    setEditId(announcement._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this announcement?")) return;

    try {
      await axios.delete(`/api/Announcements/${id}`);
      fetchAnnouncements();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-300">
      <div className="flex gap-4 ">
        <Megaphone className="h-5 w-5 text-orange-400" />
        <h1 className="text-l font-bold text-gray-500 ">Announcements</h1>
      </div>
      <div className="w-full bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">New Announcement</h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-2">Title</label>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 rounded-lg px-4 py-3">
                {error}
              </div>
            )}
            <input
              type="text"
              placeholder="Stock arrived today"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Message</label>

            <textarea
              rows={5}
              placeholder="Details..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Priority</label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="low">Low (Green)</option>
              <option value="medium">Medium (Amber)</option>
              <option value="high">High (Red)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            {loading
              ? editId
                ? "Updating..."
                : "Posting..."
              : editId
                ? "Update"
                : "Post"}
          </button>
        </form>
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-5">Posted Announcements</h2>

          <div className="space-y-4">
            {announcements.map((announcement: any) => (
              <div
                key={announcement._id}
                className={`rounded-xl border-l-4 p-5 shadow-md ${
                  announcement.priority === "high"
                    ? "bg-red-50 border-red-500"
                    : announcement.priority === "medium"
                      ? "bg-yellow-50 border-yellow-500"
                      : "bg-green-50 border-green-500"
                }`}
              >
                <div className="flex justify-between">
                  <div className="w-[80%]">
                    <h1 className="text-lg font-bold">{announcement.title}</h1>

                    <p className="text-gray-600 mt-2">{announcement.message}</p>

                    <p className="text-xs text-gray-500 mt-3 capitalize">
                      {announcement.priority}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(announcement.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    

                    <button
                      onClick={() => handleDelete(announcement._id)}
                      className="h-10 w-10 rounded-lg text-red-600 hover:bg-white flex items-center justify-center"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notice;
