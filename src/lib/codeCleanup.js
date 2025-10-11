// Code Cleanup Utility
// Provides utilities for removing unused imports and dead code

/**
 * Analyzes a file for unused imports
 * @param {string} content - File content
 * @param {string} filePath - File path
 * @returns {Array} Array of unused imports
 */
export const findUnusedImports = (content, filePath) => {
  const unusedImports = [];
  
  // Extract all import statements
  const importRegex = /import\s+(?:{[^}]+}|\w+|\*\s+as\s+\w+)\s+from\s+['"]([^'"]+)['"]/g;
  const imports = [];
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    imports.push({
      fullMatch: match[0],
      source: match[1],
      start: match.index,
      end: match.index + match[0].length
    });
  }
  
  // Check if each import is used in the file
  imports.forEach(importInfo => {
    const { fullMatch, source } = importInfo;
    
    // Extract imported names
    const importNames = extractImportNames(fullMatch);
    
    // Check if any of the imported names are used
    const isUsed = importNames.some(name => {
      if (name === '*') return false; // Wildcard imports are hard to track
      
      // Create regex to find usage of the imported name
      const usageRegex = new RegExp(`\\b${name}\\b`, 'g');
      const beforeImport = content.substring(0, importInfo.start);
      const afterImport = content.substring(importInfo.end);
      const contentWithoutImport = beforeImport + afterImport;
      
      return usageRegex.test(contentWithoutImport);
    });
    
    if (!isUsed) {
      unusedImports.push({
        import: fullMatch,
        source,
        names: importNames
      });
    }
  });
  
  return unusedImports;
};

/**
 * Extracts imported names from an import statement
 * @param {string} importStatement - Import statement
 * @returns {Array} Array of imported names
 */
const extractImportNames = (importStatement) => {
  const names = [];
  
  // Handle default imports
  const defaultMatch = importStatement.match(/import\s+(\w+)\s+from/);
  if (defaultMatch) {
    names.push(defaultMatch[1]);
  }
  
  // Handle named imports
  const namedMatch = importStatement.match(/import\s+{([^}]+)}\s+from/);
  if (namedMatch) {
    const namedImports = namedMatch[1].split(',').map(imp => {
      // Handle "name as alias" syntax
      const aliasMatch = imp.match(/(\w+)\s+as\s+(\w+)/);
      if (aliasMatch) {
        return aliasMatch[2]; // Return the alias
      }
      return imp.trim();
    });
    names.push(...namedImports);
  }
  
  // Handle wildcard imports
  const wildcardMatch = importStatement.match(/import\s+\*\s+as\s+(\w+)\s+from/);
  if (wildcardMatch) {
    names.push(wildcardMatch[1]);
  }
  
  return names;
};

/**
 * Removes unused imports from file content
 * @param {string} content - File content
 * @param {string} filePath - File path
 * @returns {string} Cleaned file content
 */
export const removeUnusedImports = (content, filePath) => {
  const unusedImports = findUnusedImports(content, filePath);
  
  let cleanedContent = content;
  
  // Remove unused imports (in reverse order to maintain indices)
  unusedImports.reverse().forEach(unusedImport => {
    const importRegex = new RegExp(
      unusedImport.import.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
      'g'
    );
    cleanedContent = cleanedContent.replace(importRegex, '');
  });
  
  // Clean up empty lines
  cleanedContent = cleanedContent.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return cleanedContent;
};

/**
 * Finds dead code (unused functions, variables, etc.)
 * @param {string} content - File content
 * @param {string} filePath - File path
 * @returns {Array} Array of dead code items
 */
