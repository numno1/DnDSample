import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  fontSize: "1rem",
  height: "100%",
  border: "1px"
}));

export const StyledTitle = styled(Box)(({ theme }) => ({
  fontWeight: "bold",
  padding: theme.spacing(1),
  color: "black",
  background: "white",
  borderBottom: "1px"
}));

export const StyledBody = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1)
}));

export const StyledRow = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  borderBottom: "1px"
}));

export const StyledName = styled(Grid)(({ theme }) => ({
  fontWeight: "bold"
}));

export const StyledVerticalValue = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    paddingLeft: theme.spacing(2)
  },
  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(1)
  },
  overflowWrap: "break-word"
}));

export const StyledHorizontalValue = styled(Grid)(({ theme }) => ({
  paddingRight: theme.spacing(2),
  overflowWrap: "break-word"
}));

// export const DataItemRoot: React.FC<PaperProps> = (props) => {
//   return (
//     <StyledPaper variant="outlined" square {...props}>
//       {props.children}
//     </StyledPaper>
//   );
// };

// export const DataItemTitle: React.FC<BoxProps> = (props) => {
//   return <StyledTitle {...props}>{props.children}</StyledTitle>;
// };

// export const DataItemBody: React.FC<BoxProps> = (props) => {
//   return <StyledBody {...props}>{props.children}</StyledBody>;
// };

// export const DataItemRow: React.FC<GridProps> = (props) => {
//   return (
//     <StyledRow container {...props}>
//       {props.children}
//     </StyledRow>
//   );
// };

// type DataItemMovableRowProps = GridProps & { no: number };

// export const DataItemMovableRow: React.FC<DataItemMovableRowProps> = (
//   props
// ) => {
//   const { no, ...movableRowProps } = props;
//   const dropRef = React.useRef(null);
//   const dragRef = React.useRef(null);
//   const [, drop] = useDrop({
//     accept: "row",
//     hover(item, monitor) {
//       // itemは現在ドラッグ中のオブジェクト {"type": "row", index: no
//       // noは現在ドラッグ中のもの下にあるオブジェクトのno
//       console.log(`item.index=${item.index}`);
//       console.log(`no=${no}`);
//     }
//   });

//   const [{ isDragging }, drag, preview] = useDrag({
//     item: { type: "row", index: no },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging()
//     })
//   });

//   preview(drop(dropRef));
//   drag(dragRef);

//   return (
//     <div ref={dropRef}>
//       <div ref={dragRef}>
//         <StyledRow container {...movableRowProps}>
//           {props.children}
//         </StyledRow>
//       </div>
//     </div>
//   );
// };

// export const DataItemName: React.FC<GridProps> = (props) => {
//   return (
//     <StyledName item {...props}>
//       {props.children}
//     </StyledName>
//   );
// };

// type DataItemValueProps = GridProps & { horizontal?: boolean };

// export const DataItemValue: React.FC<DataItemValueProps> = (props) => {
//   const { horizontal, ...gridProps } = props;

//   if (horizontal) {
//     return (
//       <StyledHorizontalValue item {...gridProps}>
//         {props.children}
//       </StyledHorizontalValue>
//     );
//   } else {
//     return (
//       <StyledVerticalValue item {...gridProps}>
//         {props.children}
//       </StyledVerticalValue>
//     );
//   }
// };
