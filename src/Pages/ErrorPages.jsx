import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, RefreshCw, ArrowLeft, AlertTriangle, Server } from 'lucide-react';
import { NavigationPrimary } from '@/Components/NavigationPrimary';
import { NavigationSecondary } from '@/Components/NavigationSecondary';
import { Footer } from '@/Components/Footer';
import { Background } from '@/Components/Background';
import SEO from '@/Components/SEO';

// 404 Not Found Page
export const NotFound = () => {
  return (
    <>
      <SEO
        title="Page Not Found - MOOSTYLE"
        description="The page you're looking for doesn't exist. Return to MOOSTYLE homepage to explore our Asian fashion and beauty products."
        noindex={true}
      />
      
      <div className="min-h-screen text-gray-900 overflow-x-hidden relative">
        <Background showEffects={false} />
        
        {/* Navigation Bars */}
        <div id="navigation">
          <NavigationPrimary />
          <NavigationSecondary />
        </div>
        
        {/* Main Content */}
        <main className="flex items-center justify-center min-h-screen px-4">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 404 Icon */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-16 h-16 text-teal-600" />
              </div>
            </motion.div>
            
            {/* Error Code */}
            <motion.h1
              className="text-8xl font-bold text-teal-600 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              404
            </motion.h1>
            
            {/* Error Message */}
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Page Not Found
            </motion.h2>
            
            <motion.p
              className="text-lg text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Oops! The page you're looking for seems to have wandered off into the digital void. 
              Don't worry, even the best explorers sometimes take a wrong turn.
            </motion.p>
            
            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 font-medium"
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Link>
              
                      <button
                        onClick={() => window.history.back()}
                        className="back-button-enhanced"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                      </button>
            </motion.div>
            
            {/* Helpful Links */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p className="text-sm text-gray-500 mb-4">Or try these popular pages:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/blog" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                  Blog
                </Link>
                <Link to="/shopping" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                  Shopping
                </Link>
                <Link to="/brands" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                  Brands
                </Link>
                <Link to="/about-me" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                  About
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

// 500 Internal Server Error Page
export const ServerError = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <SEO
        title="Server Error - MOOSTYLE"
        description="We're experiencing technical difficulties. Please try again later or contact support if the problem persists."
        noindex={true}
      />
      
      <div className="min-h-screen text-gray-900 overflow-x-hidden relative">
        <Background showEffects={false} />
        
        {/* Navigation Bars */}
        <div id="navigation">
          <NavigationPrimary />
          <NavigationSecondary />
        </div>
        
        {/* Main Content */}
        <main className="flex items-center justify-center min-h-screen px-4">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 500 Icon */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                <Server className="w-16 h-16 text-red-600" />
              </div>
            </motion.div>
            
            {/* Error Code */}
            <motion.h1
              className="text-8xl font-bold text-red-600 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              500
            </motion.h1>
            
            {/* Error Message */}
            <motion.h2
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Server Error
            </motion.h2>
            
            <motion.p
              className="text-lg text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Oops! Something went wrong on our end. Our team has been notified and is working to fix this issue. 
              Please try again in a few moments.
            </motion.p>
            
            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 font-medium"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </button>
              
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                <Home className="w-5 h-5 mr-2" />
                Go Home
              </Link>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <p className="text-sm text-gray-500 mb-2">
                If this problem persists, please contact our support team:
              </p>
              <a 
                href="mailto:hello@moocalf.com" 
                className="text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                hello@moocalf.com
              </a>
            </motion.div>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

// Generic Error Boundary Fallback
export const ErrorFallback = ({ error, resetError }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-12 h-12 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h1>
        
        <p className="text-gray-600 mb-6">
          We're sorry, but something unexpected happened. Please try refreshing the page.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={resetError}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 font-medium"
          >
            Try Again
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            Go Home
          </button>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 mb-2">
              Error Details (Development)
            </summary>
            <pre className="text-xs text-gray-600 bg-gray-100 p-4 rounded overflow-auto">
              {error?.stack || error?.message || 'Unknown error'}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

export default NotFound;
