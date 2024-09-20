import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useTheme } from "@mui/material/styles";
import ModalConfirmDelete from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { useLocation } from "react-router-dom";

interface IProps {
  value: any;
  onDelete?: (id: string) => void;
  tag?: string;
  onEdit: (value: any) => void;

  onView: (value: any) => void;
}

const ActionsMenu: React.FC<IProps> = ({
  value,
  onDelete,
  tag,
  onEdit,
  onView,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const loacation = useLocation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-controls="action-menu"
        aria-haspopup="true"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "12rem",
            textAlign: "center",
            border: "1px solid #f0f0f0",
            borderRadius: "1.5rem",
            boxShadow: "none",
          },
        }}
      >
        {loacation.pathname === "/dashboard/room-facilities" || (
          <MenuItem
            onClick={() => onView(value)}
            sx={{
              margin: "0.5rem",
              paddingLeft: "2.5rem",
              color: theme.palette.primary.main,
            }}
          >
            <VisibilityRoundedIcon
              sx={{
                marginLeft: "0.3rem",
                marginRight: "0.75rem",
                color: "#203Fc7",
              }}
            />
            View
          </MenuItem>
        )}
        {location.pathname === "/dashboard/users" ||
          location.pathname === "/dashboard/booking" || (
            <MenuItem
              onClick={() => {
                onEdit(value);
              }}
              sx={{
                margin: "0.5rem",
                paddingLeft: "2.5rem",
                color: theme.palette.primary.main,
              }}
            >
              <EditNoteRoundedIcon
                sx={{
                  marginLeft: "0.3rem",
                  marginRight: "0.75rem",
                  color: "#203Fc7",
                }}
              />
              Edit
            </MenuItem>
          )}

        {loacation.pathname === "/dashboard/users" || (
          <ModalConfirmDelete
            deleteAction={() => onDelete && onDelete(value._id)}
            tag={tag}
          />
        )}
      </Menu>
    </>
  );
};

export default ActionsMenu;
