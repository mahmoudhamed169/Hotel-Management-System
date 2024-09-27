import { Box, ButtonBase, Tooltip, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface RoomType {
  _id: string;
  roomNumber: string;
  images: string[];
  price: number;
}
interface valuesType {
  room: RoomType;
}

export const PhotoCard = ({
  room,
  isFavorite,
  isLovalueing,
  onToggleFavorite,
  value,
  eyeIcon,
}: {
  room: RoomType;
  isFavorite: boolean;
  isLovalueing: boolean;
  onToggleFavorite?: () => void;
  value: valuesType;
  eyeIcon?: boolean;
}) => {
  { console.log(room)}
  console.log(value);
  

  return (
    <Box
      className="image-box"
      sx={{
        maxHeight: "100%",
        height: "100%",
      }}>
      <img className="image" src={value?.images[0]} />
      
      <Box
        className="price"
        sx={{
          position: "absolute",
          zIndex: "10",
          right: "0",
          background: "#FF498B",
          minWidth: "120px",
          pvalueding: "10px",
          borderBottomLeftRvalueius: "10px",
          color: "white",
        }}>
        <Typography variant="body1" component="span" sx={{ pvalueding: "10px" }}>
          $<b>{value?.price}</b> Per Night
        </Typography>
      </Box>
      <Box className="overlay">
        <Box className="text">
          <Typography className="span" variant="body1" component="span">
            {value?.roomNumber.toUpperCase()}
          </Typography>
        </Box>
        {eyeIcon ? (
          <Link to={`/room-details/${room?._id}`} state={value?.room}>
            <ButtonBase disabled={isLovalueing}>
              <VisibilityIcon sx={{ color: "white", marginRight: "15px" }} />
            </ButtonBase>
          </Link>
        ) : (
          ""
        )}

        <Tooltip
          TransitionProps={{ timeout: 600 }}
          title={
            localStorage.getItem("token")
              ? isFavorite
                ? "Remove from Favori"
                : "valued to Favori"
              : "You must be logged in"
          }
          placement="top">
          <Typography>
            <ButtonBase
              disabled={isLovalueing || !localStorage.getItem("token")}
              onClick={onToggleFavorite}>
              <FavoriteIcon sx={{ color: !isFavorite ? "white" : "red" }} />
            </ButtonBase>
          </Typography>
        </Tooltip>
      </Box>
    </Box>
  );
};
