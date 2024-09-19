import React from "react";
import { apiClient } from "../../../../Api/END_POINTS";
import TableSkeleton from "../../../../Components/AdminSharedComponents/TableSkeleton/TableSkeleton";
import CustomTable from "../../../../Components/AdminSharedComponents/CustomizedTable/CustomizedTable";
import MyTablePagination from "./../../../../Components/AdminSharedComponents/TablePagination/MyTablePagination";
import { Box } from "@mui/material";
import TableDetailsHeader from "../../../../Components/AdminSharedComponents/TableDetailsHeader/TableDetailsHeader";
import AdsData from "../AdsData/AdsData";

export default function AdsList() {
  const [ads, setAds] = React.useState<[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [totalCount, setTotalCount] = React.useState<number>(0);

  const getAllAds = async (page: number, size: number) => {
    setLoading(true);

    try {
      const response = await apiClient.get("/admin/ads", {
        params: {
          page: page,
          size: size,
        },
      });
      setAds(response.data.data.ads);
      setTotalCount(response.data.data.totalCount);
    } catch (err) {
      setError("Failed to load rooms");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAllAds(page, rowsPerPage);
  }, [rowsPerPage, page]);

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

  const refreshAdsList = () => {
    getAllAds(page, rowsPerPage);
  };

  const columns = ["room", "isActive", "createdAt", "createdBy"];
  return (
    <div>
      <AdsData onAdd={refreshAdsList} />
      {loading ? (
        <TableSkeleton columns={columns} rowCount={6} />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <CustomTable data={ads} columns={columns} />
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
