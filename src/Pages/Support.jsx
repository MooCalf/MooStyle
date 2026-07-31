import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationBar } from '@/Components/NavigationBar';
import { Metadata } from '@/Components/Metadata.jsx';
import { SupportContactForm } from '@/Components/SupportContactForm';
import {
  Mail,
  Clock,
  Shield,
  Download,
  Heart,
  Users,
  HelpCircle,
  ChevronDown
} from 'lucide-react';
import { WebsiteBackground } from '@/Components/WebsiteBackground';

// Categorized FAQ content merged in from the former General Information page
// (src/Pages/CommonQuestions.jsx, now removed -- /common-questions redirects
// here). Kept verbatim rather than rewritten.
const faqCategories = [
  {
    category: "Downloads & Mods",
    icon: Download,
    questions: [
      {
        question: "How do I download your mods?",
        answer: "My mods will all be listed on Curseforge and Patreon. This website will provide a link to both options when viewing the details for the specified mod."
      },
      {
        question: "Are the mods safe to download?",
        answer: "Yes! All mods are scanned for viruses and malware before being uploaded. I verify that mods don't contain malicious code or unwanted software to ensure your safety."
      },
      {
        question: "What types of mods do you create for InZoi?",
        answer: "I create various types of mods for InZoi but as of right now the focus is on creating brand specific decorations and useful appliances. All my mods follow InZoi's modding guidelines and community best practices to ensure compatibility and safety."
      },
      {
        question: "Where can I find installation instructions?",
        answer: "Each mod comes with detailed installation instructions on its Curseforge or Patreon page. You'll find step-by-step guides specific to that mod, including any prerequisites and compatibility information."
      },
      {
        question: "Do I need any prerequisites to install mods?",
        answer: "Most InZoi mods require the base game to be installed and up-to-date. Some mods may have specific dependencies which will be clearly listed in the mod description. Always read the requirements section before downloading."
      }
    ]
  },
  {
    category: "Support & Commissions",
    icon: Heart,
    questions: [
      {
        question: "How can I support your work?",
        answer: "You can support my work by subscribing to my Patreon page or donating through any of the provided links! Every contribution helps me create more amazing mods for the community."
      },
      {
        question: "Can I request any specific ideas or do commissions?",
        answer: "Absolutely! I love hearing from the community. Submit your mod requests through email (hello@moocalf.com) and I'll consider them for future releases. For commissions, as of right now, we do not offer any!"
      },
      {
        question: "Can I use your mods in my content/videos?",
        answer: "Yes! You're welcome to use my mods in your content, videos, streams, or screenshots. I appreciate credit when possible (linking back to my Patreon or Curseforge page), but it's not required. Just don't claim the mods as your own work!"
      }
    ]
  },
  {
    category: "Technical Support",
    icon: Shield,
    questions: [
      {
        question: "Do all mods work with all versions of the game?",
        answer: "Not all mods are compatible with every game version. Compatibility can vary depending on game updates. Always check the mod description for specific version requirements and compatibility notes before downloading."
      },
      {
        question: "What if a mod doesn't work properly?",
        answer: "First, ensure you've followed the installation instructions correctly and that you're using the correct game version. If the issue persists, contact me via email at hello@moocalf.com with details about the error you're encountering, and I'll help troubleshoot."
      },
      {
        question: "How often do you update mods?",
        answer: "I regularly update mods to ensure compatibility with new game versions and fix any reported issues. Follow my social media channels for update announcements and information about new releases."
      },
      {
        question: "What should I do if I encounter a bug?",
        answer: "Please report any bugs you find! Send me an email at support@moocalf.com with a detailed description of the issue, what you were doing when it occurred, and any error messages. Screenshots or videos are super helpful too!"
      },
      {
        question: "How do I know which mods are compatible with each other?",
        answer: "Mod compatibility information is listed on each mod's page. Generally, mods that modify different aspects of the game work well together. If you experience conflicts, try disabling mods one at a time to identify which ones are incompatible."
      }
    ]
  },
  {
    category: "Community & Social Media",
    icon: Users,
    questions: [
      {
        question: "How can I contact you?",
        answer: "You can reach me via email at hello@moocalf.com, support@moocalf.com or business@moocalf.com, or through the contact form on this page. I typically try to respond within 24-48 hours however response time can vary!"
      },
      {
        question: "Can I modify or redistribute your mods?",
        answer: "Please do not reupload, modify, or redistribute my mods without explicit permission. If you'd like to create a derivative work or translation, reach out to me first via email at hello@moocalf.com. I'm usually open to collaborations but want to ensure proper credit and quality control."
      }
    ]
  }
];

