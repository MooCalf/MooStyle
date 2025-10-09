import { useState } from "react";
import { ArrowUp, HelpCircle, Instagram, Twitter, Youtube, Github, Mail, Globe } from "lucide-react";

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
        { name: "Featured Mods", href: "/brands" },
        { name: "Latest Releases", href: "/brands" }
      ]
    },
    {
      title: "Community",
      links: [
        { name: "Discord Server", href: "https://discord.gg/moocalf" },
        { name: "Reddit Community", href: "https://reddit.com/user/MooCalf" },
        { name: "Mod Requests", href: "/about" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Installation Guide", href: "/common-questions" },
        { name: "Troubleshooting", href: "/common-questions" },
        { name: "Contact Support", href: "mailto:hello@moocalf.com" }
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

      {/* Row 2: Large MOOSTYLE Text */}
      <div className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold text-white tracking-tight opacity-90">
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
              <button
                onClick={scrollToTop}
                className="footer-icon p-2 bg-white bg-opacity-20 rounded-full shadow-sm hover:shadow-md hover:bg-opacity-30"
                aria-label="Scroll to top"
              >
                <ArrowUp size={20} />
              </button>

              {/* Help Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowHelpDropdown(!showHelpDropdown)}
                  className="footer-icon p-2 bg-white bg-opacity-20 rounded-full shadow-sm hover:shadow-md hover:bg-opacity-30"
                  aria-label="Help"
                >
                  <HelpCircle size={20} />
                </button>
                {showHelpDropdown && (
                  <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
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
                  </div>
                )}
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