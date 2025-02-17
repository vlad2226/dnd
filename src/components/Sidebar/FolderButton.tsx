import { Folder as FolderIcon } from "lucide-react";
import { useStore } from "../../store/useStore.ts";
import { useDroppable } from "@dnd-kit/core";

interface FolderButtonProps {
  folder: {
    id: string;
    name: string;
  };
  numberOfFiles: number;
  isOver: boolean;
}

const FolderButton = ({ folder, isOver, numberOfFiles = 0 }: FolderButtonProps) => {
  const { setSelectedFolder, selectedFolder } = useStore();
  const folderId = folder.id;
  const { setNodeRef } = useDroppable({
    id: `folder-${folderId}`,
    data: { folderId },
  });

  const selectFolder = () => setSelectedFolder(folderId);

  return (
    <button
      ref={setNodeRef}
      key={`Folder${folderId}`}
      onClick={selectFolder}
      className={`w-full flex items-center space-x-2 rounded-lg transition-colors ${
        selectedFolder === folderId
          ? "bg-blue-100 text-blue-700"
          : isOver
            ? "bg-gray-200"
            : "hover:bg-gray-100"
      }`}
    >
      <div className="flex gap-2 items-center">
        <FolderIcon className="w-4 h-4" />
        <span>{folder.name}</span>
        <span className="text-gray-500">{numberOfFiles}</span>
      </div>
    </button>
  );
};

export default FolderButton;