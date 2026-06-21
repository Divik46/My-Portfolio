"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Years Experience", value: 1.5, suffix: "+" },
  { label: "Projects Completed", value: 30, suffix: "+" },
  
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        anticipatePin: 1,
      });

      // Animations on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "+=50%",
          scrub: 1,
        }
      });

      tl.fromTo(imageRef.current, { x: -100, opacity: 0, scale: 0.8, rotation: -5 }, { x: 0, opacity: 1, scale: 1, rotation: 0, duration: 1 })
        .fromTo(textRef.current?.children || [], { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2, duration: 1 }, "-=0.5")
        .fromTo(statsRef.current?.children || [], { y: 30, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.5 }, "-=0.5");
        
      // Counter Animation
      const counters = document.querySelectorAll(".stat-value");
      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute("data-target") || "0");
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.to(counter, {
              innerHTML: target,
              duration: 2,
              ease: "power2.out",
              snap: { innerHTML: 1 },
              onUpdate: function() {
                counter.innerHTML = Math.round(this.targets()[0].innerHTML).toString();
              }
            });
          }
        });
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative min-h-screen flex items-center py-20 bg-background overflow-hidden">
      {/* Background Parallax text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
        ABOUT ME
      </div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left - Image */}
        <div ref={imageRef} className="relative aspect-square max-w-md mx-auto w-full group opacity-0">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full group-hover:bg-primary/40 transition-colors duration-500" />
          <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 glass">
            {/* Dummy Image using unsplash */}
            <Image 
              src="/images/profile.jpeg" 
              alt="Developer Portrait"
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            />
            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] mix-blend-overlay opacity-50" />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -right-6 glass border border-white/70 p-6 rounded-2xl animate-bounce" style={{ animationDuration: "3s" }}>
            <p className="text-sm ">Divik S</p>
            <p className="font-bold text-white">Frontend Developer</p>
          </div>
        </div>

        {/* Right - Text & Stats */}
        <div className="flex flex-col gap-8">
          <div ref={textRef} className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Modern</span> Web Experiences.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a Frontend Developer passionate about building modern, responsive, and user-focused websites. I specialize in creating clean interfaces, smooth interactions, and high-performance web experiences that work seamlessly across all devices.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With experience in WordPress, Next.js, React, JavaScript, HTML, CSS, Tailwind CSS. I develop scalable and maintainable websites that combine modern design with clean, efficient code.
            </p>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 gap-6 mt-4">
            {stats.map((stat, i) => (
              <div key={i} className="glass border border-white/10 p-6 rounded-2xl flex flex-col gap-2 hover:border-primary/50 transition-colors">
                <div className="text-4xl md:text-5xl font-black text-white flex items-baseline">
                  <span className="stat-value" data-target={stat.value}>0</span>
                  <span className="text-primary text-2xl ml-1">{stat.suffix}</span>
                </div>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
