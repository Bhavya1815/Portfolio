"use client";

import { useEffect, useRef, useState } from "react";
import { Linkedin, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const resetMagnetic = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translate(0,0)";
  };

  return (
    <footer
      id="footer"
      className="relative bg-[#1A1A1A] text-[#F5F5F5] overflow-hidden"
    >
      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div
        ref={footerRef}
        className={`max-w-7xl mx-auto px-8 py-40 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
      >
        {/* Hero Typography */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-light tracking-tight leading-[0.95]">
            Thank You
          </h2>
          <h2 className="text-6xl md:text-8xl font-light tracking-tight leading-[0.95] mt-4">
            For Watching
          </h2>

          <p className="text-[#A0A0A0] mt-10 text-lg">
            Available to develop your ideas to next level.
          </p>

          <a
            href="mailto:bhavyarajsinh.career@gmail.com"
            className="block mt-6 text-2xl hover:opacity-70 transition-opacity"
          >
            📧 bhavyarajsinh.career@gmail.com
          </a>
        </div>

        {/* Divider Sweep */}
        <div className="relative h-[1px] bg-[#333333] overflow-hidden mb-16">
          <div
            className={`absolute left-0 top-0 h-full bg-[#F5F5F5] transition-all duration-1000 ${
              visible ? "w-full" : "w-0"
            }`}
          />
        </div>

        {/* Bottom Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">

          {/* Socials Left */}
          <div className="flex items-center gap-8">
            <a
              href="https://www.linkedin.com/in/bhavyarajsinh1815"
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={handleMagnetic}
              onMouseLeave={resetMagnetic}
              className="transition-transform duration-300 hover:opacity-70"
            >
              <Linkedin className="w-6 h-6" />
            </a>

            <a
              href="https://x.com/_bhavya18"
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={handleMagnetic}
              onMouseLeave={resetMagnetic}
              className="transition-transform duration-300 hover:opacity-70"
            >
              <Twitter className="w-6 h-6" />
            </a>

            <a
              href="https://www.instagram.com/_bhavyarajsinh/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseMove={handleMagnetic}
              onMouseLeave={resetMagnetic}
              className="transition-transform duration-300 hover:opacity-70"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>

          {/* Back to Top Center */}
          <button
            onClick={scrollToTop}
            className="relative group text-sm tracking-wide"
          >
            Back to Top
            <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#F5F5F5] transition-all duration-500 group-hover:w-full" />
          </button>

          {/* Copyright */}
          <div className="text-sm text-[#8A8A8A] text-center md:text-right">
            © {currentYear} Bhavyarajsinh Raulji
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
