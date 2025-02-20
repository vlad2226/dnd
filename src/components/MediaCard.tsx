import { Play, Image as ImageIcon, Film, Trash2, Edit2 } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { MediaFile, useStore } from "../store/useStore";
import { CSS } from "@dnd-kit/utilities";
import { type MouseEvent, useState } from "react";

interface MediaCardProps {
  file?: MediaFile;
  isDragging?: boolean;
}
const fileIcons = {
  video: (
    <>
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
        <Film className="w-12 h-12 text-gray-400" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <Play className="w-12 h-12 text-white" />
      </div>
    </>
  ),
  gif: (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
        <ImageIcon className="w-12 h-12 text-gray-400" />
      </div>
  ),
};
const MediaCard = ({ file, isDragging }: MediaCardProps) => {
  const {
    selectedFiles,
    selectedFilesOrder,
    toggleFileSelection,
    deleteFile,
    renameFile,
  } = useStore();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: file?.id || 0,
    data: file,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  if (!file) {
    return null;
  }

  const { id, name, type, url, aspectRatio } = file;
  const isSelected = selectedFiles.includes(id);
  const selectionOrder = selectedFilesOrder[id];
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  const calculatedAspectRatio = {
    paddingBottom: `${(1 / aspectRatio) * 100}%`,
  };

  const toggleFileSelectedState = (e: MouseEvent) => {
    e.preventDefault();
    if (!isEditing) {
      toggleFileSelection(id);
    }
  };

  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    deleteFile(id);
  };

  const startEditing = (e: MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setNewName(name);
  };

  const handleRename = () => {
    if (newName.trim() !== "" && newName !== name) {
      renameFile(id, newName.trim());
    }
    setIsEditing(false);
  };

  const renderContent = () => {
    switch (type) {
      case "image":
        return (
          <div className="w-full h-0 relative" style={calculatedAspectRatio}>
            <img
              src={url}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        );
      case "video":
        return (
          <div
            className="w-full h-0 relative"
            style={calculatedAspectRatio}
          >
            {fileIcons.video}
          </div>
        );
      case "gif":
      default:
        return (
            <div className="w-full h-0 relative" style={calculatedAspectRatio}>
              {fileIcons.gif}
            </div>
        );
    }
  };

  return (
    <div className="flex flex-col">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`relative group cursor-pointer rounded-lg overflow-hidden ${
          isSelected ? "ring-2 ring-blue-500" : ""
        } ${isDragging ? "shadow-2xl" : ""}`}
        onClick={toggleFileSelectedState}
      >
        {renderContent()}
        {isSelected && (
          <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {selectionOrder}
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity" />
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={startEditing}
            className="p-1 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
          >
            <Edit2 className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
      <div className="mt-2">
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleRename}
            className="w-full px-2 py-1 text-sm bg-white border border-gray-300 rounded-sm text-black"
            onClick={stopPropagation}
          />
        ) : (
          <p className="text-sm truncate">{name}</p>
        )}
      </div>
    </div>
  );
};

export default MediaCard;
