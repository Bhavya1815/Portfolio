import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Award, Calendar, Building } from "lucide-react";

const Certifications = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  const certifications = [
    {
      title: "Oracle Cloud Infrastructure 2025 - Generative AI Professional",
      issuer: "Oracle",
      date: "2025",
      category: "Cloud & AI",
      description: "Advanced certification in Oracle Cloud's Generative AI services and infrastructure",
      skills: ["Oracle Cloud", "Generative AI", "Cloud Infrastructure", "AI Services"],
      badge: "🏆",
      featured: true,
      link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=FCE1726507AD32CFF34B177BC1A096A7791B33D5B986DF0721D1156D9D3AB7AF"
    },
    {
      title: "Introduction to Generative AI Studio",
      issuer: "Google Cloud Skills Boost",
      date: "2024",
      category: "AI/ML",
      description: "Comprehensive training on Google Cloud's Generative AI Studio platform",
      skills: ["Google Cloud", "Generative AI", "Vertex AI", "AI Studio"],
      badge: "🎯",
      link: "https://www.simplilearn.com/free-generative-ai-studio-course-skillup"
    },
    {
      title: "Data Analytics Job Simulation",
      issuer: "Deloitte Australia",
      date: "2024",
      category: "Data Analytics",
      description: "Practical experience in real-world data analytics scenarios and business problem-solving",
      skills: ["Data Analytics", "Business Intelligence", "Problem Solving", "Consulting"],
      badge: "📊",
      link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_jxzfhcmvJDjak5RBc_1751451668957_completion_certificate.pdf"
    },
    {
      title: "Prompt Engineering & Programming with OpenAI",
      issuer: "Columbia University",
      date: "2024",
      category: "AI/ML",
      description: "Advanced techniques in prompt engineering and AI programming with OpenAI technologies",
      skills: ["Prompt Engineering", "OpenAI", "AI Programming", "GPT Models"],
      badge: "🧠",
      link: "https://badges.plus.columbia.edu/ff6cda4f-a1bc-4067-ba6c-bc1e37bd9ddd#acc.azGEN2yH"
    },
    {
      title: "Prompt Engineering",
      issuer: "IBM",
      date: "2024",
      category: "AI/ML",
      description: "Professional certification in prompt engineering methodologies and best practices",
      skills: ["Prompt Engineering", "AI Models", "NLP", "Machine Learning"],
      badge: "⚡",
      link: "https://www.linkedin.com/posts/bhavyarajsinh1815_promptengineering-ibm-skillsbuild-activity-7297566199188525056-9NvS?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAD75hgcB6wZS62GI1ziSBnePgkPzukBgFq0"
    }
  ];

  const getCategoryColor = () => "bg-gradient-cert text-white border-0";

  // Fade-in on scroll
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".cert-card");
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      elements.forEach((el, index) => {
        const elementTop = el.getBoundingClientRect().top + scrollTop;
        if (scrollTop + windowHeight > elementTop + 100) {
          if (!visibleCards.includes(index)) {
            setVisibleCards((prev) => [...prev, index]);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCards]);

  return (
    <section id="certifications" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="hero-heading text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Certifications</span> & Awards
          </h2>
          <p className="hero-body text-xl text-muted-foreground max-w-3xl mx-auto">
            Industry-recognized credentials demonstrating expertise in cutting-edge technologies.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className={`cert-card glass hover-lift group relative overflow-hidden transition-transform duration-500 ease-in-out ${
                visibleCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* Featured Badge */}
              {cert.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-cert text-white border-0 animate-pulse-glow">
                    ⭐ Featured
                  </Badge>
                </div>
              )}

              {/* Background Effect */}
              <div className="absolute inset-0 bg-gradient-cert opacity-0 group-hover:opacity-5 transition-all duration-500"></div>

              <div className="p-6 relative z-10">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-3xl">{cert.badge}</div>
                  <div className="flex-1">
                    <h3 className="hero-heading text-lg font-bold mb-2 group-hover:text-primary transition-smooth">
                      {cert.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mb-3 hero-body text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building className="w-4 h-4" />
                        <span>{cert.issuer}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mb-4">
                  <Badge className={`${getCategoryColor()} text-xs`}>
                    {cert.category}
                  </Badge>
                </div>

                {/* Description */}
                <p className="hero-body text-sm text-muted-foreground leading-relaxed mb-4">
                  {cert.description}
                </p>

                {/* Skills */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {cert.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      className="text-xs border-0 bg-gradient-cert text-white hover:brightness-110 transition-smooth px-3 py-1"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Action Button */}
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full glass border-accent/30 hover:border-accent hover:bg-accent/10 transition-smooth"
                    >
                      <Award className="w-4 h-4 mr-2" />
                      View Certificate
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <Card className="glass p-6 text-center hover-lift">
            <div className="text-3xl font-bold gradient-text mb-2">5+</div>
            <div className="text-sm hero-body text-muted-foreground">Certifications</div>
          </Card>
          <Card className="glass p-6 text-center hover-lift">
            <div className="text-3xl font-bold gradient-text mb-2">3</div>
            <div className="text-sm hero-body text-muted-foreground">Tech Categories</div>
          </Card>
          <Card className="glass p-6 text-center hover-lift">
            <div className="text-3xl font-bold gradient-text mb-2">2025</div>
            <div className="text-sm hero-body text-muted-foreground">Latest Achievement</div>
          </Card>
          <Card className="glass p-6 text-center hover-lift">
            <div className="text-3xl font-bold gradient-text mb-2">100%</div>
            <div className="text-sm hero-body text-muted-foreground">Completion Rate</div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
