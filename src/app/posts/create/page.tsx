
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { generatePost } from '@/ai/flows/generate-post-flow';
import { Loader, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedMarkdown, setGeneratedMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!title || !prompt) {
      toast({
        title: 'Missing Fields',
        description: 'Please provide both a title and a prompt for the article.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    setGeneratedMarkdown('');
    
    try {
      const markdown = await generatePost({ title, userPrompt: prompt });
      setGeneratedMarkdown(markdown);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Generation Failed',
        description: 'An error occurred while generating the article. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (generatedMarkdown) {
      navigator.clipboard.writeText(generatedMarkdown);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-surface/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-primary text-2xl">Create a New Article with AI</CardTitle>
            <CardDescription>
              Provide a title and a prompt, and let AI generate a draft for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Article Title</Label>
              <Input
                id="title"
                placeholder="e.g., 'Introduction to Microservices Architecture'"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prompt">Your Prompt for the AI</Label>
              <Textarea
                id="prompt"
                placeholder="e.g., 'Write a blog post explaining the core concepts of microservices, their benefits, and challenges. Include a real-world example.'\'\'\'"
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerate} disabled={isLoading} size="lg">
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Article'
              )}
            </Button>
          </CardFooter>
        </Card>

        {generatedMarkdown && (
          <Card className="mt-8 bg-surface/50 border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-primary">Generated Article</CardTitle>
                <CardDescription>Review the generated markdown below.</CardDescription>
              </div>
              <Button onClick={handleCopy} variant="outline" size="icon" aria-label="Copy markdown">
                {hasCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none p-4 bg-background rounded-md border border-border">
                <pre className="whitespace-pre-wrap font-mono text-sm">{generatedMarkdown}</pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
