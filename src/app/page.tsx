import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { Hero } from "@/sections/hero/hero";
import { About } from "@/sections/about/about";
import { Skills } from "@/sections/skills/skills";
import { Projects } from "@/sections/projects/projects";
import { Experience } from "@/sections/experience/experience";
import { Contact } from "@/sections/contact/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col bg-background relative z-0">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
