"use client";

import { SeoForm, SeoSuggestions } from "@/components";
import { Suggestions } from "@/types/suggestions";
import clsx from "clsx";
import { useState } from "react";

export const SeoEditor = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (title: string, content: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/seo-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch SEO suggestions");
      }

      const data: Suggestions = await response.json();
      setSuggestions(data);
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while fetching SEO suggestions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row p-8 gap-8">
      <div className="flex-grow lg:w-2/3">
        <SeoForm onSubmit={handleFormSubmit} loading={loading} />
      </div>
      <div
        className={clsx(
          "lg:w-1/3 border-t lg:border-t-0 lg:border-l border-gray-200",
          {
            "bg-gray-100 px-8": !error,
            "bg-red-50 text-red-600 px-8": error,
          }
        )}
      >
        {error ? (
          <p>{error}</p>
        ) : (
          <SeoSuggestions suggestions={suggestions} />
        )}
      </div>
    </div>
  );
};