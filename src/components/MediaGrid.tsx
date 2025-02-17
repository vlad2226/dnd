import { useStore } from "../store/useStore";
import MediaCard from "./MediaCard";
import Draggable from "./Dnd/Draggable";
import { groupBy } from '../lib/utils.ts';
import { MediaFile } from "../store/useStore";
import { useMemo } from 'react';

const filterAndGroupFiles = (
  files: MediaFile[],
  selectedFolder: string | null,
  selectedFilters: { image: boolean; video: boolean; gif: boolean },
  searchQuery: string
) => {
  const groupedFilesByFilter = groupBy(files, (file) => file.type);

  const filteredFiles = files.filter((file) => {
    // Filter by folder
    if (selectedFolder && file.folderId !== selectedFolder) {
      return false;
    }

    // Filter by file type
    if (!selectedFilters[file.type as keyof typeof selectedFilters]) {
      return false;
    }

    // Filter by search query
    if (searchQuery && !file.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  const result = groupBy(filteredFiles, (file) => file.type);

  // Preserve the order of file types from groupedFilesByFilter
  return Object.keys(groupedFilesByFilter).reduce((acc, fileType) => {
    if (result[fileType]) {
      acc[fileType] = result[fileType];
    }
    return acc;
  }, {} as Record<string, MediaFile[]>);
};

export const MediaGrid = () => {
  const { files, selectedFolder, searchQuery, selectedFilters } = useStore();

  const filteredAndGroupedFiles = useMemo(() => 
    filterAndGroupFiles(files, selectedFolder, selectedFilters, searchQuery),
    [files, selectedFolder, selectedFilters, searchQuery]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {Object.entries(filteredAndGroupedFiles).flatMap(([_, filesOfType]) =>
        filesOfType.map((file) => (
          <Draggable key={file.id} file={file}>
            <MediaCard file={file} />
          </Draggable>
        ))
      )}
    </div>
  );
};