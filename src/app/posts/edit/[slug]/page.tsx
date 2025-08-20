
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save, Trash2 } from 'lucide-react';
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
} from "@/components/ui/alert-dialog"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkdownToolbar } from '@/components/editor/markdown-toolbar';

export default function EditPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [published, setPublished] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (typeof slug !== 'string') return;
    
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

  const handleToolbarAction = (syntax: 'bold' | 'italic' | 'code' | 'link' | 'list') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let newText;

    switch (syntax) {
      case 'bold':
        newText = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        newText = `*${selectedText || 'italic text'}*`;
        break;
      case 'code':
        newText = `\`\`\`\n${selectedText || 'code here'}\n\`\`\``;
        break;
      case 'link':
        const url = prompt("Enter the URL:");
        if (url) {
            newText = `[${selectedText || 'link text'}](${url})`;
        } else {
            return;
        }
        break;
       case 'list':
        newText = `\n- ${selectedText || 'List item'}`;
        break;
      default:
        return;
    }
    
    const updatedContent = content.substring(0, start) + newText + content.substring(end);
    setContent(updatedContent);
    textarea.focus();
    setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + newText.length;
    }, 0)
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
  }

  if (isLoading) {
    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <Card className="bg-surface/50 border-border/50">
                    <CardHeader>
                        <CardTitle className="text-primary text-2xl">Loading Editor...</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Loading post content...</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-surface/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-primary text-2xl">Edit Post</CardTitle>
            <CardDescription>
              Modify your blog post. Changes are previewed live on the right.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Editor Side */}
               <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Post Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., 'My First Blog Post'"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isSaving}
                  />
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select onValueChange={setCategory} value={category} disabled={isSaving}>
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
                            disabled={isSaving}
                          />
                          <Label htmlFor="status">{published ? 'Published' : 'Draft'}</Label>
                        </div>
                     </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content (Markdown)</Label>
                   <div className="border rounded-md">
                     <MarkdownToolbar onAction={handleToolbarAction} />
                     <Textarea
                        id="content"
                        ref={textareaRef}
                        placeholder="Write your article content here..."
                        rows={20}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        disabled={isSaving}
                        className="font-mono rounded-t-none border-t"
                      />
                  </div>
                </div>
              </div>

               {/* Preview Side */}
               <div>
                <Label className="text-muted-foreground">Live Preview</Label>
                <div className="mt-2 border rounded-lg p-4 h-full min-h-[500px] bg-background">
                  <article className="prose prose-lg dark:prose-invert max-w-full">
                    <h1>{title || 'Your Title Here'}</h1>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || "Your content will appear here..."}</ReactMarkdown>
                  </article>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleSave} disabled={isSaving} size="lg">
              {isSaving ? 'Saving...' : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isDeleting}>
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
