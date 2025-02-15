import { Folder as FolderIcon } from "lucide-react";
import { Folder, useStore } from "../../store/useStore.ts";
import { useDroppable } from "@dnd-kit/core";

interface FolderButtonProps {
  folder: Folder;
  isOver: boolean;
}

const FolderButton = ({ folder, isOver }: FolderButtonProps) => {
  const { setSelectedFolder, selectedFolder } = useStore();
  const { id, fileCount, name } = folder;
  const { setNodeRef } = useDroppable({
    id: `folder-${id}`,
    data: { folderId: id },
  });

  const selectFolder = () => setSelectedFolder(id);

  return (
    <button
      ref={setNodeRef}
      key={`Folder${id}`}
      onClick={selectFolder}
      className={`w-full flex items-center space-x-2 rounded-lg transition-colors ${
        selectedFolder === id
          ? "bg-blue-100 text-blue-700"
          : isOver
          ? "bg-gray-200"
          : "hover:bg-gray-100"
      }`}
    >
      <div className="flex gap-2 items-center">
        <FolderIcon className="w-4 h-4" />
        <span>{name}</span>
        <span className="text-gray-500">{fileCount}</span>
      </div>
    </button>
  );
};

export default FolderButton;