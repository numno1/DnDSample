import "./styles.css";
import React, { useState } from "react";
import { GridSize, BoxProps, GridProps, PaperProps } from "@mui/material";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import {
  StyledPaper,
  StyledTitle,
  StyledRow,
  StyledName,
  StyledBody,
  StyledVerticalValue,
  StyledHorizontalValue
} from "./shared/DataItem";

export interface EquivalenciesProps {}

// Dataitem.tsx

export const DataItemRoot: React.FC<PaperProps> = (props) => {
  return (
    <StyledPaper variant="outlined" square {...props}>
      {props.children}
    </StyledPaper>
  );
};

export const DataItemTitle: React.FC<BoxProps> = (props) => {
  return <StyledTitle {...props}>{props.children}</StyledTitle>;
};

export const DataItemBody: React.FC<BoxProps> = (props) => {
  return <StyledBody {...props}>{props.children}</StyledBody>;
};

export const DataItemRow: React.FC<GridProps> = (props) => {
  return (
    <StyledRow container {...props}>
      {props.children}
    </StyledRow>
  );
};

type DataItemMovableRowProps = GridProps & {
  no: number;
  moveRow: any;
};

interface Equivs {
  no: number;
  priority: string;
  server: string;
  tag: string;
}

const equivsSample: Equivs[] = [
  {
    no: 1,
    priority: "1",
    server: "node1",
    tag: "ip10_tag"
  },
  {
    no: 2,
    priority: "10",
    server: "node2",
    tag: "ip10_tag"
  },
  {
    no: 3,
    priority: "20",
    server: "node3",
    tag: "ip10_tag"
  },
  {
    no: 4,
    priority: "30",
    server: "node4",
    tag: "ip10_tag"
  },
  {
    no: 5,
    priority: "40",
    server: "node5",
    tag: "ip10_tag"
  }
];

interface DndObject {
  index: number;
}

// ここからDataItem.tsxのコピー
// ドラッグアンドドロップの結果でequivsの内容を書き換える必要がある。本来のソースではequivsは
// App.jsからEquivalencies.tsxにpropsで渡される変更不可の値であるため、どうにかする必要がある。
// react-dndを使った書き換えの処理はDataItem.tsxで行われるため、reduxでequivsを管理するのが
// あるべき姿っぽいが、本サンプルでは面倒くさいのでEquivalencies.tsxとDataItem.tsxを1つの
// ファイルにして、stateを使って済ませている。

export const DataItemMovableRow: React.FC<DataItemMovableRowProps> = (
  props
) => {
  const { no, moveRow, ...movableRowProps } = props;

  // useDrop: Drop時に、React-dndのシステムとコンポーネントを紐づけるhook
  const [, drop] = useDrop({
    // accept:Drop対象となるDnDObjectのtypeを記載する
    accept: "row",
    // drop:dragした行をdropしたときに動作する
    // item: dropした行のDnD Object
    // no: drop先の行の番号
    // moveRow: item.indexとnoを使ってequivsを並べ替えて格納する
    drop(item: DndObject) {
      moveRow(item, no);
    }
  });

  // useDrop: Drag時に、React-dndのシステムとコンポーネントを紐づけるhook
  const [, drag] = useDrag({
    // type:Drag対象のDnDObjectを定義する。typeは必須
    type: "row",
    // item:Dragした行に関する情報を格納するDnDObject。本サンプルでは行indexだけ必要なのでシンプル
    // オブジェクトじゃなくて関数を書くこともできるらしい(マニュアル参照)
    item: { index: no }
  });

  return (
    // drop: useDrop()の戻り値である、コネクタ関数。ここに書いておくとdropの対象として、紐付けられる
    // drag: useDrag()の戻り値である、コネクタ関数。ここに書いておくとdropの対象として、紐付けられる
    <div ref={drop}>
      <div ref={drag}>
        <StyledRow container {...movableRowProps}>
          {props.children}
        </StyledRow>
      </div>
    </div>
  );
};

