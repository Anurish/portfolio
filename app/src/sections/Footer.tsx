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
    <footer className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 border-t border-[#2d2d2d] bg-black/30 backdrop-blur-sm">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#d0ff59]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <a href="#hero" className="font-display text-2xl sm:text-3xl text-white hover:text-[#d0ff59] transition-colors inline-block mb-3 sm:mb-4">
              ANURISH<span className="text-[#d0ff59]">.</span>
            </a>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs">
              Software Engineer specializing in PHP, Laravel, WordPress, and MERN stack development. Building scalable solutions for 6+ years.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-display text-base sm:text-lg text-white mb-3 sm:mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-xs sm:text-sm hover:text-[#d0ff59] transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <h4 className="font-display text-base sm:text-lg text-white mb-3 sm:mb-4 font-semibold">Connect</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-gray-400 text-xs sm:text-sm hover:text-[#d0ff59] transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:gap-6 pt-8 sm:pt-10 border-t border-[#2d2d2d]">
          <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-1 text-center">
            Made with <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-[#d0ff59] fill-[#d0ff59]" /> by Anurish Gangrade
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
            <p className="text-gray-500 text-xs sm:text-sm">
              &copy; {currentYear} All rights reserved.
            </p>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-gray-400 hover:text-[#d0ff59] hover:border-[#d0ff59] transition-all duration-300 hover:scale-110"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
