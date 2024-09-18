import React from "react";
import TableSkeleton from "../../../../Components/AdminSharedComponents/TableSkeleton/TableSkeleton";
import CustomTable from "../../../../Components/AdminSharedComponents/CustomizedTable/CustomizedTable";
import { apiClient } from "../../../../Api/END_POINTS";
import MyTablePagination from "./../../../../Components/AdminSharedComponents/TablePagination/MyTablePagination";
import { Box } from "@mui/material";

export default function BookingList() {
  const [booking, setBooking] = React.useState<{}[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [page, setPage] = React.useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [totalCount, setTotalCount] = React.useState<number>(0);

  const getAllBooking = async (page: number, size: number) => {
    setLoading(true);

    try {
      const response = await apiClient.get("/admin/booking", {
        params: {
          page: page,
          size: size,
        },
      });
      setBooking(response.data.data.booking);
      setTotalCount(response.data.data.totalCount);
    } catch (err) {
      setError("Failed to load rooms");
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
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
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
    <div>
      {loading ? (
        <TableSkeleton columns={columns} rowCount={5} />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <CustomTable data={booking} columns={columns} />
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
        </>
      )}
    </div>
  );
}
