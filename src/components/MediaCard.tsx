import { Play, Image as ImageIcon, Film } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { MediaFile, useStore } from "../store/useStore";
import { CSS } from "@dnd-kit/utilities";

interface MediaCardProps {
  file?: MediaFile;
  isDragging?: boolean;
}

const MediaCard = ({ file, isDragging }: MediaCardProps) => {
  const { selectedFiles, toggleFileSelection } = useStore();

  if (!file) {
    return null; // or return a placeholder component
  }

  const { id, name, type, url } = file;
  const isSelected = selectedFiles.includes(id);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: file,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  const renderContent = () => {
    switch (type) {
      case "image":
        return (
          <img src={url} alt={name} className="w-full h-48 object-cover" />
        );
      case "video":
        return (
          <>
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
              <Film className="w-12 h-12 text-gray-400" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Play className="w-12 h-12 text-white" />
            </div>
          </>
        );
      case "gif":
      default:
        return (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative group cursor-pointer rounded-lg overflow-hidden ${
        isSelected ? "ring-2 ring-blue-500" : ""
      } ${isDragging ? "shadow-2xl" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        toggleFileSelection(id);
      }}
    >
      {renderContent()}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity" />
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
        <p className="text-white text-sm truncate">{name}</p>
      </div>
    </div>
  );
};

export default MediaCard;