// Error Handling Utility
// Provides standardized error handling patterns across the application

import { createErrorResponse, extractErrorMessage } from './apiResponse.js';

/**
 * Error types for consistent error handling
 */
export const ERROR_TYPES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
};

/**
 * Error severity levels
 */
export const ERROR_SEVERITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

/**
 * Standardized error class
 */
export class AppError extends Error {
  constructor(message, type = ERROR_TYPES.UNKNOWN_ERROR, severity = ERROR_SEVERITY.MEDIUM, details = null) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.severity = severity;
    this.details = details;
    this.timestamp = new Date().toISOString();
  }
}

/**
 * Error handler for API responses
 * @param {Response} response - Fetch response object
 * @param {string} context - Context where error occurred
 * @returns {Promise<AppError>} Standardized error
 */
export const handleApiError = async (response, context = 'API call') => {
  let errorData;
  
  try {
    errorData = await response.json();
  } catch {
    errorData = { message: 'Failed to parse error response' };
  }

  const message = errorData.message || `Error in ${context}`;
  
  switch (response.status) {
    case 400:
      return new AppError(message, ERROR_TYPES.VALIDATION_ERROR, ERROR_SEVERITY.MEDIUM, errorData);
    case 401:
      return new AppError(message, ERROR_TYPES.AUTHENTICATION_ERROR, ERROR_SEVERITY.HIGH, errorData);
    case 403:
      return new AppError(message, ERROR_TYPES.AUTHORIZATION_ERROR, ERROR_SEVERITY.HIGH, errorData);
    case 404:
      return new AppError(message, ERROR_TYPES.NOT_FOUND_ERROR, ERROR_SEVERITY.MEDIUM, errorData);
    case 500:
    case 502:
    case 503:
    case 504:
      return new AppError(message, ERROR_TYPES.SERVER_ERROR, ERROR_SEVERITY.CRITICAL, errorData);
    default:
      return new AppError(message, ERROR_TYPES.UNKNOWN_ERROR, ERROR_SEVERITY.MEDIUM, errorData);
  }
};

/**
 * Error handler for network errors
 * @param {Error} error - Network error
 * @param {string} context - Context where error occurred
 * @returns {AppError} Standardized error
 */
export const handleNetworkError = (error, context = 'Network request') => {
  const message = error.message || `Network error in ${context}`;
  return new AppError(message, ERROR_TYPES.NETWORK_ERROR, ERROR_SEVERITY.HIGH, {
    originalError: error.message,
    context
  });
};

/**
 * Error handler for validation errors
 * @param {Array} errors - Validation errors array
 * @param {string} context - Context where error occurred
 * @returns {AppError} Standardized error
 */
export const handleValidationError = (errors, context = 'Validation') => {
  const message = `Validation failed in ${context}`;
  return new AppError(message, ERROR_TYPES.VALIDATION_ERROR, ERROR_SEVERITY.MEDIUM, {
    validationErrors: errors,
    context
  });
};

/**
 * Error handler for authentication errors
 * @param {string} message - Error message
 * @param {string} context - Context where error occurred
 * @returns {AppError} Standardized error
 */
export const handleAuthError = (message = 'Authentication failed', context = 'Authentication') => {
  return new AppError(message, ERROR_TYPES.AUTHENTICATION_ERROR, ERROR_SEVERITY.HIGH, { context });
};

/**
 * Error handler for authorization errors
 * @param {string} message - Error message
 * @param {string} context - Context where error occurred
 * @returns {AppError} Standardized error
 */
export const handleAuthorizationError = (message = 'Access denied', context = 'Authorization') => {
  return new AppError(message, ERROR_TYPES.AUTHORIZATION_ERROR, ERROR_SEVERITY.HIGH, { context });
};

/**
 * Error handler for not found errors
 * @param {string} resource - Resource that was not found
 * @param {string} context - Context where error occurred
 * @returns {AppError} Standardized error
 */
export const handleNotFoundError = (resource = 'Resource', context = 'Lookup') => {
  const message = `${resource} not found`;
  return new AppError(message, ERROR_TYPES.NOT_FOUND_ERROR, ERROR_SEVERITY.MEDIUM, { resource, context });
};

