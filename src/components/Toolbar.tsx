import { Search, CheckSquare, Square } from "lucide-react";
import { useStore } from "../store/useStore";
import {ChangeEvent} from 'react';

const Toolbar = () => {
  const {
    setSearchQuery,
    selectedFiles,
    groupedFilesByType,
    selectedFolder,
    setSelectedFolder,
      files,
      toggleFileSelection,
  } = useStore();

  const selectFolder = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFolder(e.target.value)
  }

  const searchFiles = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      files.forEach(file => toggleFileSelection(file.id));
    } else {
      files.forEach(file => {
        if (!selectedFiles.includes(file.id)) {
          toggleFileSelection(file.id);
        }
      });
    }
  };

  return (
    <div className="border-b p-4 flex items-center justify-between w-full">
      <div className='flex flex-row space-x-4'>
        <div onClick={toggleSelectAll} className="flex items-center space-x-2">
          {selectedFiles.length > 0 ? (
            <CheckSquare className="w-5 h-5 text-blue-500" />
          ) : (
            <Square className="w-5 h-5 text-gray-400" />
          )}
          <span className="text-sm text-gray-500">
            {selectedFiles.length} selected
          </span>
        </div>

        <div className="flex">
          <select
            value={selectedFolder || ""}
            onChange={selectFolder}
            className="w-full pl-4 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          >
            <option value="">All Folders</option>
            {Object.entries(groupedFilesByType).map(([folderName, folder]) => (
              <option key={folder.id} value={folder.id} >
                 {groupedFilesByType[folderName].name} {folder.content.length}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search files by name..."
            onChange={searchFiles}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

export default Toolbar;