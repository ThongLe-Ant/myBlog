
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { savePost } from '@/lib/posts';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import dynamic from 'next/dynamic';

import 'easymde/dist/easymde.min.css';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });


export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [published, setPublished] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

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
        await savePost({ title, content, category, published });

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
  
  const editorOptions = useMemo(() => {
    return {
        autofocus: true,
        spellChecker: false,
        toolbar: [
            "bold", "italic", "heading", "|", 
            "quote", "unordered-list", "ordered-list", "|",
            "link", "image", "|",
            "preview", "side-by-side", "fullscreen", "|",
            "guide"
        ],
    };
  }, []);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
         <Card className="bg-surface/50 border-border/50">
           <CardHeader>
             <CardTitle className="text-primary text-2xl">Create a New Post</CardTitle>
             <CardDescription>
               Use the editor below to create a new blog post.
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
                <div className="space-y-2">
                  <Label htmlFor="content">Content (Markdown)</Label>
                    <SimpleMDE
                        id="content"
                        value={content}
                        onChange={setContent}
                        options={editorOptions}
                    />
                </div>
              </div>
           </CardContent>
           <CardFooter>
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
