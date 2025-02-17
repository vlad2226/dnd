import { type Filter, useStore } from "../../../store/useStore.ts";

interface FilterProps {
  filter: Filter;
}


const FilterOption = ({ filter }: FilterProps) => {
    const { groupedFiles } = useStore();
    const IconComponent = filter.icon;
  return (
      <div className="flex gap-2 items-center">
        <IconComponent className="w-4 h-4" />
        <span>{filter.name}</span>
        <span className="text-gray-500">{groupedFiles[filter.type]?.length}</span>
      </div>
  );
};

export default FilterOption;
