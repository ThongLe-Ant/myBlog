
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function AppFooter() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  ];

  return (
    <footer className="border-t bg-background/80 px-4 py-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Personal Canvas. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={link.name}
            >
              <link.icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
