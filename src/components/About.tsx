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

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const Counter = ({ end }: { end: number }) => {
  const [count, setCount] = useState(0);
  const { ref, visible } = useInView();

  useEffect(() => {
    if (!visible) return;

    const duration = 1400;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [visible, end]);

  return (
    <div ref={ref}>
      <p className="text-5xl font-semibold">{count}+</p>
    </div>
  );
};

const About = () => {
  const { ref, visible } = useInView();
  const [bgShift, setBgShift] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setBgShift(Math.min(scrollY * 0.05, 40));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="about"
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
        ref={ref}
        className={`max-w-7xl mx-auto relative transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Top Grid */}
        <div className="grid md:grid-cols-2 gap-20 items-start mb-32">

          {/* Text */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-light leading-tight">
              Building intelligent systems
              <br />
              with clarity & precision.
            </h2>

            <p className="text-[#7B7B7B] text-lg leading-relaxed">
              AI-focused engineering built around structure,
              scalability, and long-term maintainability.
            </p>

            <p className="text-[#7B7B7B] text-lg leading-relaxed">
              Cloud-native solutions and modern web systems
              engineered for production environments.
            </p>
          </div>

          {/* Metrics */}
          <div className="bg-[#F8F8F8] p-14 space-y-14 relative">

            <div className="relative group">
              <Counter end={10} />
              <p className="text-[#7B7B7B] text-sm mt-3">
                Projects Designed & Deployed
              </p>
              <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#222222] transition-all duration-700 group-hover:w-full" />
            </div>

            <div className="relative group">
              <Counter end={3} />
              <p className="text-[#7B7B7B] text-sm mt-3">
                Cloud Platforms & Certifications
              </p>
              <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#222222] transition-all duration-700 group-hover:w-full" />
            </div>

            <div className="relative group">
              <Counter end={2} />
              <p className="text-[#7B7B7B] text-sm mt-3">
                Years in AI Engineering
              </p>
              <div className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#222222] transition-all duration-700 group-hover:w-full" />
            </div>

          </div>
        </div>

        {/* Second Grid */}
        <div className="grid md:grid-cols-3 gap-20 items-center">

          <div className="md:col-span-1">
            <img
              src="/lovable-uploads/bhavyarasinh-siting.png"
              alt="Bhavyarajsinh Raulji"
              className="w-full object-cover grayscale shadow-[0_60px_120px_rgba(0,0,0,0.08)]"
            />
          </div>

          <div className="md:col-span-2 space-y-12">

            {[
              {
                title: "AI & Cloud Engineering",
                text: "Generative AI, NLP systems, and scalable cloud architectures deployed across major platforms.",
              },
              {
                title: "Full-Stack Development",
                text: "Modern React systems with TypeScript and clean backend architecture.",
              },
              {
                title: "Continuous Learning",
                text: "Industry-recognized certifications and applied AI experimentation.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="border-b border-[#E5E5E5] pb-6 transition-all duration-700 hover:translate-x-2"
              >
                <h3 className="text-2xl font-medium">
                  {item.title}
                </h3>
                <p className="text-[#7B7B7B] mt-4 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
