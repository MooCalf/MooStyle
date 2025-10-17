import { memo } from "react";
import { Loader2 } from "lucide-react";

export const LoadMoreButton = memo(({ 
  hasMore, 
  loading, 
  onLoadMore 
}) => {
  if (!hasMore) return null;

  return (
    <div className="text-center mt-8">
      <button
        onClick={onLoadMore}
        disabled={loading}
        className="bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto"
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Loading...
          </>
        ) : (
          "Load More Products"
        )}
      </button>
    </div>
  );
});

LoadMoreButton.displayName = 'LoadMoreButton';
