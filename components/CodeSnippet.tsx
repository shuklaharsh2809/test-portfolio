"use client";

import { cn } from "@/lib/utils";

export default function CodeSnippet({ className }: { className?: string }) {
    return (
        <div className={cn("font-mono text-xs leading-relaxed p-4 rounded-lg bg-black/40 border border-white/5 text-muted-foreground select-none pointer-events-none", className)}>
            <div className="flex gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-white/10" />
            </div>
            <div>
                <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = {"{"}
            </div>
            <div className="pl-4">
                <span className="text-white/60">name:</span> <span className="text-green-400">"Harsh Shukla"</span>,
            </div>
            <div className="pl-4">
                <span className="text-white/60">role:</span> <span className="text-green-400">"Full Stack Dev"</span>,
            </div>
            <div className="pl-4">
                <span className="text-white/60">passion:</span> <span className="text-green-400">"Building cool stuff"</span>
            </div>
            <div>{"}"}</div>
        </div>
    );
}
