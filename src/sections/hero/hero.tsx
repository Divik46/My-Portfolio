"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Download } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.fromTo(gridRef.current, { opacity: 0 }, { opacity: 0.3, duration: 2, ease: "power2.inOut" })
        .fromTo(textRef.current, { y: 100, opacity: 0, rotationX: -90 }, { y: 0, opacity: 1, rotationX: 0, duration: 1.5, ease: "back.out(1.7)", transformOrigin: "bottom center" }, "-=1.5")
        .fromTo(subtextRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=1")
        .fromTo(buttonsRef.current?.children || [], { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" }, "-=0.8")
        .fromTo(rightColRef.current, { x: 100, opacity: 0, scale: 0.8 }, { x: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }, "-=1.5");

      // Floating animation for right column elements
      gsap.to(".floating-element", {
        y: "-=30",
        rotation: "+=5",
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.5
      });

      // Exit Animation on Scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        animation: gsap.timeline()
          .to(containerRef.current, { scale: 0.9, opacity: 0, y: 100 })
      });

      // Mouse Parallax Effect
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to(rightColRef.current, {
          x: x * 2,
          y: y * 2,
          rotationY: x,
          rotationX: -y,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden perspective-1000"
    >
      {/* Background Grid */}
      <div 
        ref={gridRef}
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-0 pointer-events-none"
      />
      
      {/* Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-secondary/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="flex flex-col items-start text-left">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></span>
            Let's Build Together
          </div>
          
          <h1 
            ref={textRef}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-6 drop-shadow-2xl opacity-0"
          >
            FRONTEND <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            DEVELOPER
            </span>
          </h1>
          
          <p 
            ref={subtextRef}
            className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 opacity-0"
          >
           Passionate about building fast, responsive, and visually appealing websites that combine performance with exceptional user experiences.
          </p>
          
          <div ref={buttonsRef} className="flex flex-wrap items-center gap-4">
            <a 
              href="#projects" 
              className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-background transition-transform hover:scale-105 active:scale-95 magnetic"
            >
              View Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="/resume.pdf" 
              target="_blank"
              className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:scale-105 active:scale-95 magnetic"
            >
              Download CV
              <Download size={16} className="transition-transform group-hover:-translate-y-1" />
            </a>
          </div>
        </div>

        {/* Right Column - 3D Elements Placeholder */}
        <div 
          ref={rightColRef}
          className="relative h-[500px] hidden lg:flex items-center justify-center transform-style-3d opacity-0"
        >
          {/* Abstract 3D composition with CSS */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full max-w-md max-h-md">
              <div className="floating-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-primary to-secondary rounded-2xl blur-xl opacity-50" />
              <div className="floating-element absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-background border border-white/10 rounded-2xl shadow-2xl backdrop-blur-3xl glass z-10 flex items-center justify-center">
                 <div className="text-6xl font-black text-white/20 tracking-tighter">DEV</div>
              </div>
              
              {/* Decorative floating elements */}
              <div className="floating-element absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full blur-md opacity-80" />
              <div className="floating-element absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-tr from-secondary to-purple-500 rounded-lg blur-sm opacity-60" style={{ animationDelay: "1s" }} />
              <div className="floating-element absolute top-1/4 -left-8 w-12 h-12 border-4 border-primary/30 rounded-full" style={{ animationDelay: "2s" }} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
