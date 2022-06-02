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

// データ(equivs)の管理を1ファイルで完結されるため、ここ以降はEquivalencies.tsxに移動
