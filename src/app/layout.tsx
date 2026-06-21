import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { CustomCursor } from "@/components/cursor/custom-cursor";
import { LoadingScreen } from "@/components/loader/loading-screen";
import { ProgressBar } from "@/components/progress-bar/progress-bar";
import { FloatingAssistant } from "@/components/floating-assistant/floating-assistant";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creative Developer | Portfolio",
  description: "Award-winning interactive developer portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
    >
      <body className="min-h-screen flex flex-col selection:bg-primary/30 selection:text-white">
        <LoadingScreen />
        <CustomCursor />
        <ProgressBar />
        <FloatingAssistant />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
