import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Settings, 
  LogOut,
  Check,
  Star,
  Gift,
  Bell,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '@/Components/Footer';
import ChangePassword from '@/Components/ChangePassword';

const MyAccount = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: false
  });
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Always fetch fresh data from server to ensure points are up to date
        const response = await fetch(`http://localhost:5000/api/auth/profile?t=${Date.now()}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache'
          }
        });

        if (response.ok) {
          const responseData = await response.json();
          const userData = responseData.user;
          console.log('🔄 Fresh user data from server:', userData);
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          
          // Load notification settings from user data
          if (userData.notificationSettings) {
            console.log('Loading notification settings:', userData.notificationSettings);
            setNotificationSettings(userData.notificationSettings);
          } else {
            console.log('No notification settings found, using defaults');
          }
          setLoading(false);
        } else {
          // If server request fails, fall back to localStorage
          const userData = localStorage.getItem('user');
          if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            
            if (parsedUser.notificationSettings) {
              setNotificationSettings(parsedUser.notificationSettings);
            }
          } else {
            navigate('/login');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Fall back to localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          
          if (parsedUser.notificationSettings) {
            setNotificationSettings(parsedUser.notificationSettings);
          }
        } else {
          navigate('/login');
        }
        setLoading(false);
      }
    };

    // Load user data initially
    loadUserData();

    // Listen for storage changes to update user data when points change
    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        loadUserData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom events (for same-tab updates)
    const handleUserUpdate = () => {
      loadUserData();
    };

    window.addEventListener('userDataUpdated', handleUserUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userDataUpdated', handleUserUpdate);
    };
  }, [navigate]);

  const refreshUserData = async () => {
    setRefreshing(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/auth/profile?t=${Date.now()}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        const userData = responseData.user;
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        if (userData.notificationSettings) {
          setNotificationSettings(userData.notificationSettings);
        }
        
        console.log('User data refreshed successfully');
      } else {
        console.error('Failed to refresh user data');
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const updateNotificationSettings = async (settingType, value) => {
    try {
      console.log('Updating notification settings:', settingType, value);
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await fetch('http://localhost:5000/api/auth/notification-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          [settingType]: value
        })
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        
        const updatedSettings = { ...notificationSettings, [settingType]: value };
        setNotificationSettings(updatedSettings);
        
        // Update local user data
        const updatedUser = { ...user, notificationSettings: updatedSettings };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        console.log('Notification settings updated successfully');
      } else {
        const errorData = await response.json();
        console.error('Failed to update notification settings:', errorData);
      }
    } catch (error) {
      console.error('Error updating notification settings:', error);
    }
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Profile Information</h3>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900">
              {user.username}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900">
              {user.email}
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> To update your profile information, please contact our support team at support@moostyle.com
          </p>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Notification Preferences</h3>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive updates about your account, new products, and special promotions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notificationSettings.emailNotifications}
                onChange={(e) => {
                  console.log('Checkbox clicked, current value:', notificationSettings.emailNotifications, 'new value:', e.target.checked);
                  updateNotificationSettings('emailNotifications', e.target.checked);
                }}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800">
            <strong>Email Notifications:</strong> When enabled, you'll receive important updates about your account, 
            new products, and special promotions. You can unsubscribe at any time.
          </p>
        </div>
        
        {/* Account Information Notice */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">Account Information</h4>
          <p className="text-sm text-blue-800 mb-2">
            Your account information is stored securely and is used to provide you with personalized experiences, 
            track your points, and manage your cart across devices.
          </p>
          <p className="text-sm text-blue-800">
            <strong>Data Retention:</strong> Your account data is retained as long as your account is active. 
            You can request account deletion at any time by contacting support.
          </p>
        </div>
      </div>
    </div>
  );

  const renderRewardsSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Rewards & Points</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Star size={24} />
            <span className="text-2xl font-bold">{user?.points ?? 0}</span>
            {console.log('🎯 Displaying points:', user?.points)}
          </div>
          <h4 className="font-semibold mb-2">Available Points</h4>
          <p className="text-teal-100 text-sm">Earn 2 points for each mod you download</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Check size={24} className="text-green-600" />
            <span className="text-2xl font-bold text-gray-900">{user?.membershipLevel ?? 'Bronze'}</span>
            {console.log('🏆 Displaying membership level:', user?.membershipLevel)}
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Membership Level</h4>
          <p className="text-gray-600 text-sm">Current tier based on your points</p>
        </div>
      </div>
      
      {/* Membership Levels Info */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Membership Levels</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`p-4 rounded-lg border-2 ${user.membershipLevel === 'Bronze' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200'}`}>
            <div className="text-center">
              <div className="text-2xl mb-2">🥉</div>
              <h5 className="font-semibold text-gray-900">Bronze</h5>
              <p className="text-sm text-gray-600">0-29 points</p>
            </div>
          </div>
          <div className={`p-4 rounded-lg border-2 ${user.membershipLevel === 'Silver' ? 'border-gray-400 bg-gray-50' : 'border-gray-200'}`}>
            <div className="text-center">
              <div className="text-2xl mb-2">🥈</div>
              <h5 className="font-semibold text-gray-900">Silver</h5>
              <p className="text-sm text-gray-600">30-79 points</p>
            </div>
          </div>
          <div className={`p-4 rounded-lg border-2 ${user.membershipLevel === 'Gold' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}>
            <div className="text-center">
              <div className="text-2xl mb-2">🥇</div>
              <h5 className="font-semibold text-gray-900">Gold</h5>
              <p className="text-sm text-gray-600">80-199 points</p>
            </div>
          </div>
          <div className={`p-4 rounded-lg border-2 ${user.membershipLevel === 'Diamond' ? 'border-blue-400 bg-blue-50' : 'border-gray-200'}`}>
            <div className="text-center">
              <div className="text-2xl mb-2">💎</div>
              <h5 className="font-semibold text-gray-900">Diamond</h5>
              <p className="text-sm text-gray-600">200+ points</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Future Benefits Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start">
          <Gift size={24} className="text-blue-600 mr-3 mt-1" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Coming Soon: Points Benefits</h4>
            <p className="text-blue-800 text-sm">
              Points are currently being tracked! In the future, you'll be able to use your points for exclusive rewards, 
              discounts, and special perks. Keep downloading mods to build up your points!
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactsSection = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Contact & Support</h3>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Mail size={20} className="text-teal-600" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">Email Support</h5>
                    <p className="text-sm text-gray-600 mb-2">Get help with your account, orders, or technical issues</p>
                    <a 
                      href="mailto:support@moostyle.com" 
                      className="text-teal-600 hover:text-teal-700 font-medium"
                    >
                      support@moostyle.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.759 8.071 16 9.007 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08A4.002 4.002 0 015.643 9.7l.615-.615zm4.677-2.796a4.002 4.002 0 01.041-2.08l.08-.08A4.002 4.002 0 0114.357 10.3l-.615.615z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">General Inquiries</h5>
                    <p className="text-sm text-gray-600 mb-2">Questions about products, partnerships, or feedback</p>
                    <a 
                      href="mailto:hello@moostyle.com" 
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      hello@moostyle.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">Account Issues</h5>
                    <p className="text-sm text-gray-600 mb-2">Problems with login, password, or account settings</p>
                    <a 
                      href="mailto:accounts@moostyle.com" 
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      accounts@moostyle.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">Business Inquiries</h5>
                    <p className="text-sm text-gray-600 mb-2">Partnerships, collaborations, or business opportunities</p>
                    <a 
                      href="mailto:business@moostyle.com" 
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      business@moostyle.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Resources */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">Common Questions</h5>
                    <p className="text-sm text-gray-600">Find answers to frequently asked questions</p>
                  </div>
                </div>
                <Link 
                  to="/common-questions" 
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  View FAQ
                </Link>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">About MooStyle</h5>
                    <p className="text-sm text-gray-600">Learn more about our mission and values</p>
                  </div>
                </div>
                <Link 
                  to="/about-me" 
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          
          {/* Contact Notice */}
          <div className="border-t border-gray-200 pt-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-medium text-yellow-900 mb-1">Need Help?</h5>
                  <p className="text-sm text-yellow-800">
                    If you can't find what you're looking for, don't hesitate to reach out! We're here to help and typically respond within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Logo */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-center">
              <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
                <img
                  src="/projects/Brand Medias/Logos/MOOSTYLES LOGO - TEAL COLOR.png"
                  alt="MOOSTYLE Logo"
                  className="h-8 w-8 object-contain"
                />
                <span className="text-2xl font-bold text-teal-600">MOOSTYLE</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Loading or Authentication Required Notice */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className={`border rounded-lg p-8 text-center ${loading ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex justify-center mb-6">
              {loading ? (
                <RefreshCw size={64} className="text-blue-600 animate-spin" />
              ) : (
                <AlertCircle size={64} className="text-red-600" />
              )}
            </div>
            <h1 className={`text-3xl font-bold mb-4 ${loading ? 'text-blue-900' : 'text-red-900'}`}>
              {loading ? 'Loading Account Data...' : 'Account Required'}
            </h1>
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${loading ? 'text-blue-800' : 'text-red-800'}`}>
              {loading 
                ? 'Please wait while we fetch your latest account information and points...'
                : 'You need to create an account to access your profile, track points, manage notifications, and enjoy all the benefits of being a MooStyle member.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 font-medium"
              >
                Create Account
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-3 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors duration-200 font-medium"
              >
                Sign In
              </Link>
            </div>
            <p className="text-red-700 text-sm mt-6">
              Already have an account? <Link to="/login" className="underline hover:text-red-800">Sign in here</Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
              <img
                src="/projects/Brand Medias/Logos/MOOSTYLES LOGO - TEAL COLOR.png"
                alt="MOOSTYLE Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="text-2xl font-bold text-teal-600">MOOSTYLE</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Welcome back, {user.username}!</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <button
                onClick={refreshUserData}
                disabled={refreshing}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Refresh account data"
              >
                <RefreshCw size={16} className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

            {/* Main Content - All sections on one page */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="space-y-8">
                {renderProfileSection()}
                <ChangePassword />
                {renderNotificationsSection()}
                {renderRewardsSection()}
                {renderContactsSection()}
              </div>
            </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MyAccount;
