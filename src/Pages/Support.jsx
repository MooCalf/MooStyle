import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
  ShoppingBag,
  Download,
  Settings,
  HelpCircle,
  User
} from 'lucide-react';

export const Support = () => {
  const { user, isBanned } = useAuth();

  const supportCategories = [
    {
      icon: <Shield size={24} color="#dc2626" />,
      title: "Account Issues",
      description: "Suspended accounts, login problems, password resets",
      color: "bg-red-50 border-red-200 hover:bg-red-100"
    },
    {
      icon: <ShoppingBag size={24} color="#2563eb" />,
      title: "Shopping & Cart",
      description: "Cart issues, checkout problems, payment questions",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      icon: <Download size={24} color="#16a34a" />,
      title: "Downloads & Content",
      description: "Download problems, file access, content issues",
      color: "bg-green-50 border-green-200 hover:bg-green-100"
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
      question: "Why was my account suspended?",
      answer: "Accounts may be suspended for violations of our terms of service, suspicious activity, or other policy violations. Contact support for specific details about your account status."
    },
    {
      question: "How can I get my account reinstated?",
      answer: "Submit a support request explaining your situation. Our team will review your case and respond within 24-48 hours with next steps."
    },
    {
      question: "I can't download my purchased content",
      answer: "Check your internet connection and try clearing your browser cache. If the issue persists, contact support with your order details."
    },
    {
      question: "How do I update my payment information?",
      answer: "Go to your account settings and update your payment method. For subscription changes, contact support for assistance."
    },
    {
      question: "What are your refund policies?",
      answer: "We offer refunds within 30 days of purchase for digital content that hasn't been downloaded. Contact support with your order details."
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
          {/* Banned User Notice */}
          {isBanned && (
            <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <AlertCircle size={24} color="#dc2626" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Account Suspended - We're Here to Help</h3>
                  <p className="text-red-700 mb-3">
                    Your account has been temporarily suspended, but you can still access our support system to get help.
                  </p>
                  {user?.banReason && (
                    <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-3">
                      <p className="text-sm font-medium text-red-800 mb-1">Reason for Suspension:</p>
                      <p className="text-sm text-red-700 italic">"{user.banReason}"</p>
                    </div>
                  )}
                  <p className="text-sm text-red-600">
                    Use the form below to submit a support request about your account suspension. We'll review your case and respond within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>
          )}

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
              {!isBanned && (
                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <User size={16} color="#ffffff" className="mr-2" />
                  Back to Home
                </Link>
              )}
              {isBanned && (
                <button
                  onClick={() => window.location.href = '/'}
                  className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <User size={16} color="#ffffff" className="mr-2" />
                  Back to Account Status
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
