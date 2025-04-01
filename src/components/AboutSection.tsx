
import { Code, Terminal } from 'lucide-react';
import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden bg-cyber-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-10">
            <Terminal size={24} className="text-cyber-neon mr-3" />
            <h2 className="text-3xl font-cyber neon-text">About Me</h2>
          </div>
          
          <div className="cyber-card mb-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <p className="text-gray-300 mb-4 leading-relaxed">
                  I'm a Full Stack Developer with 4+ years of experience in building enterprise-grade applications using various technologies including Java/J2EE, Spring, React, Angular, and Node.js. I'm passionate about creating scalable, efficient, and user-friendly applications.
                </p>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  My expertise spans the entire software development lifecycle, from requirement analysis and design to implementation and production support. I specialize in microservices architecture and cloud-native applications.
                </p>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  I also have strong skills in Machine Learning and AI, with experience in developing models using TensorFlow, Keras, and PyTorch. I've worked on projects involving computer vision, natural language processing, and recommendation systems.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Currently pursuing my Master's in Computer Science at SUNY Albany, I'm enhancing my skills in machine learning and cloud computing to build more intelligent and resilient systems.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="cyber-card h-full flex flex-col justify-center">
                  <h3 className="text-xl cyber-text mb-4">Professional Focus</h3>
                  <ul className="space-y-3">
                    {[
                      'Full-stack Application Development',
                      'Microservices Architecture',
                      'Machine Learning & AI Engineering',
                      'Cloud-native Solutions',
                      'Deep Learning & Neural Networks',
                      'NLP & Computer Vision',
                      'Agile Development Methodologies',
                      'Performance Optimization'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Code size={18} className="text-cyber-accent mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="data-card p-6">
              <h3 className="text-xl cyber-text mb-4">Education</h3>
              <p className="font-medium text-white">State University of New York, Albany (SUNY)</p>
              <p className="text-gray-300">Master of Science, Computer Science Engineering</p>
              <p className="text-gray-400 text-sm">Aug 2023 - May 2025</p>
              <p className="mt-2 text-cyber-accent">GPA: 3.5/4 (Dean's Merit Scholarship)</p>
            </div>
            
            <div className="data-card p-6">
              <h3 className="text-xl cyber-text mb-4">Contact Information</h3>
              <div className="space-y-2">
                <p className="flex items-center text-gray-300">
                  <span className="text-cyber-accent mr-2">Phone:</span>
                  +1 518 533 0562
                </p>
                <p className="flex items-center text-gray-300">
                  <span className="text-cyber-accent mr-2">Email:</span>
                  sainivas.gandham123@gmail.com
                </p>
                <p className="flex items-center text-gray-300">
                  <span className="text-cyber-accent mr-2">Location:</span>
                  Albany, New York
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
