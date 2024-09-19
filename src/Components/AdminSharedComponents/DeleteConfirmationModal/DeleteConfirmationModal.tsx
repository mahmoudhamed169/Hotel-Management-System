import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  MenuItem,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon, Delete as DeleteIcon } from "@mui/icons-material";
import deleteImg from "../../../assets/images/delete.png";
import ButtonForm from "../../SharedComponents/ButtonForm/ButtonForm";

interface ModalConfirmDeleteProps {
  deleteAction: () => Promise<void>;
  tag: string;
}

function ModalConfirmDelete({ deleteAction, tag }: ModalConfirmDeleteProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleShow = () => setOpen(true);
  const theme = useTheme();

  return (
    <>
      <MenuItem
        sx={{
          margin: "0.5rem",
          paddingLeft: "2.5rem",
          color: theme.palette.primary.main,
        }}
        onClick={handleShow}
      >
        <DeleteIcon
          sx={{
            marginLeft: "0.3rem",
            marginRight: "0.75rem",
            color: "#203Fc7",
          }}
        />
        Delete
      </MenuItem>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="text"
              color="inherit"
              onClick={handleClose}
              sx={{ p: 0 }}
            >
              <CloseIcon />
            </Button>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <img src={deleteImg} alt="" style={{ maxWidth: "100%" }} />
            <Typography
              variant="h6"
              component="h2"
              sx={{ fontWeight: "bold", mt: 2 }}
            >
              {`Delete This ${tag}?`}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Are you sure you want to delete this item? If you are sure, just
              click on delete.
            </Typography>
          </Box>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="error"
              onClick={async () => {
                await deleteAction();
                handleClose();
              }}
            >
              {`Delete this ${tag}`}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ModalConfirmDelete;
