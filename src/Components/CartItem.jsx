import React from 'react';
import { Trash2, Package, Clock, User, FileText } from 'lucide-react';

/**
 * Cart Item Component
 * Displays individual cart item with controls
 */
export const CartItem = ({ item, onRemove, onUpdateQuantity, isLoading }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDownloadCount = (count) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count.toString();
  };

  const productData = item.productData || item.product;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={productData.image || '/placeholder-image.jpg'}
            alt={productData.name}
            className="w-20 h-20 object-cover rounded-lg"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {productData.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                by {productData.author || productData.brand || 'Unknown Author'}
              </p>
              
              {/* Product Info */}
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                {productData.modFile && (
                  <div className="flex items-center space-x-1">
                    <Package className="w-4 h-4" />
                    <span>{formatFileSize(productData.modFile.size || 0)}</span>
                  </div>
                )}
                
                {productData.downloadCount && (
                  <div className="flex items-center space-x-1">
                    <FileText className="w-4 h-4" />
                    <span>{formatDownloadCount(productData.downloadCount)} downloads</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Added {new Date(item.addedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => onRemove(productData.id)}
              disabled={isLoading}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 disabled:opacity-50"
              title="Remove from cart"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Quantity Controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => onUpdateQuantity(productData.id, item.quantity - 1)}
                  disabled={isLoading || item.quantity <= 1}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(productData.id, item.quantity + 1)}
                  disabled={isLoading}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price Display */}
            {productData.price && productData.price > 0 && (
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  ${(productData.price * item.quantity).toFixed(2)}
                </div>
                {productData.originalPrice && productData.originalPrice > productData.price && (
                  <div className="text-sm text-gray-500 line-through">
                    ${(productData.originalPrice * item.quantity).toFixed(2)}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
