// src/ai/flows/content-ideas.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating blog content ideas based on keywords and trending topics.
 *
 * - `generateContentIdeas` - A function that takes keywords and optional trending topics and returns a list of blog post ideas.
 * - `ContentIdeasInput` - The input type for the `generateContentIdeas` function.
 * - `ContentIdeasOutput` - The output type for the `generateContentIdeas` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContentIdeasInputSchema = z.object({
  keywords: z.string().describe('Keywords related to the desired blog content.'),
  trendingTopics: z
    .string()
    .optional()
    .describe('Optional trending topics to incorporate into the content ideas.'),
});
export type ContentIdeasInput = z.infer<typeof ContentIdeasInputSchema>;

const ContentIdeasOutputSchema = z.object({
  ideas: z.array(z.string()).describe('A list of blog post ideas.'),
});
export type ContentIdeasOutput = z.infer<typeof ContentIdeasOutputSchema>;

export async function generateContentIdeas(input: ContentIdeasInput): Promise<ContentIdeasOutput> {
  return generateContentIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contentIdeasPrompt',
  input: {schema: ContentIdeasInputSchema},
  output: {schema: ContentIdeasOutputSchema},
  prompt: `You are a blog content creation expert. Generate a list of blog post ideas based on the following keywords and trending topics.

Keywords: {{{keywords}}}

{{~#if trendingTopics}}
Trending Topics: {{{trendingTopics}}}
{{~/if}}

Blog Post Ideas:
`, // Ensure the output is formatted as a list of ideas.
});

const generateContentIdeasFlow = ai.defineFlow(
  {
    name: 'generateContentIdeasFlow',
    inputSchema: ContentIdeasInputSchema,
    outputSchema: ContentIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
