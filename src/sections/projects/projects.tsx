"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollWrapper = scrollWrapperRef.current;
      if (!scrollWrapper) return;

      // Animate the marquee: move left by 50% continuously for a seamless loop
      tweenRef.current = gsap.to(scrollWrapper, {
        xPercent: -50,
        ease: "none",
        duration: 30, // Adjust this value to change the scrolling speed
        repeat: -1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => tweenRef.current?.pause();
  const handleMouseLeave = () => tweenRef.current?.play();

  const featuredProjects = projects.slice(0, 9);

  return (
    <section id="projects" ref={sectionRef} className="py-32 bg-background relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Projects.</span>.
            </h2>
            <p className="text-lg text-muted-foreground">
              A showcase of my frontend and WordPress projects, highlighting responsive design, modern UI, clean code, and seamless user experiences.
            </p>
          </div>
          <Link 
            href="/projects" 
            className="group flex items-center gap-2 text-white font-semibold hover:text-primary transition-colors magnetic whitespace-nowrap"
          >
            View All Projects
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      <div 
        className="w-full relative py-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          ref={scrollWrapperRef}
          className="flex w-max"
        >
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-8 pr-8 w-max">
              {featuredProjects.map((project, index) => (
                <div 
                  key={`${project.id}-${setIndex}-${index}`} 
                  className="project-card flex-shrink-0 w-[85vw] md:w-[450px] group relative rounded-3xl overflow-hidden glass border border-white/10 flex flex-col view-project cursor-none"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80" />
                    
                    {/* Tech Stack Tags */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                      {project.tech.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-3 py-1 text-xs font-medium bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-white/90">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 relative z-10 -mt-10 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground text-sm flex-grow mb-6">{project.description}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-xs font-semibold uppercase tracking-widest text-primary">{project.category}</span>
                      <div className="flex gap-3">
                        <a href={project.github} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors">Code</a>
                        <a href={project.live} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors">Live</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 flex justify-center">
        <Link 
          href="/projects" 
          className="group relative px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-colors overflow-hidden magnetic"
        >
          <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 text-white font-semibold flex items-center gap-2">
            Explore All Projects
            <ArrowUpRight size={16} />
          </span>
        </Link>
      </div>
    </section>
  );
}
