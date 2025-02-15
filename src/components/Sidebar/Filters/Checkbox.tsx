import { type ChangeEvent } from 'react';
import { type Filter, useStore} from '../../../store/useStore.ts';

interface FilterProps {
  filter: Filter;
  selectFilter: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ filter, selectFilter }: FilterProps) => {
  const { selectedFilterType } = useStore();
  const isChecked = () => {
    if(filter.name === 'Select All') {
      return Object.values(selectedFilterType).every(val => val);
    }

    return selectedFilterType[filter.type]};
  console.log({[filter.type]: isChecked})

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="hidden"
          value={filter.type}
          checked={isChecked()}
          onChange={selectFilter}
        />
        <div
          className={`w-4 h-4 border-2 rounded-sm ${isChecked() ? "bg-blue-500 border-blue-500" : "border-gray-400"}`}
        >
          {isChecked() && (
            <svg
              className="w-3 h-3 text-white fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
            </svg>
          )}
        </div>
      </div>
    </label>
  );
};

export default Checkbox;