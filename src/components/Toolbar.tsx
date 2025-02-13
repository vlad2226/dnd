import { Search } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Toolbar() {
  const { setSearchQuery, selectedFiles } = useStore();

  return (
    <div className="border-b p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search files..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {selectedFiles.length} selected
          </span>
        </div>
      )}
    </div>
  );
}