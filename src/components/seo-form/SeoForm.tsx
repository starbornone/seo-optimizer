"use client";

import clsx from "clsx";
import { FormEvent, useState } from "react";

interface SeoFormProps {
  onSubmit: (title: string, content: string) => void;
  loading: boolean;
}

export const SeoForm: React.FC<SeoFormProps> = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title && content) {
      onSubmit(title, content);
    }
  };

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-md border border-gray-200 overflow-y-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={clsx(
              "w-full px-4 py-3 border border-gray-200 rounded-md text-lg focus:outline-none focus:ring-2",
              {
                "focus:ring-cyan-500": !loading,
                "opacity-50 cursor-not-allowed": loading,
              }
            )}
            placeholder="Enter your title here"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Content:
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={clsx(
              "w-full px-4 py-3 border border-gray-200 rounded-md text-lg focus:outline-none focus:ring-2 h-64",
              {
                "focus:ring-cyan-500": !loading,
                "opacity-50 cursor-not-allowed": loading,
              }
            )}
            placeholder="Start writing your content here..."
            disabled={loading}
          ></textarea>
        </div>
        <button
          type="submit"
          className={clsx(
            "w-full py-3 text-lg font-semibold rounded-md transition duration-200 focus:outline-none focus:ring-2",
            {
              "bg-cyan-500 text-white hover:bg-opacity-90 focus:ring-secondary": !loading,
              "bg-gray-400 text-gray-700 cursor-not-allowed": loading,
            }
          )}
          disabled={loading}
        >
          {loading ? "Analyzing Content..." : "Get SEO Suggestions"}
        </button>
      </form>
    </div>
  );
};