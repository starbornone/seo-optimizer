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
      content: `You are an SEO expert with extensive experience in optimizing content for better search engine rankings. Your task is to assist users in improving titles, descriptions, and keywords for their website content.`,
    },
    {
      role: 'user',
      content: `
  As an SEO expert, improve the following content for search engine optimization. Carefully analyze the input to generate a better SEO title, description, and keyword list.
  
  **Input:**
  - Title: "${title}"
  - Content: "${content}"
  
  **Requirements:**
  1. Provide a new, optimized SEO-friendly title that is concise and captures the essence of the content.
  2. Draft a compelling and keyword-rich meta description (up to 160 characters) to improve click-through rates.
  3. Suggest 3-8 relevant and high-impact keywords derived from the given content.
  
  **Output Format (in strict JSON):**
  {
    "title": "Your suggested title",
    "description": "Your suggested description",
    "keywords": ["keyword1", "keyword2", "keyword3", "keyword4"]
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
