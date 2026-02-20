"use client";
import { useEffect, useRef, useState } from "react";

const useInView = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
};

const Projects = () => {
  const { ref, visible } = useInView();
  const [progress, setProgress] = useState(0);
  const [bgShift, setBgShift] = useState(0);

  /* Match About background scroll shift */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setBgShift(Math.min(scrollY * 0.05, 40));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Progress Indicator */
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("projects");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const total = rect.height;
      const visibleHeight = Math.min(windowHeight - rect.top, total);
      const percent = Math.max(0, Math.min(1, visibleHeight / total));

      setProgress(percent * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      number: "01",
      title: "Advanced Billing System",
      duration: "2024",
      description:
        "Full-stack billing system with automated invoicing and UPI integration. Improved efficiency by 30% through structured UI dashboards.",
    },
    {
      number: "02",
      title: "AGI Virtual Assistant",
      duration: "2023",
      description:
        "Voice-enabled AI assistant with NLP integration enabling hands-free task execution and accessibility-driven interaction.",
    },
    {
      number: "03",
      title: "Smart Mechanic",
      duration: "2022",
      description:
        "Location-based system connecting users with nearby mechanics using GPS and real-time search architecture.",
    },
  ];

  const handleMagnetic = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (x - centerX) * 0.05;
    const moveY = (y - centerY) * 0.05;

    el.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const resetMagnetic = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `translate(0px, 0px)`;
  };

  return (
    <section
      id="projects"
      className="relative py-32 px-8 bg-[#F8F8F8] text-[#222222] transition-colors duration-500"
      style={{
        backgroundColor: `rgb(${255 - bgShift}, ${255 - bgShift}, ${
          255 - bgShift
        })`,
      }}
    >
      {/* Progress Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 h-40 w-[2px] bg-[#E5E5E5] z-40">
        <div
          className="bg-[#222222] w-full transition-all duration-300"
          style={{ height: `${progress}%` }}
        />
      </div>

      <div
        ref={ref}
        className={`max-w-7xl mx-auto transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Header */}
        <div className="grid md:grid-cols-3 gap-16 mb-24">

          <div className="md:col-span-1">
            <p className="text-sm uppercase tracking-[0.3em] text-[#7B7B7B] mb-6">
              Projects
            </p>

            <h2 className="text-4xl md:text-5xl font-light leading-tight text-[#222222]">
              Selected Work
              <br />
              & Case Studies
            </h2>
          </div>

          <div className="md:col-span-2 flex items-end">
            <div className="h-[1px] w-full bg-[#E5E5E5]" />
          </div>

        </div>

        {/* Projects */}
        <div className="space-y-32">

          {projects.map((project, index) => {
            const slideClass =
              index % 2 === 0
                ? visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-16"
                : visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-16";

            return (
              <div
                key={index}
                className={`grid md:grid-cols-3 gap-16 items-start transition-all duration-1000 ${slideClass}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Number */}
                <div className="text-[100px] md:text-[140px] font-light text-[#222222] leading-none">
                  {project.number}
                </div>

                {/* Content */}
                <div
                  onMouseMove={handleMagnetic}
                  onMouseLeave={resetMagnetic}
                  className="md:col-span-2 space-y-6 transition-transform duration-300"
                >
                  <div className="pb-6 border-b border-[#E5E5E5]">
                    <h3 className="text-3xl font-medium text-[#222222]">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#7B7B7B] mt-2">
                      {project.duration}
                    </p>
                  </div>

                  <p
                    className={`text-lg text-[#7B7B7B] leading-relaxed max-w-2xl transition-all duration-1000 ${
                      visible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{ transitionDelay: `${index * 300 + 300}ms` }}
                  >
                    {project.description}
                  </p>

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Projects;
