import React, { useRef } from 'react';
import { CodeSquare, Database, BrainCircuit } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  icon: React.ReactNode;
  link?: string;
  featured?: boolean;
}

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const projects: Project[] = [
    {
      title: "Meal Planner Application",
      description: "Full-stack application using React.js, TypeScript, MongoDB, and Docker to suggest balanced meals based on nutritional goals, preferences, and allergies using Dynamic Programming. Recognized at the UAlbany showcase for innovation.",
      technologies: ["React.js", "TypeScript", "MongoDB", "Docker", "Dynamic Programming"],
      icon: <Database size={28} className="text-cyan-400" />,
      featured: true
    },
    {
      title: "DiscoverScholars: AI-Powered Research Paper Discovery",
      description: "Research paper recommendation and trend prediction system using Neo4j, Node2Vec, DeepWalk, and BERT. Integrated GNNs for link prediction with a Flask/FastAPI backend and React.js frontend with D3.js visualizations.",
      technologies: ["Neo4j", "BERT", "Node2Vec", "Flask/FastAPI", "React.js", "D3.js", "MongoDB", "PostgreSQL"],
      icon: <BrainCircuit size={28} className="text-purple-400" />,
      featured: true
    },
    {
      title: "Leaf Disease Detection",
      description: "Flask-based web app for real-time plant disease detection using CNNs (DenseNet) with 96.7% accuracy, leveraging transfer learning for efficient inference and seamless user integration.",
      technologies: ["Flask", "CNNs", "DenseNet", "Transfer Learning", "Computer Vision"],
      icon: <BrainCircuit size={28} className="text-green-400" />
    },
    {
      title: "NLP-Based Currency Detector for Visually Impaired",
      description: "Application for visually impaired users to detect currency denominations using TensorFlow, OpenCV, and NLTK, with real-time recognition and audio feedback for accessibility.",
      technologies: ["TensorFlow", "OpenCV", "NLTK", "Accessibility", "Computer Vision"],
      icon: <BrainCircuit size={28} className="text-yellow-400" />
    },
    {
      title: "Mobile Game for Alzheimer's Detection",
      description: "Unity-based memory game incorporating DFS and A* pathfinding to assess Alzheimer's severity, ensuring interactive gameplay aligned with medical assessments.",
      technologies: ["Unity", "DFS", "A* Pathfinding", "Game Development", "Medical Assessment"],
      icon: <CodeSquare size={28} className="text-red-400" />
    },
    {
      title: "Optimized KNN Algorithm",
      description: "Implemented KNN from scratch using k-d trees and ball trees for faster computations. Applied feature engineering and k-fold cross-validation to enhance accuracy and performance.",
      technologies: ["k-d Trees", "Ball Trees", "Feature Engineering", "k-fold Cross-validation", "Machine Learning"],
      icon: <CodeSquare size={28} className="text-blue-400" />
    },
    {
      title: "Custom Neural Networks for MNIST Data",
      description: "Developed and trained neural networks, including LeNet-5, on the MNIST dataset, achieving 96% accuracy using SGD and SGDMomentum. Optimized feature extraction and model efficiency.",
      technologies: ["LeNet-5", "MNIST", "SGD", "Neural Networks", "Model Optimization"],
      icon: <BrainCircuit size={28} className="text-indigo-400" />
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 relative overflow-hidden bg-cyber-dark">
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/80 via-cyber-dark to-cyber-dark/90 z-0"></div>
      <div className="grid-overlay absolute inset-0 opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center mb-12">
            <CodeSquare size={24} className="text-cyber-neon mr-3" />
            <h2 className="text-3xl font-cyber neon-text">Projects</h2>
          </div>
          
          {/* Featured Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {projects
              .filter(project => project.featured)
              .map((project, index) => (
                <Card key={index} className="cyber-card border-l-4 border-cyan-500/60 hover:border-cyan-400 transition-all duration-300 scroll-reveal">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-2 bg-cyber-secondary/30 rounded-lg">
                      {project.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-cyan-400">{project.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span key={techIndex} className="text-xs bg-cyber-secondary/50 text-cyan-300 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-xs bg-cyber-secondary/50 text-cyan-300 px-2 py-1 rounded">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
          
          {/* Other Projects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            {projects
              .filter(project => !project.featured)
              .map((project, index) => (
                <Card key={index} className="cyber-card hover:border-l-2 hover:border-l-cyan-500/60 transition-all duration-300 scroll-reveal">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-1">
                      {project.icon}
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-sm text-gray-400 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span key={techIndex} className="text-xs bg-cyber-secondary/30 text-cyan-300/80 px-2 py-0.5 rounded-sm">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs bg-cyber-secondary/30 text-cyan-300/80 px-2 py-0.5 rounded-sm">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
      
      {/* Scan line effect */}
      <div className="scan-effect absolute inset-0 pointer-events-none"></div>
    </section>
  );
};

export default ProjectsSection;
