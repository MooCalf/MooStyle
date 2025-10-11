// Naming Convention Utility
// Provides utilities for consistent naming across the application

/**
 * Naming conventions for different types of identifiers
 */
export const NAMING_CONVENTIONS = {
  // React components: PascalCase
  COMPONENT: 'PascalCase',
  
  // Functions and variables: camelCase
  FUNCTION: 'camelCase',
  VARIABLE: 'camelCase',
  
  // Constants: SCREAMING_SNAKE_CASE
  CONSTANT: 'SCREAMING_SNAKE_CASE',
  
  // CSS classes: kebab-case
  CSS_CLASS: 'kebab-case',
  
  // File names: kebab-case
  FILE_NAME: 'kebab-case',
  
  // API endpoints: kebab-case
  API_ENDPOINT: 'kebab-case',
  
  // Database fields: snake_case
  DATABASE_FIELD: 'snake_case'
};

/**
 * Converts string to PascalCase
 * @param {string} str - String to convert
 * @returns {string} PascalCase string
 */
export const toPascalCase = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toUpperCase() : word.toLowerCase();
    })
    .replace(/\s+/g, '');
};

/**
 * Converts string to camelCase
 * @param {string} str - String to convert
 * @returns {string} camelCase string
 */
export const toCamelCase = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
};

/**
 * Converts string to kebab-case
 * @param {string} str - String to convert
 * @returns {string} kebab-case string
 */
export const toKebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

/**
 * Converts string to snake_case
 * @param {string} str - String to convert
 * @returns {string} snake_case string
 */
export const toSnakeCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
};

/**
 * Converts string to SCREAMING_SNAKE_CASE
 * @param {string} str - String to convert
 * @returns {string} SCREAMING_SNAKE_CASE string
 */
export const toScreamingSnakeCase = (str) => {
  return toSnakeCase(str).toUpperCase();
};

/**
 * Validates naming convention
 * @param {string} name - Name to validate
 * @param {string} convention - Naming convention to check against
 * @returns {boolean} Whether the name follows the convention
 */
export const validateNaming = (name, convention) => {
  switch (convention) {
    case NAMING_CONVENTIONS.COMPONENT:
      return /^[A-Z][a-zA-Z0-9]*$/.test(name);
    case NAMING_CONVENTIONS.FUNCTION:
    case NAMING_CONVENTIONS.VARIABLE:
      return /^[a-z][a-zA-Z0-9]*$/.test(name);
    case NAMING_CONVENTIONS.CONSTANT:
      return /^[A-Z][A-Z0-9_]*$/.test(name);
    case NAMING_CONVENTIONS.CSS_CLASS:
    case NAMING_CONVENTIONS.FILE_NAME:
    case NAMING_CONVENTIONS.API_ENDPOINT:
      return /^[a-z][a-z0-9-]*$/.test(name);
    case NAMING_CONVENTIONS.DATABASE_FIELD:
      return /^[a-z][a-z0-9_]*$/.test(name);
    default:
      return true;
  }
};

/**
 * Suggests corrections for naming convention violations
 * @param {string} name - Name to correct
 * @param {string} convention - Target naming convention
 * @returns {string} Corrected name
 */
export const suggestCorrection = (name, convention) => {
  switch (convention) {
    case NAMING_CONVENTIONS.COMPONENT:
      return toPascalCase(name);
    case NAMING_CONVENTIONS.FUNCTION:
    case NAMING_CONVENTIONS.VARIABLE:
      return toCamelCase(name);
    case NAMING_CONVENTIONS.CONSTANT:
      return toScreamingSnakeCase(name);
    case NAMING_CONVENTIONS.CSS_CLASS:
    case NAMING_CONVENTIONS.FILE_NAME:
    case NAMING_CONVENTIONS.API_ENDPOINT:
      return toKebabCase(name);
    case NAMING_CONVENTIONS.DATABASE_FIELD:
      return toSnakeCase(name);
    default:
      return name;
  }
};

