"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Download } from "lucide-react";
import profileImg from "/lovable-uploads/c3f60025-9ba4-43ea-87fd-eeefba8f6ad4.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#F8F8F8] text-[#222222] flex items-center overflow-hidden">

      {/* Vertical Side Label */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:block">
        <p className="rotate-[-90deg] text-xs tracking-[0.4em] text-[#7B7B7B] uppercase">
          AI Engineer
        </p>
      </div>

      <div className="max-w-7xl mx-auto w-full px-8 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-10"
        >

          {/* Stats */}
          <div className="flex gap-16 text-sm text-[#7B7B7B]">
            <div>
              <p className="text-3xl font-semibold text-[#222222]">+10</p>
              <p>Projects Built</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-[#222222]">+2</p>
              <p>Years Learning & Building</p>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-light tracking-tight leading-none">
              Hello
            </h1>

            <p className="text-lg text-[#7B7B7B] max-w-md leading-relaxed">
              I’m <span className="text-[#222222] font-medium">Bhavyarajsinh Raulji</span> —
              building intelligent systems, scalable cloud solutions, and
              modern web experiences.
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-6 pt-6">
            <Button
              className="bg-[#222222] text-white hover:bg-black px-8 py-6 text-base rounded-none transition-all"
              onClick={() => window.open("/Bhavyarajsinh.Raulji.Resume.pdf")}
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>

            <div className="flex gap-4">
              <button
                onClick={() => window.open("https://github.com/Bhavya1815")}
                className="border border-[#222222] p-3 hover:bg-[#222222] hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </button>

              <button
                onClick={() =>
                  window.open("https://www.linkedin.com/in/bhavyarajsinh1815/")
                }
                className="border border-[#222222] p-3 hover:bg-[#222222] hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative flex justify-end"
        >
          {/* Gradient Mask */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8F8F8] via-transparent to-transparent z-10"></div>

          <img
            src={profileImg}
            alt="Bhavyarajsinh Raulji"
            className="w-[500px] h-auto object-cover grayscale"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
