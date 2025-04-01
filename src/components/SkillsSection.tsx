
import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

type SkillCategory = {
  name: string;
  skills: {
    name: string;
    level: number;
  }[];
};

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const skillCategories: SkillCategory[] = [
    {
      name: "Programming Languages",
      skills: [
        { name: "Java", level: 95 },
        { name: "TypeScript", level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "Python", level: 80 },
        { name: "SQL", level: 90 },
      ]
    },
    {
      name: "Frameworks & Libraries",
      skills: [
        { name: "Spring Boot", level: 95 },
        { name: "Angular", level: 85 },
        { name: "React.js", level: 80 },
        { name: "Hibernate", level: 90 },
        { name: "Node.js", level: 75 },
      ]
    },
    {
      name: "Cloud & DevOps",
      skills: [
        { name: "AWS", level: 85 },
        { name: "Docker", level: 90 },
        { name: "Kubernetes", level: 75 },
        { name: "Jenkins", level: 80 },
        { name: "Git", level: 90 },
      ]
    },
    {
      name: "Databases",
      skills: [
        { name: "Oracle", level: 90 },
        { name: "MongoDB", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "MySQL", level: 85 },
        { name: "H2", level: 70 },
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation classes to skill bars when in view
            const skillBars = document.querySelectorAll('.skill-bar-inner');
            skillBars.forEach((bar, index) => {
              setTimeout(() => {
                (bar as HTMLElement).style.width = (bar as HTMLElement).dataset.width || '0%';
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 relative overflow-hidden bg-cyber-grid bg-grid-lg">
      <div className="absolute inset-0 bg-gradient-cyber z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-10">
            <Terminal size={24} className="text-cyber-neon mr-3" />
            <h2 className="text-3xl font-cyber neon-text">Technical Skills</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, catIndex) => (
              <div key={catIndex} className="cyber-card">
                <h3 className="text-xl cyber-text mb-6">{category.name}</h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-cyber-neon text-sm">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-cyber-secondary/80 rounded overflow-hidden">
                        <div 
                          className="skill-bar-inner h-full rounded transition-all duration-1000 ease-out"
                          style={{ width: '0%', transitionDelay: `${skillIndex * 100}ms` }}
                          data-width={`${skill.level}%`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 cyber-card">
            <h3 className="text-xl cyber-text mb-6">Additional Technical Expertise</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Microservices Architecture",
                "REST API Design",
                "SOAP Web Services",
                "JUnit & Testing",
                "CI/CD Pipelines",
                "Agile Methodologies",
                "Object-Oriented Design",
                "Design Patterns",
                "Performance Optimization",
                "Kafka",
                "JPA/Hibernate",
                "Spring Security",
                "AWS Lambda",
                "Elasticsearch",
                "Maven/Gradle",
              ].map((tech, index) => (
                <div 
                  key={index}
                  className="cyber-button text-center py-3"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Scan line effect */}
      <div className="scan-effect absolute inset-0 pointer-events-none"></div>
    </section>
  );
};

export default SkillsSection;
