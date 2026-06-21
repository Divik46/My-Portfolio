"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { builders } from "@/data/expertise";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards reveal
      const cards = gsap.utils.toArray(".expertise-card");
      cards.forEach((card: any) => {
        gsap.fromTo(card, 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="expertise" ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            WordPress <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Expertise</span>.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experienced with Avada, Elementor, Bricks Builder, WooCommerce, WPBakery Page Builder, and Gutenberg to build modern, responsive, and high-performance WordPress websites.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {builders.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id} 
                className="expertise-card glass border border-white/10 p-8 rounded-3xl hover:border-primary/40 transition-all duration-500 group relative overflow-hidden flex flex-col justify-between"
              >
                {/* Background Glow */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-secondary/10 blur-3xl rounded-full group-hover:bg-secondary/20 transition-colors duration-500" />
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Icon className="text-2xl text-white group-hover:text-primary transition-colors duration-500" />
                    </div>
                    <span className="text-xs font-semibold text-primary/80 bg-primary/5 border border-primary/10 px-3 py-1 rounded-full">
                      {item.experience}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-all duration-300">
                    {item.name}
                  </h3>
                  <p className="text-sm text-primary/80 font-medium tracking-wide uppercase mb-4">
                    {item.category}
                  </p>
                  <p className="text-muted-foreground/80 leading-relaxed text-sm mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {item.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/5 text-muted-foreground group-hover:border-white/10 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
