import { NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { z } from 'zod';
import { Suggestions } from '../../../types/suggestions';
import { generateSEOSuggestions } from './seoService';

const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60,
});

const requestSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

/**
 * Handles the POST request to generate SEO suggestions.
 * @param request - The HTTP request object.
 * @returns A JSON response with SEO suggestions or an error message.
 */
export async function POST(request: Request) {
  try {
    const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('remote_addr');

    if (clientIp) {
      await rateLimiter.consume(clientIp);
    } else {
      return NextResponse.json({ error: 'Unable to determine client IP address' }, { status: 400 });
    }

    const body = await request.json();
    const { title, content } = requestSchema.parse(body);

    const suggestions: Suggestions = await generateSEOSuggestions(title, content);

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error('Error generating SEO suggestions:', error);

    if (error instanceof z.ZodError) {
      // If the error is due to request validation, return a 400 status
      return NextResponse.json(
        { error: error.errors.map((e) => e.message).join(', ') },
        { status: 400 }
      );
    } else if (error instanceof Error && error.message === 'Rate limit exceeded') {
      // Handle rate limit errors
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const errorMessage = (error as Error).message || 'An unexpected error occurred';

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
