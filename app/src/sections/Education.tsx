import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  year: string;
  icon: React.ElementType;
}

const educationData: EducationItem[] = [
  {
    degree: 'M.Tech',
    field: 'Computer Science & Engineering',
    institution: 'Swami Keshvanand Institute of Technology',
    location: 'Jaipur, Rajasthan',
    year: '2020',
    icon: Award,
  },
  {
    degree: 'B.Tech',
    field: 'Computer Science & Engineering',
    institution: 'Vivekananda Institute of Technology',
    location: 'Jaipur, Rajasthan',
    year: '2017',
    icon: GraduationCap,
  },
];

const Education = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);

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

    // Spine line draw animation
    const spineTrigger = ScrollTrigger.create({
      trigger: spineRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
      onUpdate: (self) => {
        if (spineRef.current) {
          const gradient = `linear-gradient(to bottom, 
            #d0ff59 0%, 
            #d0ff59 ${self.progress * 100}%, 
            #2d2d2d ${self.progress * 100}%, 
            #2d2d2d 100%)`;
          spineRef.current.style.background = gradient;
        }
      },
    });
    triggers.push(spineTrigger);

    // Cards animation
    const cards = timelineRef.current?.querySelectorAll('.education-card');
    if (cards) {
      cards.forEach((card, index) => {
        const cardTrigger = ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              card,
              { 
                x: index % 2 === 0 ? -50 : 50, 
                opacity: 0,
                rotateZ: index % 2 === 0 ? -5 : 5
              },
              { 
                x: 0, 
                opacity: 1, 
                rotateZ: 0,
                duration: 0.8, 
                ease: 'back.out(1.2)',
                delay: index * 0.2
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
      id="education"
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-12"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d0ff59]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="font-display text-5xl sm:text-6xl lg:text-7xl text-white mb-6"
          >
            <span className="text-[#d0ff59]">Education</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Academic foundation that powers my technical expertise
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Spine Line */}
          <div
            ref={spineRef}
            className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full hidden md:block"
            style={{ background: '#2d2d2d' }}
          />

          {/* Education Cards */}
          <div className="space-y-12 md:space-y-0">
            {educationData.map((edu, index) => (
              <div
                key={edu.institution}
                className={`education-card relative grid md:grid-cols-2 gap-8 items-center ${
                  index === 0 ? 'md:pb-16' : ''
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-[#1a1a1a] border-2 border-[#d0ff59] rounded-full flex items-center justify-center z-10 hidden md:block">
                  <edu.icon className="w-5 h-5 text-[#d0ff59]" />
                </div>

                {/* Content - Alternating sides */}
                {index % 2 === 0 ? (
                  <>
                    <div className="md:pr-16 md:text-right">
                      <div className="glass rounded-2xl p-6 lg:p-8 hover:border-[#d0ff59]/30 transition-all duration-500 group">
                        <div className="flex items-center gap-2 text-[#d0ff59] text-sm mb-3 md:justify-end">
                          <Calendar className="w-4 h-4" />
                          <span>{edu.year}</span>
                        </div>
                        
                        <h3 className="font-display text-2xl lg:text-3xl text-white mb-2 group-hover:text-[#d0ff59] transition-colors">
                          {edu.degree}: {edu.field}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-gray-400 md:justify-end">
                          <BookOpen className="w-4 h-4" />
                          <span>{edu.institution}</span>
                        </div>
                        
                        <div className="text-gray-500 text-sm mt-1 md:text-right">
                          {edu.location}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden md:block" />
                    <div className="md:pl-16">
                      <div className="glass rounded-2xl p-6 lg:p-8 hover:border-[#d0ff59]/30 transition-all duration-500 group">
                        <div className="flex items-center gap-2 text-[#d0ff59] text-sm mb-3">
                          <Calendar className="w-4 h-4" />
                          <span>{edu.year}</span>
                        </div>
                        
                        <h3 className="font-display text-2xl lg:text-3xl text-white mb-2 group-hover:text-[#d0ff59] transition-colors">
                          {edu.degree}: {edu.field}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-gray-400">
                          <BookOpen className="w-4 h-4" />
                          <span>{edu.institution}</span>
                        </div>
                        
                        <div className="text-gray-500 text-sm mt-1">
                          {edu.location}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 glass rounded-full">
            <div className="w-2 h-2 bg-[#d0ff59] rounded-full animate-pulse" />
            <span className="text-gray-400 text-sm">
              Continuously learning and expanding my skill set
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
