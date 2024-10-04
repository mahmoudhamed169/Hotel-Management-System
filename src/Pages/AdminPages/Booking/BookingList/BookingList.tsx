import React, { useContext } from "react";
import TableSkeleton from "../../../../Components/AdminSharedComponents/TableSkeleton/TableSkeleton";
import CustomTable from "../../../../Components/AdminSharedComponents/CustomizedTable/CustomizedTable";
import { apiClient } from "../../../../Api/END_POINTS";
import MyTablePagination from "./../../../../Components/AdminSharedComponents/TablePagination/MyTablePagination";
import { Box, Typography } from "@mui/material";
import toast from "react-hot-toast";
import BookingView from "../BookingView/BookingView";

import { useSearchParams } from "react-router-dom";

export default function BookingList() {
  const [booking, setBooking] = React.useState<{}[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [selectedBooking, setSelectedBooking] = React.useState<{} | null>(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams({
    page: "0",
    size: "5",
  });
  const onView = (bookingItem: {}) => {
    setSelectedBooking(bookingItem);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBooking(null);
  };

  const getAllBooking = async (page: number, size: number) => {
    setLoading(true);

    try {
      const response = await apiClient.get("/admin/booking", {
        params: {
          page: Number(searchParams.get("page")) + 1,
          size: Number(searchParams.get("size")),
        },
      });
      setBooking(response.data.data.booking);
      setTotalCount(response.data.data.totalCount);
    } catch (err) {
      setError("Failed to load bookings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAllBooking(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
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

  const deleteBooking = async (id: string) => {
    try {
      await apiClient.delete(`/admin/booking/${id}`);
      toast.success("Booking deleted successfully");
      getAllBooking(page, rowsPerPage);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete Booking. Please try again.");
    }
  };

  const columns = [
    "room",
    "startDate",
    "endDate",
    "totalPrice",
    "user",
    "status",
  ];

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          fontSize="23px"
          fontWeight="500"
          variant="body2"
          component="span"
        >
          Booking Table Details
        </Typography>
        <Typography fontSize="14px" variant="body2" component="span">
          You can check all details
        </Typography>
      </Box>
      {loading ? (
        <TableSkeleton columns={columns} rowCount={5} />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <CustomTable
            data={booking}
            columns={columns}
            onDelete={deleteBooking}
            onView={onView}
            tag="Booking"
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
        </>
      )}
      {selectedBooking && (
        <BookingView
          booking={selectedBooking}
          open={openModal}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
