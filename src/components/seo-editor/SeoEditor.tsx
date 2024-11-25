'use client';

import { SeoForm, SeoSuggestions } from '@/components';
import { Suggestions } from '@/types/suggestions';
import clsx from 'clsx';
import { useState } from 'react';

export const SeoEditor = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (title: string, content: string, apiKey?: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/seo-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, apiKey }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch SEO suggestions');
      }

      const data: Suggestions = await response.json();
      setSuggestions(data);
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while fetching SEO suggestions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col gap-8 p-8 lg:flex-row">
      <div className="flex-grow lg:w-2/3">
        <SeoForm onSubmit={handleFormSubmit} loading={loading} />
      </div>
      <div
        className={clsx('border-t border-gray-200 lg:w-1/3 lg:border-l lg:border-t-0', {
          'bg-gray-100 px-8': !error,
          'bg-red-50 px-8 text-red-600': error,
        })}
      >
        {error ? <p>{error}</p> : <SeoSuggestions suggestions={suggestions} />}
      </div>
    </div>
  );
};
