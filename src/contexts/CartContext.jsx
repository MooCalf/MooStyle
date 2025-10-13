import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => 
        (item.productData?.id || item.product?.id || item.id) === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            (item.productData?.id || item.product?.id || item.id) === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { 
          productData: action.payload, // Wrap product in productData for compatibility
          quantity: 1,
          addedAt: new Date().toISOString()
        }]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => 
          (item.productData?.id || item.product?.id || item.id) !== action.payload
        )
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          (item.productData?.id || item.product?.id || item.id) === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'SET_CART':
      return {
        ...state,
        items: action.payload || []
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
  loading: false,
  error: null
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'SET_CART', payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Load cart from database when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCartFromDatabase();
    }
  }, [isAuthenticated, user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  // Save cart to database whenever it changes (if user is authenticated)
  useEffect(() => {
    if (isAuthenticated && user && state.items.length > 0) {
      saveCartToDatabase();
    }
  }, [state.items, isAuthenticated, user]);

  // Load cart from database
  const loadCartFromDatabase = async () => {
    try {
      // Use the MongoDB ObjectId (_id) instead of the custom ID
      const response = await fetch(`/api/cart?userId=${user._id || user.id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.cart && data.cart.items && data.cart.items.length > 0) {
          dispatch({ type: 'SET_CART', payload: data.cart.items });
        }
      }
    } catch (error) {
      console.error('Error loading cart from database:', error);
    }
  };

  // Save cart to database
  const saveCartToDatabase = async () => {
    try {
      const response = await fetch('/api/cart/sync', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user._id || user.id,
          items: state.items
        })
      });

      if (!response.ok) {
        console.error('Failed to sync cart to database');
      }
    } catch (error) {
      console.error('Error syncing cart to database:', error);
    }
  };

  // Cart actions
  const addToCart = async (product) => {
    // Block non-authenticated users from adding to cart
    if (!isAuthenticated || !user) {
      throw new Error('Please sign up or sign in to add items to your cart');
    }
    
    // Check if user is banned
    if (isAuthenticated && user && !user.isActive) {
      throw new Error('Your account has been suspended. You cannot add items to cart.');
    }
    
    dispatch({ type: 'ADD_TO_CART', payload: product });
    
    // Also add to database if user is authenticated
    if (isAuthenticated && user) {
      try {
        await fetch('/api/cart/add', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: user._id || user.id,
            item: {
              productId: product.id,
              quantity: 1,
              addedAt: new Date().toISOString()
            }
          })
        });
      } catch (error) {
        console.error('Error adding item to database cart:', error);
      }
    }
    
    return true; // Return success for compatibility
  };

  const removeFromCart = async (productId) => {
    // Check if user is banned
    if (isAuthenticated && user && !user.isActive) {
      throw new Error('Your account has been suspended. You cannot modify your cart.');
    }
    
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    
    // Also remove from database if user is authenticated
    if (isAuthenticated && user) {
      try {
        await fetch('/api/cart/remove', {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: user._id || user.id,
            productId: productId
          })
        });
      } catch (error) {
        console.error('Error removing item from database cart:', error);
      }
    }
  };

  const updateQuantity = (productId, quantity) => {
    // Check if user is banned
    if (isAuthenticated && user && !user.isActive) {
      throw new Error('Your account has been suspended. You cannot modify your cart.');
    }
    
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  // Calculate totals
  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => {
      const price = item.productData?.price || item.product?.price || item.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getItemCount = (productId) => {
    const item = state.items.find(item => 
      (item.productData?.id || item.product?.id || item.id) === productId
    );
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return state.items.some(item => 
      (item.productData?.id || item.product?.id || item.id) === productId
    );
  };

  const value = {
    // State
    items: state.items,
    cartItems: state.items, // Alias for compatibility
    loading: state.loading,
    isLoading: state.loading, // Alias for compatibility
    error: state.error,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setLoading,
    setError,
    
    // Computed values
    getTotalItems,
    getTotalPrice,
    getItemCount,
    getCartCount: getTotalItems, // Alias for compatibility
    isInCart,
    
    // Download functionality (placeholder)
    downloadCart: async () => {
      console.log('Download cart functionality not implemented yet');
      return false;
    }
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