/**
 * Error handler for server errors
 * @param {string} message - Error message
 * @param {string} context - Context where error occurred
 * @returns {AppError} Standardized error
 */
export const handleServerError = (message = 'Server error occurred', context = 'Server') => {
  return new AppError(message, ERROR_TYPES.SERVER_ERROR, ERROR_SEVERITY.CRITICAL, { context });
};

/**
 * Generic error handler that converts any error to AppError
 * @param {Error|AppError} error - Error to handle
 * @param {string} context - Context where error occurred
 * @returns {AppError} Standardized error
 */
export const handleGenericError = (error, context = 'Unknown') => {
  if (error instanceof AppError) {
    return error;
  }
  
  const message = error.message || 'An unexpected error occurred';
  return new AppError(message, ERROR_TYPES.UNKNOWN_ERROR, ERROR_SEVERITY.MEDIUM, {
    originalError: error.message,
    stack: error.stack,
    context
  });
};

/**
 * Error logging utility
 * @param {AppError} error - Error to log
 * @param {string} component - Component where error occurred
 */
export const logError = (error, component = 'Unknown') => {
  const logData = {
    message: error.message,
    type: error.type,
    severity: error.severity,
    component,
    timestamp: error.timestamp,
    details: error.details
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${error.severity.toUpperCase()}] ${component}:`, logData);
  }

  // Log to error reporting service in production
  if (process.env.NODE_ENV === 'production') {
    // TODO: Implement error reporting service
    // errorReportingService.log(logData);
  }
};

/**
 * Error display utility for user-facing messages
 * @param {AppError} error - Error to display
 * @returns {string} User-friendly error message
 */
export const getUserFriendlyMessage = (error) => {
  switch (error.type) {
    case ERROR_TYPES.NETWORK_ERROR:
      return 'Please check your internet connection and try again.';
    case ERROR_TYPES.VALIDATION_ERROR:
      return 'Please check your input and try again.';
    case ERROR_TYPES.AUTHENTICATION_ERROR:
      return 'Please log in to continue.';
    case ERROR_TYPES.AUTHORIZATION_ERROR:
      return 'You do not have permission to perform this action.';
    case ERROR_TYPES.NOT_FOUND_ERROR:
      return 'The requested resource was not found.';
    case ERROR_TYPES.SERVER_ERROR:
      return 'Something went wrong on our end. Please try again later.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

/**
 * Error recovery suggestions
 * @param {AppError} error - Error to get recovery suggestions for
 * @returns {Array<string>} Array of recovery suggestions
 */
export const getRecoverySuggestions = (error) => {
  const suggestions = [];
  
  switch (error.type) {
    case ERROR_TYPES.NETWORK_ERROR:
      suggestions.push('Check your internet connection');
      suggestions.push('Try refreshing the page');
      suggestions.push('Check if the service is available');
      break;
    case ERROR_TYPES.VALIDATION_ERROR:
      suggestions.push('Check your input for errors');
      suggestions.push('Make sure all required fields are filled');
      suggestions.push('Try using a different format');
      break;
    case ERROR_TYPES.AUTHENTICATION_ERROR:
      suggestions.push('Log in to your account');
      suggestions.push('Check your credentials');
      suggestions.push('Try resetting your password');
      break;
    case ERROR_TYPES.AUTHORIZATION_ERROR:
      suggestions.push('Contact your administrator');
      suggestions.push('Check your account permissions');
      break;
    case ERROR_TYPES.NOT_FOUND_ERROR:
      suggestions.push('Check the URL');
      suggestions.push('Navigate back to the main page');
      suggestions.push('Search for what you were looking for');
      break;
    case ERROR_TYPES.SERVER_ERROR:
      suggestions.push('Try again in a few minutes');
      suggestions.push('Contact support if the problem persists');
      break;
    default:
      suggestions.push('Try refreshing the page');
      suggestions.push('Contact support if the problem persists');
  }
  
  return suggestions;
};

export default {
  ERROR_TYPES,
  ERROR_SEVERITY,
  AppError,
  handleApiError,
  handleNetworkError,
  handleValidationError,
  handleAuthError,
  handleAuthorizationError,
  handleNotFoundError,
  handleServerError,
  handleGenericError,
  logError,
  getUserFriendlyMessage,
  getRecoverySuggestions
};
