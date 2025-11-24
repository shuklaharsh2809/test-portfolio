"use client";

import BentoGrid from "@/components/BentoGrid";
import BentoItem from "@/components/BentoItem";
import { Code2, Database, Layout, Settings, Terminal, Wrench } from "lucide-react";

const skillCategories = [
    {
        title: "Frontend",
        icon: <Layout className="w-6 h-6 text-blue-400" />,
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js"],
        colSpan: 2,
    },
    {
        title: "Backend",
        icon: <Database className="w-6 h-6 text-green-400" />,
        skills: ["Node.js", "Express", "PostgreSQL", "Prisma", "MongoDB", "Redis"],
        colSpan: 1,
    },
    {
        title: "Tools & DevOps",
        icon: <Terminal className="w-6 h-6 text-orange-400" />,
        skills: ["Git", "Docker", "AWS", "CI/CD", "Linux", "Vercel"],
        colSpan: 1,
    },
    {
        title: "Design & Others",
        icon: <Wrench className="w-6 h-6 text-purple-400" />,
        skills: ["Figma", "UI/UX", "System Design", "Agile", "SEO"],
        colSpan: 2,
    },
];

export default function Skills() {
    return (
        <section id="skills" className="py-20 bg-muted/20">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Arsenal</h2>
                    <p className="text-muted-foreground max-w-xl">
                        The tools and technologies I use to bring ideas to life.
                    </p>
                </div>

                <BentoGrid>
                    {skillCategories.map((category, index) => (
                        <BentoItem key={category.title} colSpan={category.colSpan as 1 | 2} className="p-6 flex flex-col gap-4 hover:border-primary/50 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-muted/50">
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-bold">{category.title}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 rounded-md bg-muted text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </BentoItem>
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}
