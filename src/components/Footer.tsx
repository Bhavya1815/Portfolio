import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Instagram,
  Twitter,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showSocials, setShowSocials] = useState(false);

  const socialLinks = [
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/bhavyarajsinh1815",
      label: "LinkedIn",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: "https://x.com/_bhavya18",
      label: "Twitter",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://www.instagram.com/_bhavyarajsinh/",
      label: "Instagram",
    },
  ];

  const quickLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const sectionId = href.substring(1);
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const footer = document.getElementById("footer");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowBackToTop(true);
          setShowSocials(true);
        } else {
          setShowBackToTop(false);
          setShowSocials(false);
        }
      },
      { threshold: 0.2 }
    );

    if (footer) observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      id="footer"
      className="relative bg-background border-t border-accent/20 font-body"
    >
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-heading gradient-text mb-2">
                Bhavyarajsinh Raulji
              </h3>
              <p className="text-muted-foreground mb-4 font-body">
                Aspiring AI Engineer passionate about creating innovative
                solutions that bridge the gap between cutting-edge technology
                and real-world applications.
              </p>
            </div>

            {/* Contact Quick Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-3 text-sm font-body">
                <Mail className="w-4 h-4 text-accent" />
                <a
                  href="mailto:bhavyarajsinh.career@gmail.com"
                  className="hover:text-accent transition-colors duration-300 ease-in-out"
                >
                  bhavyarajsinh.career@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm font-body">
                <Phone className="w-4 h-4 text-accent" />
                <a
                  href="tel:+918153886480"
                  className="hover:text-accent transition-colors duration-300 ease-in-out"
                >
                  +91 8153886480
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm font-body">
                <MapPin className="w-4 h-4 text-accent" />
                <a
                  href="https://www.google.com/maps?q=Vadodara,+Gujarat,+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors duration-300 ease-in-out"
                >
                  Vadodara, Gujarat, India
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-sm text-muted-foreground hover:text-accent transition-colors duration-300 ease-in-out font-body"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Expertise */}
          <div>
            <h4 className="text-lg font-heading mb-4">Expertise</h4>
            <div className="space-y-2 text-sm text-muted-foreground font-body">
              <div>AI/ML Development</div>
              <div>Cloud Computing</div>
              <div>Frontend Development</div>
              <div>UI/UX Design</div>
              <div>Data Analytics</div>
              <div>Prompt Engineering</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-accent/20 pt-8 text-center">
          {/* Back to Top with glow + slide-up */}
          <div
            className={`transition-all duration-700 ease-in-out ${
              showBackToTop
                ? "opacity-100 translate-y-0 shadow-glow"
                : "opacity-0 translate-y-5"
            }`}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="glass border-accent/30 hover:border-accent hover:bg-accent/10 hover:text-accent transition-colors duration-300 ease-in-out font-body"
            >
              <ArrowUp className="w-4 h-4 mr-2" />
              Back to Top
            </Button>
          </div>

          {/* Social Icons with staggered fade-in */}
          <div className="flex justify-center gap-4 mt-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`p-2 rounded-full hover:text-accent transition-all duration-700 ease-in-out ${
                  showSocials
                    ? `opacity-100 translate-y-0`
                    : "opacity-0 translate-y-5"
                } font-body`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground mt-4 font-body">
            Copyright ©{currentYear} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
