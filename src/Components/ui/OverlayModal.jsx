import { X } from "lucide-react";

export const OverlayModal = ({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  icon: Icon, 
  iconColor = "#0d9488",
  children,
  className = ""
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 backdrop-blur-sm bg-white bg-opacity-20 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }}
    >
      <div 
        className={`bg-white bg-opacity-95 rounded-lg shadow-xl max-w-md w-full ${className}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            {Icon && (
              <div className="p-2 bg-teal-100 rounded-lg">
                <Icon size={24} color={iconColor} />
              </div>
            )}
            <div className="flex-1">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              )}
              {description && (
                <p className="text-sm text-gray-600">{description}</p>
              )}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};
