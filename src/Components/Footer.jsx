import { useState } from "react";
import { ArrowUp, HelpCircle, Instagram, Twitter, Youtube, Github, Mail, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Footer = () => {
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);

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
        { name: "Patreon", href: "https://www.patreon.com/c/MOOSTYLES" }
      ]
    },
    {
      title: "Support",
      links: [
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
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" }
      ]
    }
  ];

  return (
    <footer className="footer-main mt-16">
      {/* Row 1: 5 Columns with Footer Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
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
      <div className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* MOOSTYLE Logo */}
          <div className="mb-6 sm:mb-8">
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

      {/* Row 3: Copyright and Icons */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Left: Copyright */}
            <div className="text-sm text-white">
              Copyright © 2025 MOOSTYLE.COM. All rights reserved.
            </div>

            {/* Right: Icons */}
            <div className="flex items-center space-x-4">
              {/* Scroll to Top Button */}
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

              {/* Help Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowHelpDropdown(!showHelpDropdown)}
                  className="footer-icon p-2 bg-white bg-opacity-20 rounded-full shadow-sm hover:shadow-md hover:bg-opacity-30"
                  aria-label="Help"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <HelpCircle size={20} />
                </motion.button>
                <AnimatePresence>
                  {showHelpDropdown && (
                    <motion.div 
                      className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50"
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <div className="py-1">
                        <a
                          href="#common-questions"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Common Questions
                        </a>
                        <a
                          href="#about-me"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          About Me
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close help dropdown */}
      {showHelpDropdown && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setShowHelpDropdown(false)}
        />
      )}
    </footer>
  );
};