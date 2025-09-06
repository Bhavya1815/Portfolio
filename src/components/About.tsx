import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Brain, Code, Cloud, Palette, ZoomIn } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: <Brain className="w-6 h-6 rotate-icon" />,
      title: "AI & ML Enthusiast",
      description: "Passionate about Generative AI, NLP, and developing intelligent solutions"
    },
    {
      icon: <Cloud className="w-6 h-6 rotate-icon" />,
      title: "Cloud Expert",
      description: "Experienced with Oracle Cloud, Google Cloud, and AWS platforms"
    },
    {
      icon: <Code className="w-6 h-6 rotate-icon" />,
      title: "Full-Stack Developer",
      description: "Proficient in modern web technologies and responsive design"
    },
    {
      icon: <Palette className="w-6 h-6 rotate-icon" />,
      title: "UI/UX Designer",
      description: "Creating intuitive and user-friendly digital experiences"
    }
  ];

  return (
    <section id="about" className="py-20 px-6 font-roboto">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
  <h2 className="hero-heading text-4xl md:text-5xl font-bold mb-4">
    About <span className="gradient-text">Me</span>
  </h2>
  <p className="hero-body text-xl text-muted-foreground max-w-3xl mx-auto">
    A passionate technology enthusiast with a strong foundation in AI, cloud computing, 
    and frontend development. I thrive on transforming complex problems into elegant, 
    user-friendly solutions.
  </p>
</div>


        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Profile Image / Degree Link */}
          <div className="lg:col-span-1 flex justify-center lg:justify-start">
            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
              <a 
                href="/lovable-uploads/c3f60025-9ba4-43ea-87fd-eeefba8f6ad4.png" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Click to view degree"
              >
                <img 
                  src="/lovable-uploads/c3f60025-9ba4-43ea-87fd-eeefba8f6ad4.png" 
                  alt="Bhavyarajsinh Raulji Degree" 
                  className="w-full h-full object-cover rounded-2xl shadow-xl hover-glow transition-smooth cursor-pointer"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-tech opacity-10"></div>
              </a>
            </div>
          </div>
          
          {/* Education & Overview */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="glass hover-lift p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-tech rounded-xl">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-playfair">Education</h3>
                  <p className="text-muted-foreground">
                    <a 
                      href="https://sigmauniversity.ac.in/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="underline hover:text-accent transition-colors"
                    >
                      Sigma Institute of Engineering
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Bachelor of IT */}
                <a 
                  href="https://iili.io/KndZyFa.png" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block"
                  title="Click to view degree"
                >
                  <div className="relative flex justify-between items-center p-4 bg-secondary/50 rounded-lg group-hover:shadow-lg hover-glow transition-smooth cursor-pointer">
                    <div>
                      <h4 className="font-semibold">Bachelor of Information Technology</h4>
                      <p className="text-sm text-muted-foreground">2021 - 2024</p>
                    </div>
                    <Badge variant="secondary" className="bg-gradient-tech text-white border-0">
                      CGPA: 7.60
                    </Badge>
                    <ZoomIn className="absolute top-2 right-2 w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
                
                {/* Diploma of IT */}
                <a 
                  href="https://iili.io/KndLjPs.png" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block"
                  title="Click to view degree"
                >
                  <div className="relative flex justify-between items-center p-4 bg-secondary/50 rounded-lg group-hover:shadow-lg hover-glow transition-smooth cursor-pointer">
                    <div>
                      <h4 className="font-semibold">Diploma in Information Technology</h4>
                      <p className="text-sm text-muted-foreground">2018 - 2021</p>
                    </div>
                    <Badge variant="secondary" className="bg-gradient-secondary text-white border-0">
                      CGPA: 7.94
                    </Badge>
                    <ZoomIn className="absolute top-2 right-2 w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              </div>
            </Card>

            {/* Certifications */}
            <Card className="glass hover-lift p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-accent rounded-xl">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-playfair">Latest Certifications</h3>
                  <p className="text-muted-foreground">Industry-recognized credentials</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Oracle Cloud Infrastructure 2025 - Generative AI Professional</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm">Google Cloud Skills Boost - Generative AI Studio</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Columbia University - Prompt Engineering with OpenAI</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        <div className="mt-12">
          {/* Highlights Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <Card 
                key={index} 
                className="glass hover-lift p-6 text-center group animate-fade-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="inline-flex p-4 bg-gradient-tech rounded-xl mb-4 group-hover:animate-pulse-glow transition-smooth">
                  {highlight.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 font-playfair">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
