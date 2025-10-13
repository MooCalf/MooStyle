import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { signOut, authClient } from '@/lib/betterAuthClient';
import { envConfig } from '@/lib/envConfig';
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
  EyeOff,
  Lock,
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
  
  // Password-related state
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  
  // Forgot password state
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState('email'); // 'email', 'otp', 'new-password'
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [forgotPasswordError, setForgotPasswordError] = useState(null);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(null);
  const [showForgotNewPassword, setShowForgotNewPassword] = useState(false);
  const [showForgotConfirmPassword, setShowForgotConfirmPassword] = useState(false);
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
      const response = await fetch(`${envConfig.apiBaseUrl}/api/user/stats`, {
        credentials: 'include', // Include cookies for Better Auth session
        headers: {
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
      
      // Only allow username updates, not email
      const updateData = {
        username: editForm.username
      };

      const response = await fetch(`${envConfig.apiBaseUrl}/api/user/profile`, {
        method: 'PUT',
        credentials: 'include', // Include cookies for Better Auth session
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const result = await response.json();
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('userDataUpdated'));
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      
      // Refresh page after a short delay to get updated user data
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

  const handlePasswordChange = async () => {
    try {
      setLoading(true);
      setPasswordError(null);
      setPasswordSuccess(null);

      // Validate passwords
      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        throw new Error('New passwords do not match');
      }

      if (passwordForm.newPassword.length < 6) {
        throw new Error('New password must be at least 6 characters long');
      }

      // Use Better Auth's changePassword method
      const result = await authClient.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });

      if (result.error) {
        throw new Error(result.error.message || 'Failed to change password');
      }

      setPasswordSuccess('Password changed successfully!');
      setIsChangingPassword(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordError(null);
    setPasswordSuccess(null);
  };

  // Forgot password handlers
  const handleForgotPasswordEmail = async () => {
    try {
      setLoading(true);
      setForgotPasswordError(null);
      setForgotPasswordSuccess(null);

      const result = await authClient.forgetPassword.emailOtp({
        email: forgotPasswordForm.email
      });

      if (result.error) {
        throw new Error(result.error.message || 'Failed to send reset code');
      }

      setForgotPasswordSuccess('Reset code sent to your email!');
      setForgotPasswordStep('otp');
      
    } catch (error) {
      console.error('Error sending forgot password email:', error);
      setForgotPasswordError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordOTP = async () => {
    try {
      setLoading(true);
      setForgotPasswordError(null);
      setForgotPasswordSuccess(null);

      const result = await authClient.emailOtp.checkVerificationOtp({
        email: forgotPasswordForm.email,
        type: 'forget-password',
        otp: forgotPasswordForm.otp
      });

      if (result.error) {
        throw new Error(result.error.message || 'Invalid reset code');
      }

      setForgotPasswordSuccess('Code verified! Please enter your new password.');
      setForgotPasswordStep('new-password');
      
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setForgotPasswordError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordReset = async () => {
    try {
      setLoading(true);
      setForgotPasswordError(null);
      setForgotPasswordSuccess(null);

      // Validate passwords
      if (forgotPasswordForm.newPassword !== forgotPasswordForm.confirmPassword) {
        throw new Error('New passwords do not match');
      }

      if (forgotPasswordForm.newPassword.length < 6) {
        throw new Error('New password must be at least 6 characters long');
      }

      const result = await authClient.emailOtp.resetPassword({
        email: forgotPasswordForm.email,
        otp: forgotPasswordForm.otp,
        password: forgotPasswordForm.newPassword
      });

      if (result.error) {
        throw new Error(result.error.message || 'Failed to reset password');
      }

      setForgotPasswordSuccess('Password reset successfully! You can now sign in with your new password.');
      setIsForgotPassword(false);
      setForgotPasswordStep('email');
      setForgotPasswordForm({
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: ''
      });
      
    } catch (error) {
      console.error('Error resetting password:', error);
      setForgotPasswordError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelForgotPassword = () => {
    setIsForgotPassword(false);
    setForgotPasswordStep('email');
    setForgotPasswordForm({
      email: '',
      otp: '',
      newPassword: '',
      confirmPassword: ''
    });
    setForgotPasswordError(null);
    setForgotPasswordSuccess(null);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error during logout:', error);
      // Fallback: redirect anyway
    window.location.href = '/login';
    }
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

  const getMembershipProgress = (currentLevel, currentPoints) => {
    const levels = {
      'Bronze': { min: 0, max: 99 },
      'Silver': { min: 100, max: 499 },
      'Gold': { min: 500, max: 999 },
      'Diamond': { min: 1000, max: Infinity }
    };

    const currentLevelData = levels[currentLevel] || levels['Bronze'];
    const nextLevel = Object.keys(levels).find(level => levels[level].min > currentLevelData.min);
    
    if (!nextLevel) {
      // User is at max level (Diamond)
      return {
        current: currentPoints,
        next: null,
        progress: 100,
        pointsNeeded: 0,
        nextLevel: null
      };
    }

    const nextLevelData = levels[nextLevel];
    const pointsInCurrentLevel = currentPoints - currentLevelData.min;
    const pointsNeededForNext = nextLevelData.min - currentPoints;
    const progress = Math.min(100, (pointsInCurrentLevel / (nextLevelData.min - currentLevelData.min)) * 100);

    return {
      current: currentPoints,
      next: nextLevelData.min,
      progress: Math.max(0, progress),
      pointsNeeded: Math.max(0, pointsNeededForNext),
      nextLevel: nextLevel
    };
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

                  {/* Password Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>

                    {isChangingPassword ? (
                      <div className="space-y-4">
                        {/* Current Password */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showCurrentPassword ? "text" : "password"}
                              value={passwordForm.currentPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showCurrentPassword ? (
                                <EyeOff size={16} className="text-gray-400" />
                              ) : (
                                <Eye size={16} className="text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* New Password */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              value={passwordForm.newPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showNewPassword ? (
                                <EyeOff size={16} className="text-gray-400" />
                              ) : (
                                <Eye size={16} className="text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <div className="relative">
                      <input
                              type={showConfirmPassword ? "text" : "password"}
                              value={passwordForm.confirmPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showConfirmPassword ? (
                                <EyeOff size={16} className="text-gray-400" />
                              ) : (
                                <Eye size={16} className="text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Password Error */}
                        {passwordError && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-3">
                            <AlertCircle size={16} className="text-red-600" />
                            <p className="text-red-800 text-sm">{passwordError}</p>
                          </div>
                        )}

                        {/* Password Success */}
                        {passwordSuccess && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-3">
                            <CheckCircle size={16} className="text-green-600" />
                            <p className="text-green-800 text-sm">{passwordSuccess}</p>
                          </div>
                        )}

                        {/* Password Action Buttons */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={handlePasswordChange}
                            disabled={loading}
                            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                          >
                            {loading ? (
                              <RefreshCw size={16} className="animate-spin" />
                            ) : (
                              <Save size={16} />
                            )}
                            Change Password
                          </button>
                          <button
                            onClick={handleCancelPasswordChange}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-700 font-medium"
                          >
                            <X size={16} />
                            Cancel
                          </button>
                        </div>
                        
                        {/* Forgot Password Link */}
                        <div className="text-center">
                          <button
                            onClick={() => setIsForgotPassword(true)}
                            className="text-sm text-gray-600 hover:text-teal-600 underline"
                          >
                            Forgot Password?
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Lock size={20} className="text-gray-400" />
                          <span className="text-gray-900">••••••••</span>
                        </div>
                        <button
                          onClick={() => setIsChangingPassword(true)}
                          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm"
                        >
                          <Lock size={16} />
                          Change Password
                        </button>
                      </div>
                    )}
                  </div>

      {/* Forgot Password Modal */}
      {isForgotPassword && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg border-2 border-teal-500 p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4 border-b border-teal-200 pb-3">
              <h3 className="text-lg font-semibold text-gray-900">Reset Password</h3>
              <button
                onClick={handleCancelForgotPassword}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

                        {/* Forgot Password Error */}
                        {forgotPasswordError && (
                          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-3">
                            <AlertCircle size={16} className="text-red-600" />
                            <p className="text-red-800 text-sm">{forgotPasswordError}</p>
                          </div>
                        )}

                        {/* Forgot Password Success */}
                        {forgotPasswordSuccess && (
                          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-3">
                            <CheckCircle size={16} className="text-green-600" />
                            <div>
                              <p className="text-green-800 text-sm">{forgotPasswordSuccess}</p>
                              <p className="text-green-700 text-xs mt-1">
                                💡 <strong>Tip:</strong> Check your spam/junk folder if you don't see the email
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Step 1: Email */}
                        {forgotPasswordStep === 'email' && (
                          <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                      <input
                        type="email"
                                value={forgotPasswordForm.email}
                                onChange={(e) => setForgotPasswordForm({ ...forgotPasswordForm, email: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="Enter your email address"
                              />
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={handleForgotPasswordEmail}
                                disabled={loading || !forgotPasswordForm.email}
                                className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                              >
                                {loading ? 'Sending...' : 'Send Reset Code'}
                              </button>
                              <button
                                onClick={handleCancelForgotPassword}
                                className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Step 2: OTP */}
                        {forgotPasswordStep === 'otp' && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Reset Code
                              </label>
                              <input
                                type="text"
                                value={forgotPasswordForm.otp}
                                onChange={(e) => setForgotPasswordForm({ ...forgotPasswordForm, otp: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="Enter 6-digit code"
                                maxLength="6"
                              />
                                <p className="text-xs text-gray-500 mt-1">
                                  Check your email for the reset code (including spam folder)
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={handleForgotPasswordOTP}
                                disabled={loading || forgotPasswordForm.otp.length !== 6}
                                className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                              >
                                {loading ? 'Verifying...' : 'Verify Code'}
                              </button>
                              <button
                                onClick={() => setForgotPasswordStep('email')}
                                className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium"
                              >
                                Back
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Step 3: New Password */}
                        {forgotPasswordStep === 'new-password' && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                              </label>
                              <div className="relative">
                                <input
                                  type={showForgotNewPassword ? "text" : "password"}
                                  value={forgotPasswordForm.newPassword}
                                  onChange={(e) => setForgotPasswordForm({ ...forgotPasswordForm, newPassword: e.target.value })}
                                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                  placeholder="Enter new password"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowForgotNewPassword(!showForgotNewPassword)}
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                  {showForgotNewPassword ? (
                                    <EyeOff size={16} className="text-gray-400" />
                                  ) : (
                                    <Eye size={16} className="text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                              </label>
                              <div className="relative">
                                <input
                                  type={showForgotConfirmPassword ? "text" : "password"}
                                  value={forgotPasswordForm.confirmPassword}
                                  onChange={(e) => setForgotPasswordForm({ ...forgotPasswordForm, confirmPassword: e.target.value })}
                                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                  placeholder="Confirm new password"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowForgotConfirmPassword(!showForgotConfirmPassword)}
                                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                  {showForgotConfirmPassword ? (
                                    <EyeOff size={16} className="text-gray-400" />
                                  ) : (
                                    <Eye size={16} className="text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={handleForgotPasswordReset}
                                disabled={loading || !forgotPasswordForm.newPassword || !forgotPasswordForm.confirmPassword}
                                className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                              >
                                {loading ? 'Resetting...' : 'Reset Password'}
                              </button>
                              <button
                                onClick={() => setForgotPasswordStep('otp')}
                                className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium"
                              >
                                Back
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Account Information Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                    <div className="space-y-4">
                      {/* Email - Read Only */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail size={20} className="text-gray-400" />
                        <span className="text-gray-900">{user?.email || 'Not set'}</span>
                      </div>
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Type
                    </label>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        user?.role === 'owner' ? 'bg-red-100' : user?.role === 'admin' ? 'bg-purple-100' : 'bg-green-100'
                      }`}>
                        {user?.role === 'owner' ? (
                          <Crown size={16} className="text-red-600" />
                        ) : user?.role === 'admin' ? (
                          <Crown size={16} className="text-purple-600" />
                        ) : (
                          <User size={16} className="text-green-600" />
                        )}
                      </div>
                      <span className="text-gray-900 capitalize">{user?.role || 'User'}</span>
                      {user?.role === 'owner' && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                          Owner
                        </span>
                      )}
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
                  
                  {/* Progress Bar */}
                  {(() => {
                    const progress = getMembershipProgress(userStats.membershipLevel, userStats.totalPoints);
                    return (
                      <div className="mt-4">
                        {progress.nextLevel ? (
                          <>
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                              <span>{userStats.totalPoints} points</span>
                              <span>{progress.pointsNeeded} to {progress.nextLevel}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress.progress}%` }}
                              ></div>
                            </div>
                          </>
                        ) : (
                          <div className="text-sm text-gray-600 mt-2">
                            <span className="text-teal-600 font-semibold">Max Level Achieved!</span>
                          </div>
                        )}
                      </div>
                    );
                  })()}
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
