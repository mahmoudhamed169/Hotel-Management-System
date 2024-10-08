import React, { useContext } from "react";
import { apiClient } from "../../../../Api/END_POINTS";
import TableSkeleton from "../../../../Components/AdminSharedComponents/TableSkeleton/TableSkeleton";
import CustomTable from "../../../../Components/AdminSharedComponents/CustomizedTable/CustomizedTable";
import MyTablePagination from "../../../../Components/AdminSharedComponents/TablePagination/MyTablePagination";
import { Box } from "@mui/material";
import AdsData from "../AdsData/AdsData";
import toast from "react-hot-toast";
import AdsModal from "./../AdModal/AdsModal";
import AdView from "../AdView/AdView";

import { useSearchParams } from "react-router-dom";

export default function AdsList() {
  const [ads, setAds] = React.useState<[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [selectedAd, setSelectedAd] = React.useState<null | any>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams({
    page: "0",
    size: "5",
  });
  const [openViewModal, setOpenViewModal] = React.useState<boolean>(false);

  const onView = (user: {}) => {
    setSelectedAd(user);
    setOpenViewModal(true);
  };

  const handleViewCloseModal = () => {
    setOpenViewModal(false);
    setSelectedAd(null);
  };

  const getAllAds = async (page: number, size: number) => {
    setLoading(true);
    try {
      const response = await apiClient.get("/admin/ads", {
        params: {
          page: Number(searchParams.get("page")) + 1,
          size: Number(searchParams.get("size")),
        },
      });
      setAds(response.data.data.ads);
      setTotalCount(response.data.data.totalCount);
    } catch (err) {
      setError("Failed to load ads");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAd = async (id: string) => {
    try {
      await apiClient.delete(`/admin/ads/${id}`);
      toast.success("Ad deleted successfully");
      getAllAds(page, rowsPerPage);
    } catch (error) {
      toast.error("Failed to delete ad. Please try again.");
    }
  };

  const handleEditAd = (ad: any) => {
    setSelectedAd(ad);
    setModalOpen(true);
  };

  React.useEffect(() => {
    getAllAds(page, rowsPerPage);
  }, [rowsPerPage, page]);

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

  const refreshAdsList = () => {
    getAllAds(page, rowsPerPage);
  };

  const columns = ["room", "isActive", "createdAt", "createdBy"];

  return (
    <div>
      <AdsData onAdd={refreshAdsList} />
      <AdsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={refreshAdsList}
        initialData={selectedAd}
      />
      {loading ? (
        <TableSkeleton columns={columns} rowCount={6} />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <CustomTable
            data={ads}
            columns={columns}
            onDelete={deleteAd}
            onView={onView}
            onEdit={handleEditAd} // Pass the edit handler
            tag="Ad"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              margin: "2rem",
            }}>
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
      {selectedAd && (
        <AdView
          ad={selectedAd}
          open={openViewModal}
          onClose={handleViewCloseModal}
        />
      )}
    </div>
  );
}