export const DataItemName: React.FC<GridProps> = (props) => {
  return (
    <StyledName item {...props}>
      {props.children}
    </StyledName>
  );
};

type DataItemValueProps = GridProps & { horizontal?: boolean };

export const DataItemValue: React.FC<DataItemValueProps> = (props) => {
  const { horizontal, ...gridProps } = props;

  if (horizontal) {
    return (
      <StyledHorizontalValue item {...gridProps}>
        {props.children}
      </StyledHorizontalValue>
    );
  } else {
    return (
      <StyledVerticalValue item {...gridProps}>
        {props.children}
      </StyledVerticalValue>
    );
  }
};

// ここまで DataItem.tsx

export const Equivalencies: React.FC = () => {
  const [equivs, setEquivs] = useState<Equivs[]>(equivsSample);
  const mobileGrid: GridSize[] = [4, 4, 4];

  const moveRow = (item: any, no: number) => {
    // item: 現在ドラッグ中の行のDnDオブジェクト {index: 行数}
    // noは現在ドロップ先の行のno
    // 例 4行目をドラッグして2行目にドロップするなら、 itemは4行目でnoは2行目
    //
    // 以下の処理の大前提として、equivsはnoで降順にソートされている必要がある。
    // ので、本来はinitializeのタイミングでソートすべきだが、本サンプルでは
    // 手抜きしている。
    if (item.index === no) {
      // item.index === no → 同じ行なのでなにもしない
      return;
    } else {
      const newEquivs = [];
      if (item.index > no) {
        // item.index < no 上の行に移動
        // (1) 移動先の行から現在の1つ上の行までのnoを全て+1する。
        //     4行目を2行目に移動するなら、 2行目(=移動先の行)から3行目(現在の1つ上の行)のnoを+1する
        // (2) 現在の行のnoを目的の行にする。
        equivs.map((equiv) => {
          if (equiv.no >= no && equiv.no < item.index) {
            equiv.no += 1;
          } else if (equiv.no === item.index) {
            equiv.no = no;
          }
          newEquivs.push(equiv);
        });
      } else if (item.index < no) {
        // item.index < no 下の行に移動
        // (1) 現在の1つ下の行から移動先の行までのnoを全て-1する。
        //     2行目を4行目に移動するなら、 3行目(現在の1つ下の行)から4行目(=移動先の行)のnoを+1する
        // (2) 現在の行のnoを目的の行にする。
        equivs.map((equiv) => {
          if (equiv.no <= no && equiv.no > item.index) {
            equiv.no -= 1;
          } else if (equiv.no === item.index) {
            equiv.no = no;
          }
          newEquivs.push(equiv);
        });
      }
      // noで降順にしておかないと次回おかしくなる
      setEquivs(
        newEquivs.sort((a, b) => {
          if (a.no < b.no) {
            return -1;
          } else if (a.no > b.no) {
            return 1;
          } else {
            return 0;
          }
        })
      );
    }
  };

  const isMobile = false;

  return (
    // DnDProviderで全体を囲む
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <DataItemRoot>
        <DataItemTitle>'イクイバレンシ情報'</DataItemTitle>
        <DataItemBody>
          <DataItemRow>
            <DataItemName xs={mobileGrid[0]}>サーバー</DataItemName>
            <DataItemName xs={mobileGrid[1]}>プライオリティ</DataItemName>
            <DataItemName xs={mobileGrid[2]}>タグ</DataItemName>
          </DataItemRow>
          {equivs.map((equiv) => (
            <DataItemMovableRow
              key={equiv.server}
              no={equiv.no}
              moveRow={moveRow}
            >
              <DataItemValue horizontal xs={mobileGrid[0]}>
                {equiv.server}
              </DataItemValue>
              <DataItemValue horizontal xs={mobileGrid[1]}>
                {equiv.priority}
              </DataItemValue>
              <DataItemValue horizontal xs={mobileGrid[2]}>
                {equiv.tag}
              </DataItemValue>
            </DataItemMovableRow>
          ))}
        </DataItemBody>
      </DataItemRoot>
    </DndProvider>
  );
};
