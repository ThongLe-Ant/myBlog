
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, Trash2, ArrowLeft } from 'lucide-react';
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
import { MarkdownEditor } from '@/components/markdown-editor';
import { Skeleton } from '@/components/ui/skeleton';


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
                  <Label htmlFor="content">Content (Markdown)</Label>
                   <MarkdownEditor
                        value={content}
                        onChange={setContent}
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
                <Button variant="outline" size="lg" onClick={() => router.back()} disabled={isSaving || isDeleting}>
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
                  </description>
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

    