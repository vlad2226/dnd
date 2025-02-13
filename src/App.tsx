import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { Sidebar } from './components/Sidebar';
import { Toolbar } from './components/Toolbar';
import { MediaGrid } from './components/MediaGrid';

function App() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  return (
    <DndContext sensors={sensors}>
      <div className="flex h-screen bg-white">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Toolbar />
          <div className="flex-1 overflow-auto">
            <MediaGrid />
          </div>
        </div>
      </div>
      <DragOverlay />
    </DndContext>
  );
}

export default App;