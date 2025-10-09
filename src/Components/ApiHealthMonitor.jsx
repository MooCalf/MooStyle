import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Activity, Database, Lock, ShoppingCart, Users, Mail, Key, Shield } from 'lucide-react';

const ApiHealthMonitor = () => {
  const [services, setServices] = useState([]);
  const [overallStatus, setOverallStatus] = useState('loading');
  const [logs, setLogs] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);

  const endpoints = [
    { name: 'Database', path: '/api/health/database', icon: Database },
    { name: 'Authentication', path: '/api/auth/health', icon: Lock },
    { name: 'Password Reset', path: '/api/auth/password-reset-health', icon: Key },
    { name: 'Email Service', path: '/api/email/health', icon: Mail },
    { name: 'Cart Service', path: '/api/cart/health', icon: ShoppingCart },
    { name: 'User Service', path: '/api/users/health', icon: Users },
    { name: 'Security', path: '/api/auth/security-health', icon: Shield },
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

  const fetchHealthStatus = async () => {
    setLoading(true);
    const newServices = [];
    let hasError = false;
    let hasWarning = false;

    addLog('info', 'Starting API health check...');

    for (const endpoint of endpoints) {
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
          hasError = true;
          message = data.message || `Failed with status ${response.status}`;
          addLog('error', `${endpoint.name}: ${message}`, endpoint.name);
        } else if (data.status === 'warning' || responseTime > 500) {
          status = 'warning';
          icon = AlertTriangle;
          iconColor = 'text-yellow-500';
          bgColor = 'bg-yellow-50 border-yellow-200';
          hasWarning = true;
          message = data.message || `Slow response (${responseTime}ms)`;
          addLog('warn', `${endpoint.name}: ${message}`, endpoint.name);
        } else {
          addLog('info', `${endpoint.name}: ${message}`, endpoint.name);
        }

        newServices.push({
          ...endpoint,
          status,
          message,
          responseTime,
          icon,
          iconColor,
          bgColor,
          details: data.stats || {},
        });

      } catch (error) {
        const endTime = performance.now();
        const responseTime = Math.round(endTime - startTime);
        hasError = true;
        newServices.push({
          ...endpoint,
          status: 'error',
          message: `Network error: ${error.message}`,
          responseTime,
          icon: XCircle,
          iconColor: 'text-red-500',
          bgColor: 'bg-red-50 border-red-200',
          details: {},
        });
        addLog('error', `${endpoint.name}: Network error - ${error.message}`, endpoint.name);
      }
    }

    setServices(newServices);
    setLastUpdated(new Date());

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

  useEffect(() => {
    fetchHealthStatus();
    const interval = setInterval(fetchHealthStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getOverallStatusIcon = () => {
    switch (overallStatus) {
      case 'healthy': return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'error': return <XCircle className="h-6 w-6 text-red-500" />;
      default: return <Activity className="h-6 w-6 text-gray-500" />;
    }
  };

  const getOverallStatusText = () => {
    switch (overallStatus) {
      case 'healthy': return 'All Systems Operational';
      case 'warning': return 'Some Services Have Warnings';
      case 'error': return 'Critical Issues Detected';
      default: return 'Checking System Status...';
    }
  };

  const getOverallStatusColor = () => {
    switch (overallStatus) {
      case 'healthy': return 'bg-green-100 border-green-300 text-green-800';
      case 'warning': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'error': return 'bg-red-100 border-red-300 text-red-800';
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
          className="flex items-center gap-2 px-3 py-1 bg-white rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm"
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Services Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service.name} className={`p-4 rounded-lg shadow-sm border-2 ${service.bgColor || 'bg-white border-gray-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {React.createElement(service.icon, { className: `h-5 w-5 ${service.iconColor || 'text-gray-500'}` })}
                <span className="font-medium text-gray-800">{service.name}</span>
              </div>
              <span className="text-sm text-gray-500">{service.responseTime}ms</span>
            </div>
            <p className={`text-sm font-medium ${service.iconColor || 'text-gray-600'}`}>{service.message}</p>
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
    </div>
  );
};

export default ApiHealthMonitor;