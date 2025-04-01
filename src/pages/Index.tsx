
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import SoundEffects from '@/components/SoundEffects';

const Index = () => {
  useEffect(() => {
    // Initialize smooth scroll behavior
    const initSmoothScroll = () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href')!);
          if (target) {
            // Play zap sound
            if (window.playSound) {
              console.log('Attempting to play zap sound');
              window.playSound('zap');
            }
            
            // Smooth scroll with easing
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });
    };

    // Initialize skill bars with animation
    const initSkillBars = () => {
      const skillBars = document.querySelectorAll('.skill-bar-inner');
      skillBars.forEach((bar) => {
        const width = (bar as HTMLElement).dataset.width || '0%';
        setTimeout(() => {
          (bar as HTMLElement).style.width = width;
        }, 500);
      });
    };

    // Add scroll event listener for scroll-triggered animations
    const handleScroll = () => {
      const scrollElements = document.querySelectorAll('.scroll-reveal:not(.active)');
      
      scrollElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          el.classList.add('active');
          
          // Play zap sound when elements appear
          if (window.playSound && Math.random() < 0.3) {
            console.log('Attempting to play zap sound on reveal');
            window.playSound('zap');
          }
        }
      });
    };

    // Initialize all effects
    initSmoothScroll();
    initSkillBars();
    handleScroll(); // Run once on load

    // Add event listeners
    window.addEventListener('scroll', handleScroll);

    // Add cinematic cursor trail effect
    const addCursorEffect = () => {
      const cursor = document.createElement('div');
      cursor.className = 'cursor-fx';
      document.body.appendChild(cursor);
      
      let cursorTimeout: number;
      
      document.addEventListener('mousemove', (e) => {
        cursor.style.opacity = '1';
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
        
        clearTimeout(cursorTimeout);
        cursorTimeout = window.setTimeout(() => {
          cursor.style.opacity = '0';
        }, 2000);
      });
    };
    
    addCursorEffect();

    // Add hover sound effects to all interactive elements
    const addHoverSoundEffects = () => {
      const interactiveElements = document.querySelectorAll('a, button, .cyber-button, .cyber-highlight');
      
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          if (window.playSound) {
            console.log('Playing zap sound effect');
            window.playSound('zap');
          }
        });
      });
    };
    
    // Initialize hover sound effects after a short delay to ensure DOM is ready
    setTimeout(addHoverSoundEffects, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-cyber-dark text-white overflow-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
      <SoundEffects />
    </div>
  );
};

export default Index;
