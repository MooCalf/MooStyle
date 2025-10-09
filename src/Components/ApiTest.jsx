import React, { useState, useEffect } from 'react';

const ApiTest = () => {
  const [status, setStatus] = useState('Testing...');
  const [details, setDetails] = useState('');

  useEffect(() => {
    testApiConnection();
  }, []);

  const testApiConnection = async () => {
    try {
      setStatus('Testing API connection...');
      
      // Test health endpoint
      const response = await fetch('/api/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStatus('✅ API Connection Successful');
        setDetails(`Response: ${JSON.stringify(data)}`);
      } else {
        setStatus('❌ API Connection Failed');
        setDetails(`Status: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setStatus('❌ Network Error');
      setDetails(`Error: ${error.message}`);
    }
  };

  const testLogin = async () => {
    try {
      setStatus('Testing login...');
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'moocalf@admin.com',
          password: 'MooCalf101?'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setStatus('✅ Login Test Successful');
        setDetails(`Response: ${JSON.stringify(data)}`);
      } else {
        const errorData = await response.json();
        setStatus('❌ Login Test Failed');
        setDetails(`Status: ${response.status} - ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      setStatus('❌ Login Network Error');
      setDetails(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">Status: {status}</h2>
        <p className="text-sm text-gray-600">{details}</p>
      </div>

      <div className="space-x-4">
        <button
          onClick={testApiConnection}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Test Health Endpoint
        </button>
        
        <button
          onClick={testLogin}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
          Test Login
        </button>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800">Debug Information:</h3>
        <ul className="text-sm text-yellow-700 mt-2">
          <li>• Frontend URL: {window.location.origin}</li>
          <li>• API Base URL: /api</li>
          <li>• Expected Backend: http://localhost:5000</li>
          <li>• User Agent: {navigator.userAgent}</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiTest;
