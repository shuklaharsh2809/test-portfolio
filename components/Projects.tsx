"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import BentoGrid from "@/components/BentoGrid";
import BentoItem from "@/components/BentoItem";
import Link from "next/link";

const projects = [
    {
        title: "E-Commerce Dashboard",
        description: "A comprehensive dashboard for managing online stores, featuring real-time analytics, inventory management, and order processing.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        github: "#",
        demo: "#",
        colSpan: 2,
    },
    {
        title: "Task Management App",
        description: "A collaborative task management tool with drag-and-drop functionality, team workspaces, and progress tracking.",
        tags: ["React", "Redux", "Node.js", "Socket.io"],
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2372&auto=format&fit=crop",
        github: "#",
        demo: "#",
        colSpan: 1,
    },
    {
        title: "AI Content Generator",
        description: "An AI-powered application that generates blog posts, social media captions, and marketing copy using OpenAI's GPT-3.",
        tags: ["Next.js", "OpenAI API", "Stripe", "MongoDB"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop",
        github: "#",
        demo: "#",
        colSpan: 1,
    },
    {
        title: "Finance Tracker",
        description: "Personal finance tracking application with data visualization and budget planning tools.",
        tags: ["Vue.js", "D3.js", "Firebase"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2340&auto=format&fit=crop",
        github: "#",
        demo: "#",
        colSpan: 2,
    },
];

export default function Projects() {
    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
                        <p className="text-muted-foreground max-w-xl">
                            A selection of projects that showcase my passion for building robust and scalable applications.
                        </p>
                    </div>
                    <Link href="#projects" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium">
                        View all projects <ArrowUpRight size={18} />
                    </Link>
                </div>

                <BentoGrid>
                    {projects.map((project, index) => (
                        <BentoItem key={project.title} colSpan={project.colSpan as 1 | 2 | 3} className="group">
                            <div className="flex flex-col h-full">
                                <div className="relative h-64 w-full overflow-hidden border-b border-white/10">
                                    <div className="absolute top-3 left-3 z-10 flex gap-1.5 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                    </div>
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-[2px]">
                                        <a
                                            href={project.github}
                                            className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/10 backdrop-blur-md"
                                            title="View Code"
                                        >
                                            <Github size={20} />
                                        </a>
                                        <a
                                            href={project.demo}
                                            className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/10 backdrop-blur-md"
                                            title="View Demo"
                                        >
                                            <ExternalLink size={20} />
                                        </a>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2.5 py-1 rounded-md bg-white/5 text-white/70 text-xs font-medium border border-white/5"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        </BentoItem>
                    ))}
                </BentoGrid>
            </div>
        </section>
    );
}
