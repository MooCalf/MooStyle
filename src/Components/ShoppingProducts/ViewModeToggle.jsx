import { memo } from "react";
import { Grid, List } from "lucide-react";

export const ViewModeToggle = memo(({ viewMode, onViewModeChange }) => {
  return (
    <div className="view-toggle flex bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => onViewModeChange("grid")}
        className={`view-toggle-button flex items-center justify-center w-10 h-10 rounded-md transition-colors ${
          viewMode === "grid" 
            ? "bg-white text-teal-600 shadow-sm" 
            : "text-gray-500 hover:text-gray-700"
        }`}
        aria-label="Grid view"
      >
        <Grid size={20} />
      </button>
      <button
        onClick={() => onViewModeChange("list")}
        className={`view-toggle-button flex items-center justify-center w-10 h-10 rounded-md transition-colors ${
          viewMode === "list" 
            ? "bg-white text-teal-600 shadow-sm" 
            : "text-gray-500 hover:text-gray-700"
        }`}
        aria-label="List view"
      >
        <List size={20} />
      </button>
    </div>
  );
});

ViewModeToggle.displayName = 'ViewModeToggle';
