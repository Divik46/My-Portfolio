"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, MapPin, Phone, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      tl.fromTo(leftColRef.current?.children || [], 
        { x: -50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      )
      .fromTo(formRef.current?.children || [], 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Column */}
        <div ref={leftColRef} className="flex flex-col gap-8">
          <div>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-4">
              Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Talk</span>.
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Have a project in mind or just want to say hi? Feel free to reach out. I&apos;m always open to discussing new opportunities.
            </p>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors">
                <Mail className="text-white group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <a href="mailto:divik9360@gmail.com" className="text-lg font-semibold text-white hover:text-primary transition-colors">divik9360@gmail.com</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors">
                <Phone className="text-white group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <a href="tel:+91 9360731325" className="text-lg font-semibold text-white hover:text-primary transition-colors">+91 9360731325</a>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors">
                <MapPin className="text-white group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-lg font-semibold text-white">Theni, Tamil Nadu, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="glass border border-white/10 p-8 md:p-12 rounded-3xl relative">
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            
            <div className="relative group">
              <input 
                {...register("name")}
                type="text" 
                id="name"
                className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-primary transition-colors peer placeholder-transparent"
                placeholder="Name"
              />
              <label 
                htmlFor="name" 
                className="absolute left-0 top-4 text-muted-foreground transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary"
              >
                Your Name
              </label>
              {errors.name && <span className="text-xs text-destructive mt-1 absolute -bottom-5 left-0">{errors.name.message}</span>}
            </div>

            <div className="relative group mt-4">
              <input 
                {...register("email")}
                type="email" 
                id="email"
                className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-primary transition-colors peer placeholder-transparent"
                placeholder="Email"
              />
              <label 
                htmlFor="email" 
                className="absolute left-0 top-4 text-muted-foreground transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary"
              >
                Your Email
              </label>
              {errors.email && <span className="text-xs text-destructive mt-1 absolute -bottom-5 left-0">{errors.email.message}</span>}
            </div>

            <div className="relative group mt-4 mb-4">
              <textarea 
                {...register("message")}
                id="message"
                rows={4}
                className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-primary transition-colors peer placeholder-transparent resize-none"
                placeholder="Message"
              />
              <label 
                htmlFor="message" 
                className="absolute left-0 top-4 text-muted-foreground transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary"
              >
                Your Message
              </label>
              {errors.message && <span className="text-xs text-destructive mt-1 absolute -bottom-5 left-0">{errors.message.message}</span>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="group relative w-full overflow-hidden rounded-full btn-animated-multi px-8 py-4 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 magnetic shadow-lg hover:shadow-primary/50"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 text-white transition-colors">
                {isSubmitting ? "Sending..." : isSuccess ? "Message Sent!" : "Send Message"}
                {!isSubmitting && !isSuccess && <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
