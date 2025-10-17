import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerSections = [
    {
      title: "Downloads",
      links: [
        { name: "Browse Mods", href: "/shopping" },
        { name: "Featured Mods", href: "/#featured-brands" }
      ]
    },
    {
      title: "Socials",
      links: [
        { name: "Patreon", href: "https://www.patreon.com/MOOSTYLES" },
        { name: "Beta Testing Questionnaire", href: "https://forms.gle/3WK96XVj8fUKGDuHA" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Support Center", href: "/support" },
        { name: "Installation Guide", href: "/common-questions" },
        { name: "Troubleshooting", href: "/common-questions" },
        { name: "Contact Support", href: "/common-questions#still-have-questions" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "InZoi ModKit", href: "https://mod-docs.playinzoi.com" },
        { name: "Modding Guidelines", href: "https://playinzoi.com/guide/mod" },
        { name: "Tutorials", href: "https://moocalf.com" }
      ]
    },
    {
      title: "About",
      links: [
        { name: "About Me", href: "/about" },
        { name: "Moocalf.com", href: "https://moocalf.com" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms-of-service" }
      ]
    }
  ];

  return (
    <footer className="footer-main mt-16">
      {/* Row 1: 5 Columns with Footer Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {footerSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h3 className="footer-section-title text-sm">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="footer-link text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Logo and Large MOOSTYLE Text */}
      <div className="py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* MOOSTYLE Logo */}
          <div className="mb-4 sm:mb-6">
            <img
              src="/projects/Brand Medias/Logos/MOOSTYLES LOGO - TEAL DARKCOLOR.png"
              alt="MOOSTYLE Logo"
              className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 mx-auto object-contain"
            />
          </div>
          {/* Large MOOSTYLE Text */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight opacity-90">
            MOOSTYLE
          </h2>
        </div>
      </div>

      {/* Row 3: Copyright and Scroll to Top Button */}
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Left: Copyright */}
            <div className="text-sm text-white">
              Copyright © 2025 MOOSTYLE.COM. All rights reserved.
            </div>

            {/* Right: Scroll to Top Button */}
            <div className="flex items-center">
              <motion.button
                onClick={scrollToTop}
                className="footer-icon p-2 bg-white bg-opacity-20 rounded-full shadow-sm hover:shadow-md hover:bg-opacity-30"
                aria-label="Scroll to top"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ArrowUp size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};