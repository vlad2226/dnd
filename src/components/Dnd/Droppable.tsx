import { useStore } from "../../store/useStore.ts";
import FolderButton from "../Sidebar/FolderButton.tsx";
import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

interface Props {
  id: string;
  children: ReactNode;
}

function Droppable({ id, children }: Props) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return <div ref={setNodeRef}>{children}</div>;
}

const MultipleDroppables = () => {
  const { folders } = useStore();
  return (
    <section>
      {folders.map((folder) => (
        <Droppable id={folder.id} key={folder.id}>
          <FolderButton key={folder.id} folder={folder} />
        </Droppable>
      ))}
    </section>
  );
};

export default MultipleDroppables;
