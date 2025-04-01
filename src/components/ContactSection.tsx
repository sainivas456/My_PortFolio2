
import React, { useState } from 'react';
import { Terminal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      
      // Show success toast
      toast({
        title: "Message Sent",
        description: "Thank you for your message. I'll get back to you soon!",
        variant: "default",
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-cyber-grid bg-grid-lg">
      <div className="absolute inset-0 bg-gradient-cyber z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-10">
            <Terminal size={24} className="text-cyber-neon mr-3" />
            <h2 className="text-3xl font-cyber neon-text">Contact Me</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="cyber-card">
                <h3 className="text-xl cyber-text mb-6">Get In Touch</h3>
                <p className="text-gray-300 mb-8">
                  Have a project in mind? Looking to collaborate or hire me? Feel free to reach out using the contact form or via the contact details below.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 mb-1">Email:</p>
                    <p className="text-cyber-neon">nivas.gandham456@gmail.com</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 mb-1">Phone:</p>
                    <p className="text-cyber-neon">+1 518 533 0562</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-400 mb-1">Location:</p>
                    <p className="text-cyber-neon">Albany, New York</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg text-gray-300 mb-4">Social Links:</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://linkedin.com/in/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cyber-button px-4 py-2"
                    >
                      LinkedIn
                    </a>
                    <a 
                      href="https://github.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cyber-button px-4 py-2"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <form onSubmit={handleSubmit} className="cyber-card">
                <h3 className="text-xl cyber-text mb-6">Send Message</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-cyber-secondary/30 border border-cyan-500/30 rounded px-4 py-2 text-gray-300 focus:outline-none focus:border-cyan-500 focus:shadow-neon-glow transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-cyber-secondary/30 border border-cyan-500/30 rounded px-4 py-2 text-gray-300 focus:outline-none focus:border-cyan-500 focus:shadow-neon-glow transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-cyber-secondary/30 border border-cyan-500/30 rounded px-4 py-2 text-gray-300 focus:outline-none focus:border-cyan-500 focus:shadow-neon-glow transition-all duration-300"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cyber-button w-full py-3 mt-4 text-lg"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scan line effect */}
      <div className="scan-effect absolute inset-0 pointer-events-none"></div>
    </section>
  );
};

export default ContactSection;
