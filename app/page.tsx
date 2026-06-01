import { Frame } from "@/components/Frame";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhatWeDo } from "@/components/WhatWeDo";
import { Events } from "@/components/Events";
import { Projects } from "@/components/Projects";
import { Team } from "@/components/Team";
import { Resources } from "@/components/Resources";
import { Join } from "@/components/Join";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Page() {
  return (
    <main className="relative">
      <Frame />
      <ScrollProgress />
      <Hero />
      <About />
      <WhatWeDo />
      <Events />
      <Projects />
      <Team />
      <Resources />
      <Join />
      <Footer />
    </main>
  );
}
