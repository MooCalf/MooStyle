// Component Modularity Utility
// Provides utilities for making components more modular and reusable

/**
 * Component composition patterns
 */
export const COMPOSITION_PATTERNS = {
  // Higher-order component pattern
  HOC: 'hoc',
  
  // Render props pattern
  RENDER_PROPS: 'render-props',
  
  // Compound component pattern
  COMPOUND: 'compound',
  
  // Hook pattern
  HOOK: 'hook',
  
  // Context pattern
  CONTEXT: 'context'
};

/**
 * Creates a higher-order component
 * @param {React.Component} WrappedComponent - Component to wrap
 * @param {Object} options - HOC options
 * @returns {React.Component} Higher-order component
 */
export const createHOC = (WrappedComponent, options = {}) => {
  const { displayName, ...hocProps } = options;
  
  const HOC = (props) => {
    return <WrappedComponent {...hocProps} {...props} />;
  };
  
  HOC.displayName = displayName || `with${WrappedComponent.displayName || WrappedComponent.name}`;
  
  return HOC;
};

/**
 * Creates a compound component
 * @param {Object} components - Components to compose
 * @returns {Object} Compound component
 */
export const createCompoundComponent = (components) => {
  const CompoundComponent = (props) => {
    return props.children;
  };
  
  // Attach sub-components
  Object.keys(components).forEach(key => {
    CompoundComponent[key] = components[key];
  });
  
  return CompoundComponent;
};

/**
 * Creates a custom hook
 * @param {Function} hookFunction - Hook function
 * @param {string} name - Hook name
 * @returns {Function} Custom hook
 */
export const createCustomHook = (hookFunction, name) => {
  const hook = (...args) => {
    return hookFunction(...args);
  };
  
  hook.displayName = `use${name}`;
  
  return hook;
};

/**
 * Creates a context provider
 * @param {React.Context} context - React context
 * @param {*} defaultValue - Default value
 * @returns {React.Component} Context provider
 */
export const createContextProvider = (context, defaultValue) => {
  const Provider = ({ children, value = defaultValue }) => {
    return (
      <context.Provider value={value}>
        {children}
      </context.Provider>
    );
  };
  
  Provider.displayName = `${context.displayName || 'Context'}Provider`;
  
  return Provider;
};

/**
 * Creates a render props component
 * @param {Function} renderFunction - Render function
 * @param {string} name - Component name
 * @returns {React.Component} Render props component
 */
export const createRenderPropsComponent = (renderFunction, name) => {
  const RenderPropsComponent = (props) => {
    return renderFunction(props);
  };
  
  RenderPropsComponent.displayName = name;
  
  return RenderPropsComponent;
};

/**
 * Component splitting utility
 * @param {React.Component} Component - Component to split
 * @param {Array} splitPoints - Points to split the component
 * @returns {Array} Array of split components
 */
export const splitComponent = (Component, splitPoints = []) => {
  const components = [];
  
  // Split component into smaller parts
  splitPoints.forEach((point, index) => {
    const start = index === 0 ? 0 : splitPoints[index - 1];
    const end = point;
    
    const SplitComponent = (props) => {
      // Extract relevant props for this split
      const relevantProps = Object.keys(props).reduce((acc, key) => {
        if (props[key] !== undefined) {
          acc[key] = props[key];
        }
        return acc;
      }, {});
      
      return <Component {...relevantProps} />;
    };
    
    SplitComponent.displayName = `${Component.displayName || Component.name}Part${index + 1}`;
    
    components.push(SplitComponent);
  });
  
  return components;
};

/**
 * Component composition utility
 * @param {Array} components - Components to compose
 * @param {Object} options - Composition options
 * @returns {React.Component} Composed component
 */
export const composeComponents = (components, options = {}) => {
  const { displayName, ...composeProps } = options;
  
  const ComposedComponent = (props) => {
    return components.reduce((acc, Component) => {
      return <Component {...composeProps} {...props}>{acc}</Component>;
    }, props.children);
  };
  
  ComposedComponent.displayName = displayName || 'ComposedComponent';
  
  return ComposedComponent;
};

/**
 * Component memoization utility
 * @param {React.Component} Component - Component to memoize
 * @param {Function} areEqual - Comparison function
 * @returns {React.Component} Memoized component
 */
export const memoizeComponent = (Component, areEqual) => {
  const MemoizedComponent = React.memo(Component, areEqual);
  
  MemoizedComponent.displayName = `Memoized${Component.displayName || Component.name}`;
  
  return MemoizedComponent;
};

/**
 * Component lazy loading utility
 * @param {Function} importFunction - Function that returns a promise resolving to a component
 * @param {React.Component} fallback - Fallback component
 * @returns {React.Component} Lazy loaded component
 */
export const createLazyComponent = (importFunction, fallback = null) => {
  const LazyComponent = React.lazy(importFunction);
  
  const LazyWrapper = (props) => (
    <React.Suspense fallback={fallback || <div>Loading...</div>}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
  
  LazyWrapper.displayName = `Lazy${LazyComponent.displayName || LazyComponent.name}`;
  
  return LazyWrapper;
};

/**
 * Component testing utility
 * @param {React.Component} Component - Component to test
 * @param {Object} defaultProps - Default props
 * @returns {Object} Testing utilities
 */
export const createComponentTestUtils = (Component, defaultProps = {}) => {
  const render = (props = {}) => {
    const mergedProps = { ...defaultProps, ...props };
    return <Component {...mergedProps} />;
  };
  
  const renderWithProps = (props) => {
    return render(props);
  };
  
  const renderWithChildren = (children) => {
    return render({ children });
  };
  
  return {
    render,
    renderWithProps,
    renderWithChildren
  };
};

/**
 * Component documentation utility
 * @param {React.Component} Component - Component to document
 * @param {Object} documentation - Documentation object
 * @returns {Object} Documented component
 */
export const documentComponent = (Component, documentation) => {
  const DocumentedComponent = Component;
  
  // Attach documentation
  DocumentedComponent.__doc__ = documentation;
  
  return DocumentedComponent;
};

/**
 * Component versioning utility
 * @param {React.Component} Component - Component to version
 * @param {string} version - Version string
 * @returns {React.Component} Versioned component
 */
export const versionComponent = (Component, version) => {
  const VersionedComponent = Component;
  
  // Attach version
  VersionedComponent.__version__ = version;
  
  return VersionedComponent;
};

/**
 * Component registry utility
 * @param {Object} components - Components to register
 * @returns {Object} Component registry
 */
export const createComponentRegistry = (components) => {
  const registry = new Map();
  
  Object.keys(components).forEach(key => {
    registry.set(key, components[key]);
  });
  
  const getComponent = (name) => {
    return registry.get(name);
  };
  
  const registerComponent = (name, component) => {
    registry.set(name, component);
  };
  
  const unregisterComponent = (name) => {
    registry.delete(name);
  };
  
  const listComponents = () => {
    return Array.from(registry.keys());
  };
  
  return {
    getComponent,
    registerComponent,
    unregisterComponent,
    listComponents
  };
};

export default {
  COMPOSITION_PATTERNS,
  createHOC,
  createCompoundComponent,
  createCustomHook,
  createContextProvider,
  createRenderPropsComponent,
  splitComponent,
  composeComponents,
  memoizeComponent,
  createLazyComponent,
  createComponentTestUtils,
  documentComponent,
  versionComponent,
  createComponentRegistry
};
