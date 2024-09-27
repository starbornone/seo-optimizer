import { Suggestions } from '@/types/suggestions';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/**
 * Generates SEO suggestions based on the provided title and content.
 * @param title - The title of the content.
 * @param content - The main content to generate SEO suggestions for.
 * @returns A promise that resolves to the SEO suggestions.
 */
export async function generateSEOSuggestions(title: string, content: string): Promise<Suggestions> {
  const messages: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: 'You are an SEO expert that helps improve website content.',
    },
    {
      role: 'user',
      content: `As an SEO expert, improve the following content.

Given the title:
"${title}"

And the content:
"${content}"

Provide a better SEO title, description, and keywords in JSON format like:
{
  "title": "Your suggested title",
  "description": "Your suggested description",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}`,
    },
  ];

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const completionText = chatCompletion.choices[0]?.message?.content?.trim() || '';

    const suggestions: Suggestions = JSON.parse(completionText);

    if (!suggestions.title || !suggestions.description || !Array.isArray(suggestions.keywords)) {
      throw new Error('Invalid suggestions format from AI');
    }

    return suggestions;
  } catch (error) {
    console.error('Error generating SEO suggestions:', error);
    throw new Error('Failed to generate SEO suggestions');
  }
}
