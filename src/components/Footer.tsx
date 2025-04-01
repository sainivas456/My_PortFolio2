
import { Code, Github, Linkedin, Mail, Zap } from 'lucide-react';
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-cyber-dark border-t border-cyan-500/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-0"></div>
      <div className="data-stream z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="reveal-element transition-all duration-700 ease-out">
              <h3 className="text-xl cyber-text mb-4 flex items-center">
                <Code size={20} className="mr-2 text-cyber-neon" />
                SAINIVAS GANDHAM
              </h3>
              <p className="text-gray-400 mb-4 max-w-md">
                Full Stack Developer with expertise in Spring Boot, React, Angular, and cloud technologies.
                Passionate about building robust and scalable applications.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/" 
                  className="text-gray-400 hover:text-cyber-neon transition-colors duration-300"
                  onMouseEnter={() => window.playSound && window.playSound('hover')}
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://linkedin.com/" 
                  className="text-gray-400 hover:text-cyber-neon transition-colors duration-300"
                  onMouseEnter={() => window.playSound && window.playSound('hover')}
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="mailto:sainivas.gandham123@gmail.com" 
                  className="text-gray-400 hover:text-cyber-neon transition-colors duration-300"
                  onMouseEnter={() => window.playSound && window.playSound('hover')}
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
            
            <div className="reveal-element transition-all duration-700 ease-out delay-300">
              <h3 className="text-xl cyber-text mb-4 flex items-center">
                <Zap size={20} className="mr-2 text-cyber-neon" />
                QUICK LINKS
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ["home", "Home"],
                  ["about", "About"],
                  ["experience", "Experience"],
                  ["skills", "Skills"],
                  ["certifications", "Certifications"],
                  ["contact", "Contact"]
                ].map(([id, label]) => (
                  <a 
                    key={id} 
                    href={`#${id}`} 
                    className="text-gray-400 hover:text-cyber-neon transition-colors duration-300 cyber-highlight"
                    onMouseEnter={() => window.playSound && window.playSound('hover')}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center reveal-element transition-all duration-700 ease-out delay-500">
            <p className="text-gray-400">
              &copy; {currentYear} All Rights Reserved
            </p>
            <p className="text-sm text-gray-500 mt-2">
                Full Stack Developer | Machine Learning Engineer
            </p>
          </div>
        </div>
      </div>
      
      {/* Enhanced scan line effect */}
      <div className="scan-effect absolute inset-0 pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
