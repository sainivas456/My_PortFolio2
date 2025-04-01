
import { Code } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

type Certification = {
  name: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
};

const CertificationsSection: React.FC = () => {
  const certSectionRef = useRef<HTMLDivElement>(null);
  
  const certifications: Certification[] = [
    {
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      date: "Mar 2025",
      description: "Validated expertise in developing, deploying, and debugging cloud-based applications using AWS.",
      skills: ["AWS Lambda", "DynamoDB", "API Gateway", "S3", "CloudFormation", "IAM", "EC2"]
    },
    {
      name: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "April 2023",
      description: "Comprehensive understanding of AWS Cloud, services, security, architecture, pricing, and support.",
      skills: ["Cloud Concepts", "AWS Core Services", "Security", "Architecture", "Pricing"]
    },
    {
      name: "Oracle Academy Database Design",
      issuer: "Oracle",
      date: "November 2019",
      description: "Proficiency in database design principles, SQL, and Oracle database management systems.",
      skills: ["Database Design", "SQL", "PL/SQL", "Oracle 12c", "Normalization", "Query Optimization"]
    },
    {
      name: "NPTEL Python for Data Science",
      issuer: "NPTEL",
      date: "September 2019",
      description: "Mastery of Python programming for data analysis, visualization, and machine learning applications.",
      skills: ["Python", "NumPy", "Pandas", "Matplotlib", "Scikit-learn", "Data Analysis"]
    }
  ];

  // Animation for certification cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const certCards = document.querySelectorAll('.cert-card');
            certCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-fade-in');
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (certSectionRef.current) {
      observer.observe(certSectionRef.current);
    }

    return () => {
      if (certSectionRef.current) {
        observer.unobserve(certSectionRef.current);
      }
    };
  }, []);

  return (
    <section id="certifications" ref={certSectionRef} className="py-20 relative overflow-hidden bg-cyber-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-10">
            <Code size={24} className="text-cyber-neon mr-3" />
            <h2 className="text-3xl font-cyber neon-text">Certifications</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="cert-card cyber-card opacity-0"
              >
                <h3 className="text-xl cyber-text mb-2">{cert.name}</h3>
                <p className="text-gray-400 mb-4">{cert.issuer} | {cert.date}</p>
                <p className="text-gray-300 mb-4">{cert.description}</p>
                <div className="mt-4">
                  <p className="text-cyan-400 mb-2 text-sm">Skills & Technologies:</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="text-xs bg-cyber-secondary/50 border border-cyan-500/30 px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl"></div>
    </section>
  );
};

export default CertificationsSection;
