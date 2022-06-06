import { useDragLayer } from "react-dnd";
import { DataItemRow, DataItemName } from "./Equivalencies";

export const useSampleDragLayer = () => {
  const { item, isDragging, initialOffset, differenceOffset } = useDragLayer(
    (monitor) => ({
      // ドラッグしているアイテムの初期位置を取得
      initialOffset: monitor.getInitialSourceClientOffset(),
      // ドラッグ開始位置から現在のカーソル位置までの差分を取得
      differenceOffset: monitor.getDifferenceFromInitialOffset(),
      // useDragのItemに渡していた要素をここから取得
      item: monitor.getItem(),
      isDragging: monitor.isDragging()
    })
  );

  if (!isDragging || !differenceOffset || !initialOffset) {
    return { text: "", isDragging: isDragging, x: 0, y: 0 };
  }

  return {
    item: item,
    isDragging: isDragging,
    // 以下でプレビューを表示したい座標を計算
    // スクロールで表示の初期位置がずれてしまうのでwindow.scrollX、window.scrollYで補正
    x: differenceOffset.x + initialOffset.x + window.scrollX,
    y: differenceOffset.y + initialOffset.y + window.scrollY
  };
};

export const DraggingRow: React.FC = () => {
  const { isDragging, x, y, item } = useSampleDragLayer();
  // ドラッグ中じゃない時はプレビューのコンポーネントを返さない
  if (!isDragging) {
    return null;
  }
  const { server, priority, tag } = item;
  return (
    <div
      style={{
        width: window.innerWidth,
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translate(${x}px, ${y}px)`,
        opacity: "40%",
        background: "grey",
        // ↓を入れないと動かない
        pointerEvents: "none"
      }}
    >
      <DataItemRow>
        <DataItemName xs={4}>{server}</DataItemName>
        <DataItemName xs={4}>{priority}</DataItemName>
        <DataItemName xs={4}>{tag}</DataItemName>
      </DataItemRow>
    </div>
  );
};
