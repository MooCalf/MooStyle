import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const DevelopmentWarning = () => {
  return (
    <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-center py-2 px-4 relative z-50">
      <div className="flex items-center justify-center gap-2 text-sm font-medium">
        <AlertTriangle size={16} />
        <span>This website is currently in development. Some features may not be fully functional and some content may be AI generated or placeholder media.</span>
      </div>
    </div>
  );
};
