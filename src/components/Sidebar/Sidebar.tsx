import { type Filter, useStore } from "../../store/useStore.ts";
import FilterOption from "./Filters/FilterOption.tsx";
import Checkbox from "./Filters/Checkbox.tsx";
import { ImagePlay, Play, Image } from "lucide-react";
import Accordion from "./Filters/Accordion.tsx";
import type { ChangeEvent } from "react";
import { useDroppable } from "@dnd-kit/core";
import FolderButton from './FolderButton.tsx';
// ... other imports

const selectAllFilter = {
  name: "Select All",
  type: "all",
  icon: null,
  fileCount: 0,
};

const filters: Filter[] = [
  { name: "Images", type: "image", icon: Image, fileCount: 2 },
  { name: "Videos", type: "video", icon: Play, fileCount: 1 },
  { name: "GIFs", type: "gif", icon: ImagePlay, fileCount: 0 },
];

interface SidebarProps {
  overFolderId: string | null;
}

const Sidebar = ({ overFolderId }: SidebarProps) => {
  const { setSelectedFilterType, accordionFilterOpen, folders } = useStore();
  const { setNodeRef } = useDroppable({
    id: "sidebar",
  });


  const store = useStore()
  console.log(store, 'store')

  const selectAllFilters = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const newState = filters.reduce(
      (acc, filter) => {
        acc[filter.type] = isChecked;
        return acc;
      },
      {} as Record<string, boolean>,
    );
    setSelectedFilterType(newState);
  };

  const selectFilterType = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const name = event.target.value;
    setSelectedFilterType({ [name]: isChecked });
  };

  return (
    <div ref={setNodeRef} className="w-64 bg-gray-50 border-r h-full p-4">
      {/* ... other JSX */}
      <div className="space-y-2">
        {folders.map((folder) => (
          <FolderButton 
            key={folder.id} 
            folder={folder} 
            isOver={overFolderId === folder.id}
          />
        ))}
        {/* ... rest of the JSX */}
      </div>
          <div className="flex flex-row justify-between">
            <Accordion />
            <Checkbox
              filter={selectAllFilter as unknown as Filter}
              selectFilter={selectAllFilters}
            />
          </div>
          {accordionFilterOpen &&
            filters.map((filter) => (
              <div
                className="flex flex-row justify-between items-center"
                key={filter.type}
              >
                <FilterOption filter={filter} />
                <Checkbox filter={filter} selectFilter={selectFilterType} />
              </div>
            ))}
        </div>
  );
}

export default Sidebar;
