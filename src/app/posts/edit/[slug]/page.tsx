
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, Trash2, ArrowLeft, Lightbulb } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { getPostBySlug, updatePost, deletePost, Post } from '@/lib/posts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { generatePost } from '@/ai/flows/generate-post-flow';
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

export default function EditPostPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [published, setPublished] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userPrompt, setUserPrompt] = useState('');

  useEffect(() => {
    if (typeof slug !== 'string') {
        router.push('/posts');
        return;
    }
    
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const postData = await getPostBySlug(slug as string);
        if (postData) {
          setPost(postData);
          setTitle(postData.title);
          setContent(postData.content);
          setCategory(postData.category);
          setPublished(postData.published);
        } else {
          toast({
            title: 'Error',
            description: 'Post not found.',
            variant: 'destructive',
          });
          router.push('/posts');
        }
      } catch (error) {
        console.error(error);
        toast({
            title: 'Error',
            description: 'Failed to fetch the post.',
            variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug, toast, router]);

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
            title: 'Content Regenerated!',
            description: 'The AI has regenerated the blog post content for you.',
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
  };

  const handleSave = async () => {
    if (!title || !content || !category) {
        toast({
            title: 'Incomplete Form',
            description: 'Please fill out all fields before saving.',
            variant: 'destructive'
        });
        return;
    }
    
    if (!post) return;

    setIsSaving(true);
    try {
        await updatePost(post.slug, post.category, { title, content, category, published });
        toast({
            title: 'Post Updated!',
            description: 'Your blog post has been updated successfully.',
        });
        router.push('/posts');
    } catch (error) {
        console.error(error);
        toast({
            title: 'Error',
            description: 'Failed to update the post. Please try again.',
            variant: 'destructive'
        });
    } finally {
        setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!post) return;

    setIsDeleting(true);
    try {
        await deletePost(post.slug, post.category);
        toast({
            title: 'Post Deleted!',
            description: 'The blog post has been successfully deleted.',
        });
        router.push('/posts');
    } catch (error) {
        console.error(error);
        toast({
            title: 'Error',
            description: 'Failed to delete the post. Please try again.',
            variant: 'destructive'
        });
    } finally {
        setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Card className="bg-surface/50 border-border/50">
                    <CardHeader>
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Skeleton className="h-10 w-full" />
                        <div className="grid grid-cols-2 gap-6">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <Skeleton className="h-64 w-full" />
                    </CardContent>
                    <CardFooter>
                        <Skeleton className="h-11 w-32" />
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-surface/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-primary text-2xl">Edit Post</CardTitle>
            <CardDescription>
              Modify your blog post using the editor below.
            </CardDescription>
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
                    disabled={isSaving || isDeleting}
                  />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={setCategory} value={category} disabled={isSaving || isDeleting}>
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
                            disabled={isSaving || isDeleting}
                          />
                          <Label htmlFor="status">{published ? 'Published' : 'Draft'}</Label>
                        </div>
                     </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="content">Content (Markdown)</Label>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <Lightbulb className="mr-2 h-4 w-4" />
                                    Regenerate with AI
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Regenerate Post with AI</DialogTitle>
                                    <DialogDescription>
                                       Provide a new prompt for the AI to regenerate the article content based on the current title.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="title-ai">Title</Label>
                                        <Input id="title-ai" value={title} readOnly disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="prompt-ai">New Prompt</Label>
                                        <Textarea
                                            id="prompt-ai"
                                            placeholder="e.g., 'Rewrite the article to be more beginner-friendly.'"
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
                                        {isGenerating ? 'Generating...' : 'Regenerate'}
                                      </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                   <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your post content here..."
                        rows={15}
                        disabled={isSaving || isDeleting}
                    />
                </div>
              </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-4">
                <Button onClick={handleSave} disabled={isSaving || isDeleting} size="lg">
                  {isSaving ? 'Saving...' : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button variant="outline" size="lg" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                 </Button>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isDeleting || isSaving}>
                  <Trash2 className="mr-2 h-4 w-4" />
                   {isDeleting ? 'Deleting...' : 'Delete Post'}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    post and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

