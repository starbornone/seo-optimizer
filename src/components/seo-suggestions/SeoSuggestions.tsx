import { Suggestions } from '@/types/suggestions';

interface SeoSuggestionsProps {
  suggestions: Suggestions | null;
}

export const SeoSuggestions: React.FC<SeoSuggestionsProps> = ({ suggestions }) => {
  if (!suggestions) {
    return (
      <div className="w-full rounded-md border border-gray-200 bg-gray-100 p-6">
        <p className="text-gray-500">No suggestions yet. Start by entering your content.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-y-auto rounded-md border border-gray-200 bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-gray-800">SEO Suggestions</h2>
      <div className="space-y-4">
        <p>
          <strong className="text-lg">Title:</strong>{' '}
          <span className="font-medium">{suggestions.title}</span>
        </p>
        <p>
          <strong className="text-lg">Description:</strong>{' '}
          <span className="font-medium">{suggestions.description}</span>
        </p>
        <p>
          <strong className="text-lg">Keywords:</strong>{' '}
          <span className="font-medium">{suggestions.keywords.join(', ')}</span>
        </p>
      </div>
    </div>
  );
};
