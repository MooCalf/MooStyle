import React from 'react';
import { ArrowLeft, HelpCircle, Mail, Phone, Clock, Shield, Download, Heart, Users, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const CommonQuestions = () => {
  const faqs = [
    {
      category: "Downloads & Mods",
      icon: Download,
      questions: [
        {
          question: "Do you need to pay any fee for downloading mods?",
          answer: "No! All mods on MooStyle are completely free to download. We believe in making quality mods accessible to everyone in the community."
        },
        {
          question: "How do I download mods?",
          answer: "Simply browse our collection, add mods to your cart, and use the 'Bulk Download' feature to get all your selected mods in a convenient ZIP file. No payment required!"
        },
        {
          question: "What file formats do you support?",
          answer: "We support various mod formats including .zip, .rar, .7z, and direct installation files. Each mod comes with detailed installation instructions."
        },
        {
          question: "Are the mods safe to download?",
          answer: "Yes! All mods are scanned for viruses and malware before being uploaded. We also verify that mods don't contain malicious code or unwanted software."
        },
        {
          question: "What types of mods do you create for InZoi?",
          answer: "We create various types of mods for InZoi including character customizations, clothing and accessories, furniture and decor, gameplay enhancements, and visual improvements. All our mods follow InZoi's modding guidelines and community best practices to ensure compatibility and safety."
        }
      ]
    },
    {
      category: "Support & Community",
      icon: Heart,
      questions: [
        {
          question: "How can I tip or support the creators of MooStyle?",
          answer: "You can support our creators by visiting our Patreon page, making donations through PayPal, or purchasing merchandise from our store. Every contribution helps us create more amazing mods!"
        },
        {
          question: "Does MooStyle have any social media pages?",
          answer: "Yes I do! Follow me on Instagram (@cypher._01), Twitter/X (@MooCalf_), YouTube (@MooCalf), Twitch (@moocalf_), Discord (@MooCalf), and Reddit (@MooCalf) for the latest updates, mod showcases, and community discussions."
        },
        {
          question: "How can I contact the MooStyle team?",
          answer: "You can reach me via email at hello@moocalf.com, through Discord (@MooCalf), Reddit (@MooCalf), or by messaging me on any of my social media platforms. I typically respond within 24 hours."
        },
        {
          question: "Can I request specific mods?",
          answer: "Absolutely! I love hearing from the community. Submit your mod requests through email (hello@moocalf.com), Discord (@MooCalf), or Reddit (@MooCalf), and I'll consider them for future releases."
        }
      ]
    },
    {
      category: "User Accounts",
      icon: Users,
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click the 'Sign Up' button in the top navigation, fill in your details, and verify your email address. Creating an account is completely free and gives you access to exclusive features!"
        },
        {
          question: "What are the benefits of having an account?",
          answer: "With an account, you can save your favorite mods, track your download history, participate in community discussions, and get early access to new mod releases."
        },
        {
          question: "I forgot my password. How do I reset it?",
          answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a secure link to reset your password within a few minutes."
        },
        {
          question: "Can I delete my account?",
          answer: "Yes, you can delete your account at any time from your account settings. This will permanently remove all your data, download history, and saved preferences."
        }
      ]
    },
    {
      category: "Technical Support",
      icon: Shield,
      questions: [
        {
          question: "I'm having trouble installing a mod. What should I do?",
          answer: "Check the installation instructions included with each mod. If you're still having issues, contact our support team with details about the error you're encountering."
        },
        {
          question: "Do mods work with all game versions?",
          answer: "Most mods are compatible with recent game versions, but compatibility can vary. Check the mod description for specific version requirements and compatibility notes."
        },
        {
          question: "What if a mod doesn't work properly?",
          answer: "First, ensure you've followed the installation instructions correctly. If the issue persists, report it through our support system and we'll help troubleshoot or provide an alternative solution."
        },
        {
          question: "How often do you update mods?",
          answer: "We regularly update mods to ensure compatibility with new game versions and fix any reported issues. Follow our social media for update announcements."
        },
        {
          question: "Do you follow InZoi's modding guidelines?",
          answer: "Yes! We strictly adhere to InZoi's modding guidelines and community best practices. Our mods are created following proper naming conventions, file structure, and compatibility standards. For the most up-to-date modding guidelines, we recommend checking InZoi's official community forums and documentation."
        }
      ]
    }
  ];

  return (
        <motion.div 
          className="min-h-screen bg-gray-50"
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
                  to="/" 
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
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Common Questions</h1>
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
                      {category.questions.map((faq, faqIndex) => (
                        <motion.div 
                          key={faqIndex} 
                          className="px-6 py-6"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.7 + categoryIndex * 0.1 + faqIndex * 0.05 }}
                        >
                          <h3 className="text-lg font-medium text-gray-900 mb-3">{faq.question}</h3>
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </motion.div>
                      ))}
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
              <motion.a
                href="mailto:support@moostyle.com"
                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} className="mr-2" />
                Email Support
              </motion.a>
              <motion.a
                href="https://discord.gg/moostyle"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users size={20} className="mr-2" />
                Discord Community
              </motion.a>
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
                  { href: "https://instagram.com/moostyle", icon: Instagram, bg: "bg-gradient-to-r from-pink-500 to-purple-600", label: "Instagram" },
                  { href: "https://twitter.com/moostyle", icon: Twitter, bg: "bg-blue-500", label: "Twitter" },
                  { href: "https://facebook.com/moostyle", icon: Facebook, bg: "bg-blue-600", label: "Facebook" },
                  { href: "https://youtube.com/moostyle", icon: Youtube, bg: "bg-red-600", label: "YouTube" },
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
  );
};

export default CommonQuestions;
