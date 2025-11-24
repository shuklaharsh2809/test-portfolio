"use client";

import BentoGrid from "@/components/BentoGrid";
import BentoItem from "@/components/BentoItem";
import Image from "next/image";
import CodeSnippet from "@/components/CodeSnippet";

export default function About() {
    return (
        <section id="about" className="py-20">
            <div className="container mx-auto px-6">
                <BentoGrid className="md:grid-cols-3">
                    <BentoItem colSpan={2} className="p-8 md:p-12 flex flex-col justify-center bg-muted/20 border-none">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
                        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                            <p>
                                I'm a passionate developer who loves turning complex problems into simple, beautiful, and intuitive designs. My journey in web development started with a curiosity about how things work on the internet, and it has evolved into a career where I get to build meaningful products.
                            </p>
                            <p>
                                When I'm not coding, you can find me exploring new technologies, contributing to open source, or sharing my knowledge with the community.
                            </p>
                        </div>
                    </BentoItem>
                    <BentoItem colSpan={1} className="relative min-h-[300px] md:min-h-full group">
                        <Image
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2787&auto=format&fit=crop"
                            alt="Profile"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute bottom-4 right-4 z-10 max-w-[200px] hidden md:block transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <CodeSnippet />
                        </div>
                    </BentoItem>
                </BentoGrid>
            </div>
        </section>
    );
}
