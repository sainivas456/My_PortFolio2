
import { ArrowDown, Terminal, Zap } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

const HeroSection: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const createTypewriter = (element: HTMLElement, text: string, delay: number = 70) => {
      let index = 0;
      element.textContent = '';
      
      const typeNextChar = () => {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          // Play typing sound with 30% chance to avoid sound fatigue
          if (Math.random() < 0.3 && window.playSound) {
            window.playSound('typing');
          }
          index++;
          setTimeout(typeNextChar, delay);
        }
      };
      
      typeNextChar();
    };
    
    if (textRef.current) {
      setTimeout(() => {
        createTypewriter(textRef.current!, 'Full Stack Developer');
      }, 800);
    }
    
    // Add scroll observer for reveal animations
    const observeElements = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.add('opacity-100');
            if (window.playSound) {
              window.playSound('transition');
            }
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      document.querySelectorAll('.reveal-element').forEach(el => {
        el.classList.add('opacity-0');
        observer.observe(el);
      });
    };
    
    observeElements();
    
    // Add hover sound effect to buttons
    const buttons = document.querySelectorAll('.cyber-button');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        if (window.playSound) {
          window.playSound('hover');
        }
      });
    });
    
    return () => {
      const buttons = document.querySelectorAll('.cyber-button');
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', () => {});
      });
    };
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-cyber-grid bg-grid-lg">
      <div className="absolute inset-0 bg-gradient-cyber z-0"></div>
      
      {/* Data streams effect - enhanced animation */}
      <div className="data-stream"></div>
      
      <div className="container mx-auto px-4 z-10 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <p className="font-mono text-gray-400 mb-2 flex items-center reveal-element transition-all duration-700 ease-out">
              <Terminal size={16} className="mr-2 text-cyan-500" />
              _SYSTEM/USER/PROFILE
            </p>
            <h1 className="text-4xl md:text-6xl font-cyber mb-4 reveal-element transition-all duration-1000 ease-out">
              <span className="neon-text cyber-glow">Sainivas</span>{" "}
              <span className="text-white">Gandham</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-mono mb-6 reveal-element transition-all duration-1000 ease-out delay-300">
              <span className="text-gray-300">&lt;</span>
              <span ref={textRef} className="text-cyber-neon"></span>
              <span className="text-gray-300 animate-pulse">_</span>
              <span className="text-gray-300">/&gt;</span>
            </h2>
            <p className="text-gray-300 max-w-2xl leading-relaxed reveal-element transition-all duration-1000 ease-out delay-500">
              Full stack developer with 4+ years of experience specializing in Java, Spring Boot, modern frontend frameworks and machine learning. 
              Passionate about building robust, scalable applications with clean architecture and optimal performance.
            </p>
            
            <div className="flex items-center mt-4 text-cyber-pink reveal-element transition-all duration-1000 ease-out delay-700">
              <Zap size={18} className="mr-2" />
              <p className="text-sm font-mono">Transforming legacy systems into cutting-edge applications</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-8 reveal-element transition-all duration-1000 ease-out delay-900">
            <a href="#experience" className="cyber-button group">
              <span className="group-hover:text-cyan-400 transition-colors">View Experience</span>
            </a>
            <a href="#contact" className="cyber-button group">
              <span className="group-hover:text-cyan-400 transition-colors">Contact Me</span>
            </a>
            <a href="#skills" className="cyber-button group">
              <span className="group-hover:text-cyan-400 transition-colors">Explore Skills</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
        <a 
          href="#about" 
          className="flex flex-col items-center text-gray-400 hover:text-cyber-neon transition-colors duration-300"
          onMouseEnter={() => window.playSound && window.playSound('hover')}
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown size={20} />
        </a>
      </div>
      
      {/* Enhanced scan line effect */}
      <div className="scan-effect absolute inset-0 pointer-events-none"></div>
      
      {/* Decorative elements with improved animations */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyber-neon/5 rounded-full filter blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-cyber-pink/5 rounded-full filter blur-3xl animate-pulse-glow"></div>
    </section>
  );
};

export default HeroSection;
