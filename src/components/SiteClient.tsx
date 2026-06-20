"use client";

import dynamic from "next/dynamic";
import { useGitHubData } from "@/hooks/useGitHubData";
import SmoothScroll from "@/components/site/SmoothScroll";
import Nav from "@/components/site/Nav";
import AvatarGuide from "@/components/site/AvatarGuide";
import Hero from "@/components/site/sections/Hero";
import About from "@/components/site/sections/About";
import Skills from "@/components/site/sections/Skills";
import Projects from "@/components/site/sections/Projects";
import Research from "@/components/site/sections/Research";
import Achievements from "@/components/site/sections/Achievements";
import Contact from "@/components/site/sections/Contact";

const SceneBackground = dynamic(
  () => import("@/components/site/SceneBackground"),
  { ssr: false }
);

export default function SiteClient() {
  const { stats, repos } = useGitHubData();

  return (
    <SmoothScroll>
      {/* Fixed cinematic 3D backdrop */}
      <SceneBackground />
      <div className="vignette" />

      <Nav />
      <AvatarGuide />

      {/* Scrolling content sits above the canvas */}
      <main className="relative z-10">
        <Hero />
        <About stats={stats} />
        <Skills stats={stats} />
        <Projects repos={repos} />
        <Research />
        <Achievements stats={stats} />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
