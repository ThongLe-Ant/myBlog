
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "AI Content Idea Generator",
    description: "A full-stack application leveraging GenAI to help creators brainstorm blog and content ideas. Built with Next.js, Tailwind CSS, and Google's Gemini.",
    tags: ["Next.js", "GenAI", "TypeScript", "Vercel"],
    image: "https://placehold.co/600x400.png",
    github: "https://github.com",
    demo: "/content-ideas",
    aiHint: "abstract code"
  },
  {
    title: "E-commerce Platform",
    description: "A modern, responsive e-commerce storefront with features like product search, filtering, and a secure checkout process.",
    tags: ["React", "GraphQL", "Node.js", "Stripe"],
    image: "https://placehold.co/600x400.png",
    github: "https://github.com",
    demo: "#",
    aiHint: "online shopping"
  },
  {
    title: "Data Visualization Dashboard",
    description: "An interactive dashboard for visualizing complex datasets, helping businesses make data-driven decisions. Built with D3.js and React.",
    tags: ["React", "D3.js", "Data Viz"],
    image: "https://placehold.co/600x400.png",
    github: "https://github.com",
    demo: "#",
    aiHint: "charts graphs"
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-headline font-bold">My Projects</h1>
        <p className="text-lg text-muted-foreground">A selection of my work. See what I've been building.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.title} className="flex flex-col">
            <CardHeader className="flex-grow">
              <div className="aspect-video relative w-full rounded-md overflow-hidden mb-4">
                 <Image src={project.image} alt={project.title} fill objectFit="cover" data-ai-hint={project.aiHint} />
              </div>
              <CardTitle className="font-headline">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Link href={project.github} target="_blank" rel="noopener noreferrer" passHref>
                <Button variant="outline" size="sm">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </Link>
              <Link href={project.demo} target={project.demo.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" passHref>
                <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Demo
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
