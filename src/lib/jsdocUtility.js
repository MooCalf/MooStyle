// JSDoc Utility
// Provides utilities for generating and managing JSDoc comments

/**
 * JSDoc template for different types of functions
 */
export const JSDOC_TEMPLATES = {
  FUNCTION: `/**
 * {description}
 * @param {{type}} {paramName} - {paramDescription}
 * @returns {{type}} {returnDescription}
 */`,
  
  ASYNC_FUNCTION: `/**
 * {description}
 * @param {{type}} {paramName} - {paramDescription}
 * @returns {Promise<{type}>} {returnDescription}
 */`,
  
  COMPONENT: `/**
 * {description}
 * @param {{Object}} props - Component props
 * @param {{type}} props.{propName} - {propDescription}
 * @returns {JSX.Element} {returnDescription}
 */`,
  
  HOOK: `/**
 * {description}
 * @param {{type}} {paramName} - {paramDescription}
 * @returns {{type}} {returnDescription}
 */`,
  
  CLASS: `/**
 * {description}
 * @class {className}
 */`,
  
  METHOD: `/**
 * {description}
 * @param {{type}} {paramName} - {paramDescription}
 * @returns {{type}} {returnDescription}
 */`,
  
  CONSTANT: `/**
 * {description}
 * @constant {{type}} {constantName}
 */`,
  
  TYPE: `/**
 * {description}
 * @typedef {{Object}} {typeName}
 * @property {{type}} {propertyName} - {propertyDescription}
 */`
};

/**
 * Generates JSDoc comment for a function
 * @param {string} description - Function description
 * @param {Array} params - Array of parameter objects
 * @param {string} returnType - Return type
 * @param {string} returnDescription - Return description
 * @param {boolean} isAsync - Whether the function is async
 * @returns {string} JSDoc comment
 */
export const generateFunctionJSDoc = (description, params = [], returnType = 'void', returnDescription = '', isAsync = false) => {
  const template = isAsync ? JSDOC_TEMPLATES.ASYNC_FUNCTION : JSDOC_TEMPLATES.FUNCTION;
  
  let jsdoc = template
    .replace('{description}', description)
    .replace('{returnType}', returnType)
    .replace('{returnDescription}', returnDescription);
  
  // Add parameter documentation
  if (params.length > 0) {
    const paramDocs = params.map(param => 
      ` * @param {${param.type}} ${param.name} - ${param.description}`
    ).join('\n');
    
    jsdoc = jsdoc.replace(' * @param {type} {paramName} - {paramDescription}', paramDocs);
  } else {
    jsdoc = jsdoc.replace(' * @param {type} {paramName} - {paramDescription}', '');
  }
  
  return jsdoc;
};

/**
 * Generates JSDoc comment for a React component
 * @param {string} description - Component description
 * @param {Array} props - Array of prop objects
 * @returns {string} JSDoc comment
 */
export const generateComponentJSDoc = (description, props = []) => {
  let jsdoc = JSDOC_TEMPLATES.COMPONENT
    .replace('{description}', description)
    .replace('{returnDescription}', 'React component');
  
  // Add prop documentation
  if (props.length > 0) {
    const propDocs = props.map(prop => 
      ` * @param {${prop.type}} props.${prop.name} - ${prop.description}`
    ).join('\n');
    
    jsdoc = jsdoc.replace(' * @param {type} props.{propName} - {propDescription}', propDocs);
  } else {
    jsdoc = jsdoc.replace(' * @param {type} props.{propName} - {propDescription}', '');
  }
  
  return jsdoc;
};

/**
 * Generates JSDoc comment for a custom hook
 * @param {string} description - Hook description
 * @param {Array} params - Array of parameter objects
 * @param {string} returnType - Return type
 * @param {string} returnDescription - Return description
 * @returns {string} JSDoc comment
 */
export const generateHookJSDoc = (description, params = [], returnType = 'void', returnDescription = '') => {
  let jsdoc = JSDOC_TEMPLATES.HOOK
    .replace('{description}', description)
    .replace('{returnType}', returnType)
    .replace('{returnDescription}', returnDescription);
  
  // Add parameter documentation
  if (params.length > 0) {
    const paramDocs = params.map(param => 
      ` * @param {${param.type}} ${param.name} - ${param.description}`
    ).join('\n');
    
    jsdoc = jsdoc.replace(' * @param {type} {paramName} - {paramDescription}', paramDocs);
  } else {
    jsdoc = jsdoc.replace(' * @param {type} {paramName} - {paramDescription}', '');
  }
  
  return jsdoc;
};

/**
 * Generates JSDoc comment for a class
 * @param {string} description - Class description
 * @param {string} className - Class name
 * @returns {string} JSDoc comment
 */
export const generateClassJSDoc = (description, className) => {
  return JSDOC_TEMPLATES.CLASS
    .replace('{description}', description)
    .replace('{className}', className);
};

/**
 * Generates JSDoc comment for a constant
 * @param {string} description - Constant description
 * @param {string} constantName - Constant name
 * @param {string} type - Constant type
 * @returns {string} JSDoc comment
 */
export const generateConstantJSDoc = (description, constantName, type = 'any') => {
  return JSDOC_TEMPLATES.CONSTANT
    .replace('{description}', description)
    .replace('{constantName}', constantName)
    .replace('{type}', type);
};

