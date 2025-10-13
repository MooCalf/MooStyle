import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { NavigationPrimary } from '@/Components/NavigationPrimary';
import { NavigationSecondary } from '@/Components/NavigationSecondary';
import { Metadata } from '@/Components/Metadata.jsx';
import { 
  Mail, 
  MessageCircle, 
  Phone, 
  Clock, 
  HelpCircle, 
  AlertCircle, 
  CheckCircle,
  Send,
  User,
  MessageSquare,
  FileText,
  Shield,
  CreditCard,
  ShoppingBag,
  Download,
  Settings
} from 'lucide-react';

export const Support = () => {
  const { user, isBanned } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || user?.username || '',
    email: user?.email || '',
    subject: isBanned ? 'Account Suspension Appeal' : '',
    category: isBanned ? 'suspension' : 'general',
    message: isBanned ? `Hello,\n\nI would like to appeal my account suspension. Please review my case.\n\nAccount: ${user?.email || user?.username}\nSuspension Reason: ${user?.banReason || 'Not provided'}\n\nThank you for your time.\n\nBest regards,` : '',
    priority: isBanned ? 'high' : 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: '',
        priority: 'medium'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const supportCategories = [
    {
      icon: <Shield size={24} className="text-red-600" />,
      title: "Account Issues",
      description: "Suspended accounts, login problems, password resets",
      color: "bg-red-50 border-red-200 hover:bg-red-100"
    },
    {
      icon: <ShoppingBag size={24} className="text-blue-600" />,
      title: "Shopping & Cart",
      description: "Cart issues, checkout problems, payment questions",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      icon: <Download size={24} className="text-green-600" />,
      title: "Downloads & Content",
      description: "Download problems, file access, content issues",
      color: "bg-green-50 border-green-200 hover:bg-green-100"
    },
    {
      icon: <CreditCard size={24} className="text-purple-600" />,
      title: "Billing & Payments",
      description: "Payment issues, refunds, subscription questions",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100"
    },
    {
      icon: <Settings size={24} className="text-orange-600" />,
      title: "Account Settings",
      description: "Profile updates, preferences, account management",
      color: "bg-orange-50 border-orange-200 hover:bg-orange-100"
    },
    {
      icon: <HelpCircle size={24} className="text-gray-600" />,
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
                  <AlertCircle size={24} className="text-red-600" />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Get help via email</p>
              <a 
                href="mailto:support@moostyle.com"
                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Mail size={16} className="mr-2" />
                support@moostyle.com
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with our support team</p>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <MessageCircle size={16} className="mr-2" />
                Start Chat
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={24} className="text-green-600" />
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                <CheckCircle size={20} className="text-green-600" />
                <p className="text-green-800">Your message has been sent successfully! We'll get back to you within 24-48 hours.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle size={20} className="text-red-600" />
                <p className="text-red-800">There was an error sending your message. Please try again or contact us directly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText size={16} className="inline mr-2" />
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <HelpCircle size={16} className="inline mr-2" />
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="general">General Support</option>
                    <option value="account">Account Issues</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="technical">Technical Issues</option>
                    <option value="content">Content & Downloads</option>
                    <option value="suspension">Account Suspension</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare size={16} className="inline mr-2" />
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Please provide detailed information about your issue or question..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

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
                <Mail size={16} className="mr-2" />
                Email Support
              </a>
              {!isBanned && (
                <Link
                  to="/"
                  className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <User size={16} className="mr-2" />
                  Back to Home
                </Link>
              )}
              {isBanned && (
                <button
                  onClick={() => window.location.href = '/'}
                  className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <User size={16} className="mr-2" />
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
