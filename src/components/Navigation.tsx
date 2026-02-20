import { useEffect, useRef, useState } from "react";

const NAV_HEIGHT = 100;

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [hideNav, setHideNav] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    const sections = navItems.map((item) =>
      document.getElementById(item.href.substring(1))
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: `-${NAV_HEIGHT}px 0px -40% 0px`,
        threshold: 0.2,
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY.current + 10 && currentScroll > 150) {
        setHideNav(true);
      } else if (currentScroll < lastScrollY.current - 10) {
        setHideNav(false);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const about = document.getElementById("about");
      const footer = document.getElementById("footer");

      if (!about || !footer) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      const aboutTop = about.getBoundingClientRect().top + scrollY;
      const footerTop = footer.getBoundingClientRect().top + scrollY;

      const start = aboutTop;
      const end = footerTop - viewportHeight;

      if (scrollY <= start) {
        setScrollProgress(0);
        return;
      }

      if (scrollY >= end) {
        setScrollProgress(100);
        return;
      }

      const progress = ((scrollY - start) / (end - start)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const section = document.getElementById(href.substring(1));
    if (!section) return;

    const top =
      section.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 h-[2px] bg-[#222222] z-[60] transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-transform duration-500 ${
          hideNav ? "-translate-y-24" : "translate-y-0"
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          <div className="relative bg-[#F8F8F8]/90 backdrop-blur-xl border border-[#E5E5E5] shadow-lg px-10 py-4 rounded-full transition-all duration-300">
            <div className="flex items-center gap-12 text-sm text-[#7B7B7B]">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);

                return (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="relative group transition-colors duration-300 hover:text-[#222222]"
                  >
                    {item.label}

                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-[#222222] transition-all duration-300 group-hover:w-full" />

                    {isActive && (
                      <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#222222]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;