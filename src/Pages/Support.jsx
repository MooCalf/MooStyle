import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationPrimary } from '@/Components/NavigationPrimary';
import { NavigationSecondary } from '@/Components/NavigationSecondary';
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

export const Support = () => {
  const supportCategories = [
    {
      icon: <Download size={24} color="#2563eb" />,
      title: "Downloads & Products",
      description: "Product downloads, file issues, installation help",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      icon: <CreditCard size={24} color="#9333ea" />,
      title: "Billing & Payments",
      description: "Payment issues, refunds, subscription questions",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100"
    },
    {
      icon: <Settings size={24} color="#ea580c" />,
      title: "Account Settings",
      description: "Profile updates, preferences, account management",
      color: "bg-orange-50 border-orange-200 hover:bg-orange-100"
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
      answer: "Many products are free to browse and view. Some premium products may require purchase or have download restrictions."
    },
    {
      question: "I can't download a product",
      answer: "Check your internet connection and try refreshing the page. If the issue persists, contact support with the product details."
    },
    {
      question: "How do I contact support?",
      answer: "Use the contact form below to reach our support team. We typically respond within 24-48 hours."
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
      
      <div className="min-h-screen bg-gray-50">
        <NavigationPrimary />
        <NavigationSecondary />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're here to help! Get assistance with your account, technical issues, or any questions you may have.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} color="#0d9488" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Directly contact us to get help via email</p>
              <a 
                href="mailto:support@moostyle.com"
                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Mail size={16} className="mr-2" />
                support@moostyle.com
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={24} color="#16a34a" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h3>
              <p className="text-gray-600 mb-4">We typically respond within</p>
              <div className="text-2xl font-bold text-green-600">24-48 hours</div>
            </div>
          </div>

          {/* Support Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What can we help you with?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

          {/* Additional Help */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h2>
            <p className="text-gray-600 mb-6">
              If you can't find what you're looking for, don't hesitate to reach out to us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@moostyle.com"
                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Mail size={16} color="#ffffff" className="mr-2" />
                Email Support
              </a>
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <User size={16} color="#ffffff" className="mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
