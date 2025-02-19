import { type Filter, useStore } from "../../store/useStore.ts";
import FilterOption from "./Filters/FilterOption.tsx";
import Checkbox from "./Filters/Checkbox.tsx";
import { ImagePlay, Play, Image } from "lucide-react";
import Accordion from "./Filters/Accordion.tsx";
import type { ChangeEvent } from "react";
import { useDroppable } from "@dnd-kit/core";
import FolderButton from "./FolderButton.tsx";
import { groupBy } from "../../lib/utils.ts";

const selectAllFilter = {
  name: "Select All",
  type: "all",
  icon: null,
  fileCount: 0,
};

const filters: Filter[] = [
  { name: "Images", type: "image", icon: Image },
  { name: "Videos", type: "video", icon: Play },
  { name: "GIFs", type: "gif", icon: ImagePlay },
];

interface SidebarProps {
  overFolderId: string | null;
}

const Sidebar = ({ overFolderId }: SidebarProps) => {
  const {
    accordionFilterOpen,
    setFilter,
    folders,
    selectedFilters,
    files,
  } = useStore();

  const { setNodeRef } = useDroppable({
    id: "sidebar",
  });

  const groupedFilesByFolder = groupBy(files, (file) => file.folderId);

  const selectAllFilters = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    filters.forEach((filter) => {
      setFilter(filter.type, isChecked);
    });
  };

  const selectFilterType = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const filterType = event.target.value as keyof typeof selectedFilters;
    setFilter(filterType, isChecked);
  };

  return (
    <div ref={setNodeRef} className="w-64 bg-gray-50 border-r h-full p-4">
      <div
        className="flex items-center mb-6 cursor-pointer"
      >
        <div className="w-10 h-10 bg-red-600 flex items-center justify-center rounded-md mr-3">
          <span className="text-white font-bold text-xl">M</span>
        </div>
        <span className="text-lg">Media gallery</span>
      </div>
      <div className="space-y-2">
        {Object.values(folders).map((folder) => {
          return (
            <FolderButton
              key={folder.id}
              folder={{ id: folder.id, name: folder.name }}
              isOver={overFolderId === folder.id}
              numberOfFiles={groupedFilesByFolder[folder.id]?.length}
            />
          );
        })}
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex flex-row justify-between">
          <Accordion />
          <Checkbox
            filter={selectAllFilter as unknown as Filter}
            selectFilter={selectAllFilters}
            isChecked={Object.values(selectedFilters).every((filterChecked) => filterChecked)}
          />
        </div>

        {accordionFilterOpen &&
          filters.map((filter) => (
            <div
              className="flex flex-row justify-between items-center"
              key={filter.type}
            >
              <FilterOption filter={filter} />
              <Checkbox
                filter={filter}
                selectFilter={selectFilterType}
                isChecked={selectedFilters[filter.type]}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