export const Support = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openItems, setOpenItems] = useState({});

  const toggleItem = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isItemOpen = (categoryIndex, faqIndex) => openItems[`${categoryIndex}-${faqIndex}`] || false;

  const supportCategories = [
    {
      icon: <Download size={24} color="#2563eb" />,
      title: "Downloads & Products",
      description: "Product downloads, file issues, installation help",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      icon: <HelpCircle size={24} color="#6b7280" />,
      title: "General Support",
      description: "Other questions, feedback, technical issues",
      color: "bg-gray-50 border-gray-200 hover:bg-gray-100"
    }
  ];

  return (
    <>
      <Metadata
        pageTitle="Support - MOOSTYLES"
        pageDescription="Get help with your MOOSTYLES account, technical issues, and general support"
      />

      <div className="min-h-screen">
        <WebsiteBackground />
        <NavigationBar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're here to help! Get assistance with your account, technical issues, or any questions you may have.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} color="#0d9488" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Support</h3>
              <p className="text-gray-600 mb-4">For technical issues and general help</p>
              <a
                href="mailto:support@moostyles.com"
                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Mail size={16} className="mr-2" />
                support@moostyles.com
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} color="#9333ea" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Inquiries</h3>
              <p className="text-gray-600 mb-4">For partnerships and business opportunities</p>
              <a
                href="mailto:business@moostyles.com"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Mail size={16} className="mr-2" />
                business@moostyles.com
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} color="#2563eb" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">General Contact</h3>
              <p className="text-gray-600 mb-4">For general questions and feedback</p>
              <a
                href="mailto:hello@moostyles.com"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail size={16} className="mr-2" />
                hello@moostyles.com
              </a>
            </div>
          </div>

          {/* Response Time */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center mb-12">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={24} color="#16a34a" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h3>
            <p className="text-gray-600">We do our best to respond within 24-48 hours.</p>
          </div>

          {/* Support Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What can we help you with?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {supportCategories.map((category, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${category.color}`}
                >
                  <div className="flex items-start gap-3">
                    {category.icon}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{category.title}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Form */}
          <SupportContactForm />

          {/* FAQ Section */}
          <div className="space-y-8 mt-12">
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            {faqCategories.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={categoryIndex}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-teal-50 to-teal-100 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="text-teal-600" size={24} />
                      <h3 className="text-xl font-semibold text-gray-900">{category.category}</h3>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {category.questions.map((faq, faqIndex) => {
                      const open = isItemOpen(categoryIndex, faqIndex);
                      return (
                        <div key={faqIndex} className="border-b border-gray-200 last:border-b-0">
                          <button
                            type="button"
                            onClick={() => toggleItem(categoryIndex, faqIndex)}
                            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-teal-50 transition-colors duration-200"
                            aria-expanded={open}
                          >
                            <span className="text-lg font-medium text-gray-900 pr-4">{faq.question}</span>
                            <motion.div
                              animate={{ rotate: open ? 180 : 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="flex-shrink-0"
                            >
                              <ChevronDown size={24} className="text-teal-600" />
                            </motion.div>
                          </button>

                          <AnimatePresence initial={false}>
                            {open && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <p className="px-6 pb-5 pt-2 text-gray-600 leading-relaxed">{faq.answer}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
