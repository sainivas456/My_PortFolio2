
import { cn } from '@/lib/utils';
import { Archive, Award, Code, Menu, Terminal, X, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrolled(position > 20);
      
      // Calculate which section is currently in view
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'certifications', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Zap size={16} /> },
    { id: 'about', label: 'About', icon: <Terminal size={16} /> },
    { id: 'experience', label: 'Experience', icon: <Code size={16} /> },
    { id: 'skills', label: 'Skills', icon: <Terminal size={16} /> },
    { id: 'projects', label: 'Projects', icon: <Archive size={16} /> },
    { id: 'certifications', label: 'Certifications', icon: <Award size={16} /> },
    { id: 'contact', label: 'Contact', icon: <Terminal size={16} /> },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500',
        scrolled ? 'bg-cyber-dark/80 backdrop-blur-lg py-3 border-b border-cyan-500/30' : 'py-5'
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#home" className="cyber-text text-xl animate-text-flicker group">
              <span className="inline-block group-hover:animate-glitch transition-all">SAINIVAS.G</span>
              <span className="ml-2 text-xs text-cyan-500/70 hidden md:inline-block">[FULL STACK DEV]</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    'flex items-center gap-1.5 cyber-highlight hover:text-cyan-400 transition-colors duration-300',
                    activeSection === item.id ? 'text-cyan-400' : 'text-gray-400'
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          
          {/* Mobile Menu Button */}
          <div className="block md:hidden">
            <button 
              className="cyber-button text-sm px-3 py-1"
              onClick={toggleMobileMenu}
            >
              <span className="flex items-center gap-1.5">
                {isMobileMenuOpen ? (
                  <X size={16} className="text-cyan-500" />
                ) : (
                  <Menu size={16} className="text-cyan-500" />
                )}
                <span>{isMobileMenuOpen ? 'Close' : 'Menu'}</span>
              </span>
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Navigation Overlay */}
      <div 
        className={cn(
          'fixed inset-0 bg-cyber-dark/95 backdrop-blur-lg z-40 transition-all duration-500 flex flex-col justify-center items-center md:hidden',
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <ul className="space-y-6">
          {navItems.map((item) => (
            <li key={item.id} className="text-center">
              <a
                href={`#${item.id}`}
                className={cn(
                  'flex items-center gap-2 text-xl font-cyber transition-colors duration-300',
                  activeSection === item.id ? 'text-cyan-400' : 'text-gray-400'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mx-auto flex items-center">
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        
        {/* Decorative elements for mobile menu */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-cyan-500/10 rounded-full filter blur-xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full filter blur-xl"></div>
        <div className="scan-effect absolute inset-0 pointer-events-none"></div>
        <div className="data-stream"></div>
      </div>
      
      {/* Scan effect only visible when scrolled */}
      {scrolled && (
        <div className="scan-effect absolute inset-0 pointer-events-none"></div>
      )}
    </header>
  );
};

export default Navbar;
