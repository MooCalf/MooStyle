// Environment Validation Utility
// Validates required environment variables and provides fallbacks

/**
 * Validates environment variables and provides fallbacks
 * @param {string} key - Environment variable key
 * @param {string} fallback - Fallback value if not found
 * @param {boolean} required - Whether the variable is required
 * @returns {string} The environment variable value or fallback
 */
export const getEnvVar = (key, fallback = '', required = false) => {
  const value = import.meta.env[key] || fallback;
  
  if (required && !value) {
    console.error(`❌ Required environment variable ${key} is not set`);
    throw new Error(`Required environment variable ${key} is not set`);
  }
  
  return value;
};

/**
 * Validates all required environment variables
 * @returns {object} Environment configuration object
 */
export const validateEnvironment = () => {
  const config = {
    // API Configuration
    apiBaseUrl: getEnvVar('VITE_API_BASE_URL', 'http://localhost:5000'),
    
    // Application Configuration
    appName: getEnvVar('VITE_APP_NAME', 'MooStyle'),
    appVersion: getEnvVar('VITE_APP_VERSION', '1.0.0'),
    appDescription: getEnvVar('VITE_APP_DESCRIPTION', 'Asian Fashion & Beauty E-commerce Platform'),
    
    // Development Configuration
    devMode: getEnvVar('VITE_DEV_MODE', 'true') === 'true',
    debugMode: getEnvVar('VITE_DEBUG_MODE', 'false') === 'true',
    
    // Feature Flags
    enableAnalytics: getEnvVar('VITE_ENABLE_ANALYTICS', 'false') === 'true',
    enableErrorReporting: getEnvVar('VITE_ENABLE_ERROR_REPORTING', 'false') === 'true',
    
    // Performance Configuration
    cacheTimeout: parseInt(getEnvVar('VITE_CACHE_TIMEOUT', '300000')), // 5 minutes
    maxRetries: parseInt(getEnvVar('VITE_MAX_RETRIES', '3')),
    
    // Security Configuration
    enableCSP: getEnvVar('VITE_ENABLE_CSP', 'true') === 'true',
    enableHSTS: getEnvVar('VITE_ENABLE_HSTS', 'false') === 'true'
  };
  
  // Log configuration in development
  if (config.devMode) {
    console.log('🔧 Environment Configuration:', {
      apiBaseUrl: config.apiBaseUrl,
      appName: config.appName,
      appVersion: config.appVersion,
      devMode: config.devMode,
      debugMode: config.debugMode
    });
  }
  
  return config;
};

/**
 * Gets the current environment configuration
 * @returns {object} Environment configuration object
 */
export const getEnvironmentConfig = () => {
  try {
    return validateEnvironment();
  } catch (error) {
    console.error('❌ Environment validation failed:', error.message);
    // Return minimal fallback configuration
    return {
      apiBaseUrl: 'http://localhost:5000',
      appName: 'MooStyle',
      appVersion: '1.0.0',
      appDescription: 'Asian Fashion & Beauty E-commerce Platform',
      devMode: true,
      debugMode: false,
      enableAnalytics: false,
      enableErrorReporting: false,
      cacheTimeout: 300000,
      maxRetries: 3,
      enableCSP: true,
      enableHSTS: false
    };
  }
};

// Export the validated configuration
export const envConfig = getEnvironmentConfig();

export default envConfig;
