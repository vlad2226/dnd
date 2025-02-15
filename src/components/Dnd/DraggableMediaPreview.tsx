import { MediaFile } from "../../store/useStore.ts";
import { ImageIcon, FileIcon, VideoIcon } from "lucide-react";

const DraggableMediaPreview = ({ type, name }: MediaFile) => {
  const getIcon = () => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-6 h-6" />;
      case "video":
        return <VideoIcon className="w-6 h-6" />;
      default:
        return <FileIcon className="w-6 h-6" />;
    }
  };

  return (
    <div className="flex items-center bg-white border border-gray-200 rounded-md p-2 shadow-md">
      {getIcon()}
      <span className="ml-2 text-sm font-medium truncate max-w-[100px]">{name}</span>
    </div>
  );
};

export default DraggableMediaPreview;