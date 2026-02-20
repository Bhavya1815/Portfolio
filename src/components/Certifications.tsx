"use client";
import { useEffect, useRef, useState } from "react";

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [bgShift, setBgShift] = useState(0);

  /* Match About dynamic background */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setBgShift(Math.min(scrollY * 0.05, 40));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const certifications = [
    {
      title: "Oracle Cloud Infrastructure 2025 - Generative AI Professional",
      issuer: "Oracle",
      date: "2025",
      description:
        "Advanced certification in Oracle Cloud Generative AI services and infrastructure.",
      link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=FCE1726507AD32CFF34B177BC1A096A7791B33D5B986DF0721D1156D9D3AB7AF",
    },
    {
      title: "Introduction to Generative AI Studio",
      issuer: "Google Cloud Skills Boost",
      date: "2024",
      description:
        "Comprehensive training on Google Cloud's Generative AI Studio platform.",
      link: "https://www.simplilearn.com/free-generative-ai-studio-course-skillup",
    },
    {
      title: "Data Analytics Job Simulation",
      issuer: "Deloitte Australia",
      date: "2024",
      description:
        "Real-world analytics scenarios and structured business problem solving.",
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_jxzfhcmvJDjak5RBc_1751451668957_completion_certificate.pdf",
    },
    {
      title: "Prompt Engineering & Programming with OpenAI",
      issuer: "Columbia University",
      date: "2024",
      description:
        "Advanced prompt engineering and AI programming methodologies.",
      link: "https://badges.plus.columbia.edu/ff6cda4f-a1bc-4067-ba6c-bc1e37bd9ddd#acc.azGEN2yH",
    },
    {
      title: "Prompt Engineering",
      issuer: "IBM",
      date: "2024",
      description:
        "Professional certification in structured AI prompt engineering.",
      link: "https://www.linkedin.com/posts/bhavyarajsinh1815_promptengineering-ibm-skillsbuild-activity-7297566199188525056-9NvS?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD75hgcB6wZS62GI1ziSBnePgkPzukBgFq0",
    },
  ];

  const openOnPress = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <section
      id="certifications"
      className="relative py-32 px-8 bg-[#F8F8F8] text-[#222222] transition-colors duration-500"
      style={{
        backgroundColor: `rgb(${255 - bgShift}, ${255 - bgShift}, ${
          255 - bgShift
        })`,
      }}
    >
      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div
        ref={sectionRef}
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Header */}
        <div className="grid md:grid-cols-3 gap-16 mb-24">

          <div className="md:col-span-1">
            <p className="text-sm uppercase tracking-[0.3em] text-[#7B7B7B] mb-6">
              Certifications
            </p>

            <h2 className="text-4xl md:text-5xl font-light leading-tight">
              Credentials
              <br />
              & Recognition
            </h2>
          </div>

          <div className="md:col-span-2 flex items-end">
            <div className="h-[1px] w-full bg-[#E5E5E5] relative overflow-hidden">
              <div
                className={`absolute left-0 top-0 h-full bg-[#222222] transition-all duration-1000 ${
                  visible ? "w-full" : "w-0"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Certification List */}
        <div className="space-y-24">

          {certifications.map((cert, index) => (
            <div
              key={index}
              onMouseDown={() => openOnPress(cert.link)}
              className={`cursor-pointer transition-all duration-1000 ${
                visible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-16"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="grid md:grid-cols-3 gap-12 items-start">

                {/* Left Meta */}
                <div className="space-y-2">
                  <p className="text-sm text-[#7B7B7B]">{cert.issuer}</p>
                  <p className="text-sm text-[#7B77B7]">{cert.date}</p>
                </div>

                {/* Right Content */}
                <div className="md:col-span-2 space-y-6">

                  <div className="relative group pb-6 border-b border-[#E5E5E5]">
                    <h3 className="text-2xl font-medium transition-all duration-300 group-hover:translate-x-2">
                      {cert.title}
                    </h3>
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#222222] transition-all duration-700 group-hover:w-full" />
                  </div>

                  <p className="text-lg text-[#7B7B7B] leading-relaxed max-w-2xl">
                    {cert.description}
                  </p>

                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Certifications;
