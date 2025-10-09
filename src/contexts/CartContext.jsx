import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    console.log('Checking authentication - token exists:', !!token);
    return !!token;
  };

  // Get auth headers for API calls
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    console.log('Getting auth headers - token:', token ? 'exists' : 'missing');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // Load cart from backend or localStorage
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated()) {
        // Load from backend
        try {
          const response = await fetch('http://localhost:5000/api/cart', {
            headers: getAuthHeaders()
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setCartItems(data.cart.items || []);
              return;
            }
          }
        } catch (error) {
          console.error('Failed to load cart from backend:', error);
        }
      }
      
      // Fallback to localStorage
      const savedCart = localStorage.getItem('moostyle-cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          const cartTimestamp = parsedCart.timestamp;
          const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
          
          if (cartTimestamp && cartTimestamp < oneWeekAgo) {
            localStorage.removeItem('moostyle-cart');
            setCartItems([]);
          } else {
            setCartItems(parsedCart.items || []);
          }
        } catch (error) {
          console.error('Failed to parse saved cart:', error);
          localStorage.removeItem('moostyle-cart');
        }
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage only (backend sync is handled in individual functions)
  useEffect(() => {
    const saveCart = async () => {
      // Save to localStorage for offline support
      const cartData = {
        items: cartItems,
        timestamp: Date.now()
      };
      localStorage.setItem('moostyle-cart', JSON.stringify(cartData));
    };

    if (cartItems.length > 0) {
      saveCart();
    }
  }, [cartItems]);

  const addToCart = async (product) => {
    try {
      setIsLoading(true);
      console.log('addToCart called with product:', product);
      console.log('User authenticated:', isAuthenticated());
      
      // Sync to backend first if authenticated
      if (isAuthenticated()) {
        try {
          console.log('Adding to backend cart:', product);
          const response = await fetch('http://localhost:5000/api/cart/add', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
              product: product,
              quantity: 1
            })
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Backend add to cart failed:', errorData);
            throw new Error('Failed to add item to backend cart');
          }
          
          const data = await response.json();
          console.log('Backend add to cart success:', data);
          
          // Update local state with backend response
          if (data.success && data.cart) {
            console.log('Backend cart response items:', data.cart.items);
            setCartItems(data.cart.items || []);
            showToast(`Added ${product.name} to cart`, 'success');
            return true;
          }
        } catch (error) {
          console.error('Failed to sync add to cart:', error);
          showToast('Failed to add item to cart', 'error');
          return false;
        }
      } else {
        // Not authenticated - use local storage only
        console.log('User not authenticated, using localStorage only');
        const existingItem = cartItems.find(item => item.product.id === product.id);
        
        if (existingItem) {
          // Update quantity
          const newItems = cartItems.map(item => 
            item.product.id === product.id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          setCartItems(newItems);
          showToast(`Updated quantity for ${product.name}`, 'success');
        } else {
          // Add new item
          const newItem = {
            product: product,
            quantity: 1,
            addedAt: new Date().toISOString()
          };
          setCartItems(prev => [...prev, newItem]);
          showToast(`Added ${product.name} to cart`, 'success');
        }
      }
      
      return true;
    } catch (error) {
      console.error('Failed to add to cart:', error);
      showToast('Failed to add item to cart', 'error');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setIsLoading(true);
      console.log('CartContext: Removing productId:', productId);
      
      // Sync to backend first if authenticated
      if (isAuthenticated()) {
        try {
          console.log('User is authenticated, removing from backend...');
          const response = await fetch(`http://localhost:5000/api/cart/remove/${productId}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
          });
          
          console.log('Backend response status:', response.status);
          
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Backend removal failed:', errorData);
            throw new Error('Failed to remove item from backend');
          }
          
          const data = await response.json();
          console.log('Backend removal success:', data);
          
          // Update local state with backend response
          if (data.success && data.cart) {
            setCartItems(data.cart.items || []);
            showToast('Item removed from cart', 'success');
            return;
          }
        } catch (error) {
          console.error('Failed to sync remove from cart:', error);
          showToast('Failed to remove item from cart', 'error');
          return;
        }
      } else {
        // Not authenticated - use local storage only
        const newCartItems = cartItems.filter(item => item.product.id !== productId);
        setCartItems(newCartItems);
        showToast('Item removed from cart', 'success');
      }
      
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      showToast('Failed to remove item from cart', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      setIsLoading(true);
      
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }
      
      // Sync to backend first if authenticated
      if (isAuthenticated()) {
        try {
          const response = await fetch(`http://localhost:5000/api/cart/update/${productId}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ quantity })
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Backend quantity update failed:', errorData);
            throw new Error('Failed to update quantity in backend');
          }
          
          const data = await response.json();
          console.log('Backend quantity update success:', data);
          
          // Update local state with backend response
          if (data.success && data.cart) {
            setCartItems(data.cart.items || []);
            showToast('Quantity updated', 'success');
            return;
          }
        } catch (error) {
          console.error('Failed to sync quantity update:', error);
          showToast('Failed to update quantity', 'error');
          return;
        }
      } else {
        // Not authenticated - use local storage only
        const newItems = cartItems.map(item => 
          item.product.id === productId 
            ? { ...item, quantity }
            : item
        );
        setCartItems(newItems);
        showToast('Quantity updated', 'success');
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
      showToast('Failed to update quantity', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setIsLoading(true);
      
      setCartItems([]);
      localStorage.removeItem('moostyle-cart');
      showToast('Cart cleared', 'success');
      
      // Sync to backend if authenticated
      if (isAuthenticated()) {
        try {
          await fetch('http://localhost:5000/api/cart/clear', {
            method: 'DELETE',
            headers: getAuthHeaders()
          });
        } catch (error) {
          console.error('Failed to sync clear cart:', error);
        }
      }
    } catch (error) {
      console.error('Failed to clear cart:', error);
      showToast('Failed to clear cart', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear cart on logout (without showing toast)
  const clearCartOnLogout = () => {
    setCartItems([]);
    localStorage.removeItem('moostyle-cart');
  };

  const downloadCart = async () => {
    try {
      setIsLoading(true);
      
      if (!isAuthenticated()) {
        showToast('Please log in to download mods', 'error');
        return false;
      }

      const response = await fetch('http://localhost:5000/api/cart/download', {
        method: 'POST',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.success) {
          // Clear local cart
          setCartItems([]);
          localStorage.removeItem('moostyle-cart');
          
          // Update user data with new points
          const userData = JSON.parse(localStorage.getItem('user'));
          if (userData) {
            userData.points = data.totalPoints;
            userData.membershipLevel = data.membershipLevel;
            localStorage.setItem('user', JSON.stringify(userData));
            
            // Dispatch custom event to notify other components
            window.dispatchEvent(new CustomEvent('userDataUpdated'));
          }
          
          showToast(`Download initiated! You earned ${data.pointsAwarded} points!`, 'success');
          
          // Create mock download (replace with real download logic)
          const link = document.createElement('a');
          link.href = '#'; // Replace with actual download URL
          link.download = `moostyle-mods-${Date.now()}.zip`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          return true;
        } else {
          showToast(data.message || 'Download failed', 'error');
          return false;
        }
      } else {
        const errorData = await response.json();
        showToast(errorData.message || 'Download failed', 'error');
        return false;
      }
    } catch (error) {
      console.error('Download cart error:', error);
      showToast('Failed to download mods', 'error');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.product.id === productId);
  };

  const getCartItem = (productId) => {
    return cartItems.find(item => item.product.id === productId);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    clearCartOnLogout,
    downloadCart,
    getCartCount,
    getCartTotal,
    isInCart,
    getCartItem,
    isLoading,
    toast
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.message}
        </div>
      )}
    </CartContext.Provider>
  );
};