import { Folder } from "lucide-react";
import { type FileType, useStore } from "../store/useStore";
import { MouseEvent } from "react";

export function Sidebar() {
  const {
    folders,
    filters,
    selectedFolder,
    setSelectedFolder,
    setFilterType,
    filterType,
  } = useStore();

  const isFileType = (value: unknown): value is FileType => {
    return (
      typeof value === "string" && ["image", "video", "gif"].includes(value)
    );
  };

  const changeFilterType = (event: MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget.value, "event");
    const value = event.currentTarget.value;
    setFilterType(isFileType(value) ? value : null);
  };

  return (
    <div className="w-64 bg-gray-50 border-r h-full p-4">
      <h2 className="text-lg font-semibold mb-4">Folders</h2>
      <div className="space-y-2">
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => setSelectedFolder(folder.id)}
            className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors ${
              selectedFolder === folder.id
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="flex-1 text-left">
              <Folder className="w-4 h-4" />
              <span>{folder.name}</span>
              <span className="text-sm text-gray-500">{folder.fileCount}</span>
            </div>
          </button>
        ))}
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="space-y-2">
          {filters.map((filter) => (
            <button
              key={filter.name}
              value={filter.type}
              onClick={changeFilterType}
              className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isFileType(filter.type) && filter.type === filterType
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex-1 text-left">
                <span>{filter.name}</span>
                <span className="text-sm text-gray-500">
                  {filter.fileCount}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {/*{isFileType(filter.type) && filter.type === filterType && (*/}
                {/*    // <Check className="w-4 h-4"/>*/}
                {/*)}*/}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
