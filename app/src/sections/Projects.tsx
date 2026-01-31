import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowUpRight, Code2, Layers, Zap, Globe } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  achievements: string[];
  icon: React.ElementType;
  color: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Energizer.com Migration',
    category: 'Enterprise CMS',
    description: 'Migrated the global Energizer platform to a WordPress multisite setup',
    fullDescription: 'Led the complete migration of energizer.com to a WordPress multisite architecture, enabling region-specific content management while maintaining brand consistency. Implemented automated deployment pipelines and optimized database structures.',
    technologies: ['WordPress Multisite', 'PHP', 'MySQL', 'AWS', 'Docker'],
    achievements: [
      'Reduced maintenance workload by 50%',
      'Implemented automated backup systems',
      'Achieved 99.9% uptime post-migration',
    ],
    icon: Zap,
    color: '#d0ff59',
  },
  {
    id: 2,
    title: 'Headless CMS Platform',
    category: 'Full Stack',
    description: 'Built a headless CMS using WordPress backend with React frontend',
    fullDescription: 'Developed a modern headless CMS solution combining WordPress as the content backend with a React-based frontend. This architecture enabled faster content publishing and better performance metrics.',
    technologies: ['WordPress REST API', 'React', 'Node.js', 'GraphQL', 'MongoDB'],
    achievements: [
      '40% faster content publishing',
      'Improved page load times by 35%',
      'Seamless content editor experience',
    ],
    icon: Layers,
    color: '#60a5fa',
  },
  {
    id: 3,
    title: 'E-Commerce Optimization',
    category: 'WooCommerce',
    description: 'Optimized multiple WooCommerce stores for better performance',
    fullDescription: 'Performed comprehensive optimization on 10+ WooCommerce stores, addressing checkout flow, database queries, and caching strategies to deliver significant performance improvements.',
    technologies: ['WooCommerce', 'PHP', 'Redis', 'Nginx', 'Stripe API'],
    achievements: [
      '28% improvement in load times',
      '15% increase in conversion rates',
      'Reduced cart abandonment by 20%',
    ],
    icon: Globe,
    color: '#f472b6',
  },
  {
    id: 4,
    title: 'Laravel API Suite',
    category: 'Backend',
    description: 'Engineered scalable REST and GraphQL APIs for enterprise applications',
    fullDescription: 'Designed and implemented a comprehensive API suite using Laravel, supporting both REST and GraphQL endpoints. The APIs power mobile applications and third-party integrations with high reliability.',
    technologies: ['Laravel', 'GraphQL', 'PostgreSQL', 'Redis', 'JWT Auth'],
    achievements: [
      '30% improvement in request handling',
      '99.5% API uptime',
      'Handled 1M+ requests daily',
    ],
    icon: Code2,
    color: '#a78bfa',
  },
  {
    id: 5,
    title: 'MERN Dashboard',
    category: 'Full Stack',
    description: 'Built a comprehensive analytics dashboard using MERN stack',
    fullDescription: 'Created a real-time analytics dashboard for monitoring business metrics. Features include customizable widgets, data export capabilities, and role-based access control.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io'],
    achievements: [
      'Real-time data visualization',
      'Reduced report generation time by 60%',
      'Role-based access control',
    ],
    icon: ArrowUpRight,
    color: '#34d399',
  },
  {
    id: 6,
    title: 'Shopify Custom App',
    category: 'E-Commerce',
    description: 'Developed a custom Shopify app for inventory management',
    fullDescription: 'Built a custom Shopify application that streamlines inventory management across multiple sales channels. Integrated with warehouse systems and automated stock level notifications.',
    technologies: ['Shopify API', 'Node.js', 'React', 'PostgreSQL', 'Webhooks'],
    achievements: [
      'Automated inventory tracking',
      'Reduced stockouts by 45%',
      'Multi-channel sync capability',
    ],
    icon: Github,
    color: '#fb923c',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    // Heading animation
    const headingTrigger = ScrollTrigger.create({
      trigger: headingRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          headingRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        );
      },
      once: true,
    });
    triggers.push(headingTrigger);

    // Grid cards animation
    const gridTrigger = ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          gridRef.current?.querySelectorAll('.project-card') || [],
          { y: 60, opacity: 0, scale: 0.95 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.6, 
            stagger: 0.1,
            ease: 'power2.out' 
          }
        );
      },
      once: true,
    });
    triggers.push(gridTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-12"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#d0ff59]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-[#d0ff59]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="font-display text-5xl sm:text-6xl lg:text-7xl text-white mb-6"
          >
            Featured <span className="text-[#d0ff59]">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A selection of impactful projects that showcase my technical expertise
          </p>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="glass rounded-2xl p-6 h-full hover:border-[#d0ff59]/30 transition-all duration-500 relative overflow-hidden">
                {/* Gradient Background on Hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${project.color} 0%, transparent 100%)` }}
                />

                {/* Icon */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: `${project.color}20` }}
                >
                  <project.icon className="w-6 h-6" style={{ color: project.color }} />
                </div>

                {/* Category */}
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  {project.category}
                </div>

                {/* Title */}
                <h3 className="font-display text-xl text-white mb-3 group-hover:text-[#d0ff59] transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-[#1a1a1a] rounded text-xs text-gray-500"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-[#1a1a1a] rounded text-xs text-gray-500">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Arrow */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-5 h-5 text-[#d0ff59]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More CTA */}
        <div className="text-center mt-12">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-white hover:border-[#d0ff59] hover:text-[#d0ff59] transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            <span>View More on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl bg-[#1a1a1a] border-[#2d2d2d] text-white">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${selectedProject.color}20` }}
                  >
                    <selectedProject.icon className="w-5 h-5" style={{ color: selectedProject.color }} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">
                      {selectedProject.category}
                    </div>
                    <DialogTitle className="text-2xl font-display text-white">
                      {selectedProject.title}
                    </DialogTitle>
                  </div>
                </div>
              </DialogHeader>
              
              <DialogDescription className="text-gray-400">
                {selectedProject.fullDescription}
              </DialogDescription>

              <div className="space-y-4 mt-4">
                {/* Achievements */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Key Achievements</h4>
                  <ul className="space-y-2">
                    {selectedProject.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="w-1.5 h-1.5 bg-[#d0ff59] rounded-full mt-1.5 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[#2d2d2d] rounded-full text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
