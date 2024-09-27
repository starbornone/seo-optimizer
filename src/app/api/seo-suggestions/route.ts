import { NextResponse } from 'next/server';
import { Suggestions } from '../../../types/suggestions';
import { generateSEOSuggestions } from './seoService';

/**
 * Handles the POST request to generate SEO suggestions.
 * @param request - The HTTP request object.
 * @returns A JSON response with SEO suggestions or an error message.
 */
export async function POST(request: Request) {
  try {
    const { title, content } = (await request.json()) as { title: string; content: string };

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const suggestions: Suggestions = await generateSEOSuggestions(title, content);

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error('Error generating SEO suggestions:', error);

    const errorMessage = (error as Error).message || 'An unexpected error occurred';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
