import { type Filter, useStore } from "../../store/useStore.ts";
import FilterOption from "./Filters/FilterOption.tsx";
import Checkbox from "./Filters/Checkbox.tsx";
import { ImagePlay, Play, Image } from "lucide-react";
import Accordion from "./Filters/Accordion.tsx";
import type { ChangeEvent } from "react";
import { useDroppable } from "@dnd-kit/core";
import FolderButton from "./FolderButton.tsx";

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
  const { setSelectedFilterType, accordionFilterOpen, groupedFilesByType } =
    useStore();
  const { setNodeRef } = useDroppable({
    id: "sidebar",
  });

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
      <div className="space-y-2">
        {Object.keys(groupedFilesByType).map((folderName) => (
          <FolderButton
            key={folderName}
            folderName={folderName}
            isOver={overFolderId === groupedFilesByType[folderName].id}
          />
        ))}
      </div>

      <div className="mt-4 space-y-2">
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

    </div>
  );
};

export default Sidebar;
