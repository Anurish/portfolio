import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Code, Award, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    // Heading reveal
    const headingTrigger = ScrollTrigger.create({
      trigger: headingRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          headingRef.current,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.8, ease: 'power3.out' }
        );
      },
      once: true,
    });
    triggers.push(headingTrigger);

    // Text animation
    const textTrigger = ScrollTrigger.create({
      trigger: textRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          textRef.current?.querySelectorAll('.text-line') || [],
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );
      },
      once: true,
    });
    triggers.push(textTrigger);

    // Image 1 animation
    const img1Trigger = ScrollTrigger.create({
      trigger: image1Ref.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(
          image1Ref.current,
          { y: 100, opacity: 0, rotate: -5 },
          { y: 0, opacity: 1, rotate: 0, duration: 1, ease: 'expo.out' }
        );
      },
      once: true,
    });
    triggers.push(img1Trigger);

    // Image 2 animation
    const img2Trigger = ScrollTrigger.create({
      trigger: image2Ref.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(
          image2Ref.current,
          { y: 150, opacity: 0, rotate: 5 },
          { y: 0, opacity: 1, rotate: 0, duration: 1, ease: 'expo.out', delay: 0.2 }
        );
      },
      once: true,
    });
    triggers.push(img2Trigger);

    // Parallax for images
    const parallax1 = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        if (image1Ref.current) {
          gsap.set(image1Ref.current, { y: self.progress * -50 });
        }
      },
    });
    triggers.push(parallax1);

    const parallax2 = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        if (image2Ref.current) {
          gsap.set(image2Ref.current, { y: self.progress * -120, rotate: self.progress * 10 });
        }
      },
    });
    triggers.push(parallax2);

    // Stats animation
    const statsTrigger = ScrollTrigger.create({
      trigger: statsRef.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(
          statsRef.current?.querySelectorAll('.stat-item') || [],
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' }
        );
      },
      once: true,
    });
    triggers.push(statsTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  // 3D Tilt effect for images
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(ref.current, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const stats = [
    { icon: Briefcase, value: '6+', label: 'Years Experience' },
    { icon: Code, value: '50+', label: 'Projects Completed' },
    { icon: Award, value: '30+', label: 'Technical Issues Resolved' },
    { icon: Users, value: '10+', label: 'Database Migrations' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Text Content */}
          <div className="lg:sticky lg:top-32">
            <h2
              ref={headingRef}
              className="font-display text-5xl sm:text-6xl lg:text-7xl text-white mb-8"
              style={{ clipPath: 'inset(0 100% 0 0)' }}
            >
              About <span className="text-[#d0ff59]">Me</span>
            </h2>

            <div ref={textRef} className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p className="text-line">
                Software Engineer with <span className="text-white font-semibold">6+ years</span> of experience in backend and fullstack development, specializing in <span className="text-[#d0ff59]">PHP, Laravel, WordPress</span> and <span className="text-[#d0ff59]">MERN stack</span> applications.
              </p>
              <p className="text-line">
                I bring strong expertise in <span className="text-white">CMS customization</span>, <span className="text-white">API integrations</span> and <span className="text-white">production-grade deployments</span>. My approach combines technical precision with creative problem-solving.
              </p>
              <p className="text-line">
                From optimizing page load times by <span className="text-[#d0ff59]">30%</span> to migrating enterprise platforms like energizer.com, I deliver measurable results that drive business growth.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-item glass rounded-xl p-4 text-center hover:border-[#d0ff59]/30 transition-colors"
                >
                  <stat.icon className="w-6 h-6 text-[#d0ff59] mx-auto mb-2" />
                  <div className="font-display text-3xl text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="relative h-[600px] lg:h-[800px]">
            <div
              ref={image1Ref}
              className="absolute top-0 right-0 w-4/5 z-10 card-3d"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
              onMouseMove={(e) => handleMouseMove(e, image1Ref)}
              onMouseLeave={() => handleMouseLeave(image1Ref)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/about1.jpg"
                  alt="Working on laptop"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>

            <div
              ref={image2Ref}
              className="absolute bottom-0 left-0 w-3/4 z-20 card-3d"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
              onMouseMove={(e) => handleMouseMove(e, image2Ref)}
              onMouseLeave={() => handleMouseLeave(image2Ref)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-[#2d2d2d]">
                <img
                  src="/about2.jpg"
                  alt="Professional portrait"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#d0ff59]/5 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
