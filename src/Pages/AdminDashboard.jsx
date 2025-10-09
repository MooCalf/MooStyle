import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationPrimary } from '@/Components/NavigationPrimary';
import { NavigationSecondary } from '@/Components/NavigationSecondary';
import { Metadata } from '@/Components/Metadata.jsx';
import { 
  Users, 
  Trash2, 
  AlertCircle,
  CheckCircle,
  BarChart3,
  Settings,
  LogOut,
  Edit,
  Save,
  X,
  Search,
  Star,
  ShoppingCart,
  Calendar,
  Activity
} from 'lucide-react';
import ApiHealthMonitor from '@/Components/ApiHealthMonitor';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(20); // Fixed at 20 items per page
  const [carts, setCarts] = useState([]);
  const [cartsCurrentPage, setCartsCurrentPage] = useState(1);
  const [cartsTotalPages, setCartsTotalPages] = useState(1);

  useEffect(() => {
    checkAuth();
    fetchDashboardData();
    
    // Fallback timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (loading) {
        console.log('Dashboard loading timeout - forcing loading to false');
        setLoading(false);
      }
    }, 10000); // 10 second timeout
    
    return () => clearTimeout(timeout);
  }, []);

  // Fetch carts when carts tab becomes active
  useEffect(() => {
    if (activeTab === 'carts') {
      fetchCarts();
    }
  }, [activeTab, cartsCurrentPage]);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    console.log('Auth check - Token exists:', !!token);
    console.log('Auth check - User data exists:', !!userData);
    
    if (!token || !userData) {
      console.log('No token or user data, redirecting to login');
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      console.log('Parsed user:', parsedUser);
      console.log('User role:', parsedUser.role);
      
      if (parsedUser.role !== 'admin') {
        console.log('User is not admin, redirecting to home');
        navigate('/');
        return;
      }
      setUser(parsedUser);
      console.log('User set successfully');
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  };

  const fetchCarts = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No token found for cart API calls');
        return;
      }

      console.log('Fetching carts...');
      
      // Fetch carts with pagination
      try {
        const cartsResponse = await fetch(`http://localhost:5000/api/admin/carts?page=${cartsCurrentPage}&limit=${itemsPerPage}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!cartsResponse.ok) {
          throw new Error(`Carts API error: ${cartsResponse.status}`);
        }
        
        const cartsData = await cartsResponse.json();
        console.log('Carts response:', cartsData);
        
        if (cartsData.success) {
          setCarts(cartsData.carts);
          setCartsTotalPages(cartsData.pagination.pages);
        } else {
          console.error('Carts API error:', cartsData.message);
          setCarts([]);
          setCartsTotalPages(1);
        }
      } catch (cartsError) {
        console.error('Carts fetch error:', cartsError);
        setCarts([]);
        setCartsTotalPages(1);
        console.log('Using fallback carts due to network error');
      }

    } catch (error) {
      console.error('Carts fetch error:', error);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No token found for API calls');
        setError('Authentication token not found');
        setLoading(false);
        return;
      }

      console.log('Fetching dashboard data...');
      
      // Fetch stats
      try {
        const statsResponse = await fetch('http://localhost:5000/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!statsResponse.ok) {
          throw new Error(`Stats API error: ${statsResponse.status}`);
        }
        
        const statsData = await statsResponse.json();
        console.log('Stats response:', statsData);
        
        if (statsData.success) {
          setStats(statsData.stats);
        } else {
          console.error('Stats API error:', statsData.message);
          // Set fallback stats instead of error
          setStats({
            totalUsers: 0,
            activeUsers: 0,
            expiredUsers: 0,
            usersExpiringSoon: 0
          });
        }
      } catch (statsError) {
        console.error('Stats fetch error:', statsError);
        // Set fallback stats for network errors
        setStats({
          totalUsers: 0,
          activeUsers: 0,
          expiredUsers: 0,
          usersExpiringSoon: 0
        });
        console.log('Using fallback stats due to network error');
      }

      // Fetch users
      try {
        const usersResponse = await fetch(`http://localhost:5000/api/admin/users?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!usersResponse.ok) {
          throw new Error(`Users API error: ${usersResponse.status}`);
        }
        
        const usersData = await usersResponse.json();
        console.log('Users response:', usersData);
        
        if (usersData.success) {
          setUsers(usersData.users);
          setTotalPages(usersData.pagination.pages);
        } else {
          console.error('Users API error:', usersData.message);
          // Set fallback empty users array instead of error
          setUsers([]);
          setTotalPages(1);
        }
      } catch (usersError) {
        console.error('Users fetch error:', usersError);
        // Set fallback empty users for network errors
        setUsers([]);
        setTotalPages(1);
        console.log('Using fallback users due to network error');
      }

    } catch (error) {
      console.error('Dashboard fetch error:', error);
      setError(`Failed to fetch dashboard data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
  };

  const handleSaveUser = async () => {
    try {
      console.log('Saving user:', editingUser);
      console.log('User ID:', editingUser.id);
      
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editingUser)
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        setSuccess('User updated successfully!');
        setEditingUser(null);
        fetchDashboardData(); // Refresh data
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error saving user:', error);
      setError('Failed to update user');
    }
  };

  const handleDeleteUser = async (userId, username) => {
    if (!confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('User deleted successfully!');
        fetchDashboardData(); // Refresh data
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to delete user');
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchDashboardData();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchDashboardData();
  };

  const handleCartsPageChange = (page) => {
    setCartsCurrentPage(page);
    // fetchCarts will be called by useEffect
  };

  const handleCleanupExpiredUsers = async () => {
    if (!confirm('Are you sure you want to delete all expired user accounts? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/cleanup/expired-users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`Successfully deleted ${data.deletedCount} expired user accounts!`);
        fetchDashboardData(); // Refresh data
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to cleanup expired users');
    }
  };

  // Show loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">Debug: Loading state active</p>
          <p className="text-xs text-gray-400 mt-1">If this takes too long, check if the backend server is running</p>
        </div>
      </div>
    );
  }

  // Show error screen if there's a critical error
  if (error && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Dashboard Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-y-2">
            <button
              onClick={() => {
                setError('');
                setLoading(true);
                checkAuth();
                fetchDashboardData();
              }}
              className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Metadata 
        pageTitle="Admin Dashboard - MooStyle"
        pageDescription="MooStyle admin dashboard for managing content and users"
      />
      <div className="min-h-screen bg-gray-50">
        <NavigationPrimary />
        <NavigationSecondary />
        
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.username}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>

          {/* Alerts */}
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

          {/* Tabs */}
          <div className="mb-8">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'users', label: 'Users', icon: Users },
                { id: 'carts', label: 'Carts', icon: ShoppingCart },
                { id: 'api-health', label: 'API Health', icon: Activity },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Total Users</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats?.totalUsers || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Active Users</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats?.activeUsers || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Expired Users</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats?.expiredUsers || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Expiring Soon</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats?.usersExpiringSoon || 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={handleCleanupExpiredUsers}
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Trash2 className="h-6 w-6 text-red-600" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Cleanup Users</p>
                      <p className="text-sm text-gray-500">Remove expired accounts</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('users')}
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Users className="h-6 w-6 text-blue-600" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">View Users</p>
                      <p className="text-sm text-gray-500">Manage user accounts</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}



          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      onClick={handleSearch}
                      className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
                    >
                      <Search size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Membership
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {editingUser?.id === user.id ? (
                                <input
                                  type="text"
                                  value={editingUser.username}
                                  onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                              ) : (
                                user.username
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {editingUser?.id === user.id ? (
                                <input
                                  type="email"
                                  value={editingUser.email}
                                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                                />
                              ) : (
                                user.email
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Star size={16} className="text-yellow-500 mr-1" />
                              <span className="text-sm font-medium text-gray-900">
                                {editingUser?.id === user.id ? (
                                  <input
                                    type="number"
                                    value={editingUser.points}
                                    onChange={(e) => setEditingUser({...editingUser, points: parseInt(e.target.value) || 0})}
                                    className="px-2 py-1 border border-gray-300 rounded text-sm w-20"
                                    min="0"
                                  />
                                ) : (
                                  user.points || 0
                                )}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.membershipLevel === 'Diamond' ? 'bg-blue-100 text-blue-800' :
                              user.membershipLevel === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                              user.membershipLevel === 'Silver' ? 'bg-gray-100 text-gray-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {editingUser?.id === user.id ? (
                                <select
                                  value={editingUser.membershipLevel}
                                  onChange={(e) => setEditingUser({...editingUser, membershipLevel: e.target.value})}
                                  className="text-xs bg-transparent border-none outline-none"
                                >
                                  <option value="Bronze">Bronze</option>
                                  <option value="Silver">Silver</option>
                                  <option value="Gold">Gold</option>
                                  <option value="Diamond">Diamond</option>
                                </select>
                              ) : (
                                user.membershipLevel || 'Bronze'
                              )}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {editingUser?.id === user.id ? (
                                <select
                                  value={editingUser.isActive ? 'Active' : 'Inactive'}
                                  onChange={(e) => setEditingUser({...editingUser, isActive: e.target.value === 'Active'})}
                                  className="text-xs bg-transparent border-none outline-none"
                                >
                                  <option value="Active">Active</option>
                                  <option value="Inactive">Inactive</option>
                                </select>
                              ) : (
                                user.isActive ? 'Active' : 'Inactive'
                              )}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              {editingUser?.id === user.id ? (
                                <>
                                  <button
                                    onClick={handleSaveUser}
                                    className="text-green-600 hover:text-green-900"
                                    title="Save changes"
                                  >
                                    <Save size={16} />
                                  </button>
                                  <button
                                    onClick={() => setEditingUser(null)}
                                    className="text-gray-600 hover:text-gray-900"
                                    title="Cancel"
                                  >
                                    <X size={16} />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() => handleEditUser(user)}
                                    className="text-teal-600 hover:text-teal-900"
                                    title="Edit user"
                                  >
                                    <Edit size={16} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUser(user.id, user.username)}
                                    className="text-red-600 hover:text-red-900"
                                    title="Delete user"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        ← Previous
                      </button>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next →
                      </button>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
                          <span className="font-medium">{Math.min(currentPage * itemsPerPage, users.length)}</span> of{' '}
                          <span className="font-medium">{users.length}</span> users
                        </p>
                        <p className="text-xs text-gray-500">
                          Page <span className="font-medium">{currentPage}</span> of{' '}
                          <span className="font-medium">{totalPages}</span>
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                          >
                            ← Previous
                          </button>
                          <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            {currentPage} / {totalPages}
                          </span>
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                          >
                            Next →
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Carts Tab */}
          {activeTab === 'carts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">User Carts</h2>
                <div className="text-sm text-gray-600">
                  Showing {carts.length} carts (Page {cartsCurrentPage} of {cartsTotalPages})
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Active Shopping Carts</h3>
                  <p className="text-sm text-gray-600 mt-1">View and manage user shopping carts</p>
                </div>
                
                <div className="p-6">
                  {carts.length > 0 ? (
                    <div className="space-y-4">
                      {carts.map((cart) => (
                        <div key={cart._id} className="bg-gradient-to-r from-teal-50 to-white border border-teal-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                                <ShoppingCart size={20} className="text-teal-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{cart.user?.username || 'Unknown User'}</h4>
                                <p className="text-sm text-gray-600">Cart ID: {cart._id}</p>
                                <p className="text-xs text-teal-600">User ID: {cart.user?._id || 'N/A'}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">Items: {cart.items?.length || 0}</div>
                              <div className="text-xs text-gray-500">
                                Last Updated: {cart.lastUpdated ? new Date(cart.lastUpdated).toLocaleDateString() : 'N/A'}
                              </div>
                              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                                cart.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {cart.isActive ? 'Active' : 'Inactive'}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Carts Found</h3>
                      <p className="text-gray-600">No shopping carts found for the current page.</p>
                    </div>
                  )}
                  
                  {/* Carts Pagination */}
                  {cartsTotalPages > 1 && (
                    <div className="mt-6 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                      <div className="flex-1 flex justify-between sm:hidden">
                        <button
                          onClick={() => handleCartsPageChange(cartsCurrentPage - 1)}
                          disabled={cartsCurrentPage === 1}
                          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        >
                          ← Previous
                        </button>
                        <button
                          onClick={() => handleCartsPageChange(cartsCurrentPage + 1)}
                          disabled={cartsCurrentPage === cartsTotalPages}
                          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        >
                          Next →
                        </button>
                      </div>
                      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{((cartsCurrentPage - 1) * itemsPerPage) + 1}</span> to{' '}
                            <span className="font-medium">{Math.min(cartsCurrentPage * itemsPerPage, carts.length)}</span> of{' '}
                            <span className="font-medium">{carts.length}</span> carts
                          </p>
                          <p className="text-xs text-gray-500">
                            Page <span className="font-medium">{cartsCurrentPage}</span> of{' '}
                            <span className="font-medium">{cartsTotalPages}</span>
                          </p>
                        </div>
                        <div>
                          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <button
                              onClick={() => handleCartsPageChange(cartsCurrentPage - 1)}
                              disabled={cartsCurrentPage === 1}
                              className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                            >
                              ← Previous
                            </button>
                            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                              {cartsCurrentPage} / {cartsTotalPages}
                            </span>
                            <button
                              onClick={() => handleCartsPageChange(cartsCurrentPage + 1)}
                              disabled={cartsCurrentPage === cartsTotalPages}
                              className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                            >
                              Next →
                            </button>
                          </nav>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <AlertCircle size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1">Cart Information</h4>
                        <p className="text-sm text-blue-800">
                          Carts are automatically created when users add items to their shopping cart. 
                          Each page shows up to {itemsPerPage} carts for optimal performance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Retention Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Account Expiry Period</p>
                      <p className="text-sm text-gray-600">Users accounts expire after 4 weeks of inactivity</p>
                    </div>
                    <span className="text-sm text-gray-500">4 weeks</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Email Notification Period</p>
                      <p className="text-sm text-gray-600">Users receive notifications 5 days before expiry</p>
                    </div>
                    <span className="text-sm text-gray-500">5 days</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Auto-renewal on Login</p>
                      <p className="text-sm text-gray-600">Logging in automatically renews account for another 4 weeks</p>
                    </div>
                    <span className="text-sm text-green-600">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API Health Monitor Tab */}
          {activeTab === 'api-health' && (
            <div className="space-y-6">
              <ApiHealthMonitor />
            </div>
          )}

        </div>

      </div>
    </>
  );
};
