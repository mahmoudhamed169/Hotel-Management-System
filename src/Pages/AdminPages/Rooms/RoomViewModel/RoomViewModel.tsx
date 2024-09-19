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
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

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
          width: 800,
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

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2">
              Room Number: {room.roomNumber}
            </Typography>
            <Typography variant="body1">Price: ${room.price}</Typography>
            <Typography variant="body1">Capacity: {room.capacity}</Typography>
            <Typography variant="body1">Discount: {room.discount}%</Typography>
            <Typography variant="body2" color="textSecondary">
              Created By: {room.createdBy.userName}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2">Facilities:</Typography>
            <ul>
              {room.facilities.map((facility) => (
                <li key={facility._id}>{facility.name}</li>
              ))}
            </ul>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" gutterBottom>
              Images:
            </Typography>
            <ImageList variant="masonry" cols={2} gap={8}>
              {room.images.length > 0 && (
                <ImageListItem sx={{ height: 250 }}>
                  <img
                    src={room.images[0]}
                    alt="Room Image"
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </ImageListItem>
              )}

              {room.images.slice(1).map((image, index) => (
                <ImageListItem key={index}>
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
              ))}
            </ImageList>
          </Grid>
        </Grid>

        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default RoomViewModel;
