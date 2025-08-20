
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function EditPostPage() {
  const { slug } = useParams();
  // In a real app, you would fetch the post data based on the slug
  const [title, setTitle] = useState(`Editing Post: ${slug}`);
  const [content, setContent] = useState('Loading post content...');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    // TODO: Implement the logic to save the post
    console.log('Saving post:', { slug, title, content });

    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: 'Post Updated!',
      description: 'Your blog post has been updated successfully.',
    });

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-surface/50 border-border/50">
          <CardHeader>
            <CardTitle className="text-primary text-2xl">Edit Post</CardTitle>
            <CardDescription>
              Modify your blog post here. Your changes will be saved upon submission.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown)</Label>
              <Textarea
                id="content"
                placeholder="Write your article content here. Use Markdown for formatting..."
                rows={15}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={isLoading} size="lg">
              {isLoading ? 'Saving...' : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
