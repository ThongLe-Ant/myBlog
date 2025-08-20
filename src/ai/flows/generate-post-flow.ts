
'use server';
/**
 * @fileOverview A flow for generating blog post articles using AI.
 *
 * - generatePost - A function that handles the article generation process.
 * - GeneratePostInput - The input type for the generatePost function.
 * - GeneratePostOutput - The return type for the generatePost function (which is just a string).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePostInputSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
  userPrompt: z.string().describe('The user-provided prompt detailing what the article should be about.'),
});
export type GeneratePostInput = z.infer<typeof GeneratePostInputSchema>;

// The output is a raw markdown string
export type GeneratePostOutput = string;

export async function generatePost(input: GeneratePostInput): Promise<GeneratePostOutput> {
  return generatePostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePostPrompt',
  input: { schema: GeneratePostInputSchema },
  prompt: `You are an expert technical writer and senior software engineer.
Your audience consists of other developers and tech enthusiasts.
Your writing style is clear, concise, and informative.

Generate a full blog post article based on the following title and user prompt.

The article should be well-structured and written in Markdown format.
Use headings, subheadings, lists, and code blocks where appropriate to make the content easy to read and understand.
Start with a compelling introduction and end with a concluding summary.

Article Title: {{{title}}}

User Prompt:
{{{userPrompt}}}

Return only the raw Markdown content of the article. Do not include any other text or explanations.
`,
});

const generatePostFlow = ai.defineFlow(
  {
    name: 'generatePostFlow',
    inputSchema: GeneratePostInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const { text } = await prompt(input);
    return text;
  }
);
