"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section id="home" className="pt-32 pb-16 md:pt-48 md:pb-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-2 mb-8">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                            </span>
                            <span className="text-sm font-medium text-indigo-300/80 tracking-wide uppercase">Available for new projects</span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]">
                            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">digital products</span>, brands, and experiences.
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
                            I'm a Full Stack Developer focused on creating scalable, accessible, and performant web applications.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap items-center gap-6"
                    >
                        <Link
                            href="#projects"
                            className="px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all hover:scale-105 flex items-center gap-2 text-lg"
                        >
                            View Work <ArrowRight size={20} />
                        </Link>

                        <div className="flex items-center gap-4 ml-4">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10">
                                <Github size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10">
                                <Linkedin size={24} />
                            </a>
                            <a href="mailto:hello@example.com" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10">
                                <Mail size={24} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
