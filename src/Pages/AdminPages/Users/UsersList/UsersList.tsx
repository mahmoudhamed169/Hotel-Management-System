import React from "react";
import TableSkeleton from "../../../../Components/AdminSharedComponents/TableSkeleton/TableSkeleton";
import CustomTable from "../../../../Components/AdminSharedComponents/CustomizedTable/CustomizedTable";
import { apiClient } from "../../../../Api/END_POINTS";
import MyTablePagination from "../../../../Components/AdminSharedComponents/TablePagination/MyTablePagination";
import { Box, Typography } from "@mui/material";
import UserDetails from "../UserDetails/userDetails";

export default function UsersList() {
  const [users, setUsers] = React.useState<{}[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [page, setPage] = React.useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [totalCount, setTotalCount] = React.useState<number>(0);

  const [selectedUser, setSelectedUser] = React.useState<{} | null>(null); // To hold the selected user for modal
  const [openModal, setOpenModal] = React.useState<boolean>(false); // To control modal visibility

  const onView = (user: {}) => {
    setSelectedUser(user); // Set the selected user
    setOpenModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close the modal
    setSelectedUser(null); // Reset the selected user when modal is closed
  };

  const getAllUsers = async (page: number, size: number) => {
    setLoading(true);

    try {
      const response = await apiClient.get("/admin/users", {
        params: {
          page: page,
          size: size,
        },
      });
      setUsers(response.data.data.users);
      setTotalCount(response.data.data.totalCount);
    } catch (err) {
      setError("Failed to load users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAllUsers(page, rowsPerPage);
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
    "userName",
    "email",
    "profileImage",
    "phoneNumber",
    "country",
    "role",
    "verified",
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
          Users Table Details
        </Typography>
        <Typography fontSize="14px" variant="body2" component="span">
          You can check all details
        </Typography>
      </Box>

      {loading ? (
        <TableSkeleton columns={columns} rowCount={rowsPerPage} />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <CustomTable data={users} columns={columns} onView={onView} />

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
      {selectedUser && (
        <UserDetails
          user={selectedUser}
          open={openModal}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
