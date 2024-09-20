import React from "react";
import { Button, Box, Avatar, Modal, Typography } from "@mui/material";
import imgAvatar from "../../../../assets/images/boy.png";

const UserDetails = ({ user, open, onClose }) => {
  const {
    userName,
    email,
    country,
    createdAt,
    role,
    phoneNumber,
    profileImage,
  } = user;

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          User Details
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
              alt="User"
              src={profileImage || imgAvatar}
              sx={{ width: 120, height: 120, boxShadow: 1 }}
            />
          </Box>
          <Box width="60%" paddingLeft={2}>
            <ul className="list-unstyled info-list" style={{ padding: 0 }}>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Name:</strong> {userName}
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Email:</strong> {email}
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Phone Number:</strong> {phoneNumber}
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Country:</strong> {country}
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Role:</strong> {role}
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Joined On:</strong>{" "}
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

export default UserDetails;
