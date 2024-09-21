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
    height: "50px",
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

const StatusBadge = styled("span")(({ status }: { status: string }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "4px 8px",
  borderRadius: "4px",
  color: "#fff",
  backgroundColor: status === "completed" ? "green" : "orange",
}));

function renderCellContent(col: string, row: any) {
  switch (col) {
    case "status":
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <StatusBadge status={row.status}>
            {row.status === "completed" ? "Completed" : "Pending"}
          </StatusBadge>
        </div>
      );
    case "room":
      const room = row.room;
      // console.log(room);

      if (!room) {
        return <span>No Room Data Available</span>;
      }

      const isDetailedRoom =
        "price" in room || "capacity" in room || "discount" in room;

      return isDetailedRoom ? (
        <ul style={{ margin: 0, padding: 0 }}>
          <li>Room Number: {room.roomNumber || "N/A"}</li>
          <li>Price: {room.price ? `$${room.price}` : "N/A"}</li>
          <li>Capacity: {room.capacity || "N/A"}</li>
          <li>
            Discount: {room.discount != null ? `${room.discount}%` : "N/A"}
          </li>
        </ul>
      ) : (
        <span>{room.roomNumber || "N/A"}</span>
      );

    case "isActive":
      return (
        <p
          style={{
            backgroundColor: row.isActive ? "#d4edda" : "#f8d7da",
            color: row.isActive ? "#155724" : "#721c24",
            padding: "0.5rem ",
            borderRadius: "4px",
            width: "85px",
          }}>
          {row.isActive ? "Active" : "Not Active"}
        </p>
      );
    case "verified":
      return (
        <p
          style={{
            backgroundColor: row.verified ? "#d4edda" : "#f8d7da",
            color: row.verified ? "#155724" : "#721c24",
            padding: "0.5rem ",
            borderRadius: "4px",
            width: "85px",
          }}>
          {row.verified ? "Verified" : "Unverified"}
        </p>
      );
    case "facilities":
      return (
        <ul style={{ margin: 0, padding: 0 }}>
          {row.facilities.slice(0, 3).map((item: any, index: number) => (
            <li key={index} style={{ marginBottom: "0.5rem" }}>
              {item.name}
            </li>
          ))}
          {row.facilities.length > 3 && (
            <li style={{ color: "gray" }}>and more...</li>
          )}
        </ul>
      );
    case "images":
      return row.images.length > 0 ? (
        <img
          src={row.images[0]}
          alt="room"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ) : (
        "No Image"
      );
    case "createdBy":
      return row.createdBy?.userName || "N/A";
    case "user":
      return row.user?.userName || "N/A";
    case "profileImage":
      return row.profileImage ? (
        <img
          src={row.profileImage}
          alt="profile"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ) : (
        "No Image"
      );
    case "startDate":
    case "endDate":
    case "createdAt":
      const dateStr = row[col];
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB"); // Format as dd/mm/yyyy
    default:
      return row[col] || "N/A";
  }
}

interface TableProps {
  data: any[];
  columns: string[];
  onDelete?: () => void;
  onEdit?: (value: any) => void;

  onView?: (value: any) => void;

  tag: string;
}
function CustomTable({
  data,
  columns,
  onDelete,
  tag,
  onView,
  onEdit,
}: TableProps) {
  console.log({
    data,
    columns,
    onDelete,
    tag,
    onEdit,
  });
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        border: "none",
        marginTop: "1rem",
      }}>
      <Table
        sx={{
          minWidth: 700,
          borderCollapse: "collapse",
          "& th, & td": {
            border: "none",
          },
        }}
        aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <StyledTableCell key={col}>
                {col === "_id" ? "id" : col}
              </StyledTableCell>
            ))}
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {columns.map((col, colIndex) => (
                <StyledTableCell key={colIndex}>
                  {renderCellContent(col, row)}
                </StyledTableCell>
              ))}
              <StyledTableCell>
                <ActionsMenu
                  value={row}
                  onDelete={onDelete}
                  onView={onView}
                  tag={tag}
                  onEdit={onEdit}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;
