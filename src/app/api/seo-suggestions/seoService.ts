import { Suggestions } from '@/types/suggestions';
import OpenAI from 'openai';

/**
 * Initializes the OpenAI client with the provided or default API key.
 * @param apiKey - The API key to use, optional.
 * @returns An instance of the OpenAI client.
 */
function initializeOpenAI(apiKey?: string): OpenAI {
  const key = apiKey || process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error(
      'No API key provided. Set apiKey or define OPENAI_API_KEY in environment variables.'
    );
  }
  return new OpenAI({ apiKey: key });
}

/**
 * Generates SEO suggestions based on the provided title and content.
 * @param title - The title of the content.
 * @param content - The main content to generate SEO suggestions for.
 * @param apiKey - Optional API key for OpenAI.
 * @returns A promise that resolves to the SEO suggestions.
 */
export async function generateSEOSuggestions(
  title: string,
  content: string,
  apiKey?: string
): Promise<Suggestions> {
  const MAX_INPUT_LENGTH = 1000;
  if (content.length > MAX_INPUT_LENGTH) {
    throw new Error(`Input exceeds the maximum length of ${MAX_INPUT_LENGTH} characters.`);
  }

  const openai = initializeOpenAI(apiKey);

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
      model: 'gpt-4',
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const completionText = chatCompletion.choices[0]?.message?.content?.trim() || '';
    const suggestions: Suggestions = JSON.parse(completionText);

    if (!suggestions.title || !suggestions.description || !Array.isArray(suggestions.keywords)) {
      throw new Error('Invalid suggestions format returned by OpenAI.');
    }

    return suggestions;
  } catch (error) {
    console.error('Error generating SEO suggestions:', error);
    throw new Error('Failed to generate SEO suggestions. Please try again later.');
  }
}
