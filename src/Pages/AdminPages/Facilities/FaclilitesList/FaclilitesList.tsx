import React from "react";
import { apiClient } from "../../../../Api/END_POINTS";
import TableSkeleton from "../../../../Components/AdminSharedComponents/TableSkeleton/TableSkeleton";
import CustomTable from "../../../../Components/AdminSharedComponents/CustomizedTable/CustomizedTable";
import MyTablePagination from "./../../../../Components/AdminSharedComponents/TablePagination/MyTablePagination";
import { Box } from "@mui/material";
import toast from "react-hot-toast";

export default function FaclilitesList() {
  const [facilities, setFacilities] = React.useState<{}[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [page, setPage] = React.useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [totalCount, setTotalCount] = React.useState<number>(0);

  const getAllFacilities = async (page: number, size: number) => {
    setLoading(true);

    try {
      const response = await apiClient.get("/admin/room-facilities", {
        params: {
          page: page,
          size: size,
        },
      });
      setFacilities(response.data.data.facilities);
      setTotalCount(response.data.data.totalCount);
    } catch (err) {
      setError("Failed to load rooms");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getAllFacilities(page, rowsPerPage);
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

  const columns = ["_id", "name", "createdBy"];

  const deleteFaclities = async (id) => {
    try {
      const response = await apiClient.delete(`/admin/room-facilities/${id}`);
      toast.success("Facilities delete sucesfully");
      getAllFacilities(page, rowsPerPage);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete Facilities. Please try again.");
    }
  };

  return (
    <div>
      {loading ? (
        <TableSkeleton columns={columns} rowCount={5} />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <CustomTable
            data={facilities}
            columns={columns}
            onDelete={deleteFaclities}
            tag="Faclities"
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
        </>
      )}
    </div>
  );
}
