import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, ExternalLink, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  achievements: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: 'CWC Technologies',
    role: 'PHP Developer',
    location: 'Mohali, Punjab',
    period: 'Aug 2024 - Dec 2025',
    achievements: [
      'Engineered scalable backend modules using PHP/Laravel, improving request-handling efficiency by 30%',
      'Delivered MERN-based features that reduced page-load time by 20-25% through optimized API structures',
      'Improved code quality with cleaner standards and consistent reviews, reducing recurring bugs by 40%',
    ],
    technologies: ['PHP', 'Laravel', 'MERN Stack', 'React', 'Node.js'],
  },
  {
    company: 'Green Arrow Consultancy Ltd',
    role: 'Full Stack Developer',
    location: 'Cardiff, Wales (Remote)',
    period: 'Jan 2023 - Jan 2024',
    achievements: [
      'Migrated the energizer.com platform to a multisite setup, cutting maintenance workload by nearly half',
      'Optimized Elementor/DIVI WordPress pages, enhancing load performance by 30%',
      'Developed Node.js and React.js modules that improved data flow efficiency by 25%',
      'Strengthened CMS reliability by resolving 30+ technical issues across environments',
      'Boosted Lighthouse SEO/performance scores by close to 20%',
    ],
    technologies: ['WordPress', 'Node.js', 'React.js', 'Elementor', 'DIVI'],
  },
  {
    company: 'Impinge Solutions',
    role: 'PHP MVC / WordPress Developer',
    location: 'Mohali, Punjab',
    period: 'Dec 2021 - May 2023',
    achievements: [
      'Customized Shopify, Joomla, WooCommerce, and Shopcart systems, reducing UX bottlenecks and improving load time by 25-28%',
      'Built a headless CMS (WordPress + React/Angular) that made content publishing faster by 40%',
      'Implemented REST API and GraphQL integrations that improved data-fetch reliability by 30%',
      'Executed database migrations across 10+ large WordPress sites with zero downtime',
    ],
    technologies: ['PHP MVC', 'WordPress', 'Shopify', 'WooCommerce', 'GraphQL'],
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

    // Cards animation
    const cards = cardsRef.current?.querySelectorAll('.experience-card');
    if (cards) {
      cards.forEach((card, index) => {
        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              card,
              { 
                x: index % 2 === 0 ? -100 : 100, 
                opacity: 0,
                rotateY: index % 2 === 0 ? -15 : 15
              },
              { 
                x: 0, 
                opacity: 1, 
                rotateY: 0,
                duration: 0.8, 
                ease: 'back.out(1.2)' 
              }
            );
          },
          once: true,
        });
        triggers.push(cardTrigger);
      });
    }

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-12"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2d2d2d] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#2d2d2d] to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="font-display text-5xl sm:text-6xl lg:text-7xl text-white mb-6"
          >
            Work <span className="text-[#d0ff59]">History</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A journey through impactful roles and transformative projects
          </p>
        </div>

        {/* Timeline */}
        <div ref={cardsRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#d0ff59] via-[#2d2d2d] to-[#d0ff59] hidden md:block" />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={`experience-card relative grid md:grid-cols-2 gap-8 items-start ${
                  index % 2 === 0 ? '' : 'md:text-right'
                }`}
                style={{ perspective: '1000px' }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-[#d0ff59] rounded-full border-4 border-[#050505] z-10 hidden md:block">
                  <div className="absolute inset-0 bg-[#d0ff59] rounded-full animate-ping opacity-50" />
                </div>

                {/* Content */}
                <div className={`md:col-span-1 ${index % 2 === 0 ? 'md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                  <div className="glass rounded-2xl p-6 lg:p-8 hover:border-[#d0ff59]/30 transition-all duration-500 group">
                    {/* Header */}
                    <div className={`flex flex-col ${index % 2 === 0 ? '' : 'md:items-end'}`}>
                      <div className="flex items-center gap-2 text-[#d0ff59] text-sm mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                      
                      <h3 className="font-display text-2xl lg:text-3xl text-white mb-1 group-hover:text-[#d0ff59] transition-colors">
                        {exp.company}
                      </h3>
                      
                      <div className={`flex items-center gap-2 text-gray-400 text-sm mb-4 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>

                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#d0ff59]/10 rounded-full text-[#d0ff59] text-sm mb-4">
                        <span>{exp.role}</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Achievements */}
                    <ul className={`space-y-3 mb-6 ${index % 2 === 0 ? '' : 'md:text-left'}`}>
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-[#d0ff59] rounded-full mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-[#1a1a1a] border border-[#2d2d2d] rounded-full text-xs text-gray-400 hover:border-[#d0ff59]/50 hover:text-white transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                {index % 2 === 0 ? (
                  <div className="hidden md:block md:col-span-1" />
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="https://linkedin.com/in/anurish"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] border border-[#2d2d2d] rounded-full text-white hover:border-[#d0ff59] hover:text-[#d0ff59] transition-all duration-300"
          >
            <span>View Full Profile</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