/**
 * Generates JSDoc comment for a type definition
 * @param {string} description - Type description
 * @param {string} typeName - Type name
 * @param {Array} properties - Array of property objects
 * @returns {string} JSDoc comment
 */
export const generateTypeJSDoc = (description, typeName, properties = []) => {
  let jsdoc = JSDOC_TEMPLATES.TYPE
    .replace('{description}', description)
    .replace('{typeName}', typeName);
  
  // Add property documentation
  if (properties.length > 0) {
    const propertyDocs = properties.map(prop => 
      ` * @property {${prop.type}} ${prop.name} - ${prop.description}`
    ).join('\n');
    
    jsdoc = jsdoc.replace(' * @property {type} {propertyName} - {propertyDescription}', propertyDocs);
  } else {
    jsdoc = jsdoc.replace(' * @property {type} {propertyName} - {propertyDescription}', '');
  }
  
  return jsdoc;
};

/**
 * Analyzes code for missing JSDoc comments
 * @param {string} content - Code content
 * @param {string} filePath - File path
 * @returns {Array} Array of missing JSDoc items
 */
export const analyzeMissingJSDoc = (content, filePath) => {
  const missing = [];
  
  // Check for functions without JSDoc
  const functionRegex = /(?:export\s+)?(?:async\s+)?function\s+(\w+)/g;
  let match;
  
  while ((match = functionRegex.exec(content)) !== null) {
    const name = match[1];
    const beforeFunction = content.substring(0, match.index);
    const lines = beforeFunction.split('\n');
    const lastLine = lines[lines.length - 1].trim();
    
    if (!lastLine.startsWith('/**')) {
      missing.push({
        type: 'function',
        name,
        line: lines.length,
        suggestion: generateFunctionJSDoc(`Description for ${name}`)
      });
    }
  }
  
  // Check for components without JSDoc
  const componentRegex = /export\s+(?:default\s+)?(?:function\s+(\w+)|const\s+(\w+)\s*=)/g;
  while ((match = componentRegex.exec(content)) !== null) {
    const name = match[1] || match[2];
    const beforeComponent = content.substring(0, match.index);
    const lines = beforeComponent.split('\n');
    const lastLine = lines[lines.length - 1].trim();
    
    if (!lastLine.startsWith('/**')) {
      missing.push({
        type: 'component',
        name,
        line: lines.length,
        suggestion: generateComponentJSDoc(`Description for ${name}`)
      });
    }
  }
  
  // Check for constants without JSDoc
  const constantRegex = /(?:export\s+)?const\s+([A-Z][A-Z0-9_]*)/g;
  while ((match = constantRegex.exec(content)) !== null) {
    const name = match[1];
    const beforeConstant = content.substring(0, match.index);
    const lines = beforeComponent.split('\n');
    const lastLine = lines[lines.length - 1].trim();
    
    if (!lastLine.startsWith('/**')) {
      missing.push({
        type: 'constant',
        name,
        line: lines.length,
        suggestion: generateConstantJSDoc(`Description for ${name}`, name)
      });
    }
  }
  
  return missing;
};

/**
 * Adds JSDoc comments to code
 * @param {string} content - Code content
 * @param {string} filePath - File path
 * @returns {string} Code with JSDoc comments
 */
export const addJSDocComments = (content, filePath) => {
  const missing = analyzeMissingJSDoc(content, filePath);
  
  let updatedContent = content;
  
  // Add JSDoc comments (in reverse order to maintain indices)
  missing.reverse().forEach(item => {
    const lines = updatedContent.split('\n');
    const insertIndex = item.line - 1;
    
    lines.splice(insertIndex, 0, item.suggestion);
    updatedContent = lines.join('\n');
  });
  
  return updatedContent;
};

/**
 * Common JSDoc patterns for different types of functions
 */
export const COMMON_PATTERNS = {
  // API functions
  'fetchUser': generateFunctionJSDoc('Fetches user data from API', [
    { name: 'userId', type: 'string', description: 'User ID' }
  ], 'Promise<User>', 'User data'),
  
  'updateCart': generateFunctionJSDoc('Updates cart with new item', [
    { name: 'item', type: 'CartItem', description: 'Item to add to cart' }
  ], 'Promise<void>', 'Updated cart'),
  
  // Utility functions
  'formatPrice': generateFunctionJSDoc('Formats price for display', [
    { name: 'price', type: 'number', description: 'Price to format' }
  ], 'string', 'Formatted price string'),
  
  'validateEmail': generateFunctionJSDoc('Validates email format', [
    { name: 'email', type: 'string', description: 'Email to validate' }
  ], 'boolean', 'Whether email is valid'),
  
  // React components
  'ProductCard': generateComponentJSDoc('Displays product information', [
    { name: 'product', type: 'Product', description: 'Product data' },
    { name: 'onAddToCart', type: 'function', description: 'Add to cart handler' }
  ]),
  
  'UserProfile': generateComponentJSDoc('Displays user profile information', [
    { name: 'user', type: 'User', description: 'User data' },
    { name: 'onEdit', type: 'function', description: 'Edit handler' }
  ])
};

export default {
  JSDOC_TEMPLATES,
  generateFunctionJSDoc,
  generateComponentJSDoc,
  generateHookJSDoc,
  generateClassJSDoc,
  generateConstantJSDoc,
  generateTypeJSDoc,
  analyzeMissingJSDoc,
  addJSDocComments,
  COMMON_PATTERNS
};
