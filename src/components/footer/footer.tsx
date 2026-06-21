"use client";

import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";

export function Footer() {
  const lenis = useLenis();

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-white/10 bg-background pt-16 pb-8 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="text-3xl font-bold tracking-tighter text-white">
              <span className="text-primary">&lt;</span>
              DEV
              <span className="text-primary">/&gt;</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Building award-winning digital experiences.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors p-2 magnetic">
              <FaGithub size={24} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors p-2 magnetic">
              <FaLinkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-white transition-colors p-2 magnetic">
              <FaTwitter size={24} />
              <span className="sr-only">Twitter</span>
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors group magnetic"
          >
            <span>Back to top</span>
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DEV Portfolio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
    </footer>
  );
}