export const findDeadCode = (content, filePath) => {
  const deadCode = [];
  
  // Find function declarations
  const functionRegex = /(?:export\s+)?(?:async\s+)?function\s+(\w+)/g;
  const functions = [];
  let match;
  
  while ((match = functionRegex.exec(content)) !== null) {
    functions.push({
      name: match[1],
      start: match.index,
      end: match.index + match[0].length
    });
  }
  
  // Check if functions are used
  functions.forEach(func => {
    const usageRegex = new RegExp(`\\b${func.name}\\b`, 'g');
    const beforeFunction = content.substring(0, func.start);
    const afterFunction = content.substring(func.end);
    const contentWithoutFunction = beforeFunction + afterFunction;
    
    const usageCount = (contentWithoutFunction.match(usageRegex) || []).length;
    
    if (usageCount === 0) {
      deadCode.push({
        type: 'function',
        name: func.name,
        start: func.start,
        end: func.end
      });
    }
  });
  
  // Find variable declarations
  const variableRegex = /(?:export\s+)?(?:const|let|var)\s+(\w+)/g;
  const variables = [];
  
  while ((match = variableRegex.exec(content)) !== null) {
    variables.push({
      name: match[1],
      start: match.index,
      end: match.index + match[0].length
    });
  }
  
  // Check if variables are used
  variables.forEach(variable => {
    const usageRegex = new RegExp(`\\b${variable.name}\\b`, 'g');
    const beforeVariable = content.substring(0, variable.start);
    const afterVariable = content.substring(variable.end);
    const contentWithoutVariable = beforeVariable + afterVariable;
    
    const usageCount = (contentWithoutVariable.match(usageRegex) || []).length;
    
    if (usageCount === 0) {
      deadCode.push({
        type: 'variable',
        name: variable.name,
        start: variable.start,
        end: variable.end
      });
    }
  });
  
  return deadCode;
};

/**
 * Removes dead code from file content
 * @param {string} content - File content
 * @param {string} filePath - File path
 * @returns {string} Cleaned file content
 */
export const removeDeadCode = (content, filePath) => {
  const deadCode = findDeadCode(content, filePath);
  
  let cleanedContent = content;
  
  // Remove dead code (in reverse order to maintain indices)
  deadCode.reverse().forEach(item => {
    const lines = cleanedContent.split('\n');
    const startLine = cleanedContent.substring(0, item.start).split('\n').length - 1;
    const endLine = cleanedContent.substring(0, item.end).split('\n').length - 1;
    
    // Remove the lines containing the dead code
    lines.splice(startLine, endLine - startLine + 1);
    cleanedContent = lines.join('\n');
  });
  
  // Clean up empty lines
  cleanedContent = cleanedContent.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return cleanedContent;
};

/**
 * Analyzes a file for code quality issues
 * @param {string} content - File content
 * @param {string} filePath - File path
 * @returns {Object} Analysis results
 */
export const analyzeCodeQuality = (content, filePath) => {
  const unusedImports = findUnusedImports(content, filePath);
  const deadCode = findDeadCode(content, filePath);
  
  // Count lines of code
  const lines = content.split('\n');
  const codeLines = lines.filter(line => 
    line.trim() && 
    !line.trim().startsWith('//') && 
    !line.trim().startsWith('/*') &&
    !line.trim().startsWith('*')
  ).length;
  
  // Count comments
  const commentLines = lines.filter(line => 
    line.trim().startsWith('//') || 
    line.trim().startsWith('/*') ||
    line.trim().startsWith('*')
  ).length;
  
  // Count empty lines
  const emptyLines = lines.filter(line => !line.trim()).length;
  
  return {
    filePath,
    totalLines: lines.length,
    codeLines,
    commentLines,
    emptyLines,
    unusedImports: unusedImports.length,
    deadCode: deadCode.length,
    issues: [
      ...unusedImports.map(imp => ({ type: 'unused_import', details: imp })),
      ...deadCode.map(code => ({ type: 'dead_code', details: code }))
    ]
  };
};

/**
 * Cleans up a file by removing unused imports and dead code
 * @param {string} content - File content
 * @param {string} filePath - File path
 * @returns {string} Cleaned file content
 */
export const cleanupFile = (content, filePath) => {
  let cleanedContent = content;
  
  // Remove unused imports
  cleanedContent = removeUnusedImports(cleanedContent, filePath);
  
  // Remove dead code
  cleanedContent = removeDeadCode(cleanedContent, filePath);
  
  return cleanedContent;
};

export default {
  findUnusedImports,
  removeUnusedImports,
  findDeadCode,
  removeDeadCode,
  analyzeCodeQuality,
  cleanupFile
};
