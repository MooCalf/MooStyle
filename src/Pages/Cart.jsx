import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavigationPrimary } from '@/Components/NavigationPrimary';
import { NavigationSecondary } from '@/Components/NavigationSecondary';
import { Metadata } from '@/Components/Metadata.jsx';
import { useCart } from '@/contexts/CartContext';
import JSZip from 'jszip';
import { 
  ShoppingBag, 
  Download, 
  Trash2, 
  ArrowLeft, 
  Package,
  Clock,
  User,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';

export const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart, getCartCount, downloadCart, isLoading } = useCart();
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Debug logging
  console.log('Cart component loaded, cartItems:', cartItems);
  console.log('First cart item structure:', cartItems[0]);

  // Error boundary for cart context
  if (!cartItems) {
    console.error('Cart items not available');
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Cart Error</h1>
          <p className="text-gray-600 mb-6">Unable to load cart items. Please refresh the page.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

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

  const handleRemoveItem = async (productId) => {
    try {
      setError(null);
      console.log('Removing item with productId:', productId);
      
      // Remove from cart and wait for completion
      await removeFromCart(productId);
      
      console.log('Item removed successfully, refreshing page...');
      
      // Force a page refresh to ensure UI updates
      window.location.reload();
      
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setError('Failed to remove mod from cart');
    }
  };

  const handleBulkDownload = async () => {
    if (cartItems.length === 0) return;

    setDownloading(true);
    setError(null);

    try {
      // Create a zip file with all cart items
      const zip = new JSZip();
      
      // Add each cart item to the zip
      for (const item of cartItems) {
        const productData = item.productData || item.product;
        const folderName = productData.brand || productData.author || 'Products';
        
        // Create folder structure: Brand/ProductName/
        const productFolder = zip.folder(folderName).folder(productData.name || 'Unknown Product');
        
        // Add product information as a text file
        const productInfo = {
          name: productData.name,
          brand: productData.brand,
          author: productData.author,
          description: productData.description,
          price: productData.price,
          category: productData.category,
          quantity: item.quantity,
          addedAt: item.addedAt || new Date().toISOString()
        };
        
        productFolder.file('product-info.json', JSON.stringify(productInfo, null, 2));
        
        // Add product description as a text file
        if (productData.description) {
          productFolder.file('description.txt', productData.description);
        }
        
        // Add product features if available
        if (productData.features && productData.features.length > 0) {
          productFolder.file('features.txt', productData.features.join('\n'));
        }
        
        // Add product image if available
        if (productData.image) {
          try {
            // Fetch the image and add it to the zip
            const response = await fetch(productData.image);
            if (response.ok) {
              const imageBlob = await response.blob();
              productFolder.file('product-image.jpg', imageBlob);
            }
          } catch (imageError) {
            console.warn('Could not fetch product image:', imageError);
          }
        }
      }
      
      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      // Create download link
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `moostyle-cart-${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Clear the cart after successful download
      await clearCart();
      
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
        navigate('/');
      }, 3000);
      
    } catch (error) {
      console.error('Bulk download error:', error);
      setError('Failed to create download package. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const getCartTotalSize = () => {
    return cartItems.reduce((total, item) => {
      // Handle mod files (for downloads)
      if (item.productData?.modFile?.size || item.product?.modFile?.size) {
        return total + ((item.productData?.modFile?.size || item.product?.modFile?.size) * item.quantity);
      }
      // Handle shopping products (for purchases)
      if (item.productData?.fileSize || item.product?.fileSize) {
        return total + ((item.productData?.fileSize || item.product?.fileSize) * item.quantity);
      }
      return total;
    }, 0);
  };

  const getCartTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.productData?.price || item.product?.price;
      if (price) {
        return total + (price * item.quantity);
      }
      return total;
    }, 0);
  };

  const totalSize = getCartTotalSize();

  return (
    <>
      <Metadata 
        pageTitle="Shopping Cart - MooStyle"
        pageDescription="Your mod collection ready for download"
      />
      <div className="min-h-screen bg-gray-50">
        <NavigationPrimary />
        <NavigationSecondary />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            </div>
            <p className="text-gray-600">
              {cartItems.length > 0 
                ? `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart`
                : 'Your cart is empty'
              }
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle size={20} className="text-red-600" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {cartItems.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-16">
              <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Browse our collection and add some items to your cart!</p>
              <button
                onClick={() => {
                  console.log('Back to Home button clicked');
                  navigate('/');
                }}
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Home
              </button>
            </div>
          ) : (
            /* Cart with Items */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Items in Cart</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item, index) => (
                      <div key={`${item.productData?.id || item.product?.id}-${index}`} className="p-6 flex items-center gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <Link to={`/product/${item.productData?.id || item.product?.id}`} className="block">
                            <img
                              src={item.productData?.image || item.product?.image || "/placeholder-image.jpg"}
                              alt={item.productData?.name || item.product?.name || "Product"}
                              className="w-20 h-20 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                              onError={(e) => {
                                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Qcm9kdWN0PC90ZXh0Pjwvc3ZnPg==";
                              }}
                            />
                          </Link>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${item.productData?.id || item.product?.id}`} className="block hover:text-teal-600 transition-colors">
                            <h3 className="text-lg font-semibold text-gray-900 truncate hover:text-teal-600">
                              {item.productData?.name || item.product?.name || "Unknown Product"}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <User size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {item.productData?.author || item.productData?.brand || item.product?.author || item.product?.brand || "Unknown"}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {item.productData?.description || item.product?.description || "No description available"}
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            {/* Show different info based on product type */}
                            {(item.productData?.modFile || item.product?.modFile) ? (
                              // Mod file info
                              <>
                                <div className="flex items-center gap-1">
                                  <Download size={14} className="text-gray-400" />
                                  <span className="text-sm text-gray-600">
                                    {formatDownloadCount(item.productData?.downloadCount || item.product?.downloadCount || 0)} downloads
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <FileText size={14} className="text-gray-400" />
                                  <span className="text-sm text-gray-600">
                                    {formatFileSize(item.productData?.modFile?.size || item.product?.modFile?.size || 0)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock size={14} className="text-gray-400" />
                                  <span className="text-sm text-gray-600">
                                    v{item.productData?.modFile?.version || item.product?.modFile?.version || "1.0"}
                                  </span>
                                </div>
                              </>
                            ) : (
                              // Shopping product info
                              <>
                                {(item.productData?.price || item.product?.price) && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-sm font-semibold text-teal-600">
                                      ${(item.productData?.price || item.product?.price).toFixed(2)}
                                    </span>
                                    {(item.productData?.originalPrice || item.product?.originalPrice) && 
                                     (item.productData?.originalPrice || item.product?.originalPrice) > (item.productData?.price || item.product?.price) && (
                                      <span className="text-sm text-gray-400 line-through">
                                        ${(item.productData?.originalPrice || item.product?.originalPrice).toFixed(2)}
                                      </span>
                                    )}
                                  </div>
                                )}
                                {(item.productData?.brand || item.product?.brand) && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-sm text-gray-600">
                                      Brand: {item.productData?.brand || item.product?.brand}
                                    </span>
                                  </div>
                                )}
                                {(item.productData?.fileSize || item.product?.fileSize) && (
                                  <div className="flex items-center gap-1">
                                    <FileText size={14} className="text-gray-400" />
                                    <span className="text-sm text-gray-600">
                                      {formatFileSize(item.productData?.fileSize || item.product?.fileSize)}
                                    </span>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.productData?.id || item.product?.id)}
                          disabled={isLoading}
                          className="flex-shrink-0 p-2 hover:bg-red-50 text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                          title="Remove from cart"
                        >
                          {isLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                          ) : (
                            <Trash2 size={20} />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Cart Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items:</span>
                      <span className="font-semibold">{cartItems.length}</span>
                    </div>
                    {getCartTotalPrice() > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Price:</span>
                        <span className="font-semibold">${getCartTotalPrice().toFixed(2)}</span>
                      </div>
                    )}
                    {totalSize > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Size:</span>
                        <span className="font-semibold">{formatFileSize(totalSize)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Format:</span>
                      <span className="font-semibold">ZIP Archive</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={20} className="text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-1">Download Info</h3>
                        <p className="text-sm text-blue-800">
                          All items will be organized in folders by brand/author. Product information, descriptions, and images will be included. Cart will be automatically cleared after download.
                        </p>
                      </div>
                    </div>
                  </div>

                  {cartItems.some(item => item.productData?.modFile || item.product?.modFile) ? (
                    // Download button for mods
                    <button
                      onClick={handleBulkDownload}
                      disabled={downloading || cartItems.length === 0 || isLoading}
                      className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      {downloading || isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Processing Download...
                        </>
                      ) : (
                        <>
                          <Download size={20} />
                          Bulk Download ({cartItems.length} mods)
                        </>
                      )}
                    </button>
                  ) : (
                    // Bulk download button for shopping products
                    <button
                      onClick={handleBulkDownload}
                      disabled={downloading || cartItems.length === 0 || isLoading}
                      className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      {downloading || isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Processing Download...
                        </>
                      ) : (
                        <>
                          <Download size={20} />
                          Bulk Download ({cartItems.length} items)
                        </>
                      )}
                    </button>
                  )}

                  {/* Donation Section */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-purple-900 mb-1">Support MooStyle</h3>
                          <p className="text-sm text-purple-800 mb-3">
                            Help keep the website alive and support continuous mod creation! Your donations help us maintain servers and create new content.
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                console.log('Donate button clicked');
                                // TODO: Add actual donation link
                                window.open('https://ko-fi.com/moostyle', '_blank');
                              }}
                              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                              Donate
                            </button>
                            <button
                              onClick={() => {
                                console.log('Tip button clicked');
                                // TODO: Add actual tip link
                                window.open('https://paypal.me/moostyle', '_blank');
                              }}
                              className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              Tip
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Information Notice */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-blue-900 mb-2">Account Information</h3>
                          <p className="text-sm text-blue-800 mb-2">
                            Your cart is automatically saved to your account when you're logged in, allowing you to access it from any device. 
                            Downloads will earn you points and help you progress through membership levels.
                          </p>
                          <p className="text-sm text-blue-800">
                            <strong>Data Privacy:</strong> Your cart data is stored securely and is only used to provide you with a personalized experience. 
                            You can request account deletion at any time by contacting support.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Download will start automatically
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
