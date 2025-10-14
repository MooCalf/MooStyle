import React, { useState } from 'react';
import { authClient, authHelpers } from '@/lib/betterAuthClient';
import { apiConfig } from '@/lib/apiConfig';

const AuthDebugger = () => {
  const [debugResults, setDebugResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const runDebugTests = async () => {
    setLoading(true);
    setDebugResults(null);

    try {
      const results = {
        timestamp: new Date().toISOString(),
        tests: {}
      };

      // Test 1: Check BetterAuth session
      console.log('🔍 Testing BetterAuth session...');
      const session = authClient.getSession();
      results.tests.betterAuthSession = {
        session,
        hasUser: !!session?.user,
        userId: session?.user?.id,
        userEmail: session?.user?.email
      };

      // Test 2: Check cookie headers
      console.log('🔍 Testing cookie headers...');
      const cookieHeaders = authHelpers.getCookieHeaders();
      results.tests.cookieHeaders = {
        headers: cookieHeaders,
        hasCookie: !!cookieHeaders.Cookie,
        cookieValue: cookieHeaders.Cookie
      };

      // Test 3: Test authenticated request
      console.log('🔍 Testing authenticated request...');
      try {
        const response = await authHelpers.makeAuthenticatedRequest('/api/debug/cookies');
        const data = await response.json();
        results.tests.authenticatedRequest = {
          success: true,
          status: response.status,
          data
        };
      } catch (error) {
        results.tests.authenticatedRequest = {
          success: false,
          error: error.message
        };
      }

      // Test 4: Test regular fetch with credentials
      console.log('🔍 Testing regular fetch with credentials...');
      try {
        const response = await fetch('/api/debug/cookies', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        results.tests.regularFetch = {
          success: true,
          status: response.status,
          data
        };
      } catch (error) {
        results.tests.regularFetch = {
          success: false,
          error: error.message
        };
      }

      setDebugResults(results);
    } catch (error) {
      setDebugResults({
        error: error.message,
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-debugger" style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>🔧 Authentication Debugger</h3>
      <p>This tool helps diagnose authentication issues by testing various cookie and session scenarios.</p>
      
      <button 
        onClick={runDebugTests} 
        disabled={loading}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: loading ? '#ccc' : '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Running Tests...' : 'Run Debug Tests'}
      </button>

      {debugResults && (
        <div style={{ marginTop: '20px' }}>
          <h4>Debug Results:</h4>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '15px', 
            borderRadius: '4px',
            overflow: 'auto',
            maxHeight: '400px'
          }}>
            {JSON.stringify(debugResults, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AuthDebugger;
