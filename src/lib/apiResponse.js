// API Response Standardization Utility
// Provides consistent API response formats across the application

/**
 * Standard API response format
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Whether the request was successful
 * @property {string} message - Human-readable message
 * @property {*} data - Response data (optional)
 * @property {string} error - Error message (optional)
 * @property {string} timestamp - ISO timestamp
 * @property {string} requestId - Unique request identifier (optional)
 */

/**
 * Creates a standardized success response
 * @param {*} data - Response data
 * @param {string} message - Success message
 * @param {string} requestId - Optional request ID
 * @returns {ApiResponse} Standardized success response
 */
export const createSuccessResponse = (data = null, message = 'Success', requestId = null) => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
    ...(requestId && { requestId })
  };
};

/**
 * Creates a standardized error response
 * @param {string} message - Error message
 * @param {string} error - Technical error details
 * @param {number} statusCode - HTTP status code
 * @param {string} requestId - Optional request ID
 * @returns {ApiResponse} Standardized error response
 */
export const createErrorResponse = (message = 'An error occurred', error = null, statusCode = 500, requestId = null) => {
  return {
    success: false,
    message,
    error: error || message,
    statusCode,
    timestamp: new Date().toISOString(),
    ...(requestId && { requestId })
  };
};

/**
 * Creates a standardized validation error response
 * @param {Array} errors - Validation errors array
 * @param {string} requestId - Optional request ID
 * @returns {ApiResponse} Standardized validation error response
 */
export const createValidationErrorResponse = (errors = [], requestId = null) => {
  return {
    success: false,
    message: 'Validation failed',
    error: 'Validation failed',
    errors,
    statusCode: 400,
    timestamp: new Date().toISOString(),
    ...(requestId && { requestId })
  };
};

/**
 * Creates a standardized pagination response
 * @param {Array} data - Response data array
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items
 * @param {string} message - Success message
 * @param {string} requestId - Optional request ID
 * @returns {ApiResponse} Standardized paginated response
 */
export const createPaginatedResponse = (data = [], page = 1, limit = 20, total = 0, message = 'Success', requestId = null) => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    success: true,
    message,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    },
    timestamp: new Date().toISOString(),
    ...(requestId && { requestId })
  };
};

/**
 * Creates a standardized health check response
 * @param {Object} services - Service status object
 * @param {string} requestId - Optional request ID
 * @returns {ApiResponse} Standardized health check response
 */
export const createHealthResponse = (services = {}, requestId = null) => {
  const allHealthy = Object.values(services).every(service => service.status === 'healthy');
  
  return {
    success: allHealthy,
    message: allHealthy ? 'All services healthy' : 'Some services unhealthy',
    data: {
      status: allHealthy ? 'healthy' : 'unhealthy',
      services,
      uptime: process.uptime ? process.uptime() : 0,
      timestamp: new Date().toISOString()
    },
    timestamp: new Date().toISOString(),
    ...(requestId && { requestId })
  };
};

/**
 * Validates if a response follows the standard format
 * @param {*} response - Response to validate
 * @returns {boolean} Whether the response is valid
 */
export const isValidApiResponse = (response) => {
  return (
    response &&
    typeof response === 'object' &&
    typeof response.success === 'boolean' &&
    typeof response.message === 'string' &&
    typeof response.timestamp === 'string'
  );
};

/**
 * Extracts error message from API response
 * @param {ApiResponse} response - API response
 * @returns {string} Error message
 */
export const extractErrorMessage = (response) => {
  if (!response) return 'Unknown error';
  
  if (response.message) return response.message;
  if (response.error) return response.error;
  
  return 'An unexpected error occurred';
};

/**
 * Extracts data from API response
 * @param {ApiResponse} response - API response
 * @returns {*} Response data
 */
export const extractResponseData = (response) => {
  if (!response || !response.success) return null;
  
  return response.data || null;
};

export default {
  createSuccessResponse,
  createErrorResponse,
  createValidationErrorResponse,
  createPaginatedResponse,
  createHealthResponse,
  isValidApiResponse,
  extractErrorMessage,
  extractResponseData
};
