
'use server';

import { generateContentIdeas, ContentIdeasInput, ContentIdeasOutput } from '@/ai/flows/content-ideas';
import { z } from 'zod';

const FormSchema = z.object({
  keywords: z.string(),
  trendingTopics: z.string().optional(),
});

type ActionResponse = ContentIdeasOutput | { error: string };

export async function generateContentIdeasAction(input: ContentIdeasInput): Promise<ActionResponse> {
  const parsedInput = FormSchema.safeParse(input);

  if (!parsedInput.success) {
    return { error: 'Invalid input.' };
  }

  try {
    const ideas = await generateContentIdeas(parsedInput.data);
    return ideas;
  } catch (error) {
    console.error('Error generating content ideas:', error);
    return { error: 'Failed to generate ideas. Please try again.' };
  }
}
