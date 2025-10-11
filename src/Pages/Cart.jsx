import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavigationPrimary } from '@/Components/NavigationPrimary';
import { NavigationSecondary } from '@/Components/NavigationSecondary';
import { Metadata } from '@/Components/Metadata.jsx';
import { useCart } from '@/contexts/CartContext';
import { apiConfig } from '@/lib/apiConfig';
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
      
      console.log('Item removed successfully');
      
      // Don't reload the page - let React handle the state update
      
    } catch (error) {
      console.error('Error removing item from cart:', error);
      setError('Failed to remove mod from cart');
    }
  };

  const handleBulkDownload = async (event) => {
    // Prevent automatic execution
    if (!event || !event.isTrusted) {
      console.log('❌ handleBulkDownload called without user interaction, ignoring');
      return;
    }
    
    console.log('🚀 handleBulkDownload called by user - cartItems length:', cartItems.length);
    console.log('🚀 handleBulkDownload called by user - cartItems:', cartItems);
    
    if (cartItems.length === 0) {
      console.log('❌ Cart is empty, returning early');
      return;
    }

    setDownloading(true);
    setError(null);

    try {
      // First, call the backend API to award points and get download data
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('❌ No authentication token found');
        setError('Please log in to download mods');
        setDownloading(false);
        return;
      }

      console.log('✅ Authentication token found, proceeding with download');

      // Call the points API to award points and get download authorization
      console.log('🚀 Calling points API:', `${apiConfig.buildUrl(apiConfig.endpoints.cart.download)}`);
      const pointsResponse = await fetch(`${apiConfig.buildUrl(apiConfig.endpoints.cart.download)}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📡 Points API response status:', pointsResponse.status);

      if (!pointsResponse.ok) {
        const errorData = await pointsResponse.json();
        throw new Error(errorData.message || 'Failed to process download');
      }

      const pointsData = await pointsResponse.json();
      
      if (!pointsData.success) {
        throw new Error(pointsData.message || 'Download failed');
      }

      // Update user data with new points
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        userData.points = pointsData.totalPoints;
        userData.membershipLevel = pointsData.membershipLevel;
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('userDataUpdated'));
      }

      // Show success message with points earned
      setError(null);
      setDownloadSuccess(true);
      console.log(`✅ Download authorized! You earned ${pointsData.pointsAwarded} points!`);
      
      // Show success toast notification
      if (window.showToast) {
        window.showToast(`✅ Download authorized! You earned ${pointsData.pointsAwarded} points!`, 'success');
      } else {
        // Fallback to alert if toast system not available
        alert(`✅ Download authorized! You earned ${pointsData.pointsAwarded} points!`);
      }

      // Now proceed with the actual file download
      const zip = new JSZip();
      
      // Add each cart item to the zip
      for (const item of cartItems) {
        const productData = item.productData || item.product;
        const brandName = productData.brand || productData.author || 'Products';
        const productName = productData.name || 'Unknown Product';
        
        // Create folder structure: Products/BrandName/ProductName/
        const brandFolder = zip.folder('Products').folder(brandName);
        const productFolder = brandFolder.folder(productName);
        
        // First, try to fetch actual files from the Products folder
        let actualFilesFound = false;
        
        // Fetch all actual files from the Products folder structure using exact folder path
        try {
          const token = localStorage.getItem('token');
          if (token && productData.folderPath) {
            const response = await fetch(`/api/cart/product-files-by-path/${encodeURIComponent(productData.folderPath)}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            if (response.ok) {
              const data = await response.json();
              console.log(`Found ${data.files.length} files for folder: ${productData.folderPath}`);
              
              // Add each file to the zip
              for (const file of data.files) {
                try {
                  const fileResponse = await fetch(file.path);
                  if (fileResponse.ok) {
                    const fileBlob = await fileResponse.blob();
                    
                    if (file.folder) {
                      // File is in a subfolder
                      const subfolderZip = productFolder.folder(file.folder);
                      subfolderZip.file(file.name, fileBlob);
                      console.log(`Added file: ${file.folder}/${file.name}`);
                    } else {
                      // File is in the main folder
                      productFolder.file(file.name, fileBlob);
                      console.log(`Added file: ${file.name}`);
                    }
                    actualFilesFound = true;
                  }
                } catch (fileError) {
                  console.warn(`Could not fetch file ${file.name}:`, fileError);
                }
              }
              
              // If no files were found, create a placeholder
              if (data.files.length === 0) {
                const placeholderInfo = {
                  folderPath: productData.folderPath,
                  note: "No files found in product folder",
                  timestamp: new Date().toISOString()
                };
                productFolder.file('folder-info.json', JSON.stringify(placeholderInfo, null, 2));
              }
            } else {
              console.warn('Could not fetch product files from API');
              // Fallback to manual file fetching
              actualFilesFound = await fetchKnownFiles(productFolder, productData.folderPath, productData);
            }
          } else {
            console.warn('No authentication token or folder path found');
            // Fallback to manual file fetching
            actualFilesFound = await fetchKnownFiles(productFolder, productData.folderPath, productData);
          }
        } catch (error) {
          console.warn('Error fetching product files:', error);
          // Fallback to manual file fetching
          actualFilesFound = await fetchKnownFiles(productFolder, productData.folderPath, productData);
        }
        
        // Only add metadata files if no actual files were found
        if (!actualFilesFound) {
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
                const imageExtension = productData.image.split('.').pop() || 'jpg';
                productFolder.file(`product-image.${imageExtension}`, imageBlob);
              }
            } catch (imageError) {
              console.warn('Could not fetch product image:', imageError);
            }
          }
        }
        
        // Helper function for fallback file fetching
        async function fetchKnownFiles(productFolder, folderPath, productData) {
          let filesFound = false;
          
          if (!folderPath) {
            console.warn('No folder path provided for fallback file fetching, creating metadata only');
            // Create a simple metadata file instead of trying to fetch files
            const metadata = {
              name: productData.name,
              brand: productData.brand,
              author: productData.author,
              description: productData.description,
              note: "No folder path available - metadata only",
              timestamp: new Date().toISOString()
            };
            productFolder.file('product-metadata.json', JSON.stringify(metadata, null, 2));
            return true; // Return true to indicate we created something
          }
          
          // Input validation function
          const validateFilePath = (folderPath, filename) => {
            const cleanPath = folderPath.replace(/\.\./g, '').replace(/\/\//g, '/');
            const cleanFilename = filename.replace(/\.\./g, '').replace(/\/\//g, '/');
            
            if (!/^[a-zA-Z0-9\/\-_]+$/.test(cleanPath) || !/^[a-zA-Z0-9.\-_]+$/.test(cleanFilename)) {
              throw new Error('Invalid file path');
            }
            
            return `/projects/${cleanPath}/${cleanFilename}`;
          };
          
          const knownFiles = [
            'Lunaglow - Kit Promotional Cover.png',
            'metadata.txt',
            'product-info.txt',
            'README.md',
            'cover.png',
            'main.jpg'
          ];
          
          // Add modFile if it exists
          if (productData.modFile && productData.modFile.filename) {
            knownFiles.push(productData.modFile.filename);
          }
          
          // Use Promise.all for parallel file fetching (performance optimization)
          const filePromises = knownFiles.map(async (filename) => {
            try {
              const filePath = validateFilePath(folderPath, filename);
              const response = await fetch(filePath);
              if (response.ok) {
                const fileBlob = await response.blob();
                productFolder.file(filename, fileBlob);
                console.log(`Successfully added file: ${filename}`);
                return true;
              }
            } catch (fileError) {
              console.warn(`Could not fetch file ${filename}:`, fileError);
            }
            return false;
          });
          
          const fileResults = await Promise.all(filePromises);
          filesFound = fileResults.some(result => result);
          
          // Also try to fetch files from subfolders (images, files, etc.)
          const subfolders = ['images', 'files', 'docs'];
          for (const subfolder of subfolders) {
            try {
              // Validate subfolder path
              const cleanSubfolder = subfolder.replace(/\.\./g, '').replace(/\/\//g, '/');
              if (!/^[a-zA-Z0-9\-_]+$/.test(cleanSubfolder)) {
                console.warn(`Invalid subfolder name: ${subfolder}`);
                continue;
              }
              
              const subfolderPath = `/projects/${folderPath}/${cleanSubfolder}/`;
              // Try common file extensions
              const commonExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.zip', '.pdf', '.txt', '.json'];
              const commonNames = ['main', 'cover', 'promotional', 'product', 'gallery', 'metadata'];
              
              for (const name of commonNames) {
                for (const ext of commonExtensions) {
                  const filename = `${name}${ext}`;
                  try {
                    const filePath = validateFilePath(folderPath, `${cleanSubfolder}/${filename}`);
                    const response = await fetch(filePath);
                    if (response.ok) {
                      const fileBlob = await response.blob();
                      const subfolderZip = productFolder.folder(subfolder);
                      subfolderZip.file(filename, fileBlob);
                      console.log(`Successfully added file: ${subfolder}/${filename}`);
                      filesFound = true;
                    }
                  } catch (fileError) {
                    // Silently continue - file doesn't exist
                  }
                }
              }
            } catch (subfolderError) {
              console.warn(`Could not access subfolder ${subfolder}:`, subfolderError);
            }
          }
          
          return filesFound;
        }
        
        // Add additional images if available
        if (productData.images && productData.images.length > 0) {
          const imagesFolder = productFolder.folder('images');
          for (let i = 0; i < productData.images.length; i++) {
            try {
              const response = await fetch(productData.images[i]);
              if (response.ok) {
                const imageBlob = await response.blob();
                const imageExtension = productData.images[i].split('.').pop() || 'jpg';
                imagesFolder.file(`gallery-${i + 1}.${imageExtension}`, imageBlob);
              }
            } catch (imageError) {
              console.warn(`Could not fetch gallery image ${i + 1}:`, imageError);
            }
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
      setError(error.message || 'Failed to create download package. Please try again.');
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
                className="back-button-simple"
              >
                <ArrowLeft size={20} />
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
