"use client";

import { Suggestions } from "@/types/suggestions";

interface SeoSuggestionsProps {
  suggestions: Suggestions | null;
}

export const SeoSuggestions: React.FC<SeoSuggestionsProps> = ({ suggestions }) => {
  if (!suggestions) {
    return (
      <div className="w-full p-6 bg-gray-100 border border-gray-200 rounded-md">
        <p className="text-gray-500">No suggestions yet. Start by entering your content.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-white shadow-lg rounded-md border border-gray-200 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">SEO Suggestions</h2>
      <div className="space-y-4">
        <p>
          <strong className="text-lg">Title:</strong>{" "}
          <span className="font-medium">{suggestions.title}</span>
        </p>
        <p>
          <strong className="text-lg">Description:</strong>{" "}
          <span className="font-medium">{suggestions.description}</span>
        </p>
        <p>
          <strong className="text-lg">Keywords:</strong>{" "}
          <span className="font-medium">{suggestions.keywords.join(", ")}</span>
        </p>
      </div>
    </div>
  );
};