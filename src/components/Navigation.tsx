import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Home, User, Briefcase, FolderOpen, Award, Mail } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const navItems = [
    { href: "#home", label: "Home", icon: <Home className="w-4 h-4" /> },
    { href: "#about", label: "About", icon: <User className="w-4 h-4" /> },
    { href: "#experience", label: "Experience", icon: <Briefcase className="w-4 h-4" /> },
    { href: "#projects", label: "Projects", icon: <FolderOpen className="w-4 h-4" /> },
    { href: "#skills", label: "Skills", icon: <Award className="w-4 h-4" /> },
    { href: "#contact", label: "Contact", icon: <Mail className="w-4 h-4" /> }
  ];

  const sectionIds = navItems.map(item => item.href.substring(1));

  // Scroll effect + one-time fade-in
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (!fadeIn && window.scrollY > 100) {
        setFadeIn(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fadeIn]);

  // Active section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0.1 }
    );

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const scrollToSection = (href: string) => {
    const sectionId = href.substring(1);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const activeClass = "text-accent bg-accent/10 transition-smooth";
  const inactiveClass = "text-muted-foreground hover:text-foreground transition-smooth";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "glass backdrop-blur-lg border-b border-accent/20" 
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="text-xl font-bold gradient-text hover:opacity-80 transition-smooth"
              aria-label="Go to home section"
            >
              BR
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-1`}>
            {navItems.map((item, index) => (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(item.href)}
                className={`${activeSection === item.href.substring(1) ? activeClass : inactiveClass} 
                  transition-all duration-700 ease-out transform ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"} hover:scale-105 hover:duration-300 hover:ease-out`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className={`hidden md:block transition-all duration-700 ease-out transform ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"} hover:scale-105 hover:duration-300 hover:ease-out`} style={{ transitionDelay: `${navItems.length * 100}ms` }}>
            <Button 
              size="sm"
              className="bg-gradient-tech hover:opacity-90 transition-smooth"
              onClick={() => scrollToSection("#contact")}
            >
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" aria-label="Open navigation menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass w-80">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-xl font-bold gradient-text">Menu</div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsOpen(false)}
                    aria-label="Close navigation menu"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className={`w-full justify-start text-left ${activeSection === item.href.substring(1) ? activeClass : inactiveClass} 
                        transition-all duration-700 ease-out transform ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"} hover:scale-110 hover:duration-300 hover:ease-out`}
                      onClick={() => scrollToSection(item.href)}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </Button>
                  ))}
                  
                  <div className="pt-4 border-t border-accent/20">
                    <Button 
                      className={`w-full bg-gradient-tech hover:opacity-90 transition-smooth transform ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"} hover:scale-110 hover:duration-300 hover:ease-out`}
                      onClick={() => scrollToSection("#contact")}
                      style={{ transitionDelay: `${navItems.length * 100}ms` }}
                    >
                      Let's Talk
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
