import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavigationPrimary } from '@/Components/NavigationPrimary';
import { NavigationSecondary } from '@/Components/NavigationSecondary';
import { Metadata } from '@/Components/Metadata.jsx';
import { Eye, EyeOff, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { signIn } from '@/lib/betterAuthClient';
import { useAuth } from '@/contexts/AuthContext';

export const Login = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        setError(result.error.message || 'Login failed');
      } else {
        setSuccess('Login successful! Redirecting...');
        
        // Redirect based on user role
        setTimeout(() => {
          if (isAdmin) {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
        }, 1000);
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await signIn.social({
        provider: provider,
        callbackURL: 'http://localhost:5173/',
        errorCallbackURL: 'http://localhost:5173/login',
        newUserCallbackURL: 'http://localhost:5173/',
      });
    } catch (error) {
      setError(`Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Metadata 
        pageTitle="Login - MOOSTYLE"
        pageDescription="Sign in to your MOOSTYLE account"
      />
      <div className="min-h-screen bg-gray-50">
        <NavigationPrimary />
        <NavigationSecondary />
        
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)] px-4 py-8">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                <p className="text-gray-600">Sign in to your MooStyle account</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                  <AlertCircle size={20} className="text-red-600" />
                  <span className="text-red-800">{error}</span>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle size={20} className="text-green-600" />
                  <span className="text-green-800">{success}</span>
                </div>
              )}

              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-gray-700 font-medium">Continue with Google</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-teal-600 hover:text-teal-700 font-medium">
                    Sign up here
                  </Link>
                </p>
              </div>

              {/* Data Retention Notice */}
              <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info size={20} className="text-red-600 mt-0.5" />
                  <div className="text-sm text-red-800">
                    <p className="font-medium mb-1">Account Data Policy</p>
                    <p>Your account data is stored temporarily and will be automatically removed after 4 weeks of inactivity to ensure optimal performance and data security.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};