/**
 * Common naming patterns and their corrections
 */
export const COMMON_PATTERNS = {
  // Component naming
  'cartItem': 'CartItem',
  'productCard': 'ProductCard',
  'userProfile': 'UserProfile',
  'adminDashboard': 'AdminDashboard',
  
  // Function naming
  'GetUserData': 'getUserData',
  'UpdateCart': 'updateCart',
  'DeleteItem': 'deleteItem',
  'CreateUser': 'createUser',
  
  // Constant naming
  'API_BASE_URL': 'API_BASE_URL',
  'MAX_RETRIES': 'MAX_RETRIES',
  'DEFAULT_TIMEOUT': 'DEFAULT_TIMEOUT',
  
  // CSS class naming
  'cartItem': 'cart-item',
  'productCard': 'product-card',
  'userProfile': 'user-profile',
  'adminDashboard': 'admin-dashboard',
  
  // API endpoint naming
  'getUser': 'get-user',
  'updateCart': 'update-cart',
  'deleteItem': 'delete-item',
  'createUser': 'create-user'
};

/**
 * Analyzes code for naming convention violations
 * @param {string} content - Code content
 * @param {string} filePath - File path
 * @returns {Array} Array of naming violations
 */
export const analyzeNaming = (content, filePath) => {
  const violations = [];
  
  // Check component names (exported functions starting with capital letter)
  const componentRegex = /export\s+(?:default\s+)?(?:function\s+(\w+)|const\s+(\w+)\s*=)/g;
  let match;
  
  while ((match = componentRegex.exec(content)) !== null) {
    const name = match[1] || match[2];
    if (!validateNaming(name, NAMING_CONVENTIONS.COMPONENT)) {
      violations.push({
        type: 'component',
        name,
        line: content.substring(0, match.index).split('\n').length,
        suggestion: suggestCorrection(name, NAMING_CONVENTIONS.COMPONENT)
      });
    }
  }
  
  // Check function names
  const functionRegex = /(?:export\s+)?(?:async\s+)?function\s+(\w+)/g;
  while ((match = functionRegex.exec(content)) !== null) {
    const name = match[1];
    if (!validateNaming(name, NAMING_CONVENTIONS.FUNCTION)) {
      violations.push({
        type: 'function',
        name,
        line: content.substring(0, match.index).split('\n').length,
        suggestion: suggestCorrection(name, NAMING_CONVENTIONS.FUNCTION)
      });
    }
  }
  
  // Check variable names
  const variableRegex = /(?:export\s+)?(?:const|let|var)\s+(\w+)/g;
  while ((match = variableRegex.exec(content)) !== null) {
    const name = match[1];
    if (!validateNaming(name, NAMING_CONVENTIONS.VARIABLE)) {
      violations.push({
        type: 'variable',
        name,
        line: content.substring(0, match.index).split('\n').length,
        suggestion: suggestCorrection(name, NAMING_CONVENTIONS.VARIABLE)
      });
    }
  }
  
  return violations;
};

/**
 * Fixes naming convention violations in code
 * @param {string} content - Code content
 * @param {string} filePath - File path
 * @returns {string} Fixed code content
 */
export const fixNaming = (content, filePath) => {
  const violations = analyzeNaming(content, filePath);
  
  let fixedContent = content;
  
  // Fix violations (in reverse order to maintain indices)
  violations.reverse().forEach(violation => {
    const { name, suggestion } = violation;
    
    // Replace the name with the suggestion
    const regex = new RegExp(`\\b${name}\\b`, 'g');
    fixedContent = fixedContent.replace(regex, suggestion);
  });
  
  return fixedContent;
};

export default {
  NAMING_CONVENTIONS,
  toPascalCase,
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  toScreamingSnakeCase,
  validateNaming,
  suggestCorrection,
  COMMON_PATTERNS,
  analyzeNaming,
  fixNaming
};
