import React from 'react';
import { Download, ShoppingBag, ArrowLeft, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

/**
 * Cart Summary Component
 * Displays cart summary and download controls
 */
export const CartSummary = ({ 
  cartItems, 
  onBulkDownload, 
  onClearCart, 
  onContinueShopping,
  downloading,
  isLoading,
  error,
  downloadSuccess 
}) => {
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const productData = item.productData || item.product;
      return total + (productData.price || 0) * item.quantity;
    }, 0);
  };

  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <ShoppingBag className="w-5 h-5 mr-2" />
          Cart Summary
        </h2>
        <span className="text-sm text-gray-500">
          {cartCount} {cartCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      {/* Success Display */}
      {downloadSuccess && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-green-700 text-sm">Download completed successfully!</span>
        </div>
      )}

      {/* Cart Total */}
      {cartTotal > 0 && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total:</span>
            <span className="text-lg font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Download Button */}
        <button
          onClick={onBulkDownload}
          disabled={cartItems.length === 0 || downloading || isLoading}
          className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          {downloading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2" />
              Download All Mods ({cartCount})
            </>
          )}
        </button>

        {/* Clear Cart Button */}
        {cartItems.length > 0 && (
          <button
            onClick={onClearCart}
            disabled={isLoading}
            className="w-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Clear Cart
          </button>
        )}

        {/* Continue Shopping Button */}
        <button
          onClick={onContinueShopping}
          className="back-button-enhanced w-full"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue Shopping
        </button>
      </div>

      {/* Additional Info */}
      <div className="mt-4 text-xs text-gray-500 space-y-1">
        <p>• Downloads are available for 24 hours after purchase</p>
        <p>• All mods are DRM-free and can be used offline</p>
        <p>• Support available via email for any issues</p>
      </div>
    </div>
  );
};

export default CartSummary;
