
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Twitter, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const socialLinks = [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-full space-y-8 text-center">
      <div className="relative w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 p-8 rounded-lg">
          <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-primary/20 shadow-lg">
            <AvatarImage src="https://placehold.co/200x200.png" alt="Your Name" data-ai-hint="professional portrait" />
            <AvatarFallback>YC</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center md:items-start gap-2">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
              Personal Canvas
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-md">
              Welcome to my digital canvas. I'm a passionate developer, writer, and creator, turning ideas into reality. Explore my work and thoughts.
            </p>
            <div className="flex items-center gap-4 mt-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  passHref
                >
                  <Button variant="outline" size="icon" aria-label={link.name}>
                    <link.icon className="h-5 w-5" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>
      </div>

      <div className="w-full max-w-4xl">
         <Card className="text-left bg-card/50">
           <CardHeader>
             <CardTitle className="font-headline text-2xl">Start Creating</CardTitle>
           </CardHeader>
           <CardContent>
             <p className="text-muted-foreground mb-4">
               Ready to brainstorm your next great piece of content? Use the AI-powered idea generator to get inspired.
             </p>
             <Link href="/content-ideas" passHref>
                <Button variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Generate Content Ideas <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
             </Link>
           </CardContent>
         </Card>
      </div>

    </div>
  );
}
