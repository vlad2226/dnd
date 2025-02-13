import { useStore } from '../store/useStore';
import MediaCard from './MediaCard.tsx';


export const MediaGrid = () => {
  const { files, selectedFolder, filterType, searchQuery } = useStore();

  const filteredFiles = files.filter(file => {
    if (selectedFolder && file.folderId !== selectedFolder) return false;
    if (filterType && file.type !== filterType) return false;
    if (searchQuery && !file.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {filteredFiles.map((file) => (
        <MediaCard key={file.id} {...file} />
      ))}
    </div>
  );
}