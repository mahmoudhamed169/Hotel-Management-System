import React from "react";
import { Modal, Box, Typography, Button, Divider, Avatar } from "@mui/material";
import imgAvatar from "../../../../assets/images/boy.png"; // Default avatar image

const BookingView = ({ booking, open, onClose }) => {
  const {
    startDate,
    endDate,
    totalPrice,
    user: { userName },
    room,
    status,
    createdAt,
  } = booking;

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 720,
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Booking Details
          <Button
            onClick={onClose}
            color="error"
            sx={{ position: "absolute", right: 16, top: 16 }}
          >
            <i className="fa-solid fa-close"></i>
          </Button>
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box display="flex" justifyContent="space-between">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="40%"
          >
            <Avatar
              alt="User"
              src={room ? imgAvatar : undefined} // Default image for room if not available
              sx={{ width: 120, height: 120, boxShadow: 1 }}
            />
          </Box>
          <Box width="60%" paddingLeft={2}>
            <ul className="list-unstyled info-list" style={{ padding: 0 }}>
              <li style={{ marginBottom: "1rem" }}>
                <strong>User:</strong> {userName}
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Room:</strong>{" "}
                {room ? room.roomNumber : "Room information not available"}
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Total Price:</strong> ${totalPrice}
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Status:</strong>{" "}
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Booking Period:</strong>{" "}
                {new Date(startDate).toLocaleDateString()} -{" "}
                {new Date(endDate).toLocaleDateString()}
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Created On:</strong>{" "}
                {new Date(createdAt).toLocaleDateString()}
              </li>
            </ul>
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button onClick={onClose} color="error" variant="contained">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BookingView;
