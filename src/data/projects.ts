export const projects = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  title: `Premium Project ${i + 1}`,
  description: "An award-winning digital experience built with Next.js, GSAP, and WebGL.",
  image: `https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=800&q=80`,
  tech: ["Next.js", "GSAP", "TailwindCSS"],
  category: i % 3 === 0 ? "E-Commerce" : i % 2 === 0 ? "Corporate" : "Creative",
  github: "https://github.com",
  live: "https://example.com"
}));
