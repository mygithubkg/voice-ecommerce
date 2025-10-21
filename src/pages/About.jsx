import React from "react";
import Hero from "./sections/Hero";
import Story from "./sections/Story";
import ValuesSection from "./sections/ValuesSection";
import TechStack from "./sections/TechStack";
import CTA from "./sections/CTA";

const About = () => {
  return (
  <div className="bg-slate-900 text-slate-300 antialiased min-h-screen">
      <Hero />
      <main>
        <Story />
        <ValuesSection />
        <TechStack />
        <CTA />
      </main>
    </div>
  );
};

export default About;
