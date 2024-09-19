import React from "react";
import { apiClient } from "../../../../Api/END_POINTS";
import CustomTable from "./../../../../Components/AdminSharedComponents/CustomizedTable/CustomizedTable";
import TableSkeleton from "../../../../Components/AdminSharedComponents/TableSkeleton/TableSkeleton";
import MyTablePagination from "./../../../../Components/AdminSharedComponents/TablePagination/MyTablePagination";
import { Box, Button, Typography } from "@mui/material";
import theme from "../../../../Context/ThemeContext/theme";
import { useTheme } from "@emotion/react";
import TableDetailsHeader from "../../../../Components/AdminSharedComponents/TableDetailsHeader/TableDetailsHeader";

interface IFacility {
  _id: string;
  name: string;
}

interface IRoom {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: IFacility[];
  images: string[];
}

interface IRoomsResponse {
  success: boolean;
  message: string;
  data: {
    rooms: IRoom[];
  };
}

export default function RoomsList() {
  const [rooms, setRooms] = React.useState<IRoom[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [page, setPage] = React.useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [totalCount, setTotalCount] = React.useState<number>(0);

  const getAllRooms = async (page: number, size: number) => {
    setLoading(true);

    try {
      const response = await apiClient.get<IRoomsResponse>("/admin/rooms", {
        params: {
          page: page,
          size: size,
        },
      });
      setRooms(response.data.data.rooms);
      setTotalCount(response.data.data.totalCount);
    } catch (err) {
      setError("Failed to load rooms");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAllRooms(page, rowsPerPage);
  }, [page, rowsPerPage]);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const columns = [
    "roomNumber",
    "images",
    "price",
    "capacity",
    "discount",
    "facilities",
  ];

  return (
    <>
      <TableDetailsHeader
        buttonTitle="Add New Room"
        title="Rooms"
        href="rooms/add-new"
      />
      <Box>
        {loading ? (
          <TableSkeleton columns={columns} rowCount={5} />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <CustomTable data={rooms} columns={columns} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                margin: "2rem",
              }}>
              <MyTablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
