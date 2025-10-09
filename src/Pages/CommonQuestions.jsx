import React from 'react';
import { ArrowLeft, HelpCircle, Mail, Phone, Clock, Shield, Download, Heart, Users, Instagram, Twitter, Facebook, Youtube, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="p-2 text-gray-600 hover:text-teal-600 transition-colors duration-200"
            >
              <ArrowLeft size={24} />
            </Link>
            <div className="flex items-center space-x-3">
              <HelpCircle className="text-teal-600" size={32} />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Common Questions</h1>
                <p className="text-gray-600 mt-1">Find answers to frequently asked questions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="text-teal-600" size={24} />
                    <h2 className="text-xl font-semibold text-gray-900">{category.category}</h2>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="px-6 py-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">{faq.question}</h3>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Support Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you with any questions or concerns about mods, downloads, or your account.
            </p>
            
            {/* Contact Methods */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="mailto:support@moostyle.com"
                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
              >
                <Mail size={20} className="mr-2" />
                Email Support
              </a>
              <a
                href="https://discord.gg/moostyle"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Users size={20} className="mr-2" />
                Discord Community
              </a>
            </div>

            {/* Social Media Links */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us on Social Media</h3>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://instagram.com/moostyle"
                  className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:scale-110 transition-transform duration-200"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://twitter.com/moostyle"
                  className="p-3 bg-blue-500 text-white rounded-full hover:scale-110 transition-transform duration-200"
                  aria-label="Twitter"
                >
                  <Twitter size={24} />
                </a>
                <a
                  href="https://facebook.com/moostyle"
                  className="p-3 bg-blue-600 text-white rounded-full hover:scale-110 transition-transform duration-200"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://youtube.com/moostyle"
                  className="p-3 bg-red-600 text-white rounded-full hover:scale-110 transition-transform duration-200"
                  aria-label="YouTube"
                >
                  <Youtube size={24} />
                </a>
                <a
                  href="https://github.com/moostyle"
                  className="p-3 bg-gray-800 text-white rounded-full hover:scale-110 transition-transform duration-200"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center text-sm text-gray-500">
              <Clock size={16} className="mr-2" />
              Support Hours: Monday - Friday, 9 AM - 6 PM EST
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonQuestions;
