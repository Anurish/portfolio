import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  CheckCircle,
  Loader2,
} from 'lucide-react';
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

  /* ----------------------------------
     GSAP ANIMATIONS
  ---------------------------------- */
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

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
            ease: 'back.out(1.2)',
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

  /* ----------------------------------
     FORM SUBMIT (WEB3FORMS)
  ---------------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '43272e10-bec8-4ceb-8e8b-c3ff645682ef',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setIsSubmitted(true);
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });

        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        toast.error('Failed to send message');
      }
    } catch (error) {
      console.error('WEB3FORMS ERROR →', error);
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d0ff59]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="font-display text-5xl sm:text-6xl lg:text-7xl text-white mb-6"
          >
            Let&apos;s <span className="text-[#d0ff59]">Connect</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* CONTACT FORM */}
          <div className="glass rounded-2xl p-8 lg:p-10">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="form-field">
                <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                <Input
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <Input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-field">
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <Textarea
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full py-6 rounded-xl font-semibold"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="mr-2" />
                    Message Sent
                  </>
                ) : (
                  <>
                    <Send className="mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl text-white mb-6">Direct Contact</h3>
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 p-4 glass rounded-xl"
                >
                  <item.icon className="text-[#d0ff59]" />
                  <span className="text-white">{item.value}</span>
                </a>
              ))}
            </div>

            <div>
              <h3 className="text-2xl text-white mb-6">Follow Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a key={link.label} href={link.href} target="_blank">
                    <link.icon className="w-6 h-6 text-white hover:text-[#d0ff59]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
