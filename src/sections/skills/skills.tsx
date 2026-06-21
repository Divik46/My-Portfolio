"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/data/skills";

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWrapper = scrollWrapperRef.current;
      if (!scrollWrapper) return;

      const totalWidth = scrollWrapper.scrollWidth - window.innerWidth;

      gsap.to(scrollWrapper, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Animate individual skill cards as they come into view (horizontal)
      const cards = gsap.utils.toArray(".skill-card");
      cards.forEach((card: any) => {
        gsap.fromTo(card, 
          { opacity: 0, scale: 0.8, rotationY: 45 },
          { 
            opacity: 1, 
            scale: 1, 
            rotationY: 0,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getById("horizontalScroll") || undefined, // Wait, since it's scrubbed, we can use the main timeline or just rely on the horizontal move.
              start: "left right",
              end: "right left",
              horizontal: true,
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative h-screen bg-background flex items-center overflow-hidden">
      <div className="absolute top-20 left-10 z-10">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Skills.</span>.
        </h2>
        <p className="text-muted-foreground mt-2 max-w-sm">
          A collection of the technologies and tools I use to build fast, responsive, and modern web applications.
        </p>
      </div>

      <div 
        ref={scrollWrapperRef}
        className="flex items-center gap-8 px-10 pt-32 w-max"
      >
        {/* Spacer for initial view */}
        <div className="w-[25vw] flex-shrink-0" />

        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div 
              key={index} 
              className="skill-card flex-shrink-0 w-80 h-96 glass border border-white/10 rounded-3xl p-8 flex flex-col justify-between group hover:border-primary/50 transition-colors duration-500 magnetic relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 blur-3xl rounded-full group-hover:bg-primary/40 transition-colors duration-500" />
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <Icon className="text-3xl text-white group-hover:text-primary transition-colors duration-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{skill.name}</h3>
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">{skill.category}</span>
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm text-muted-foreground">Proficiency</span>
                  <span className="text-lg font-bold text-white">{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
        
        {/* End Spacer */}
        <div className="w-[100vw] flex-shrink-0 flex items-center justify-center">
          <p className="text-4xl font-black text-white/20 tracking-tighter">AND GROWING...</p>
        </div>
      </div>
    </section>
  );
}
