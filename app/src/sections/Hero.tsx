import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Fluid Background Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      life: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x: number, y: number) => {
      return {
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 100 + 50,
        life: 1,
      };
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add new particles based on mouse
      if (Math.random() < 0.1) {
        particles.push(createParticle(mousePos.x, mousePos.y));
      }

      // Add ambient particles
      if (Math.random() < 0.05) {
        particles.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height));
      }

      particles = particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.002;

        if (p.life > 0) {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          gradient.addColorStop(0, `rgba(208, 255, 89, ${p.life * 0.15})`);
          gradient.addColorStop(0.5, `rgba(208, 255, 89, ${p.life * 0.05})`);
          gradient.addColorStop(1, 'rgba(208, 255, 89, 0)');

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          return true;
        }
        return false;
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Entrance Animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    tl.fromTo(
      profileRef.current,
      { scale: 3, opacity: 0, filter: 'blur(20px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.2 }
    )
      .fromTo(
        nameRef.current?.querySelectorAll('.char') || [],
        { y: 100, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.03 },
        '-=0.8'
      )
      .fromTo(
        titleRef.current,
        { width: 0, opacity: 0 },
        { width: 'auto', opacity: 1, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );
  }, []);

  // Split name into characters
  const name = 'ANURISH GANGRADE';
  const nameChars = name.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  const scrollToWork = () => {
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fluid Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: '#050505' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        {/* Profile Image */}
        <div
          ref={profileRef}
          className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto mb-8"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#d0ff59] to-[#a8e063] opacity-50 blur-xl animate-pulse" />
       <img
  src="/profile.jpg"
  alt="Anurish Gangrade"
  className="relative w-full h-full rounded-full object-cover object-center border-2 border-[#d0ff59]/30"
  style={{ objectPosition: "center 40%" }}
/>


        </div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="font-display text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-white tracking-wider mb-4"
          style={{ perspective: '1000px' }}
        >
          {nameChars}
        </h1>

        {/* Title */}
        <p
          ref={titleRef}
          className="font-body text-xl sm:text-2xl lg:text-3xl text-[#d0ff59] font-light tracking-[0.3em] uppercase overflow-hidden whitespace-nowrap mx-auto"
        >
          Software Developer
        </p>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8 text-sm text-gray-400">
          <a href="mailto:85anurish@gmail.com" className="flex items-center gap-2 hover:text-[#d0ff59] transition-colors">
            <Mail className="w-4 h-4" />
            <span>85anurish@gmail.com</span>
          </a>
          <a href="tel:+918875759505" className="flex items-center gap-2 hover:text-[#d0ff59] transition-colors">
            <Phone className="w-4 h-4" />
            <span>+91 8875759505</span>
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Jaipur, Rajasthan</span>
          </span>
          <a href="https://linkedin.com/in/anurish" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#d0ff59] transition-colors">
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          onClick={scrollToWork}
          className="magnetic-btn mt-12 px-8 py-4 bg-[#d0ff59] text-black font-semibold rounded-full hover:bg-white transition-colors duration-300 flex items-center gap-2 mx-auto group"
        >
          <span>View My Work</span>
          <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Gradient Overlay Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
