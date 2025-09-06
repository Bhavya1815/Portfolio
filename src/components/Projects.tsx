import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, TrendingUp } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Advanced Billing System",
      duration: "Jan 2024 - May 2024",
      description:
        "Built a full-stack billing application with automated invoice generation and UPI payment integration. Designed intuitive UI dashboards, increasing transaction efficiency by 30%.",
      technologies: ["React", "Node.js", "MongoDB", "Payment APIs", "UI/UX Design"],
      highlights: [
        "Automated invoice generation",
        "UPI payment integration",
        "30% efficiency improvement",
        "Intuitive dashboards",
      ],
      category: "Full-Stack Development",
    },
    {
      title: "AGI Virtual Assistant",
      duration: "May 2023 - Aug 2023",
      description:
        "Developed a voice-command AI assistant enabling hands-free task execution. Integrated NLP capabilities to enhance accessibility and user experience.",
      technologies: ["Python", "NLP", "Voice Recognition", "AI/ML", "APIs"],
      highlights: [
        "Voice command interface",
        "Hands-free task execution",
        "NLP integration",
        "Enhanced accessibility",
      ],
      category: "AI/ML Development",
    },
    {
      title: "Smart Mechanic",
      duration: "Sept 2022 - Feb 2023",
      description:
        "Created a location-based service app using GPS and APIs to connect stranded users with nearby mechanics. Improved usability with real-time search and navigation features.",
      technologies: ["React Native", "GPS APIs", "Maps Integration", "Real-time Search"],
      highlights: [
        "Location-based services",
        "GPS integration",
        "Real-time search",
        "Navigation features",
      ],
      category: "Mobile Development",
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Full-Stack Development":
        return "bg-gradient-tech";
      case "AI/ML Development":
        return "bg-gradient-accent";
      case "Mobile Development":
        return "bg-gradient-secondary";
      default:
        return "bg-gradient-tech";
    }
  };

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="hero-heading text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="hero-body text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcasing innovative solutions across full-stack development, AI/ML, and mobile applications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="glass hover-lift group relative overflow-hidden transition-transform duration-300 ease-in-out"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Category Badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge
                  className={`${getCategoryColor(project.category)} text-white border-0 text-xs`}
                >
                  {project.category}
                </Badge>
              </div>

              {/* Background Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-tech opacity-0 group-hover:opacity-10 transition-all duration-500"></div>

              <div className="p-6 relative z-10">
                {/* Project Header */}
                <div className="mb-4">
                  <h3 className="hero-heading text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    <span className="hero-body">{project.duration}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="hero-body text-sm text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 hero-body">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    Key Highlights
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {project.highlights.map((highlight, hIndex) => (
                      <div key={hIndex} className="flex items-center gap-2 hero-body">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                        <span className="text-xs text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className="text-xs border-accent/30 text-accent hover:bg-accent/10"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
