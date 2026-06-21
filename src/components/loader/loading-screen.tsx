"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress > 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Trigger exit animation
        const tl = gsap.timeline({
          onComplete: () => setIsVisible(false)
        });
        
        tl.to(textRef.current, { y: -50, opacity: 0, duration: 0.5, ease: "power3.in" })
          .to(progressRef.current, { scaleX: 0, transformOrigin: "right", duration: 0.5, ease: "power3.inOut" }, "-=0.3")
          .to(containerRef.current, { 
            yPercent: -100, 
            duration: 0.8, 
            ease: "power4.inOut" 
          }, "-=0.2");
      }
      setProgress(currentProgress);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background text-foreground"
    >
      <div className="absolute inset-0 bg-background/50 backdrop-blur-3xl" />
      
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div ref={textRef} className="overflow-hidden">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mix-blend-difference">
            LOADING
          </h1>
        </div>
        
        <div className="w-64 max-w-[80vw] h-1 bg-border rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full bg-primary origin-left transition-transform duration-200 ease-out"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
        
        <div className="text-sm font-mono text-muted-foreground tabular-nums">
          {progress}%
        </div>
      </div>
    </div>
  );
}
