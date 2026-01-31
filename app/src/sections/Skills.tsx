import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  // Backend
  { name: 'PHP', level: 95, category: 'Backend' },
  { name: 'Laravel', level: 90, category: 'Backend' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'Express', level: 82, category: 'Backend' },
  
  // Frontend
  { name: 'React.js', level: 88, category: 'Frontend' },
  { name: 'JavaScript', level: 90, category: 'Frontend' },
  { name: 'TypeScript', level: 80, category: 'Frontend' },
  { name: 'HTML/CSS', level: 92, category: 'Frontend' },
  
  // CMS
  { name: 'WordPress', level: 95, category: 'CMS' },
  { name: 'WooCommerce', level: 88, category: 'CMS' },
  { name: 'Shopify', level: 75, category: 'CMS' },
  { name: 'Joomla', level: 70, category: 'CMS' },
  
  // Database
  { name: 'MySQL', level: 90, category: 'Database' },
  { name: 'MongoDB', level: 82, category: 'Database' },
  
  // APIs
  { name: 'REST APIs', level: 92, category: 'APIs' },
  { name: 'GraphQL', level: 78, category: 'APIs' },
  
  // Tools
  { name: 'Git', level: 88, category: 'Tools' },
  { name: 'Docker', level: 75, category: 'Tools' },
  { name: 'AWS', level: 70, category: 'Tools' },
];

const categories = ['All', 'Backend', 'Frontend', 'CMS', 'Database', 'APIs', 'Tools'];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

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

    // Skills grid animation
    const gridTrigger = ScrollTrigger.create({
      trigger: gridRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          gridRef.current?.querySelectorAll('.skill-node') || [],
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.4, 
            stagger: { amount: 0.8, from: 'random' },
            ease: 'elastic.out(1, 0.5)' 
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

  // Animate on category change
  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.querySelectorAll('.skill-node'),
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.3, 
          stagger: 0.03,
          ease: 'power2.out' 
        }
      );
    }
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-12"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d0ff59]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d0ff59]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="font-display text-5xl sm:text-6xl lg:text-7xl text-white mb-6"
          >
            Technical <span className="text-[#d0ff59]">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit built over 6+ years of hands-on development experience
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#d0ff59] text-black'
                  : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#2d2d2d] hover:border-[#d0ff59]/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="skill-node relative group"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div
                className={`relative p-4 rounded-xl border transition-all duration-300 ${
                  hoveredSkill === skill.name
                    ? 'bg-[#d0ff59]/10 border-[#d0ff59] scale-105'
                    : 'bg-[#1a1a1a] border-[#2d2d2d] hover:border-[#d0ff59]/50'
                }`}
              >
                {/* Skill Name */}
                <div className="font-semibold text-white text-sm mb-2">{skill.name}</div>
                
                {/* Progress Bar */}
                <div className="h-1.5 bg-[#2d2d2d] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#d0ff59] to-[#a8e063] rounded-full transition-all duration-700"
                    style={{ 
                      width: hoveredSkill === skill.name ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 50}ms`
                    }}
                  />
                </div>
                
                {/* Level Percentage */}
                <div className={`text-xs mt-1 transition-opacity duration-300 ${
                  hoveredSkill === skill.name ? 'opacity-100 text-[#d0ff59]' : 'opacity-0'
                }`}>
                  {skill.level}%
                </div>

                {/* Glow Effect */}
                {hoveredSkill === skill.name && (
                  <div className="absolute inset-0 rounded-xl bg-[#d0ff59]/20 blur-xl -z-10" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Skill Categories Summary */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.slice(1).map((cat) => {
            const catSkills = skills.filter(s => s.category === cat);
            const avgLevel = Math.round(catSkills.reduce((a, b) => a + b.level, 0) / catSkills.length);
            
            return (
              <div
                key={cat}
                className="glass rounded-xl p-4 text-center hover:border-[#d0ff59]/30 transition-all duration-300 group"
              >
                <div className="text-[#d0ff59] font-display text-3xl mb-1 group-hover:scale-110 transition-transform">
                  {avgLevel}%
                </div>
                <div className="text-gray-400 text-sm">{cat}</div>
                <div className="text-xs text-gray-500 mt-1">{catSkills.length} skills</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
