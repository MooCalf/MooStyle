import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { NavigationPrimary } from '@/Components/NavigationPrimary';
import { NavigationSecondary } from '@/Components/NavigationSecondary';
import { Metadata } from '@/Components/Metadata.jsx';
import { 
  User, 
  Mail, 
  Calendar, 
  Star, 
  Download, 
  Settings, 
  LogOut, 
  Edit, 
  Save, 
  X,
  Crown,
  Award,
  TrendingUp,
  Activity,
  Heart,
  ShoppingBag,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export const MyAccount = () => {
  const { user, isAuthenticated, isLoading, isBanned } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userStats, setUserStats] = useState({
    totalDownloads: 0,
    totalPoints: 0,
    membershipLevel: 'Bronze',
    joinDate: null,
    lastActive: null
  });

  useEffect(() => {
    if (user) {
      setEditForm({
        username: user.username || '',
        email: user.email || ''
      });
      
      // Load user stats
      loadUserStats();
    }
  }, [user]);

  const loadUserStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('/api/user/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const stats = await response.json();
        setUserStats(stats);
      }
    } catch (error) {
      console.error('Error loading user stats:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
    setSuccess(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      username: user?.username || '',
      email: user?.email || ''
    });
    setError(null);
    setSuccess(null);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editForm)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const updatedUser = await response.json();
      
      // Update local storage
      localStorage.setItem('user', JSON.stringify(updatedUser.user));
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('userDataUpdated'));
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Refresh page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const getMembershipColor = (level) => {
    switch (level.toLowerCase()) {
      case 'bronze': return 'text-orange-600 bg-orange-100';
      case 'silver': return 'text-gray-600 bg-gray-100';
      case 'gold': return 'text-yellow-600 bg-yellow-100';
      case 'platinum': return 'text-purple-600 bg-purple-100';
      case 'diamond': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMembershipIcon = (level) => {
    switch (level.toLowerCase()) {
      case 'bronze': return Award;
      case 'silver': return Award;
      case 'gold': return Crown;
      case 'platinum': return Crown;
      case 'diamond': return Crown;
      default: return Award;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw size={32} className="animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading account...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Log In</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your account.</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const MembershipIcon = getMembershipIcon(userStats.membershipLevel);

  return (
    <>
      <Metadata 
        pageTitle="My Account - MooStyle"
        pageDescription="Manage your account settings, view your stats, and track your progress"
      />
      
      <div className="min-h-screen bg-gray-50">
        <NavigationPrimary />
        <NavigationSecondary />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
            <p className="text-gray-600 mt-1">Manage your profile and view your activity</p>
          </div>

          {/* Ban Alert */}
          {isBanned && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <AlertCircle size={24} className="text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Account Suspended</h3>
                  <p className="text-red-700 mb-3">
                    Your account has been temporarily suspended due to a violation of our terms of service.
                  </p>
                  {user?.banReason && (
                    <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-3">
                      <p className="text-sm font-medium text-red-800 mb-1">Reason for Suspension:</p>
                      <p className="text-sm text-red-700 italic">"{user.banReason}"</p>
                    </div>
                  )}
                  {user?.bannedAt && (
                    <p className="text-sm text-red-600 mb-3">
                      Suspended on: {new Date(user.bannedAt).toLocaleDateString()}
                    </p>
                  )}
                  <div className="flex items-center gap-3">
                    <Link
                      to="/support"
                      className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      <Mail size={16} className="mr-2" />
                      Contact Support
                    </Link>
                    <a
                      href="mailto:support@moostyle.com"
                      className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                    >
                      <Mail size={16} className="mr-2" />
                      Email Direct
                    </a>
                  </div>
                  <p className="text-sm text-red-600">
                    This suspension is temporary and can be reviewed upon request.
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle size={20} className="text-red-600" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle size={20} className="text-green-600" />
              <p className="text-green-800">{success}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
                    >
                      <Edit size={16} />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        {loading ? (
                          <RefreshCw size={16} className="animate-spin" />
                        ) : (
                          <Save size={16} />
                        )}
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-700 font-medium"
                      >
                        <X size={16} />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.username}
                        onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Enter username"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <User size={20} className="text-gray-400" />
                        <span className="text-gray-900">{user?.username || 'Not set'}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Enter email"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail size={20} className="text-gray-400" />
                        <span className="text-gray-900">{user?.email || 'Not set'}</span>
                      </div>
                    )}
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Type
                    </label>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        user?.role === 'admin' ? 'bg-purple-100' : 'bg-green-100'
                      }`}>
                        {user?.role === 'admin' ? (
                          <Crown size={16} className="text-purple-600" />
                        ) : (
                          <User size={16} className="text-green-600" />
                        )}
                      </div>
                      <span className="text-gray-900 capitalize">{user?.role || 'User'}</span>
                      {user?.role === 'admin' && (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                          Administrator
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Join Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Since
                    </label>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Calendar size={20} className="text-gray-400" />
                      <span className="text-gray-900">
                        {userStats.joinDate ? new Date(userStats.joinDate).toLocaleDateString() : 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              {/* Membership Level */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Membership Level</h3>
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 ${getMembershipColor(userStats.membershipLevel)}`}>
                    <MembershipIcon size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 capitalize">{userStats.membershipLevel}</h4>
                  <p className="text-sm text-gray-600 mt-1">Current Level</p>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-yellow-500" />
                      <span className="text-sm text-gray-600">Points</span>
                    </div>
                    <span className="font-semibold text-gray-900">{userStats.totalPoints.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Download size={16} className="text-teal-500" />
                      <span className="text-sm text-gray-600">Downloads</span>
                    </div>
                    <span className="font-semibold text-gray-900">{userStats.totalDownloads}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity size={16} className="text-blue-500" />
                      <span className="text-sm text-gray-600">Last Active</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {userStats.lastActive ? new Date(userStats.lastActive).toLocaleDateString() : 'Today'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => window.location.href = '/cart'}
                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <ShoppingBag size={20} className="text-teal-600" />
                    <span className="text-gray-900">View Cart</span>
                  </button>
                  <button
                    onClick={() => window.location.href = '/shopping'}
                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Heart size={20} className="text-red-600" />
                    <span className="text-gray-900">Browse Products</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-red-600"
                  >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
