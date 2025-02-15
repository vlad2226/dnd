import {useDraggable} from "@dnd-kit/core";
import { MediaFile } from '../../store/useStore.ts';
import {ReactNode} from 'react';

interface Props {
  file: MediaFile;
  children: ReactNode;
}

const Draggable = ({ file, children }: Props) => {
    // const { isOver } = useDroppable({
    //     id: "sidebar",
    // });
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: file.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
          {children}
    </div>
  );
};

export default Draggable;
