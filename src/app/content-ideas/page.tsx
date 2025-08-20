
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { generateContentIdeasAction } from './actions';
import { Loader2, Lightbulb, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const FormSchema = z.object({
  keywords: z.string().min(2, {
    message: 'Keywords must be at least 2 characters.',
  }),
  trendingTopics: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function ContentIdeasPage() {
  const [result, setResult] = useState<{ ideas: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keywords: '',
      trendingTopics: '',
    },
  });

  async function onSubmit(data: FormValues) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await generateContentIdeasAction(data);
      if ('error' in response) {
        setError(response.error);
      } else {
        setResult(response);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
       <header className="space-y-2">
        <h1 className="text-4xl font-headline font-bold">AI Content Idea Generator</h1>
        <p className="text-lg text-muted-foreground">Unleash your creativity. Let AI help you brainstorm your next big idea.</p>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Brainstorming Session</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keywords</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Next.js, AI, Personal Growth" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter comma-separated keywords related to your content.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trendingTopics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trending Topics (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Rise of App Router, AI in web development"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Add any current trends to make your content more relevant.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Ideas
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {loading && <ResultsSkeleton />}
      
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && result.ideas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Generated Ideas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {result.ideas.map((idea, index) => (
                <li key={index} className="flex items-start gap-3 p-3 rounded-md bg-background hover:bg-muted/50 transition-colors">
                  <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-foreground">{idea}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-48" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-start gap-3 p-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-5 flex-1" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
