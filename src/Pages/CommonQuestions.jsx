import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, Mail, Phone, Clock, Shield, Download, Heart, Users, Facebook, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { NavigationBar } from '@/Components/NavigationBar';
import { WebsiteBackground } from '@/Components/WebsiteBackground';

const CommonQuestions = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isOpen = (categoryIndex, faqIndex) => {
    const key = `${categoryIndex}-${faqIndex}`;
    return openItems[key] || false;
  };

  const renderAnswerWithLinks = (answer) => {
    const supportLinkRegex = /\(\/support\)/g;
    if (!supportLinkRegex.test(answer)) {
      return answer;
    }

    const parts = answer.split(/(\(\/support\))/);
    return parts.map((part, index) => {
      if (part === '(/support)') {
        return (
          <Link key={index} to="/support" className="text-teal-600 hover:text-teal-700 underline font-medium">
            Support page
          </Link>
        );
      }
      return part;
    });
  };
  const faqs = [
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
          answer: "You can reach me via email at hello@moocalf.com, support@moocalf.com or business@moocalf.com, or through the contact form on the (/support). I typically try to respond within 24-48 hours however response time can vary!"
        },
        {
          question: "Can I modify or redistribute your mods?",
          answer: "Please do not reupload, modify, or redistribute my mods without explicit permission. If you'd like to create a derivative work or translation, reach out to me first via email at hello@moocalf.com. I'm usually open to collaborations but want to ensure proper credit and quality control."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <WebsiteBackground />
      <NavigationBar />
      <motion.div 
        className="min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
          <motion.div 
            className="bg-white border-b border-gray-200"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center space-x-4">
                <Link 
                  to="/home" 
                  className="back-button-simple"
                >
                  <ArrowLeft size={24} />
                </Link>
                <div className="flex items-center space-x-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <HelpCircle className="text-teal-600" size={32} />
                  </motion.div>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">General Information</h1>
                    <p className="text-gray-600 mt-1">Find answers to frequently asked questions</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="space-y-8">
              {faqs.map((category, categoryIndex) => {
                const IconComponent = category.icon;
                return (
                  <motion.div 
                    key={categoryIndex} 
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + categoryIndex * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="bg-gradient-to-r from-teal-50 to-teal-100 px-6 py-4 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.6 + categoryIndex * 0.1 }}
                        >
                          <IconComponent className="text-teal-600" size={24} />
                        </motion.div>
                        <h2 className="text-xl font-semibold text-gray-900">{category.category}</h2>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {category.questions.map((faq, faqIndex) => {
                        const isItemOpen = isOpen(categoryIndex, faqIndex);
                        return (
                          <motion.div 
                            key={faqIndex} 
                            className="border-b border-gray-200 last:border-b-0"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.7 + categoryIndex * 0.1 + faqIndex * 0.05 }}
                          >
                            <motion.button
                              onClick={() => toggleItem(categoryIndex, faqIndex)}
                              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-teal-50 transition-colors duration-200"
                              whileHover={{ backgroundColor: "rgba(240, 253, 250, 0.5)" }}
                              whileTap={{ scale: 0.995 }}
                            >
                              <h3 className="text-lg font-medium text-gray-900 pr-4">{faq.question}</h3>
                              <motion.div
                                animate={{ rotate: isItemOpen ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="flex-shrink-0"
                              >
                                <ChevronDown size={24} className="text-teal-600" />
                              </motion.div>
                            </motion.button>
                            
                            <AnimatePresence initial={false}>
                              {isItemOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ 
                                    height: "auto", 
                                    opacity: 1,
                                    transition: {
                                      height: {
                                        duration: 0.3,
                                        ease: "easeInOut"
                                      },
                                      opacity: {
                                        duration: 0.25,
                                        delay: 0.1
                                      }
                                    }
                                  }}
                                  exit={{ 
                                    height: 0, 
                                    opacity: 0,
                                    transition: {
                                      height: {
                                        duration: 0.3,
                                        ease: "easeInOut"
                                      },
                                      opacity: {
                                        duration: 0.2
                                      }
                                    }
                                  }}
                                  className="overflow-hidden"
                                >
                                  <motion.div
                                    initial={{ y: -10 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="px-6 pb-5 pt-2"
                                  >
                                    <p className="text-gray-600 leading-relaxed">{renderAnswerWithLinks(faq.answer)}</p>
                                  </motion.div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>

        {/* Contact Support Section */}
        <motion.div 
          id="still-have-questions" 
          className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          whileHover={{ y: -2 }}
        >
          <div className="text-center">
            <motion.h2 
              className="text-2xl font-bold text-gray-900 mb-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.3 }}
            >
              Still Have Questions?
            </motion.h2>
            <motion.p 
              className="text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              Can't find what you're looking for? Our support team is here to help you with any questions or concerns about mods, downloads, or your account.
            </motion.p>
            
            {/* Contact Methods */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/support"
                  className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
                >
                  <Mail size={20} className="mr-2" />
                  Support Page
                </Link>
              </motion.div>
            </motion.div>

            {/* Social Media Links */}
            <motion.div 
              className="mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              <motion.h3 
                className="text-lg font-semibold text-gray-900 mb-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.7 }}
              >
                Follow Us on Social Media
              </motion.h3>
              <div className="flex justify-center space-x-4">
                {[
                  { href: "https://facebook.com/moostyle", icon: Facebook, bg: "bg-blue-600", label: "Facebook" },
                  { href: "https://www.patreon.com/MOOSTYLES", icon: Heart, bg: "bg-gradient-to-r from-orange-500 to-red-500", label: "Support on Patreon" }
                ].map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={`p-3 ${social.bg} text-white rounded-full hover:scale-110 transition-transform duration-200`}
                      aria-label={social.label}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 1.8 + index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconComponent size={24} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            <motion.div 
              className="flex items-center justify-center text-sm text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 2.2 }}
            >
              <Clock size={16} className="mr-2" />
              Support Hours: Monday - Friday, 9 AM - 6 PM EST
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
    </div>
  );
};

export default CommonQuestions;
