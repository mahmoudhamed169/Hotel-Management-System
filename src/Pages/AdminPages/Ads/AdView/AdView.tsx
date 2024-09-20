import React from "react";
import { Modal, Box, Typography, Button, Avatar } from "@mui/material";

// Define a simple style for the modal box
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const AdView = ({ ad, open, onClose }) => {
  const {
    isActive,
    room: { roomNumber, price, capacity, discount, images, createdAt },
    createdBy: { userName },
  } = ad;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Ad for Room: {roomNumber}
          <Button
            onClick={onClose}
            color="error"
            sx={{ position: "absolute", right: 16, top: 16 }}
          >
            <i className="fa-solid fa-close"></i>
          </Button>
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            width="40%"
          >
            <Avatar
              src={images.length > 0 ? images[0] : ""}
              alt="Room Image"
              sx={{ width: 120, height: 120, boxShadow: 1 }}
              variant="square"
            />
          </Box>
          <Box width="60%" paddingLeft={2}>
            <ul className="list-unstyled info-list" style={{ padding: 0 }}>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Price:</strong> ${price}
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Capacity:</strong> {capacity} persons
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Discount:</strong> {discount}%
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Status:</strong> {isActive ? "Active" : "Inactive"}
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Created By:</strong> {userName}
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Posted On:</strong>{" "}
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

export default AdView;
