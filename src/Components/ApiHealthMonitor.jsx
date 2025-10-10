import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Activity, Database, Lock, ShoppingCart, Users, Mail, Loader2 } from 'lucide-react';

const ApiHealthMonitor = () => {
  const [services, setServices] = useState([]);
  const [overallStatus, setOverallStatus] = useState('loading');
  const [logs, setLogs] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const endpoints = [
    { name: 'Database', path: '/api/health/database', icon: Database },
    { name: 'Authentication', path: '/api/auth/health', icon: Lock },
    { name: 'Email Service', path: '/api/email/health', icon: Mail },
    { name: 'Cart Service', path: '/api/cart/health', icon: ShoppingCart },
    { name: 'User Service', path: '/api/users/health', icon: Users },
  ];

  const addLog = (level, message, serviceName = 'System') => {
    const newLog = {
      timestamp: new Date().toLocaleTimeString(),
      level,
      message,
      service: serviceName,
    };
    setLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  const checkSingleEndpoint = async (endpoint, index) => {
    const startTime = performance.now();
    try {
      const response = await fetch(`http://localhost:5000${endpoint.path}`);
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);
      const data = await response.json();

      let status = 'healthy';
      let message = data.message || 'Operational';
      let icon = CheckCircle;
      let iconColor = 'text-green-500';
      let bgColor = 'bg-green-50 border-green-200';

      if (!response.ok || data.status === 'error') {
        status = 'error';
        icon = XCircle;
        iconColor = 'text-red-500';
        bgColor = 'bg-red-50 border-red-200';
        message = data.message || `Failed with status ${response.status}`;
        addLog('error', `${endpoint.name}: ${message}`, endpoint.name);
      } else if (data.status === 'warning' || responseTime > 500) {
        status = 'warning';
        icon = AlertTriangle;
        iconColor = 'text-yellow-500';
        bgColor = 'bg-yellow-50 border-yellow-200';
        message = data.message || `Slow response (${responseTime}ms)`;
        addLog('warn', `${endpoint.name}: ${message}`, endpoint.name);
      } else {
        addLog('info', `${endpoint.name}: ${message}`, endpoint.name);
      }

      return {
        ...endpoint,
        status,
        message,
        responseTime,
        icon,
        iconColor,
        bgColor,
        details: data.stats || {},
        checked: true,
      };

    } catch (error) {
      const endTime = performance.now();
      const responseTime = Math.round(endTime - startTime);
      addLog('error', `${endpoint.name}: Network error - ${error.message}`, endpoint.name);
      
      return {
        ...endpoint,
        status: 'error',
        message: `Network error: ${error.message}`,
        responseTime,
        icon: XCircle,
        iconColor: 'text-red-500',
        bgColor: 'bg-red-50 border-red-200',
        details: {},
        checked: true,
      };
    }
  };

  const fetchHealthStatus = async () => {
    setLoading(true);
    setError(null);
    
    // Initialize services with loading state
    const initialServices = endpoints.map(endpoint => ({
      ...endpoint,
      status: 'loading',
      message: 'Checking...',
      responseTime: 0,
      icon: Loader2,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50 border-blue-200',
      details: {},
      checked: false,
    }));
    
    setServices(initialServices);
    addLog('info', 'Starting sequential API health check...');

    let hasError = false;
    let hasWarning = false;
    const newServices = [...initialServices];

    // Check endpoints one by one
    for (let i = 0; i < endpoints.length; i++) {
      try {
        const result = await checkSingleEndpoint(endpoints[i], i);
        newServices[i] = result;
        setServices([...newServices]); // Update UI after each check
        
        if (result.status === 'error') hasError = true;
        if (result.status === 'warning') hasWarning = true;
        
        // Small delay between checks for better UX
        if (i < endpoints.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      } catch (error) {
        addLog('error', `Failed to check ${endpoints[i].name}: ${error.message}`);
        hasError = true;
      }
    }

    setServices(newServices);
    setLastUpdated(new Date());
    setIsInitialized(true);

    if (hasError) {
      setOverallStatus('error');
    } else if (hasWarning) {
      setOverallStatus('warning');
    } else {
      setOverallStatus('healthy');
    }
    
    setLoading(false);
    addLog('info', 'API health check completed.');
  };

  // Initial load - just show the interface without auto-checking
  useEffect(() => {
    const initialServices = endpoints.map(endpoint => ({
      ...endpoint,
      status: 'pending',
      message: 'Click refresh to check',
      responseTime: 0,
      icon: Activity,
      iconColor: 'text-gray-500',
      bgColor: 'bg-gray-50 border-gray-200',
      details: {},
      checked: false,
    }));
    
    setServices(initialServices);
    setOverallStatus('pending');
    addLog('info', 'API Health Monitor ready. Click refresh to start health checks.');
  }, []);

  const getOverallStatusIcon = () => {
    switch (overallStatus) {
      case 'healthy': return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'error': return <XCircle className="h-6 w-6 text-red-500" />;
      case 'loading': return <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />;
      default: return <Activity className="h-6 w-6 text-gray-500" />;
    }
  };

  const getOverallStatusText = () => {
    switch (overallStatus) {
      case 'healthy': return 'All Systems Operational';
      case 'warning': return 'Some Services Have Warnings';
      case 'error': return 'Critical Issues Detected';
      case 'loading': return 'Checking System Status...';
      case 'pending': return 'Ready to Check System Status';
      default: return 'System Status Unknown';
    }
  };

  const getOverallStatusColor = () => {
    switch (overallStatus) {
      case 'healthy': return 'bg-green-100 border-green-300 text-green-800';
      case 'warning': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'error': return 'bg-red-100 border-red-300 text-red-800';
      case 'loading': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'pending': return 'bg-gray-100 border-gray-300 text-gray-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getLogColorClass = (level) => {
    switch (level) {
      case 'error': return 'text-red-600';
      case 'warn': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <Activity size={24} /> API Health Monitor
      </h2>

      {/* Overall Status Card */}
      <div className={`p-4 rounded-lg border ${getOverallStatusColor()} flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          {getOverallStatusIcon()}
          <span className="font-semibold text-lg">{getOverallStatusText()}</span>
        </div>
        <button
          onClick={fetchHealthStatus}
          className="flex items-center gap-2 px-3 py-1 bg-white rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Checking...' : 'Refresh'}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            <span className="font-medium text-red-800">System Error</span>
          </div>
          <p className="text-red-700 mt-1">{error}</p>
        </div>
      )}

      {/* Services Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <div key={service.name} className={`p-4 rounded-lg shadow-sm border-2 ${service.bgColor || 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {React.createElement(service.icon, { 
                  className: `h-5 w-5 ${service.iconColor || 'text-gray-500'} ${service.status === 'loading' ? 'animate-spin' : ''}` 
                })}
                <span className="font-medium text-gray-800">{service.name}</span>
              </div>
              <span className="text-sm text-gray-500">
                {service.status === 'loading' ? '...' : `${service.responseTime}ms`}
              </span>
            </div>
            <p className={`text-sm font-medium ${service.iconColor || 'text-gray-600'}`}>
              {service.message}
            </p>
            {Object.keys(service.details).length > 0 && (
              <div className="mt-2 text-xs text-gray-600">
                {Object.entries(service.details).map(([key, value]) => (
                  <p key={key}><strong>{key}:</strong> {String(value)}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Logs Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Activity Logs</h3>
        <div className="max-h-60 overflow-y-auto text-sm bg-gray-50 p-3 rounded-md">
          {logs.length === 0 && <p className="text-gray-500">No logs yet.</p>}
          {logs.map((log, index) => (
            <p key={index} className={`font-mono ${getLogColorClass(log.level)}`}>
              <span className="text-gray-500">[{log.timestamp}]</span>{' '}
              <strong className="uppercase">{log.level}</strong>{' '}
              <span className="text-gray-700">({log.service}):</span> {log.message}
            </p>
          ))}
        </div>
      </div>

      {/* Instructions */}
      {!isInitialized && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-5 w-5 text-blue-500" />
            <span className="font-medium text-blue-800">Getting Started</span>
          </div>
          <p className="text-blue-700 text-sm">
            Click the "Refresh" button above to start checking the health of all API endpoints. 
            Each service will be checked sequentially for better performance monitoring.
          </p>
        </div>
      )}
    </div>
  );
};

export default ApiHealthMonitor;