import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavigationBar } from '@/Components/NavigationBar';
import { Metadata } from '@/Components/Metadata.jsx';
import { SupportContactForm } from '@/Components/SupportContactForm';
import { 
  Mail, 
  Clock, 
  AlertCircle,
  Shield,
  CreditCard,
  Download,
  Settings,
  HelpCircle,
  User
} from 'lucide-react';
import { WebsiteBackground } from '@/Components/WebsiteBackground';

export const Support = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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

  const faqs = [
    {
      question: "How do I download products?",
      answer: "Click on any product to view details, then use the download button if available. Some products may be coming soon."
    },
    {
      question: "Are the products free?",
      answer: "All our products are ALL free to use and making them takes time so we do encourage all patrons to consider tipping or subscribing to us to help boost the quality of the products we craft!"
    },
    {
      question: "I can't download a product",
      answer: "Check your internet connection and try refreshing the page. If the issue persists, contact support with the product details."
    },
    {
      question: "How do I contact support?",
      answer: "Use the contact form above to reach our support team! We typically try to respond within 24-48 hours but response time may vary!"
    },
    {
      question: "Can I suggest new products or brands?",
      answer: "Absolutely! We love hearing from our community. Use the contact form to share your suggestions."
    }
  ];

  return (
    <>
      <Metadata 
        pageTitle="Support - MooStyle"
        pageDescription="Get help with your MooStyle account, technical issues, and general support"
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
                href="mailto:support@moostyle.com"
                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Mail size={16} className="mr-2" />
                support@moostyle.com
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
