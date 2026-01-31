import { Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/anurish' },
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Email', href: 'mailto:anurish@gmail.com' },
  ];

  return (
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-[#2d2d2d]">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#d0ff59]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="#hero" className="font-display text-3xl text-white hover:text-[#d0ff59] transition-colors inline-block mb-4">
              ANURISH<span className="text-[#d0ff59]">.</span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Software Engineer specializing in PHP, Laravel, WordPress, and MERN stack development. Building scalable solutions for 6+ years.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#d0ff59] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display text-lg text-white mb-4">Connect</h4>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-gray-400 text-sm hover:text-[#d0ff59] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-[#2d2d2d]">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-[#d0ff59] fill-[#d0ff59]" /> by Anurish Gangrade
          </p>
          
          <p className="text-gray-500 text-sm mt-2 sm:mt-0">
            &copy; {currentYear} All rights reserved.
          </p>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="mt-4 sm:mt-0 w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-[#d0ff59] hover:border-[#d0ff59] transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
