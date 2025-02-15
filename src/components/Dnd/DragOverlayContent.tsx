import { memo } from "react";
import MediaCard from '../MediaCard';
import { MediaFile } from "../../store/useStore";

interface DragOverlayContentProps {
  activeFile?: MediaFile;
}

export const DragOverlayContent = memo(function DragOverlayContent({
  activeFile,
}: DragOverlayContentProps) {
  if (!activeFile) return null;

  return (
    <div className="w-64 h-64 pointer-events-none">
      <MediaCard file={activeFile} isDragging />
    </div>
  );
});