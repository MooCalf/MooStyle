import { useState } from "react";
import { Eye, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const BrandCard = ({ brand }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link to={`/brand/${encodeURIComponent(brand.name)}`} className="block">
      <motion.div 
        className="product-card bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ 
          y: -4,
          transition: { type: "spring", stiffness: 400, damping: 17 }
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Full Image Background */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={imageError ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkJyYW5kPC90ZXh0Pjwvc3ZnPg==" : brand.logo}
            alt={`${brand.name} logo`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />

          {/* Text Overlay with Gradient Background */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/90 to-transparent transition-transform duration-300 group-hover:-translate-y-16">
            {/* Brand Icon */}
            <div className="flex items-center gap-1 mb-2">
              <Building2 size={12} className="text-gray-600" />
              <p className="text-xs text-gray-600 truncate">{brand.category}</p>
            </div>
            
            {/* Brand Name */}
            <h3 className="text-base font-semibold text-gray-900 line-clamp-2">{brand.name}</h3>
          </div>
        </div>

        {/* View Details Button - Only visible on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-full group-hover:translate-y-0 z-20 bg-white">
          <Link
            to={`/brand/${encodeURIComponent(brand.name)}`}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Eye size={16} />
            View Details
          </Link>
        </div>
      </motion.div>
    </Link>
  );
};
