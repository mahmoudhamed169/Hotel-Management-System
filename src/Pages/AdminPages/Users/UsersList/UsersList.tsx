import React from "react";
import TableSkeleton from "../../../../Components/AdminSharedComponents/TableSkeleton/TableSkeleton";
import CustomTable from "../../../../Components/AdminSharedComponents/CustomizedTable/CustomizedTable";
import { apiClient } from "../../../../Api/END_POINTS";
import MyTablePagination from "../../../../Components/AdminSharedComponents/TablePagination/MyTablePagination";
import { Box, Typography } from "@mui/material";
import UserDetails from "../UserDetails/userDetails";
import { useSearchParams } from "react-router-dom";

export default function UsersList() {
  const [users, setUsers] = React.useState<{}[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [page, setPage] = React.useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [totalCount, setTotalCount] = React.useState<number>(0);

  const [selectedUser, setSelectedUser] = React.useState<{} | null>(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams({
    page: "0",
    size: "5",
  });
  const onView = (user: {}) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  const getAllUsers = async (page: number, size: number) => {
    setLoading(true);

    try {
      const response = await apiClient.get("/admin/users", {
        params: {
          page: Number(searchParams.get("page")) + 1,
          size: Number(searchParams.get("size")),
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
          component="span">
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
