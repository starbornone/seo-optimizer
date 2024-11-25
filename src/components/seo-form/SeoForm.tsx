'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

interface SeoFormProps {
  onSubmit: (title: string, content: string, apiKey?: string) => void;
  loading: boolean;
}

export const SeoForm: React.FC<SeoFormProps> = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [apiKey, setAPIKey] = useState<string | undefined>();

  const MAX_CHARACTERS = 1000;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title && content) {
      onSubmit(title, content, apiKey);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputContent = e.target.value;
    if (inputContent.length > MAX_CHARACTERS) {
      setContent(inputContent.slice(0, MAX_CHARACTERS));
    } else {
      setContent(inputContent);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pasteData = e.clipboardData.getData('text');
    const newValue = content + pasteData;

    if (newValue.length > MAX_CHARACTERS) {
      e.preventDefault();
      setContent(newValue.slice(0, MAX_CHARACTERS));
    }
  };

  return (
    <div className="w-full overflow-y-auto rounded-md border border-gray-200 bg-white p-6 shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="mb-2 block font-semibold text-gray-800">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={clsx(
              'w-full rounded-md border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2',
              {
                'focus:ring-cyan-500': !loading,
                'cursor-not-allowed opacity-50': loading,
              }
            )}
            placeholder="Enter your title here"
            disabled={loading}
          />
        </div>
        <div>
          <label className="mb-2 block font-semibold text-gray-800">Content:</label>
          <textarea
            value={content}
            onChange={handleContentChange}
            onPaste={handlePaste}
            className={clsx(
              'h-64 w-full rounded-md border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2',
              {
                'focus:ring-cyan-500': !loading,
                'cursor-not-allowed opacity-50': loading,
              }
            )}
            placeholder="Start writing your content here..."
            disabled={loading}
          ></textarea>
          <div className="text-right text-sm text-gray-500">
            {content.length}/{MAX_CHARACTERS} characters
          </div>
        </div>
        <div>
          <p className="mb-2">
            Want to avoid the character limit? Enter your own OpenAI API key below. You can get one{' '}
            <Link
              className="text-cyan-500 hover:text-cyan-700"
              href="https://platform.openai.com/signup"
              rel="noopener noreferrer"
              target="_blank"
            >
              here
            </Link>
            . We&apos;re currently using GPT-4 to handle the SEO suggestions.
          </p>
          <label className="sr-only mb-2 block font-semibold text-gray-800">API Key:</label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setAPIKey(e.target.value)}
            className={clsx(
              'w-full rounded-md border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2',
              {
                'focus:ring-cyan-500': !loading,
                'cursor-not-allowed opacity-50': loading,
              }
            )}
            placeholder="Enter your OpenAI API key here (optional)"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className={clsx(
            'w-full rounded-md py-3 font-semibold transition duration-200 focus:outline-none focus:ring-2',
            {
              'focus:ring-secondary bg-cyan-500 text-white hover:bg-opacity-90': !loading,
              'cursor-not-allowed bg-gray-400 text-gray-700': loading,
            }
          )}
          disabled={loading}
        >
          {loading ? 'Analyzing Content...' : 'Get SEO Suggestions'}
        </button>
      </form>
    </div>
  );
};
