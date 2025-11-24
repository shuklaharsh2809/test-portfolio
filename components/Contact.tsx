"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-20 bg-muted/30">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Get In Touch</h2>
                    <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="flex flex-col items-center p-6 bg-card rounded-2xl border border-border">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                                <Mail size={24} />
                            </div>
                            <h3 className="font-semibold mb-2">Email</h3>
                            <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                                hello@example.com
                            </a>
                        </div>

                        <div className="flex flex-col items-center p-6 bg-card rounded-2xl border border-border">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                                <Phone size={24} />
                            </div>
                            <h3 className="font-semibold mb-2">Phone</h3>
                            <p className="text-muted-foreground">+1 (555) 123-4567</p>
                        </div>

                        <div className="flex flex-col items-center p-6 bg-card rounded-2xl border border-border">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                                <MapPin size={24} />
                            </div>
                            <h3 className="font-semibold mb-2">Location</h3>
                            <p className="text-muted-foreground">San Francisco, CA</p>
                        </div>
                    </div>

                    <a
                        href="mailto:hello@example.com"
                        className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                    >
                        Say Hello
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
