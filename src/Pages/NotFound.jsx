import { Link } from "react-router-dom";
import { NavigationPrimary } from "@/Components/NavigationPrimary";
import { NavigationSecondary } from "@/Components/NavigationSecondary";
import { Home, ArrowLeft, Search, Package } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationPrimary />
      <NavigationSecondary />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)] px-4">
        <div className="max-w-md w-full text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-teal-600 mb-4">404</div>
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center">
              <Package size={48} className="text-teal-600" />
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, let's get you back on track!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              to="/home"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Go Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Quick Links:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/shopping/beauty" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                Beauty
              </Link>
              <Link to="/shopping/women" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                Women
              </Link>
              <Link to="/shopping/men" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                Men
              </Link>
              <Link to="/shopping/lifestyle" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                Lifestyle
              </Link>
              <Link to="/shopping/health" className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                Health
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};