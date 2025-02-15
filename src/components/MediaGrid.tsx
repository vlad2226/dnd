import { useStore } from "../store/useStore";
import MediaCard from "./MediaCard.tsx";
import Draggable from "./Dnd/Draggable.tsx";

export const MediaGrid = () => {
  const { files, selectedFolder, selectedFilterType, searchQuery } = useStore();

  const filteredFiles = files.filter((file) => {
    if (selectedFolder && file.folderId !== selectedFolder) return false;
    if (selectedFilterType && !selectedFilterType[file.type]) return false;

    return !(
      searchQuery &&
      !file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {filteredFiles.map((file) => (
        <Draggable key={file.id} file={file}>
          <MediaCard file={file} />
        </Draggable>
      ))}
    </div>
  );
};
