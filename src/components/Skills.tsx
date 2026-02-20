"use client";
import { useEffect, useRef, useState } from "react";

const Skills = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Balanced smooth speed
  const [offset, setOffset] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(0.06);
  const [bgShift, setBgShift] = useState(0);

  const skills = [
    "Python", "JavaScript", "SQL", "Java",
    "Generative AI", "NLP", "React", "TypeScript",
    "HTML5", "CSS3", "Oracle Cloud",
    "Google Cloud", "Vertex AI", "AWS",
    "Git", "Prompt Engineering",
    "Data Analytics", "UI/UX Design"
  ];

  const softSkills = [
    "Analytical Thinking",
    "Problem Solving",
    "Research & Experimentation",
    "Collaboration",
    "Time Management",
  ];

  const half = Math.ceil(skills.length / 2);
  const topSkills = skills.slice(0, half);
  const bottomSkills = skills.slice(half);

  /* Match About background shift */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setBgShift(Math.min(scrollY * 0.05, 40));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Slight acceleration on scroll */
  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;
      const delta = Math.abs(current - lastScroll);

      setScrollSpeed(0.06 + delta * 0.0004);

      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Infinite animation loop */
  useEffect(() => {
    let frame: number;

    const animate = () => {
      setOffset(prev => {
        const next = prev - scrollSpeed;
        return next < -1500 ? 0 : next;
      });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [scrollSpeed]);

  /* Magnetic tilt */
  const handleTilt = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 12;
    const rotateY = (x - centerX) / 12;

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
  };

  const resetTilt = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  const renderSkill = (word: string, index: number) => (
    <span
      key={index}
      onMouseMove={handleTilt}
      onMouseLeave={resetTilt}
      className="relative px-6 py-3 text-lg border border-[#222222] rounded-md text-[#222222] bg-transparent transition-all duration-300 hover:-translate-y-1"
      style={{
        animation: `fadeUp 0.8s ease forwards`,
        animationDelay: `${index * 40}ms`
      }}
    >
      {word.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            animation: `letterReveal 0.6s ease forwards`,
            animationDelay: `${i * 25}ms`
          }}
        >
          {char}
        </span>
      ))}

      <span className="absolute inset-0 rounded-md bg-[#222222] opacity-0 hover:opacity-5 transition-opacity duration-300" />
    </span>
  );

  return (
    <section
      id="skills"
      className="relative py-32 px-8 text-[#222222] overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: `rgb(${255 - bgShift}, ${255 - bgShift}, ${255 - bgShift})`,
      }}
    >
      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div ref={containerRef} className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-4 gap-20">

          {/* Left */}
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#7B7B7B] mb-6">
              Skills
            </p>

            <h2 className="text-5xl font-light leading-tight">
              Technical
              <br />
              Expertise
            </h2>

            <div className="mt-10 h-[1px] w-16 bg-[#222222]" />
          </div>

          {/* Right */}
          <div className="md:col-span-3 space-y-24 overflow-hidden">

            {/* Top row */}
            <div className="whitespace-nowrap overflow-hidden">
              <div
                className="flex gap-6 will-change-transform"
                style={{ transform: `translateX(${offset}px)` }}
              >
                {[...topSkills, ...topSkills].map(renderSkill)}
              </div>
            </div>

            {/* Bottom row reverse */}
            <div className="whitespace-nowrap overflow-hidden">
              <div
                className="flex gap-6 will-change-transform"
                style={{ transform: `translateX(${-offset}px)` }}
              >
                {[...bottomSkills, ...bottomSkills].map(renderSkill)}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="pt-20 border-t border-[#E5E5E5]">
              <h3 className="text-xl font-medium mb-8">
                Professional Strengths
              </h3>

              <div className="flex flex-wrap gap-8 text-[#7B7B7B] text-lg">
                {softSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="hover:text-[#222222] transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes letterReveal {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </section>
  );
};

export default Skills;
