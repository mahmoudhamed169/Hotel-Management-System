import React, { useState } from "react";
import { apiClient } from "../../../../Api/END_POINTS";
import TableSkeleton from "../../../../Components/AdminSharedComponents/TableSkeleton/TableSkeleton";
import CustomTable from "../../../../Components/AdminSharedComponents/CustomizedTable/CustomizedTable";
import MyTablePagination from "./../../../../Components/AdminSharedComponents/TablePagination/MyTablePagination";
import { Box, Modal, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";
import TableDetailsHeader from "../../../../Components/AdminSharedComponents/TableDetailsHeader/TableDetailsHeader";
import CloseIcon from "@mui/icons-material/Close";
import AddFacility from "./ModalContents/AddFacility";
import EditFacility from "./ModalContents/EditFacility";
interface openModalType {
  AddModal: boolean;
  EditModal: boolean;
  DeleteModal: boolean;
}

export default function FaclilitesList() {
  const [facilities, setFacilities] = React.useState<{}[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [page, setPage] = React.useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [openModal, setOpenModal] = useState<openModalType>({
    AddModal: false,
    EditModal: false,
    DeleteModal: false,
  });
  const [selectedFac, setSelectedFac] = useState("");
  const handleOpen = (ModalType: keyof openModalType) =>
    setOpenModal({ ...openModal, [ModalType]: true });

  const handleClose = (ModalType: keyof openModalType) =>
    setOpenModal({ ...openModal, [ModalType]: false });
  const selectedModal = Object.entries(openModal).find(
    ([, value]) => value === true
  )?.[0] as keyof openModalType | undefined;

  const handleEdit = (facility) => {
    setSelectedFac(facility);
    handleOpen("EditModal");
  };

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
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
      await toast.success("Facilities delete sucesfully");
      getAllFacilities(page, rowsPerPage);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete Facilities. Please try again.");
    }
  };

  return (
    <>
      <TableDetailsHeader
        title={"Facilities"}
        buttonTitle={"Add New Facility"}
        onclick={() => handleOpen("AddModal")}
      />
      <Box>
        {loading ? (
          <TableSkeleton columns={columns} rowCount={5} />
        ) : error ? (
          <Typography variant="body1" component="p">
            {error}
          </Typography>
        ) : (
          <>
            <CustomTable
              onEdit={handleEdit}
              data={facilities}
              columns={columns}
              onDelete={deleteFaclities}
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
      </Box>
      {selectedModal && (
        <Modal
          open={Boolean(selectedModal)}
          onClose={() => handleClose(selectedModal)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Box
              onClick={() => handleClose(selectedModal)}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                color: "red",
                cursor: "pointer",
              }}
            >
              <CloseIcon />
            </Box>
            {selectedModal === "AddModal" ? (
              <AddFacility handleClose={handleClose} />
            ) : selectedModal === "EditModal" ? (
              <EditFacility
                handleClose={handleClose}
                selectedFac={selectedFac}
              />
            ) : (
              ""
            )}
          </Box>
        </Modal>
      )}
    </>
  );
}
