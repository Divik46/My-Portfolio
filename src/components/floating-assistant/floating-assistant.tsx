"use client";

import { MessageSquare } from "lucide-react";
import Image from "next/image";

export function FloatingAssistant() {
  const phoneNumber = "919360731325";
  const message = "Hello Divik! I would like to discuss a project.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3 animate-floating group">
      
      {/* Tooltip / Speech Bubble */}
      <div className="glass bg-black/40 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl rounded-br-none opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pointer-events-none shadow-2xl flex items-center gap-3 origin-bottom-right">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <p className="text-sm font-semibold text-white/90">
          Hi! Need help?
        </p>
      </div>

      {/* Robot Button */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noreferrer"
        className="relative flex items-center justify-center w-16 h-16 transition-all duration-500 hover:scale-110 cursor-none overflow-visible"
      >
        
        {/* Online Indicator Dot */}
        <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-transparent rounded-full z-20" />

        {/* Profile Image */}
        <div className="relative z-10 w-full h-full group-hover:-translate-y-1 transition-all duration-500">
          <Image 
            src="/images/robot-assistant.png" 
            alt="Assistant Profile" 
            fill 
            className="object-contain drop-shadow-xl"
          />
        </div>
        
        {/* Pulse rings */}
        <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-30" style={{ animationDuration: "2s" }} />
        <div className="absolute inset-0 rounded-full border border-accent animate-ping opacity-20" style={{ animationDuration: "3s", animationDelay: "1s" }} />
      </a>
    </div>
  );
}
