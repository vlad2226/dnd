import { ChevronDown, ChevronUp } from "lucide-react";
import { useStore } from '../../../store/useStore.ts';

const Accordion = () => {
const { setAccordionFilterOpen, accordionFilterOpen } = useStore()
  const toggleAccordion = () => setAccordionFilterOpen(!accordionFilterOpen);

  return (
    <div>
      <button
        className="flex text-gray-500 items-center mb-4"
        onClick={toggleAccordion}
      >
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center">Media Type
        {accordionFilterOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </button>
    </div>
  );
};

export default Accordion;
