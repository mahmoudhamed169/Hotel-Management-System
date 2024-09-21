import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  Grid,
  ImageList,
  ImageListItem,
  Divider,
  Avatar,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import defaultImage from "../../../../assets/images/room2.jpg";

interface RoomViewModelProps {
  open: boolean;
  onClose: () => void;
  room: {
    _id: string;
    roomNumber: string;
    price: number;
    capacity: number;
    discount: number;
    facilities: { _id: string; name: string }[];
    createdBy: { _id: string; userName: string };
    images: string[];
    createdAt: string;
    updatedAt: string;
  };
}

const RoomViewModel: React.FC<RoomViewModelProps> = ({
  open,
  onClose,
  room,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          width: 700,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          position: "relative",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Room Number: {room.roomNumber}
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <Box width="60%">
            <ul className="list-unstyled info-list" style={{ padding: 0 }}>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Price:</strong> ${room.price}
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Capacity:</strong> {room.capacity} persons
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Discount:</strong> {room.discount}%
              </li>
              <li style={{ marginBottom: "1rem" }}>
                <strong>Created By:</strong> {room.createdBy.userName}
              </li>

              <li style={{ marginBottom: "1rem" }}>
                <strong>Facilities:</strong>
                <ul>
                  {room.facilities.map((facility) => (
                    <li key={facility._id}>{facility.name}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </Box>

          <Box
            width="50%"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography variant="subtitle2" gutterBottom>
              Images:
            </Typography>
            <ImageList
              variant="masonry"
              cols={2}
              gap={8}
              style={{ width: "100%" }}
            >
              {room.images.length > 0 ? (
                room.images.map((image, index) => (
                  <ImageListItem
                    key={index}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      src={image}
                      alt={`Room image ${index + 1}`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </ImageListItem>
                ))
              ) : (
                <ImageListItem
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <img
                    src={defaultImage}
                    alt="Default Room Image"
                    loading="lazy"
                    style={{
                      width: "90%",
                      height: "50%",
                      objectFit: "cover",
                    }}
                  />
                </ImageListItem>
              )}
            </ImageList>
          </Box>
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button onClick={onClose} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RoomViewModel;
