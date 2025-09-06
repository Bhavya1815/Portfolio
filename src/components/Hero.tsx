"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  Check,
} from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  const [copied, setCopied] = useState<"email" | "phone" | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // For parallax
  const pressTimer = useRef<number | null>(null);
  const longPressedRef = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pressTimer.current) window.clearTimeout(pressTimer.current);
    };
  }, []);

  // Auto-hide toast
  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(null), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  // Mouse move parallax (desktop)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20; // Sensitivity
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    // Device orientation parallax (mobile)
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!e.gamma || !e.beta) return;
      const x = e.gamma / 3; // Horizontal tilt
      const y = e.beta / 3; // Vertical tilt
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("deviceorientation", handleDeviceOrientation);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, []);

  const startPress = (textToCopy: string, type: "email" | "phone") => (
    e: React.MouseEvent | React.TouchEvent
  ) => {
    longPressedRef.current = false;
    if (pressTimer.current) {
      window.clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    pressTimer.current = window.setTimeout(() => {
      try {
        navigator.clipboard.writeText(textToCopy).then(() => setCopied(type));
      } catch {
        const ta = document.createElement("textarea");
        ta.value = textToCopy;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        setCopied(type);
      }
      longPressedRef.current = true;
      pressTimer.current = null;
    }, 600);
  };

  const endPress = (e: React.MouseEvent | React.TouchEvent) => {
    if (pressTimer.current) {
      window.clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    if (longPressedRef.current) {
      setTimeout(() => {
        longPressedRef.current = false;
      }, 0);
    }
  };

  const handleContextMenu = (
    e: React.MouseEvent,
    textToCopy: string,
    type: "email" | "phone"
  ) => {
    e.preventDefault();
    try {
      navigator.clipboard.writeText(textToCopy).then(() => setCopied(type));
    } catch {
      const ta = document.createElement("textarea");
      ta.value = textToCopy;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      setCopied(type);
    }
  };

  const handleAnchorClick = (e: React.MouseEvent, href: string) => {
    if (longPressedRef.current) {
      e.preventDefault();
      longPressedRef.current = false;
      return;
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="AI Engineer Workspace"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/20"></div>
      </div>

      {/* Background Shapes with Parallax */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className="absolute w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float-slow"
          style={{
            top: `calc(25% + ${mousePos.y}px)`,
            left: `calc(25% + ${mousePos.x}px)`,
          }}
        ></div>
        <div
          className="absolute w-48 h-48 bg-accent/30 rounded-full blur-2xl animate-float-slow"
          style={{
            bottom: `calc(25% - ${mousePos.y}px)`,
            right: `calc(25% - ${mousePos.x}px)`,
            animationDelay: "2s",
          }}
        ></div>
        <div
          className="absolute w-32 h-32 bg-primary/30 rounded-xl blur-xl animate-float-slow"
          style={{
            top: `calc(50% + ${mousePos.y / 2}px)`,
            right: `calc(33% - ${mousePos.x / 2}px)`,
            animationDelay: "4s",
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Profile Image */}
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48 md:w-64 md:h-64 transform transition-transform duration-500 hover:scale-105 hover:rotate-1 hover:shadow-2xl hover-glow">
              <img
                src="/lovable-uploads/c3f60025-9ba4-43ea-87fd-eeefba8f6ad4.png"
                alt="Bhavyarajsinh Raulji"
                className="w-full h-full object-cover rounded-full border-4 border-primary/30 shadow-xl"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-tech opacity-20 animate-pulse-slow"></div>
            </div>
          </div>

          {/* Name and Title */}
          <div className="space-y-4">
  <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-heading">
    <span className="gradient-text animate-gradient">Bhavyarajsinh</span>
    <br />
    <span className="text-foreground">Raulji</span>
  </h1>
  <p className="text-xl md:text-2xl text-muted-foreground font-medium font-body">
    Aspiring AI Engineer | Cloud & Data Enthusiast | Frontend & UI Experience
  </p>
</div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base animate-fadeUp delay-100">
            {/* Email */}
            <a
              href="mailto:bhavyarajsinh.career@gmail.com"
              onMouseDown={startPress("bhavyarajsinh.career@gmail.com", "email")}
              onMouseUp={endPress}
              onMouseLeave={endPress}
              onTouchStart={startPress("bhavyarajsinh.career@gmail.com", "email")}
              onTouchEnd={endPress}
              onContextMenu={(e) =>
                handleContextMenu(e, "bhavyarajsinh.career@gmail.com", "email")
              }
              onClick={(e) =>
                handleAnchorClick(e, "mailto:bhavyarajsinh.career@gmail.com")
              }
              className="relative flex items-center gap-2 glass px-4 py-2 rounded-full hover:scale-105 hover:shadow-lg hover-glow transition-transform duration-300 group"
            >
              <Mail className="w-4 h-4 text-accent" />
              <span>bhavyarajsinh.career@gmail.com</span>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black/70 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none animate-fadeUp">
                Click to Email / Long-press to Copy
              </span>
            </a>

            {/* Phone */}
            <a
              href="tel:+918153886480"
              onMouseDown={startPress("+91 8153886480", "phone")}
              onMouseUp={endPress}
              onMouseLeave={endPress}
              onTouchStart={startPress("+91 8153886480", "phone")}
              onTouchEnd={endPress}
              onContextMenu={(e) => handleContextMenu(e, "+91 8153886480", "phone")}
              onClick={(e) => handleAnchorClick(e, "tel:+918153886480")}
              className="relative flex items-center gap-2 glass px-4 py-2 rounded-full hover:scale-105 hover:shadow-lg hover-glow transition-transform duration-300 group"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span>+91 8153886480</span>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black/70 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none animate-fadeUp">
                Tap to Call / Long-press to Copy
              </span>
            </a>

            {/* Location */}
            <a
              href="https://maps.app.goo.gl/FGUGMhUUGp6xKkN1A"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-2 glass px-4 py-2 rounded-full hover:scale-105 hover:shadow-lg hover-glow transition-transform duration-300 group"
            >
              <MapPin className="w-4 h-4 text-accent" />
              <span>Vadodara, Gujarat</span>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black/70 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none animate-fadeUp">
                Click to Open in Maps
              </span>
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fadeUp delay-200">
            <div className="relative group inline-block">
              <Button
                size="lg"
                className="bg-gradient-tech hover:opacity-90 transition-smooth px-8 py-3 text-lg font-semibold hover:brightness-110 flex items-center gap-2 rounded-lg"
                onClick={() => {
                  window.open("/Bhavyarajsinh.Raulji.Resume.pdf", "_blank");
                }}
              >
                <Download className="w-5 h-5 mr-2" />
                View / Download Resume
              </Button>
              <span className="absolute left-1/2 bottom-full mb-2 w-max -translate-x-1/2 translate-y-2 rounded-md bg-gray-800 px-3 py-1 text-sm text-white opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Opens in a new tab
              </span>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="lg"
                className="glass border-accent/30 hover:border-accent hover:bg-accent/10 transition-transform transform hover:scale-110 hover:shadow-lg duration-300"
                onClick={() => window.open("https://github.com/Bhavya1815", "_blank")}
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="glass border-accent/30 hover:border-accent hover:bg-accent/10 transition-transform transform hover:scale-110 hover:shadow-lg duration-300"
                onClick={() => window.open("https://www.linkedin.com/in/bhavyarajsinh1815/", "_blank")}
              >
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Copy Toast */}
      <div
        aria-live="polite"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg text-white transform transition-all duration-300 ${
          copied ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none"
        } ${copied === "email" ? "bg-green-600" : "bg-green-500"}`}
      >
        <Check className="w-4 h-4" />
        <span className="text-sm">
          {copied === "email" ? "Email copied!" : copied === "phone" ? "Phone copied!" : ""}
        </span>
      </div>
    </section>
  );
};

export default Hero;
