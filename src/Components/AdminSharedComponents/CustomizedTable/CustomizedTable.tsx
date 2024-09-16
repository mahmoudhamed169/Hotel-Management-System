import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ActionsMenu from "./../ActionsMenu/ActionsMenu";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:
      theme.palette.mode === "light" ? "#E2E5EB" : theme.palette.common.black,
    color:
      theme.palette.mode === "light" ? "#1F263E" : theme.palette.common.white,
    fontWeight: 500,
    fontSize: "1rem",
    height: "80px",
    borderBottom: "none",
  },
  [`&.${tableCellClasses.body}`]: {
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

interface TableProps {
  data: any[];
  columns: string[];
}

const CustomTable: React.FC<TableProps> = ({ data, columns }) => {
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
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <StyledTableCell key={col}>{col}</StyledTableCell>
            ))}
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {columns.map((col, colIndex) => (
                <StyledTableCell key={colIndex}>
                  {Array.isArray(row[col]) ? (
                    col === "facilities" ? (
                      <ul style={{ margin: 0, padding: 0 }}>
                        {row[col]
                          .slice(0, 3)
                          .map((item: any, index: number) => (
                            <li key={index} style={{ marginBottom: "0.5rem" }}>
                              {item.name}
                            </li>
                          ))}
                        {row[col].length > 3 && (
                          <li style={{ color: "gray" }}>and more...</li>
                        )}
                      </ul>
                    ) : col === "images" ? (
                      row[col].length > 0 ? (
                        <img src={row[col][0]} alt="room" width={100} />
                      ) : (
                        "No Image"
                      )
                    ) : (
                      row[col] || "N/A"
                    )
                  ) : typeof row[col] === "object" && row[col] !== null ? (
                    col === "createdBy" ? (
                      (row[col] as { userName?: string }).userName || "N/A"
                    ) : col === "user" ? (
                      (row[col] as { userName?: string }).userName || "N/A"
                    ) : col === "room" ? (
                      (row[col] as { roomNumber?: string }).roomNumber || "N/A"
                    ) : (
                      "N/A"
                    )
                  ) : col === "profileImage" ? (
                    row[col] ? (
                      <img src={row[col]} alt="profile" width={100} />
                    ) : (
                      "No Image"
                    )
                  ) : (
                    row[col] || "N/A"
                  )}
                </StyledTableCell>
              ))}
              <StyledTableCell>
                <ActionsMenu />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
