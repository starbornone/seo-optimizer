'use client';

import clsx from 'clsx';
import { FormEvent, useState } from 'react';

interface SeoFormProps {
  onSubmit: (title: string, content: string) => void;
  loading: boolean;
}

export const SeoForm: React.FC<SeoFormProps> = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const MAX_CHARACTERS = 1000;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title && content) {
      onSubmit(title, content);
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
          <label className="mb-2 block text-lg font-semibold text-gray-800">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={clsx(
              'w-full rounded-md border border-gray-200 px-4 py-3 text-lg focus:outline-none focus:ring-2',
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
          <label className="mb-2 block text-lg font-semibold text-gray-800">Content:</label>
          <textarea
            value={content}
            onChange={handleContentChange}
            onPaste={handlePaste}
            className={clsx(
              'h-64 w-full rounded-md border border-gray-200 px-4 py-3 text-lg focus:outline-none focus:ring-2',
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
        <button
          type="submit"
          className={clsx(
            'w-full rounded-md py-3 text-lg font-semibold transition duration-200 focus:outline-none focus:ring-2',
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
