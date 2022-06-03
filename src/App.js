import "./styles.css";
import { Equivalencies } from "./Equivalencies";
import { DraggingRow } from "./DraggingRow";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

const isMobile = true;

export default function App() {
  return (
    <div className="App">
      {/* DnDProviderで全体を囲む */}
      {/* PCとスマホでbackendが異なる */}
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Equivalencies />
        {/* スマホだとドラッグしている行の軌跡が表示されないので、自力で表示する */}
        {isMobile && <DraggingRow />}
      </DndProvider>
    </div>
  );
}
