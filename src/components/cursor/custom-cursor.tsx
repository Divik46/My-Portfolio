"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if device has pointer fine (desktop)
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsDesktop(true);
    }
  }, []);

  useEffect(() => {
    if (!isDesktop || !cursorRef.current) return;

    const cursor = cursorRef.current;
    const cursorText = cursorTextRef.current;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.closest("a") || target.closest("button") || target.closest(".magnetic")) {
        gsap.to(cursor, { scale: 2.5, backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)", duration: 0.3 });
      } else if (target.closest(".view-project")) {
        gsap.to(cursor, { scale: 3, backgroundColor: "rgba(0,0,0,0.8)", border: "none", duration: 0.3 });
        if (cursorText) {
          cursorText.innerText = "View";
          gsap.to(cursorText, { opacity: 1, duration: 0.3 });
        }
      } else {
        gsap.to(cursor, { scale: 1, backgroundColor: "transparent", backdropFilter: "blur(0px)", border: "1px solid rgba(255,255,255,0.5)", duration: 0.3 });
        if (cursorText) {
          gsap.to(cursorText, { opacity: 0, duration: 0.3 });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[100] flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 mix-blend-difference transition-colors"
    >
      <div
        ref={cursorTextRef}
        className="text-[6px] font-bold uppercase tracking-widest text-white opacity-0"
      ></div>
    </div>
  );
}
