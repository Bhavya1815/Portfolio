import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, CheckCircle, ExternalLink } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      company: "Cyber Hospitality Pvt. Ltd.",
      location: "Vadodara",
      position: "Technical Support Executive",
      duration: "Mar 2024 - Aug 2025",
      achievements: [
        "Delivered end-to-end network troubleshooting and device configuration, reducing downtime by 20%",
        "Implemented proactive monitoring solutions, ensuring 99% system uptime",
        "Collaborated with cross-functional teams to maintain secure and scalable IT infrastructure"
      ],
      url: "https://cyberhospitalities.com/",
      isActive: false
    },
    {
      company: "Brainy Beam Technologies Pvt. Ltd.",
      location: "Ahmedabad",
      position: "UI Designer (HTML5 & CSS3)",
      duration: "Sept 2023 - Jan 2024",
      achievements: [
        "Designed responsive, cross-browser UIs using HTML5, CSS3, and JavaScript, improving customer engagement",
        "Applied UX principles to create user-friendly layouts and enhance product usability"
      ],
      url: "https://www.brainybeam.com/",
      isActive: false
    },
    {
      company: "Brainy Beam Technologies Pvt. Ltd.",
      location: "Remote",
      position: "Intern",
      duration: "Jan 2023 - Apr 2023",
      achievements: [
        "Contributed to frontend modules in two live projects using HTML, CSS, and JavaScript",
        "Gained hands-on experience in Agile workflows, version control, and team-based development"
      ],
      url: "https://www.brainybeam.com/",
      isActive: false
    }
  ];

  const cardRefs = useRef([]);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, index * 250);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-20 px-6 bg-secondary/20 font-body">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground font-body">
            Building expertise through hands-on experience in technology and innovation
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-tech transform md:-translate-x-0.5"></div>

          {experiences.map((exp, index) => (
            <div
              key={index}
              data-index={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`relative flex items-center mb-12 transition-all duration-700 ease-in-out transform ${
                visibleCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              } ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
            >
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-tech rounded-full transform -translate-x-2 md:-translate-x-2 z-10 border-4 border-background"></div>

              <div
                className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                  index % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                }`}
              >
                <Card
                  className={`glass hover-lift p-6 transition-smooth ${
                    visibleCards.includes(index) ? "animate-bounce-slight" : ""
                  } card-hover-glow`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="flex items-center gap-3 mb-2 sm:mb-0">
                      <div className="p-2 bg-gradient-tech rounded-lg">
                        <Building2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        {exp.url ? (
                          <h3 className="text-lg font-heading flex items-center gap-1 group">
                            <a
                              href={exp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline hover:text-accent transition-colors flex items-center gap-1"
                            >
                              {exp.company}
                              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                            </a>
                          </h3>
                        ) : (
                          <h3 className="text-lg font-heading">{exp.company}</h3>
                        )}
                        <p className="text-sm text-muted-foreground font-body">{exp.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xl font-heading text-primary mb-2">{exp.position}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start gap-3 font-body">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <p className="text-sm leading-relaxed">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
