import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavigationPrimary } from '@/Components/NavigationPrimary';
import { NavigationSecondary } from '@/Components/NavigationSecondary';
import { Metadata } from '@/Components/Metadata.jsx';
import { Eye, EyeOff, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { apiConfig } from '@/lib/apiConfig.js';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the data retention policy');
      setLoading(false);
      return;
    }

    try {
      console.log('Sending registration request:', {
        username: formData.username,
        email: formData.email,
        password: '***' // Don't log actual password
      });

      const response = await fetch(apiConfig.buildUrl(apiConfig.endpoints.auth.register), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const data = await response.json();
      
      // Debug: Log the response to see what we're getting
      console.log('Registration response:', data);

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setSuccess('Account created successfully! Redirecting...');
        
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        // Handle validation errors
        if (data.errors && Array.isArray(data.errors)) {
          // Extract just the error messages, not the full objects
          const errorMessages = data.errors.map(error => {
            if (typeof error === 'string') {
              return error;
            } else if (error && error.msg) {
              return error.msg;
            } else if (error && error.message) {
              return error.message;
            }
            return 'Validation error';
          }).filter(msg => msg && msg !== 'Validation error'); // Remove empty messages
          
          if (errorMessages.length > 0) {
            setError(errorMessages.join('. '));
          } else {
            setError(data.message || 'Registration failed');
          }
        } else {
          setError(data.message || 'Registration failed');
        }
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Metadata 
        pageTitle="Register - MOOSTYLE"
        pageDescription="Create your MOOSTYLE account"
      />
      <div className="min-h-screen bg-gray-50">
        <NavigationPrimary />
        <NavigationSecondary />
        
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)] px-4 py-8">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Join MooStyle</h1>
                <p className="text-gray-600">Create your account to get started</p>
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

              {/* Data Retention Warning */}
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={20} className="text-red-600 mt-0.5" />
                  <div className="text-sm text-red-800">
                    <p className="font-medium mb-2">Important: Data Retention Policy</p>
                    <p className="mb-2">Due to data storage limitations and our commitment to privacy, your account data will be automatically removed after 4 weeks of inactivity.</p>
                    <p className="mb-2">This includes:</p>
                    <ul className="list-disc list-inside ml-4 mb-2">
                      <li>Profile information and preferences</li>
                      <li>Account settings and history</li>
                      <li>Any saved data or configurations</li>
                    </ul>
                    <p>You will receive email notifications 5 days before account expiry, and logging in will automatically renew your account for another 4 weeks.</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username *
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Choose a username"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
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
                        placeholder="Create a password"
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

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                    I understand and agree to the data retention policy. My account data will be automatically removed after 4 weeks of inactivity, and I will receive email notifications before expiry.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading || !agreedToTerms}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-teal-600 hover:text-teal-700 font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
