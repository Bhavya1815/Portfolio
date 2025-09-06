import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Cloud, Database, Globe, Palette, Users, Clock } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Programming & AI/ML",
      skills: [
        { name: "Python", level: 90, color: "bg-gradient-tech" },
        { name: "JavaScript", level: 85, color: "bg-gradient-secondary" },
        { name: "SQL", level: 80, color: "bg-gradient-accent" },
        { name: "Java", level: 75, color: "bg-gradient-tech" },
        { name: "Generative AI", level: 85, color: "bg-gradient-accent" },
        { name: "NLP", level: 80, color: "bg-gradient-secondary" }
      ]
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Frontend Development",
      skills: [
        { name: "HTML5", level: 95, color: "bg-gradient-tech" },
        { name: "CSS3", level: 90, color: "bg-gradient-secondary" },
        { name: "React", level: 85, color: "bg-gradient-accent" },
        { name: "TypeScript", level: 80, color: "bg-gradient-tech" }
      ]
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud Platforms",
      skills: [
        { name: "Oracle Cloud", level: 90, color: "bg-gradient-tech" },
        { name: "Google Cloud", level: 85, color: "bg-gradient-secondary" },
        { name: "Vertex AI", level: 80, color: "bg-gradient-accent" },
        { name: "AWS (Basic)", level: 60, color: "bg-gradient-tech" }
      ]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Tools & Technologies",
      skills: [
        { name: "Git", level: 85, color: "bg-gradient-tech" },
        { name: "Data Analytics", level: 80, color: "bg-gradient-secondary" },
        { name: "Prompt Engineering", level: 90, color: "bg-gradient-accent" },
        { name: "UI/UX Design", level: 85, color: "bg-gradient-tech" }
      ]
    }
  ];

  const softSkills = [
    { icon: <Brain className="w-5 h-5" />, name: "Analytical Thinking" },
    { icon: <Globe className="w-5 h-5" />, name: "Problem-Solving" },
    { icon: <Palette className="w-5 h-5" />, name: "Research & Experimentation" },
    { icon: <Users className="w-5 h-5" />, name: "Collaboration" },
    { icon: <Clock className="w-5 h-5" />, name: "Time Management" }
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="hero-heading text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="hero-body text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive skill set spanning AI/ML, cloud computing, and modern web development
          </p>
        </div>

        {/* Technical Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="glass hover-lift group p-6 transition-transform duration-300 ease-in-out"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-tech rounded-xl group-hover:animate-pulse-glow transition-smooth">
                  {category.icon}
                </div>
                <h3 className="hero-heading text-xl font-bold">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4 hero-body">
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="outline"
                      className="text-sm border-accent/30 text-accent hover:bg-accent/10 px-3 py-1 transition-smooth"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Soft Skills */}
        <Card className="glass p-8">
          <div className="text-center mb-8">
            <h3 className="hero-heading text-2xl font-bold mb-2">
              Soft <span className="gradient-text">Skills</span>
            </h3>
            <p className="hero-body text-muted-foreground">
              Essential interpersonal and professional capabilities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {softSkills.map((skill, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-smooth group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-3 bg-gradient-tech rounded-full group-hover:animate-pulse-glow transition-smooth">
                  {skill.icon}
                </div>
                <span className="hero-body text-sm font-medium text-center">{skill.name}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Skills;
