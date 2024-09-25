import React, { useState, useEffect } from "react";
import { apiClient } from "../../../../Api/END_POINTS";
import CustomTable from "./../../../../Components/AdminSharedComponents/CustomizedTable/CustomizedTable";
import TableSkeleton from "../../../../Components/AdminSharedComponents/TableSkeleton/TableSkeleton";
import MyTablePagination from "./../../../../Components/AdminSharedComponents/TablePagination/MyTablePagination";
import { Box } from "@mui/material";
import TableDetailsHeader from "../../../../Components/AdminSharedComponents/TableDetailsHeader/TableDetailsHeader";
import toast from "react-hot-toast";
import RoomViewModel from "../RoomViewModel/RoomViewModel";
import { useNavigate, useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams({
    page: "0",
    size: "5",
  });
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<IRoom | null>(null);

  const navigate = useNavigate();

  const handleView = (room: IRoom) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  const handleEdit = (room: IRoom) => {
    navigate(`/dashboard/rooms/update/${room._id}`, {
      state: { roomData: room },
    });
    console.log(room);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRoom(null);
  };

  const getAllRooms = async (page: number, size: number) => {
    setLoading(true);

    try {
      const response = await apiClient.get<IRoomsResponse>("/admin/rooms", {
        params: {
          page: Number(searchParams.get("page")) + 1,
          size: Number(searchParams.get("size")),
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

  useEffect(() => {
    getAllRooms(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    setPage(newPage);
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    searchParams.set("size", event.target.value.toString());
    searchParams.set("page", "0");
    setSearchParams(searchParams);
    setPage(0);
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
        onclick={() => {
          navigate("/dashboard/rooms/add-new");
        }}
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
              onView={handleView}
              tag="Room"
              onEdit={handleEdit}
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
                rowsPerPage={Number(searchParams.get("size"))}
                page={Number(searchParams.get("page"))}
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
