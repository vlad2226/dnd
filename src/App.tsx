import {
  DndContext,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  DragOverlay,
  TouchSensor,
  DragOverEvent,
} from "@dnd-kit/core";

import { Toolbar } from "./components/Toolbar";
import { MediaGrid } from "./components/MediaGrid";
import Sidebar from "./components/Sidebar/Sidebar";
import { useStore } from "./store/useStore";
import { useRef, useState } from "react";
import { DragOverlayContent } from "./components/Dnd/DragOverlayContent";

const App = () => {
  const { moveFiles, files } = useStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overFolderId, setOverFolderId] = useState<string | null>(null);
  const tracked = useRef({
    distance: 0,
    timestamp: 0,
    velocity: 0,
  });
  const activeFile = activeId
    ? files.find((file) => file.id === activeId)
    : null;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (over && over.id.toString().startsWith("folder-")) {
      setOverFolderId((over.data.current as { folderId: string }).folderId);
    } else {
      setOverFolderId(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && over.id.toString().startsWith("folder-")) {
      const fileId = active.id as string;
      const folderId = (over.data.current as { folderId: string }).folderId;
      moveFiles([fileId], folderId);
    }
    setActiveId(null);
    setOverFolderId(null);
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragMove={({ delta }) => {
        // Track drag velocity
        const timestamp = Date.now();
        const timeDelta = timestamp - tracked.current.timestamp;
        const distance = tracked.current.distance - delta.y;
        const velocity = Math.round((distance / timeDelta) * 1000);

        tracked.current = {
          distance: delta.y,
          velocity,
          timestamp,
        };
      }}
    >
      <div className="flex h-screen bg-white">
        <Sidebar overFolderId={overFolderId} />
        <div className="flex-1 flex flex-col">
          <Toolbar />
          <div className="flex-1 overflow-auto">
            <MediaGrid />
          </div>
        </div>
      </div>
      <DragOverlay>
        {activeFile && (
          <div style={{ transform: "scale(0.2)" }}>
            <DragOverlayContent activeFile={activeFile} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default App;
