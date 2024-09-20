import React, { useState, useEffect } from "react";
import { apiClient } from "../../../../Api/END_POINTS";
import CustomTable from "./../../../../Components/AdminSharedComponents/CustomizedTable/CustomizedTable";
import TableSkeleton from "../../../../Components/AdminSharedComponents/TableSkeleton/TableSkeleton";
import MyTablePagination from "./../../../../Components/AdminSharedComponents/TablePagination/MyTablePagination";
import { Box, Button, Typography } from "@mui/material";
import theme from "../../../../Context/ThemeContext/theme";
import { useTheme } from "@emotion/react";
import TableDetailsHeader from "../../../../Components/AdminSharedComponents/TableDetailsHeader/TableDetailsHeader";
import toast from "react-hot-toast";
import RoomViewModel from "../RoomViewModel/RoomViewModel";

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
    totalCount: number; // Make sure this is included in the API response
  };
}

export default function RoomsList() {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null);

  const handleView = (room: IRoom) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRoom(null);
  };

  const getAllRooms = async (page: number, size: number) => {
    setLoading(true);

    try {
      const response = await apiClient.get<IRoomsResponse>("/admin/rooms", {
        params: { page, size },
      });
      setRooms(response.data.data.rooms);
      setTotalCount(response.data.data.totalCount); // Make sure this is set from the API response
    } catch (err) {
      setError("Failed to load rooms");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  const deleteRoom = async (id: string) => {
    try {
      await apiClient.delete(`/admin/rooms/${id}`);
      toast.success("Room deleted successfully");
      getAllRooms(page, rowsPerPage);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete room. Please try again.");
    }
  };

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
            <CustomTable
              data={rooms}
              columns={columns}
              onDelete={deleteRoom}
              onView={handleView} // Pass handleView to CustomTable if it's supported
              tag="Room"
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                margin: "2rem",
              }}
            >
              <MyTablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
            {selectedRoom && (
              <RoomViewModel
                open={modalOpen}
                onClose={handleCloseModal}
                room={selectedRoom}
              />
            )}
          </>
        )}
      </Box>
    </>
  );
}
