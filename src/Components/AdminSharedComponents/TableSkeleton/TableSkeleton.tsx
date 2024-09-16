import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";

// Styled components for table cells and rows
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor:
      theme.palette.mode === "light" ? "#E2E5EB" : theme.palette.common.black,
    color:
      theme.palette.mode === "light" ? "#1F263E" : theme.palette.common.white,
    fontWeight: 500,
    fontSize: "1rem",
    height: "80px",
    borderBottom: "none",
  },
  [`&.${TableCell.body}`]: {
    fontSize: 14,
    borderBottom: "none",
    height: "64px",
    paddingLeft: "2rem",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor:
      theme.palette.mode === "light" ? "#F8F9FB" : theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableSkeleton = ({ columns, rowCount }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        border: "none",
        marginTop: "1rem",
      }}
    >
      <Table
        sx={{
          minWidth: 700,
          borderCollapse: "collapse",
          "& th, & td": {
            border: "none",
          },
        }}
        aria-label="skeleton table"
      >
        <TableBody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {columns.map((col, colIndex) => (
                <StyledTableCell key={colIndex}>
                  {col === "images" || col === "profileImage" ? (
                    <Skeleton
                      sx={{ height: 100 }}
                      animation="wave"
                      variant="rectangular"
                    />
                  ) : (
                    <Skeleton
                      variant="text"
                      width="90%"
                      animation="wave"
                      sx={{ height: 40 }}
                    />
                  )}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSkeleton;
