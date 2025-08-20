
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, ArrowLeft, Lightbulb } from 'lucide-react';
import { savePost } from '@/lib/posts';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { generatePost, GeneratePostInput } from '@/ai/flows/generate-post-flow';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { MarkdownEditor } from '@/components/markdown-editor';
import { Checkbox } from '@/components/ui/checkbox';


export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [published, setPublished] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');
  const { toast } = useToast();
  const router = useRouter();


  const handleGeneratePost = async () => {
    if (!title || !userPrompt) {
        toast({
            title: 'Title and Prompt Required',
            description: 'Please provide a title and a prompt to generate content.',
            variant: 'destructive'
        });
        return;
    }
    setIsGenerating(true);
    try {
        const generatedContent = await generatePost({ title, userPrompt });
        setContent(generatedContent);
        toast({
            title: 'Content Generated!',
            description: 'The AI has generated the blog post content for you.',
        });
    } catch (error) {
        console.error(error);
        toast({
            title: 'Generation Failed',
            description: 'Could not generate content. Please try again.',
            variant: 'destructive'
        });
    } finally {
        setIsGenerating(false);
    }
  }


  const handleSave = async () => {
    if (!title || !content || !category) {
        toast({
            title: 'Incomplete Form',
            description: 'Please fill out all fields before saving.',
            variant: 'destructive'
        });
        return;
    }

    setIsLoading(true);
    
    try {
        await savePost({ title, content, category, published, featured });

        toast({
          title: 'Post Saved!',
          description: 'Your new blog post has been saved successfully.',
        });
        
        router.push('/posts');

    } catch (error) {
        console.error(error);
        toast({
            title: 'Error',
            description: 'Failed to save the post. Please try again.',
            variant: 'destructive'
        });
    } finally {
        setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
         <div className="flex justify-start mb-4">
            <Button variant="outline" size="lg" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>
         </div>
         <Card className="bg-surface/50 border-border/50">
           <CardHeader>
            <div>
              <CardTitle className="text-primary text-2xl">Create a New Post</CardTitle>
              <CardDescription>
                Use the editor below to create a new blog post, or use AI to generate one for you.
              </CardDescription>
            </div>
           </CardHeader>
           <CardContent>
            <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Post Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., 'My First Blog Post'"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={setCategory} value={category} disabled={isLoading}>
                          <SelectTrigger id="category">
                              <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                              <SelectItem value="Front End">Front End</SelectItem>
                              <SelectItem value="Back End">Back End</SelectItem>
                              <SelectItem value="AI">AI</SelectItem>
                              <SelectItem value="Data">Data</SelectItem>
                              <SelectItem value="DevOps">DevOps</SelectItem>
                              <SelectItem value="Showcase">Showcase</SelectItem>
                              <SelectItem value="Cheatsheet">Cheatsheet</SelectItem>
                              <SelectItem value="Life Code">Life Code</SelectItem>
                              <SelectItem value="Search Code">Search Code</SelectItem>
                              <SelectItem value="Learn Code">Learn Code</SelectItem>
                          </SelectContent>
                      </Select>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <div className="flex items-center space-x-2 h-10">
                      <Switch
                        id="status"
                        checked={published}
                        onCheckedChange={setPublished}
                        disabled={isLoading}
                      />
                      <Label htmlFor="status">{published ? 'Published' : 'Draft'}</Label>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="featured"
                        checked={featured}
                        onCheckedChange={(checked) => setFeatured(Boolean(checked))}
                        disabled={isLoading}
                    />
                    <label
                        htmlFor="featured"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Mark as featured post
                    </label>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="content">Content (Markdown)</Label>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <Lightbulb className="mr-2 h-4 w-4" />
                                    Generate with AI
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Generate Post with AI</DialogTitle>
                                    <DialogDescription>
                                       Provide a prompt for the AI to generate the article content. The current title will be used.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="title-ai">Title</Label>
                                        <Input id="title-ai" value={title} readOnly disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="prompt-ai">Prompt</Label>
                                        <Textarea 
                                            id="prompt-ai"
                                            placeholder="e.g., 'Explain the benefits of using Next.js for web development, focusing on SSR and SEO advantages.'"
                                            value={userPrompt}
                                            onChange={(e) => setUserPrompt(e.target.value)}
                                            rows={5}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                      <Button type="button" variant="secondary">
                                        Cancel
                                      </Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                      <Button onClick={handleGeneratePost} disabled={isGenerating}>
                                        {isGenerating ? 'Generating...' : 'Generate'}
                                      </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <MarkdownEditor
                        value={content}
                        onChange={setContent}
                    />
                </div>
              </div>
           </CardContent>
           <CardFooter className="flex justify-start">
              <Button onClick={handleSave} disabled={isLoading} size="lg">
                {isLoading ? 'Saving...' : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Post
                  </>
                )}
              </Button>
           </CardFooter>
         </Card>
      </div>
    </div>
  );
}
