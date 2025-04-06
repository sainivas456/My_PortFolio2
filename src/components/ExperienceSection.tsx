
import React, { useState } from 'react';
import { Code, Terminal } from 'lucide-react';

type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  environment: string;
  color: string;
};

const ExperienceSection: React.FC = () => {
  const experiences: Experience[] = [
    {
      company: "Escape Enterprises",
      role: "Machine Learning Engineer (Intern)",
      period: "Sep 2024 - Present",
      situation: "At Escape Enterprises, I worked on 'Lucille,' a cutting-edge wellness AI platform that needed to better sense user emotions in real-time and provide more personalized self-care recommendations. The challenge was to enhance the platform's mood-tracking accuracy and user engagement – essentially, make the AI more empathetic and sticky for users.",
      task: "As an ML Engineer intern, I was tasked with innovating on the platform's AI core to achieve better mood-tracking and personalization, creating a more engaging user experience through advanced machine learning techniques.",
      action: "I engineered a series of ML-driven solutions using TensorFlow and Keras to analyze user soundscapes and facial expressions. I developed a custom CNN-based facial emotion recognition module for more accurate mood detection, designed RESTful APIs with SwaggerHub, and integrated these with the app's FlutterFlow frontend. On the backend, I built robust Java services using Spring MVC/Boot in a microservices architecture, leveraged Kafka for real-time data streaming, and configured PostgreSQL/MongoDB databases. I containerized everything with Docker and orchestrated on AWS Kubernetes clusters, while applying thorough data preprocessing with NumPy/Pandas and monitoring performance with Grafana and PowerBI.",
      result: "These efforts had a powerful impact on performance and user satisfaction. The AI's emotion detection became far more effective – facial emotion accuracy improved by 20% – and the recommendation engine achieved 95% precision in personalizing wellness tips. User retention climbed 30% as people kept coming back for the tailored guidance. My optimizations also streamlined the development pipeline, cutting deployment times by 25%, which meant new features and improvements rolled out faster. By introducing creative gamification elements, the platform saw overall user engagement surge by 40%.",
      environment: "TensorFlow, Keras, NumPy, Pandas, SwaggerHub, FlutterFlow, PowerBI, Java 8 & 11, Spring MVC, Spring Boot, Microservices, Angular, PostgreSQL, MongoDB, Kafka, Oracle 12c, AWS, Docker, Kubernetes, Spring Cloud",
      color: "cyan-500"
    },
    {
      company: "Tata Consultancy Services",
      role: "Software Development Engineer",
      period: "Jul 2021 - Aug 2023",
      situation: "At TCS, I was a full-stack developer on a large-scale enterprise e-commerce platform for a global client. The system needed modernization and new features to handle growing traffic and user expectations. Product search and catalog management were particularly slow and not very user-friendly, hurting the shopping experience.",
      task: "Our team's mission was to build a modern, single-page application with a dynamic front-end and a scalable microservice back-end, improving usability and performance for millions of users while enhancing the catalog and search functionality.",
      action: "I took a lead in implementing an end-to-end solution. On the front-end, I designed a responsive SPA using modern web technologies – initially prototyping with React and later building the production UI in Angular (v4 & v6). For the back-end, I developed RESTful microservices in Java (Spring Boot and Spring MVC), each handling specific business capabilities. I integrated powerful search engines (Solr/Elasticsearch) for lightning-fast product searches and implemented a robust catalog service backed by Oracle and MongoDB. These services communicated asynchronously using Kafka and ActiveMQ. I containerized everything with Docker and deployed on AWS, implementing load balancing and service discovery with Spring Cloud. I also set up an automation testing framework with Selenium, Cucumber, and JUnit integrated into a CI/CD pipeline with Jenkins.",
      result: "The outcome was a transformed e-commerce platform with significantly improved user experience and system performance. Pages loaded faster and the search feature became near-instant, greatly enhancing customer satisfaction. Although specific metrics are confidential, the client observed notable improvements in bounce rates and time-on-site, indicating higher user engagement. The new microservices architecture easily handled traffic surges without downtime and made future enhancements simpler. In one instance, the platform seamlessly scaled to accommodate ~50% more concurrent users than before, demonstrating the robust engineering of our solution.",
      environment: "JAVA 8 & 11, Spring MVC, PCF, Kubernetes, Spark, Spring Boot, Microservices, Angular 4&6, PostgreSQL, MongoDB, Kafka, HTML5, CSS3, Oracle 12c, AWS, Docker, Elasticsearch",
      color: "purple-500"
    },
    {
      company: "Commvault Systems, India",
      role: "Java Full Stack Developer",
      period: "Apr 2019 - Aug 2020",
      situation: "At Commvault Systems, I joined as a Java Full Stack Developer to work on their enterprise data management software. We faced a legacy monolithic application built with Enterprise Java Beans (EJB) that had grown cumbersome to maintain. New features were slow to implement, and the company was eager to adopt cloud-native practices.",
      task: "My task was to help migrate core components from the older EJB-based architecture to a more flexible, microservices-based framework using Spring – ensuring the system could run in the cloud and handle big data workloads reliably, all without disrupting existing customers.",
      action: "I played a key role in this architectural transformation by refactoring and rebuilding components using the Spring ecosystem – replacing heavy EJB modules with lightweight Spring Boot services. I implemented various Spring modules (MVC, Data JPA, Security, AOP/IOC) to recreate features in a more modular way. I introduced Spring Cloud Netflix Eureka for service discovery and Ribbon for load balancing, and used Apache Camel for process integration. For data and messaging, I incorporated Kafka and IBM MQ to handle streaming of backup job data between services. I built automated test suites with Selenium, JUnit/Cucumber, and SOAP UI, containerized services with Docker, and set up CI/CD pipelines for deployment to AWS EC2 and Kubernetes. I also streamlined the data layer with Hibernate ORM to replace verbose JDBC code.",
      result: "The initiative was a resounding success, breathing new life into Commvault's platform. The migrated system became far more agile and maintainable – new features that once took weeks could now be rolled out in days, thanks to the decoupled microservice design. Performance and reliability improved significantly: backups and restores ran faster due to optimized multi-threading and messaging, and the system could be scaled horizontally to meet demand. This modernization also allowed Commvault to offer its solution in cloud environments with Kubernetes orchestration. In one notable outcome, updates that previously required downtime were deployed with zero downtime, keeping customer systems running 24/7.",
      environment: "JAVA 8 & 11, Spring MVC, Kubernetes, Spring Boot, Microservices, Angular 4&6, PostgreSQL, MongoDB, Kafka, Oracle 12c, AWS, Docker, Spring Cloud",
      color: "pink-500"
    }
  ];

  const [activeExperience, setActiveExperience] = useState<number>(0);
  const [visibleSection, setVisibleSection] = useState<string | null>(null);

  // Toggle section visibility for animations
  const toggleSection = (section: string) => {
    if (visibleSection === section) {
      setVisibleSection(null);
    } else {
      setVisibleSection(section);
    }
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden bg-cyber-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-10">
            <Code size={24} className="text-cyber-neon mr-3" />
            <h2 className="text-3xl font-cyber neon-text">Work Experience</h2>
          </div>
          
          {/* Experience tabs */}
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <div className="sticky top-24">
                <ul className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
                  {experiences.map((exp, index) => (
                    <li key={index}>
                      <button
                        onClick={() => setActiveExperience(index)}
                        className={`cyber-button w-full text-left ${
                          activeExperience === index ? `border-${exp.color} shadow-neon-glow` : 'border-gray-700'
                        }`}
                      >
                        <span className="block font-medium">{exp.company}</span>
                        <span className="block text-xs text-gray-400">{exp.period}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:w-3/4">
              <div className="cyber-card p-6 relative overflow-hidden">
                {/* Experience header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-cyber text-cyber-neon mb-1">{experiences[activeExperience].role}</h3>
                  <p className="text-gray-400">{experiences[activeExperience].company} | {experiences[activeExperience].period}</p>
                </div>
                
                {/* STAR format content */}
                <div className="space-y-6">
                  {/* Situation */}
                  <div 
                    className="transition-all duration-500 hover:bg-cyber-secondary/30 p-3 rounded cursor-pointer border border-transparent hover:border-cyan-500/30"
                    onClick={() => toggleSection('situation')}
                  >
                    <h4 className="flex items-center text-lg text-cyber-accent mb-2">
                      <Terminal size={18} className="mr-2" />
                      Situation
                      <span className="ml-2 text-xs text-cyan-500">[Click to expand]</span>
                    </h4>
                    <div className={`overflow-hidden transition-all duration-500 ${visibleSection === 'situation' ? 'max-h-96' : 'max-h-16'}`}>
                      <p className="text-gray-300 leading-relaxed">{experiences[activeExperience].situation}</p>
                    </div>
                  </div>
                  
                  {/* Task */}
                  <div 
                    className="transition-all duration-500 hover:bg-cyber-secondary/30 p-3 rounded cursor-pointer border border-transparent hover:border-cyan-500/30"
                    onClick={() => toggleSection('task')}
                  >
                    <h4 className="flex items-center text-lg text-cyber-accent mb-2">
                      <Terminal size={18} className="mr-2" />
                      Task
                      <span className="ml-2 text-xs text-cyan-500">[Click to expand]</span>
                    </h4>
                    <div className={`overflow-hidden transition-all duration-500 ${visibleSection === 'task' ? 'max-h-96' : 'max-h-16'}`}>
                      <p className="text-gray-300 leading-relaxed">{experiences[activeExperience].task}</p>
                    </div>
                  </div>
                  
                  {/* Action */}
                  <div 
                    className="transition-all duration-500 hover:bg-cyber-secondary/30 p-3 rounded cursor-pointer border border-transparent hover:border-cyan-500/30"
                    onClick={() => toggleSection('action')}
                  >
                    <h4 className="flex items-center text-lg text-cyber-accent mb-2">
                      <Terminal size={18} className="mr-2" />
                      Action
                      <span className="ml-2 text-xs text-cyan-500">[Click to expand]</span>
                    </h4>
                    <div className={`overflow-hidden transition-all duration-500 ${visibleSection === 'action' ? 'max-h-96' : 'max-h-16'}`}>
                      <p className="text-gray-300 leading-relaxed">{experiences[activeExperience].action}</p>
                    </div>
                  </div>
                  
                  {/* Result */}
                  <div 
                    className="transition-all duration-500 hover:bg-cyber-secondary/30 p-3 rounded cursor-pointer border border-transparent hover:border-cyan-500/30"
                    onClick={() => toggleSection('result')}
                  >
                    <h4 className="flex items-center text-lg text-cyber-accent mb-2">
                      <Terminal size={18} className="mr-2" />
                      Result
                      <span className="ml-2 text-xs text-cyan-500">[Click to expand]</span>
                    </h4>
                    <div className={`overflow-hidden transition-all duration-500 ${visibleSection === 'result' ? 'max-h-96' : 'max-h-16'}`}>
                      <p className="text-gray-300 leading-relaxed">{experiences[activeExperience].result}</p>
                    </div>
                  </div>
                  
                  {/* Technologies */}
                  <div>
                    <h4 className="flex items-center text-lg text-cyber-accent mb-2">
                      <Terminal size={18} className="mr-2" />
                      Technologies
                    </h4>
                    <p className="text-sm font-mono text-cyan-300 leading-relaxed bg-cyber-secondary/50 p-3 rounded border border-cyan-500/20">
                      {experiences[activeExperience].environment}
                    </p>
                  </div>
                </div>

                {/* Decorative elements for each experience */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-cyan-500/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-transparent to-purple-500/10 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl"></div>
      
      {/* Scan line effect */}
      <div className="scan-effect absolute inset-0 pointer-events-none"></div>
    </section>
  );
};

export default ExperienceSection;
