
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Zap, Trophy, Target } from "lucide-react";

export default function AboutPage() {
  const skills = [
    "Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS",
    "Node.js", "GraphQL", "Firebase", "Vercel", "GenAI", "UI/UX Design"
  ];

  const experience = [
    {
      role: "Senior Frontend Engineer",
      company: "Tech Giant Inc.",
      period: "2020 - Present",
      description: "Leading the development of a large-scale, user-facing web application using Next.js and TypeScript. Focusing on performance, accessibility, and creating a world-class user experience."
    },
    {
      role: "Web Developer",
      company: "Creative Studio",
      period: "2018 - 2020",
      description: "Built and maintained responsive websites and web applications for a variety of clients. Worked closely with designers to bring creative visions to life."
    }
  ];
  
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-headline font-bold">About Me</h1>
        <p className="text-lg text-muted-foreground">A little bit about my journey, skills, and aspirations.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Briefcase className="h-6 w-6 text-primary" />
                My Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hello! I'm a passionate software engineer with a love for building beautiful, functional, and user-centric web experiences. My journey into tech started with a fascination for how things work, which quickly evolved into a career creating digital products that solve real-world problems.
              </p>
              <p>
                I thrive in collaborative environments and am always eager to learn new technologies and methodologies. When I'm not coding, you can find me exploring the latest in generative AI, contributing to open-source projects, or writing about my technical discoveries.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Trophy className="h-6 w-6 text-primary" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {experience.map((job, index) => (
                <div key={index} className="flex gap-4">
                  <div className="mt-1 h-5 w-5 flex-shrink-0">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{job.role} at {job.company}</h3>
                    <p className="text-sm text-muted-foreground">{job.period}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{job.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Zap className="h-6 w-6 text-primary" />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <Badge key={skill} variant="secondary" className="text-sm">{skill}</Badge>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Target className="h-6 w-6 text-primary" />
                Career Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p>To continue pushing the boundaries of front-end development, mentor aspiring developers, and contribute to innovative projects that make a positive impact.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
