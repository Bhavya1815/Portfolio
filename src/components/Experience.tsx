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

const Experience = () => {
  const { ref, visible } = useInView();
  const [bgShift, setBgShift] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setBgShift(Math.min(scrollY * 0.03, 30));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const experiences = [
    {
      company: "Civica Resource Pvt. Ltd.",
      location: "Vadodara",
      position: "L1 Support Analyst",
      duration: "Nov 2025 - Present",
      achievements: [
        "Providing Level 1 application support with SLA-focused resolution.",
        "Coordinating with L2/L3 teams for escalated technical incidents.",
        "Improving documentation and operational workflows."
      ],
    },
    {
      company: "Cyber Hospitality Pvt. Ltd.",
      location: "Vadodara",
      position: "Technical Support Executive",
      duration: "Mar 2025 - Aug 2025",
      achievements: [
        "Delivered network troubleshooting reducing downtime by 20%.",
        "Maintained 99% uptime through proactive monitoring.",
        "Strengthened infrastructure reliability and scalability."
      ],
    },
    {
      company: "Brainy Beam Technologies",
      location: "Ahmedabad",
      position: "UI Designer (HTML5 & CSS3)",
      duration: "Sept 2024 - Jan 2025",
      achievements: [
        "Built responsive UI systems improving engagement.",
        "Applied UX principles to enhance usability and structure."
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="relative py-32 px-8 text-[#222222] overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: `rgb(${248 - bgShift}, ${248 - bgShift}, ${248 - bgShift})` }}
    >
      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div
        ref={ref}
        className={`max-w-6xl mx-auto relative transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Header */}
        <div className="mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-[#7B7B7B] mb-6">
            Experience
          </p>

          <h2 className="text-4xl md:text-5xl font-light leading-tight max-w-3xl">
            Building professional depth
            <br />
            through structured execution.
          </h2>

          {/* Animated Section Divider */}
          <div className="mt-12 h-[1px] bg-[#E5E5E5] relative overflow-hidden">
            <div
              className={`absolute left-1/2 top-0 h-full bg-[#222222] transition-all duration-1000 ${
                visible ? "w-full -translate-x-1/2" : "w-0"
              }`}
            />
          </div>
        </div>

        {/* Experience Blocks */}
        <div className="space-y-28">

          {experiences.map((exp, index) => {
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
                {/* Left Column */}
                <div className="md:col-span-1 space-y-3">
                  <p className="text-lg font-medium">{exp.company}</p>
                  <p className="text-sm text-[#7B7B7B]">
                    {exp.location}
                  </p>
                  <p className="text-sm text-[#7B7B7B]">
                    {exp.duration}
                  </p>
                </div>

                {/* Right Column */}
                <div className="md:col-span-2 space-y-6">

                  <div className="relative group pb-6 border-b border-[#E5E5E5]">
                    <h3 className="text-2xl font-medium transition-all duration-300 group-hover:translate-x-2">
                      {exp.position}
                    </h3>
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#222222] transition-all duration-700 group-hover:w-full" />
                  </div>

                  <div className="space-y-4">
                    {exp.achievements.map((item, i) => (
                      <p
                        key={i}
                        className="text-[#7B7B7B] leading-relaxed text-lg"
                      >
                        {item}
                      </p>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Experience;
