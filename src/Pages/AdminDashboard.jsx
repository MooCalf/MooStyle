import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { NavigationPrimary } from '@/Components/NavigationPrimary';
import { NavigationSecondary } from '@/Components/NavigationSecondary';
import { Metadata } from '@/Components/Metadata.jsx';
import ApiHealthMonitor from '@/Components/ApiHealthMonitor';
import { authClient } from '@/lib/betterAuthClient';
import {
  Users,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Eye,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  UserCheck,
  Package,
  Star,
  MessageSquare,
  Settings,
  RefreshCw,
  Filter,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Server,
  Shield,
  ArrowLeft
} from 'lucide-react';

export const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    adminUsers: 0,
    regularUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    totalCarts: 0,
    totalPoints: 0,
    totalTransactions: 0,
    membershipLevels: {
      Bronze: 0,
      Silver: 0,
      Gold: 0,
      Diamond: 0,
    },
    recentUsers: [],
    recentCarts: [],
    recentTransactions: []
  });
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [notification, setNotification] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false); // Add state to prevent double updates
  const [isConfirming, setIsConfirming] = useState(false); // Add state to prevent double confirmations
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to prevent double form submissions
  const [showRoleWarningModal, setShowRoleWarningModal] = useState(false);
  const [pendingRoleUpdate, setPendingRoleUpdate] = useState(null);

  useEffect(() => {
    if (!isAdmin) {
      setError('Access denied. Admin privileges required.');
      setLoading(false);
      return;
    }
    
    fetchDashboardData();
  }, [isAdmin]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`/api/admin/stats?t=${Date.now()}`, {
        method: 'GET',
        credentials: 'include', // Include cookies for Better Auth
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch dashboard data: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.success && data.stats) {
        setStats({
          totalUsers: data.stats.totalUsers || 0,
          adminUsers: data.stats.adminUsers || 0,
          regularUsers: data.stats.regularUsers || 0,
          activeUsers: data.stats.activeUsers || 0,
          inactiveUsers: data.stats.inactiveUsers || 0,
          totalCarts: data.stats.totalCarts || 0,
          totalPoints: data.stats.totalPoints || 0,
          totalTransactions: data.stats.totalTransactions || 0,
          membershipLevels: data.stats.membershipLevels || {
            Bronze: 0,
            Silver: 0,
            Gold: 0,
            Diamond: 0,
          },
          recentUsers: data.stats.recentUsers || [],
          recentCarts: data.stats.recentCarts || [],
          recentTransactions: data.stats.recentTransactions || []
        });
      } else {
        throw new Error(data.message || 'Failed to fetch stats');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchDashboardData();
  };

  // Admin functions using Better Auth
  const createUser = async (userData) => {
    try {
      const { data, error } = await authClient.admin.createUser({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        role: userData.role || 'user',
        data: {
          username: userData.username,
          points: userData.points || 0,
          membershipLevel: userData.membershipLevel || 'Bronze',
          notificationSettings: userData.notificationSettings || { emailNotifications: false }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      // Refresh dashboard data
      await fetchDashboardData();
      setShowCreateUserModal(false);
      return { success: true, user: data };
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, error: error.message };
    }
  };

  const updateUser = async (userId, userData) => {
    if (isUpdating) {
      console.log('Update already in progress, skipping...');
      return { success: false, error: 'Update already in progress' };
    }
    
    try {
      setIsUpdating(true);
      console.log('Updating user with ID:', userId);
      console.log('User data:', userData);
      
      // Handle role updates separately
      if (userData.role) {
        const roleResult = await setUserRole(userId, userData.role);
        if (!roleResult.success) {
          throw new Error(roleResult.error);
        }
      }
      
      // Remove role from userData for the regular update
      const { role, ...userDataWithoutRole } = userData;
      
      // Use the backend API for other user data updates
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDataWithoutRole)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }

      const result = await response.json();
      console.log('Update successful:', result);
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      // Refresh dashboard data
      await fetchDashboardData();
      setShowEditUserModal(false);
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: error.message };
    } finally {
      setIsUpdating(false);
    }
  };

  const banUser = async (userId, banReason = 'No reason provided') => {
    try {
      console.log('Banning user with ID:', userId, 'Reason:', banReason);
      
      const response = await fetch(`/api/admin/users/${userId}/ban`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ban: true, banReason })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to ban user');
      }

      console.log('Ban successful');
      
      // Refresh dashboard data
      await fetchDashboardData();
      return { success: true };
    } catch (error) {
      console.error('Error banning user:', error);
      return { success: false, error: error.message };
    }
  };

  const unbanUser = async (userId) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/ban`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ban: false })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to unban user');
      }

      // Refresh dashboard data
      await fetchDashboardData();
      return { success: true };
    } catch (error) {
      console.error('Error unbanning user:', error);
      return { success: false, error: error.message };
    }
  };

  const deleteUser = async (userId) => {
    try {
      const { data, error } = await authClient.admin.removeUser({
        userId: userId
      });

      if (error) {
        throw new Error(error.message);
      }

      // Refresh dashboard data
      await fetchDashboardData();
      return { success: true, user: data };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { success: false, error: error.message };
    }
  };

  const setUserRole = async (userId, role) => {
    try {
      const { error } = await authClient.admin.setRole({
        userId: userId,
        role: role
      });

      if (error) {
        throw new Error(error.message);
      }

      // Refresh dashboard data
      await fetchDashboardData();
      return { success: true };
    } catch (error) {
      console.error('Error setting user role:', error);
      return { success: false, error: error.message };
    }
  };

  const setUserPassword = async (userId, newPassword) => {
    try {
      const { error } = await authClient.admin.setUserPassword({
        userId: userId,
        newPassword: newPassword
      });

      if (error) {
        throw new Error(error.message);
      }

      return { success: true };
    } catch (error) {
      console.error('Error setting user password:', error);
      return { success: false, error: error.message };
    }
  };

  // Handle role update with admin warning
  const handleRoleUpdate = async (userId, newRole, userData) => {
    try {
      const result = await setUserRole(userId, newRole);
      
      if (result.success) {
        setNotification({
          type: 'success',
          message: `User role updated to ${newRole}`
        });
        await fetchDashboardData();
        setShowRoleWarningModal(false);
        setPendingRoleUpdate(null);
        setShowEditUserModal(false);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      setNotification({
        type: 'error',
        message: error.message || 'Failed to update user role'
      });
    }
  };

  // Check if role change requires admin warning
  const checkRoleChange = (currentRole, newRole, userData) => {
    if (currentRole !== 'admin' && newRole === 'admin') {
      // Show admin warning modal
      setPendingRoleUpdate({
        userId: userData.userId || userData.id,
        newRole: newRole,
        userData: userData
      });
      setShowRoleWarningModal(true);
      return true; // Indicates warning was shown
    }
    return false; // No warning needed
  };

  // Admin protection functions
  const isUserAdmin = (user) => {
    return user.role === 'admin';
  };

  const canModifyUser = (targetUser) => {
    // Current user (logged in admin) cannot modify other admins
    if (isUserAdmin(targetUser)) {
      return false;
    }
    return true;
  };

  const isCurrentUser = (targetUser) => {
    // Check if the target user is the current logged-in user
    return targetUser.id === user?.id || targetUser._id?.toString() === user?.id;
  };

  // Confirmation dialog helper
  const showConfirmation = (action, message) => {
    if (isConfirming) {
      console.log('Confirmation already in progress, skipping...');
      return;
    }
    
    setIsConfirming(true);
    setConfirmAction(action);
    setConfirmMessage(message);
    setShowConfirmDialog(true);
  };

  const executeConfirmedAction = async () => {
    if (!confirmAction || typeof confirmAction !== 'function') {
      console.error('confirmAction is not a function:', confirmAction);
      setShowConfirmDialog(false);
      setConfirmAction(null);
      setConfirmMessage('');
      setIsConfirming(false);
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await confirmAction();
      setShowConfirmDialog(false);
      setConfirmAction(null);
      setConfirmMessage('');
      setIsConfirming(false);
      setIsSubmitting(false);

      if (result && result.success) {
        setNotification({ type: 'success', message: 'Action completed successfully! Refreshing page...' });
        setTimeout(() => {
          setNotification(null);
          // Refresh the page to show updated data
          window.location.reload();
        }, 2000);
      } else if (result && result.error) {
        setNotification({ type: 'error', message: `Action failed: ${result.error}` });
        setTimeout(() => setNotification(null), 5000);
      }
    } catch (error) {
      console.error('Error executing confirmed action:', error);
      setNotification({ type: 'error', message: `Action failed: ${error.message}` });
      setTimeout(() => setNotification(null), 5000);
      setIsConfirming(false);
      setIsSubmitting(false);
    }
  };

  if (!isAdmin) {
    // Redirect to homepage if user is not admin
    useEffect(() => {
      window.location.href = '/';
    }, []);
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw size={32} color="#0d9488" className="animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Metadata 
        pageTitle="Admin Dashboard - MooStyle"
        pageDescription="Administrative dashboard for managing users, carts, and system statistics"
      />
      
      <div className="min-h-screen bg-gray-50">
        <NavigationPrimary />
        <NavigationSecondary />

        {/* Notification */}
        {notification && (
          <div className={`fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            <div className="flex items-center gap-2">
              {notification.type === 'success' ? (
                <CheckCircle size={20} color="#16a34a" />
              ) : (
                <AlertCircle size={20} color="#dc2626" />
              )}
              <span className="font-medium">{notification.message}</span>
              <button 
                onClick={() => setNotification(null)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome back, {user?.username || 'Administrator'}</p>
              </div>
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <RefreshCw size={20} />
                Refresh
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle size={20} color="#dc2626" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers || 0}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users size={24} color="#2563eb" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-600">Admins: {stats.adminUsers || 0}</span>
                <span className="ml-4 text-gray-600">Regular: {stats.regularUsers || 0}</span>
                <span className="ml-4 text-gray-600">Active: {stats.activeUsers || 0}</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Banned Users</p>
                  <p className="text-2xl font-bold text-red-600">{stats.bannedUsers || 0}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full">
                  <AlertCircle size={24} color="#dc2626" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-gray-600">Suspended accounts</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Carts</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCarts || 0}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <ShoppingBag size={24} color="#16a34a" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowUpRight size={16} color="#22c55e" className="mr-1" />
                <span className="text-green-600">+8% from last month</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Points</p>
                  <p className="text-2xl font-bold text-gray-900">{(stats.totalPoints || 0).toLocaleString()}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Star size={24} color="#ca8a04" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowUpRight size={16} color="#22c55e" className="mr-1" />
                <span className="text-green-600">+15% from last month</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Transactions</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalTransactions || 0}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Activity size={24} color="#9333ea" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowUpRight size={16} color="#22c55e" className="mr-1" />
                <span className="text-green-600">+22% from last month</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'overview', name: 'Overview', icon: BarChart3 },
                  { id: 'users', name: 'Users', icon: Users },
                  { id: 'carts', name: 'Carts', icon: ShoppingBag },
                  { id: 'transactions', name: 'Transactions', icon: Activity },
                  { id: 'health', name: 'API Health', icon: Server }
                ].map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-teal-500 text-teal-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <IconComponent size={16} />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {activeTab === 'overview' && (
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-3">Recent Activity</h4>
                    <div className="space-y-3">
                      {(stats.recentUsers || []).slice(0, 5).map((user, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                            <UserCheck size={16} className="text-teal-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{user.username}</p>
                            <p className="text-xs text-gray-600">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                          </div>
                          <span className="text-xs text-gray-500">{user.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-3">Quick Stats</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Active Users Today</span>
                        <span className="text-sm font-semibold text-gray-900">24</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Downloads Today</span>
                        <span className="text-sm font-semibold text-gray-900">156</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">New Registrations</span>
                        <span className="text-sm font-semibold text-gray-900">8</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search size={16} color="#9ca3af" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                    <button 
                      onClick={() => setShowCreateUserModal(true)}
                      className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Plus size={16} />
                      Add User
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membership</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {(stats.recentUsers || []).map((user, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                                <UserCheck size={20} color="#0d9488" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.username}</div>
                                <div className="text-sm text-gray-500">ID: {user.id || user._id?.toString().slice(-8) || 'N/A'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.role === 'admin' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <Star size={14} color="#eab308" className="mr-1" />
                              {user.points || 0}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.membershipLevel === 'Diamond' 
                                ? 'bg-blue-100 text-blue-800'
                                : user.membershipLevel === 'Gold'
                                ? 'bg-yellow-100 text-yellow-800'
                                : user.membershipLevel === 'Silver'
                                ? 'bg-gray-100 text-gray-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {user.membershipLevel || 'Bronze'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {user.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              {canModifyUser(user) ? (
                                <>
                                  <button 
                                    onClick={() => {
                                      setSelectedUser({...user, userId: user.id || user._id?.toString()});
                                      setShowEditUserModal(true);
                                    }}
                                    className="text-teal-600 hover:text-teal-900"
                                    title="Edit User"
                                  >
                                    <Edit size={16} />
                                  </button>
                                  <button 
                                    onClick={() => {
                                      showConfirmation(
                                        () => deleteUser(user.id || user._id?.toString()),
                                        `Are you sure you want to delete user "${user.username}"? This action cannot be undone.`
                                      );
                                    }}
                                    className="text-red-600 hover:text-red-900"
                                    title="Delete User"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </>
                              ) : (
                                <div className="flex items-center gap-2">
                                  {isUserAdmin(user) && (
                                    <div className="flex items-center gap-1" title="Admin Protected">
                                      <Shield size={16} color="#ea580c" />
                                    </div>
                                  )}
                                  {isCurrentUser(user) && (
                                    <div className="flex items-center gap-1" title="Current User">
                                      <ArrowLeft size={16} color="#dc2626" />
                                    </div>
                                  )}
                                </div>
                              )}
                              {!user.isActive ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-red-600 font-medium">BANNED</span>
                                  {user.banReason && (
                                    <span className="text-xs text-gray-500" title={`Reason: ${user.banReason}`}>
                                      ({user.banReason.length > 20 ? user.banReason.substring(0, 20) + '...' : user.banReason})
                                    </span>
                                  )}
                                  {canModifyUser(user) && (
                                    <button 
                                      onClick={() => {
                                        showConfirmation(
                                          () => unbanUser(user.id || user._id?.toString()),
                                          `Are you sure you want to unban user "${user.username}"?`
                                        );
                                      }}
                                      className="text-green-600 hover:text-green-900"
                                      title="Unban User"
                                    >
                                      <UserCheck size={16} />
                                    </button>
                                  )}
                                </div>
                              ) : (
                                canModifyUser(user) && (
                                  <button 
                                    onClick={() => {
                                      const reason = prompt('Enter ban reason (optional):');
                                      if (reason !== null) {
                                        showConfirmation(
                                          () => banUser(user.id || user._id?.toString(), reason || 'No reason provided'),
                                          `Are you sure you want to ban user "${user.username}"?${reason ? `\n\nReason: ${reason}` : ''}`
                                        );
                                      }
                                    }}
                                    className="text-orange-600 hover:text-orange-900"
                                    title="Ban User"
                                  >
                                    <AlertCircle size={16} />
                                  </button>
                                )
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'carts' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Cart Management</h3>
                  <div className="flex items-center gap-2">
                    <Filter size={16} className="text-gray-400" />
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option>All Carts</option>
                      <option>Active</option>
                      <option>Completed</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  {(stats.recentCarts || []).map((cart, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <ShoppingBag size={20} className="text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Cart #{cart._id?.toString().slice(-8) || cart.id}</p>
                            <p className="text-xs text-gray-600">
                              User: {cart.userInfo?.username || cart.userInfo?.name || 'Unknown User'}
                            </p>
                            <p className="text-xs text-gray-600">{cart.items?.length || 0} items</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {cart.items?.length || 0} items
                          </p>
                          <p className="text-xs text-gray-600">
                            Updated {new Date(cart.lastUpdated).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Point Transactions</h3>
                  <div className="flex items-center gap-2">
                    <Filter size={16} className="text-gray-400" />
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option>All Transactions</option>
                      <option>Earned</option>
                      <option>Spent</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  {(stats.recentTransactions || []).map((transaction, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'earn' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {transaction.type === 'earn' ? (
                              <ArrowUpRight size={20} className="text-green-600" />
                            ) : (
                              <ArrowDownRight size={20} className="text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{transaction.description || 'Point Transaction'}</p>
                            <p className="text-xs text-gray-600">User: {transaction.userId}</p>
                            <p className="text-xs text-gray-600">Type: {transaction.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-medium ${
                            transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'earn' ? '+' : '-'}{transaction.points || transaction.amount || 0} points
                          </p>
                          <p className="text-xs text-gray-600">
                            {new Date(transaction.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'health' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">API Health Monitor</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Server size={16} />
                    <span>Real-time system monitoring</span>
                  </div>
                </div>
                <ApiHealthMonitor />
              </div>
            )}
          </div>
        </div>

        {/* Create User Modal */}
        {showCreateUserModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Create New User</h3>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const userData = {
                  email: formData.get('email'),
                  password: formData.get('password'),
                  name: formData.get('name'),
                  username: formData.get('username'),
                  role: formData.get('role'),
                  points: parseInt(formData.get('points')) || 0,
                  membershipLevel: formData.get('membershipLevel')
                };
                await createUser(userData);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input type="password" name="password" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" name="name" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input type="text" name="username" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select name="role" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                    <input type="number" name="points" defaultValue="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Level</label>
                    <select name="membershipLevel" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option value="Bronze">Bronze</option>
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Diamond">Diamond</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setShowCreateUserModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditUserModal && selectedUser && (
          <div className="fixed inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md border border-teal-200">
              <h3 className="text-lg font-semibold mb-4">Edit User: {selectedUser.username}</h3>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target;
                const submitButton = form.querySelector('button[type="submit"]');
                
                // Prevent double submission
                if (submitButton.disabled || isUpdating || isConfirming || isSubmitting) {
                  console.log('Form submission blocked - already in progress');
                  return;
                }
                
                setIsSubmitting(true);
                submitButton.disabled = true;
                
                const formData = new FormData(form);
                const userData = {
                  name: formData.get('name'),
                  username: formData.get('username'),
                  points: parseInt(formData.get('points')) || 0,
                  membershipLevel: formData.get('membershipLevel'),
                  role: formData.get('role'),
                  notificationSettings: {
                    emailNotifications: formData.get('emailNotifications') === 'on'
                  }
                };
                
                // Check if role is being changed to admin
                const currentRole = selectedUser.role;
                const newRole = userData.role;
                
                if (checkRoleChange(currentRole, newRole, selectedUser)) {
                  // Warning modal will be shown, don't proceed with normal confirmation
                  return;
                }
                
                showConfirmation(
                  () => updateUser(selectedUser.userId || selectedUser.id, userData),
                  `Are you sure you want to update user "${selectedUser.username}"?`
                );
                
                // Re-enable button after a short delay
                setTimeout(() => {
                  submitButton.disabled = false;
                  setIsSubmitting(false);
                }, 1000);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" name="name" defaultValue={selectedUser.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input type="text" name="username" defaultValue={selectedUser.username} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select name="role" defaultValue={selectedUser.role || 'user'} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                    <input type="number" name="points" defaultValue={selectedUser.points || 0} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Membership Level</label>
                    <select name="membershipLevel" defaultValue={selectedUser.membershipLevel || 'Bronze'} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                      <option value="Bronze">Bronze</option>
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Diamond">Diamond</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" name="emailNotifications" defaultChecked={selectedUser.notificationSettings?.emailNotifications} className="mr-2" />
                      <span className="text-sm font-medium text-gray-700">Email Notifications</span>
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6 pt-4">
                  <button type="button" onClick={() => {
                    setShowEditUserModal(false);
                    setIsConfirming(false);
                    setIsSubmitting(false);
                  }} className="px-4 py-2 text-gray-600 hover:text-gray-800">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
              <p className="text-gray-700 mb-6">{confirmMessage}</p>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => {
                    setShowConfirmDialog(false);
                    setConfirmAction(null);
                    setConfirmMessage('');
                    setIsConfirming(false);
                    setIsSubmitting(false);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button 
                  onClick={executeConfirmedAction}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin Role Warning Modal */}
        {showRoleWarningModal && pendingRoleUpdate && (
          <div className="fixed inset-0 backdrop-blur-sm bg-red-500 bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg border-2 border-red-500 p-6 w-full max-w-lg mx-4 shadow-xl">
              <div className="flex items-center gap-3 mb-4 border-b border-red-200 pb-3">
                <AlertCircle size={24} className="text-red-600" />
                <h3 className="text-lg font-semibold text-red-800">⚠️ Admin Role Assignment Warning</h3>
              </div>
              
              <div className="mb-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-red-800 mb-2">🚨 DANGER: Admin Privileges</h4>
                  <p className="text-red-700 text-sm mb-2">
                    You are about to grant <strong>ADMINISTRATOR</strong> privileges to this user. 
                    This action will give them full access to:
                  </p>
                  <ul className="text-red-700 text-sm list-disc list-inside space-y-1">
                    <li>View and modify all user accounts</li>
                    <li>Delete users and data</li>
                    <li>Access admin dashboard</li>
                    <li>Modify system settings</li>
                    <li>View sensitive information</li>
                  </ul>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">👤 User Information</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Username:</span>
                      <p className="text-gray-900">{pendingRoleUpdate.userData.username}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Email:</span>
                      <p className="text-gray-900">{pendingRoleUpdate.userData.email}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">User ID:</span>
                      <p className="text-gray-900 font-mono text-xs">{pendingRoleUpdate.userData.id || pendingRoleUpdate.userData._id?.toString()}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Current Role:</span>
                      <p className="text-gray-900">{pendingRoleUpdate.userData.role || 'user'}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Member Since:</span>
                      <p className="text-gray-900">{new Date(pendingRoleUpdate.userData.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Status:</span>
                      <p className="text-gray-900">{pendingRoleUpdate.userData.isActive ? 'Active' : 'Inactive'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => {
                    setShowRoleWarningModal(false);
                    setPendingRoleUpdate(null);
                    setIsSubmitting(false);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleRoleUpdate(pendingRoleUpdate.userId, pendingRoleUpdate.newRole, pendingRoleUpdate.userData)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  ⚠️ Proceed with Admin Assignment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
