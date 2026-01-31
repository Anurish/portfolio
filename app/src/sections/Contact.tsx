import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, Phone, MapPin, Linkedin, Github, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

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

    // Form fields animation
    const formTrigger = ScrollTrigger.create({
      trigger: formRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          formRef.current?.querySelectorAll('.form-field') || [],
          { y: 30, opacity: 0, rotate: 5 },
          { 
            y: 0, 
            opacity: 1, 
            rotate: 0,
            duration: 0.6, 
            stagger: 0.1,
            ease: 'back.out(1.2)' 
          }
        );
      },
      once: true,
    });
    triggers.push(formTrigger);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Message sent successfully! I will get back to you soon.');

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'anurish@gmail.com', href: 'mailto:anurish@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 8875759505', href: 'tel:+918875759505' },
    { icon: MapPin, label: 'Location', value: 'Jaipur, Rajasthan', href: '#' },
  ];

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/anurish' },
    { icon: Github, label: 'GitHub', href: 'https://github.com' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 xl:px-12"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d0ff59]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="font-display text-5xl sm:text-6xl lg:text-7xl text-white mb-6"
          >
            Let's <span className="text-[#d0ff59]">Connect</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <div className="glass rounded-2xl p-8 lg:p-10">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="form-field">
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="bg-[#1a1a1a] border-[#2d2d2d] text-white placeholder:text-gray-600 focus:border-[#d0ff59] focus:ring-[#d0ff59]/20"
                />
              </div>

              <div className="form-field">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="bg-[#1a1a1a] border-[#2d2d2d] text-white placeholder:text-gray-600 focus:border-[#d0ff59] focus:ring-[#d0ff59]/20"
                />
              </div>

              <div className="form-field">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="bg-[#1a1a1a] border-[#2d2d2d] text-white placeholder:text-gray-600 focus:border-[#d0ff59] focus:ring-[#d0ff59]/20 resize-none"
                />
              </div>

              <div className="form-field">
                <Button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-6 rounded-xl font-semibold transition-all duration-500 ${
                    isSubmitted
                      ? 'bg-green-500 hover:bg-green-500'
                      : 'bg-[#d0ff59] hover:bg-white text-black'
                  }`}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <div>
              <h3 className="font-display text-2xl text-white mb-6">Direct Contact</h3>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 glass rounded-xl hover:border-[#d0ff59]/30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#d0ff59]/10 flex items-center justify-center group-hover:bg-[#d0ff59]/20 transition-colors">
                      <item.icon className="w-5 h-5 text-[#d0ff59]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{item.label}</div>
                      <div className="text-white group-hover:text-[#d0ff59] transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-display text-2xl text-white mb-6">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 glass rounded-xl flex items-center justify-center hover:border-[#d0ff59] hover:text-[#d0ff59] transition-all duration-300 group"
                  >
                    <link.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="glass rounded-xl p-6 border-l-4 border-[#d0ff59]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-[#d0ff59] rounded-full animate-pulse" />
                <span className="text-[#d0ff59] font-semibold">Available for Work</span>
              </div>
              <p className="text-gray-400 text-sm">
                I'm currently open to new opportunities and freelance projects. Let's build something amazing together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
