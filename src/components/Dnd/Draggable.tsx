import {useDraggable} from "@dnd-kit/core";
import { MediaFile } from '../../store/useStore.ts';
import {ReactNode} from 'react';

interface Props {
  file: MediaFile;
  children: ReactNode;
}

const Draggable = ({ file, children }: Props) => {

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: file.id,
  });


  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
          {children}
    </div>
  );
};

export default Draggable;
